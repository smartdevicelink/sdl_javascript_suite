/*
* Copyright (c) 2019, Livio, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { SystemCapabilityManager } from '../SystemCapabilityManager.js';
import { RegisterAppInterface } from '../../rpc/messages/RegisterAppInterface.js';
import { UnregisterAppInterface } from '../../rpc/messages/UnregisterAppInterface.js';
import { Result } from '../../rpc/enums/Result.js';
import { RpcType } from '../../rpc/enums/RpcType.js';
import { SdlSession } from '../../session/SdlSession.js';
import { SdlSessionListener } from '../../session/SdlSessionListener.js';
import { Version } from '../../util/Version.js';
import { ArrayTools } from '../../util/ArrayTools.js';
import { SdlMsgVersion } from '../../rpc/structs/SdlMsgVersion.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';
import { ServiceType } from '../../protocol/enums/ServiceType.js';

/**
 * NOTE: This could all change and should only be used for testing.
 * This class should also be marked private and behind the SdlManager API
 *
 * usage should be:
 * var lcm = new LifecycleManager(appConfig, lifecycleListener);
 * lcm.setRpcListener( ... );
 * lcm.start();
 * ....
 *
 * lifecycleListener.OnProxyConnected(){
 *  //Possible to start sending RPCs, HMI level should be NONE to start
 *
 * }
 *
 */
class LifecycleManager {
    /**
    * @param {AppConfig} sdlConfig
    * @param {LifecycleListener} lifecycleListener
    * @constructor
    */
    constructor (appConfig, lifecycleListener) {
        if (appConfig === null || lifecycleListener === null
            || appConfig === undefined || lifecycleListener === undefined
        ) {
            throw new Error('Params must not be null');
        }

        this._appConfig = appConfig;
        this._lifecycleListener = lifecycleListener;
        this._sdlSession = new SdlSession(this._appConfig.getTransportConfig(), this._createSessionListener());

        // This is by default until we receive the RAI Response
        this._rpcSpecVersion = new Version(1, 0, 0);

        this._minimumProtocolVersion = this._appConfig.getMinimumProtocolVersion();
        this._minimumRpcVersion = this._appConfig.getMinimumRpcVersion();

        this._currentHMIStatus = null;
        this._firstTimeFull = true;
        this._maxCorrelationId = 0; // TODO remove when correlation gen is implemented
        this._rpcListeners = new Map(); // <Number, Array<function(RpcResponse)>>
        this._systemCapabilityManager = new SystemCapabilityManager(this);
        this._encryptionLifecycleManager = null;
    }

    /**
     * @return {SdlSessionListener}
     */
    _createSessionListener () {
        const sessionListener = new SdlSessionListener();
        sessionListener.setOnProtocolSessionStarted((serviceType, sessionID, version, correlationID, hashID, isEncrypted) => {
            // Session has been started
            // TODO check min protocol spec version
            if (serviceType === ServiceType.RPC) {
                if (this._appConfig !== null && this._appConfig !== undefined) {
                    // TODO call prepare on config to make sure it is satisfactory
                    this.sendRpcMessage(this._createRegisterAppInterface());
                }
            }
        });
        sessionListener.setOnProtocolSessionEnded((serviceType, sessionID, correlationID) => {
            // Session has been ended
        });
        sessionListener.setOnProtocolSessionEndedNACKed((serviceType, sessionID, correlationID) => {
            // TODO im not sure why we have this
        });
        sessionListener.setOnRpcMessageReceived((rpcMessage) => {
            // Message has been received
            this._handleRpc(rpcMessage);
        });
        sessionListener.setOnTransportConnected(() => {
            // transport has been connected
            this._sdlSession.startService(ServiceType.RPC, 0, false);
        });
        sessionListener.setOnAuthTokenReceived((authToken, sessionId) => {
            this._authToken = authToken;
        });

        return sessionListener;
    }

    /**
     * @param { RpcMessage } rpcMessage
     */
    _handleRpc (rpcMessage) {
        if (rpcMessage === null || rpcMessage === undefined || rpcMessage.getFunctionName() === null || rpcMessage.getFunctionName() === undefined) {
            return;
        }

        const functionID = FunctionID.valueForKey(rpcMessage.getFunctionName()); // this is the number value
        const listenerArray = this._rpcListeners.get(functionID);
        if (Array.isArray(listenerArray)) {
            listenerArray.forEach(function (listener) {
                listener(rpcMessage);
            });
        }
    }

    /**
    * @return {LifecycleManager}
    */
    start () {
        this._setupInternalRpcListeners();
        this._sdlSession.start();
        return this;
    }

    stop () {
        this._sdlSession.close();
    }

    /**
    * @param {SdlManager} sdlManager - A reference to an instance of SdlManager
    * @return {SystemCapabilityManager|null}
    */
    getSystemCapabilityManager (sdlManager) {
        if (sdlManager !== null) {
            return this._systemCapabilityManager;
        }
        return null;
    }

    /**
     * Determine whether or not the SDL Session is connected
     * @return {Boolean} isConnected
     */
    isConnected () {
        if (this._sdlSession !== null) {
            return this._sdlSession.getIsConnected();
        } else {
            return false;
        }
    }

    /**
     *
     * @param {Number} functionId
     * @param {function} callback
     */
    addRpcListener (functionId, callback) {
        let listenerArray = this._rpcListeners.get(functionId);
        // If no array exists yet for this function id, create one
        if (!Array.isArray(listenerArray)) {
            this._rpcListeners.set(functionId, []);
            listenerArray = this._rpcListeners.get(functionId);
        }
        listenerArray.push(callback);
    }

    /**
     *
     * @param {Number} functionId
     * @param {function} callback
     */
    removeRpcListener (functionId, callback) {
        if (typeof callback === 'function') {
            const listenerArray = this._rpcListeners.get(functionId);
            if (Array.isArray(listenerArray)) {
                this._rpcListeners.set(functionId, ArrayTools.arrayRemove(listenerArray, callback));
            }
        }
    }

    /**
     *
     * @param {RpcMessage} rpcMessage
     * @param {function} callback - callback(RpcResponse)
     * @return {Promise} - Resolves if the RPC response is SUCCESS, otherwise rejects
     */
    sendRpcMessage (rpcMessage = null) {
        return new Promise((resolve, reject) => {
            if (!(rpcMessage !== null && this._sdlSession.getIsConnected())) {
                reject('RpcMessage is empty or the Session is not connected');
                return;
            }

            switch (rpcMessage.getRPCType()) {
                case RpcType.REQUEST:
                    if (rpcMessage.getCorrelationId() === null || rpcMessage.getCorrelationId() === undefined) {
                        rpcMessage.setCorrelationId(++this._maxCorrelationId);
                    }
                    break;
                case RpcType.RESPONSE:
                    // TODO: Any additional handling needed for RpcResponse types?
                    break;
                case RpcType.NOTIFICATION:
                    // TODO: Any additional handling needed for RpcNotification types?
                    break;
            }

            const listener = (rpcResponse) => {
                if (rpcMessage.getCorrelationId() === rpcResponse.getCorrelationId()) {
                    this.removeRpcListener(FunctionID.valueForKey(rpcMessage.getFunctionName()), listener);
                    if (rpcResponse.getResultCode() === Result.SUCCESS) {
                        resolve(rpcResponse);
                    } else {
                        reject(rpcResponse);
                    }
                }
            };

            this.addRpcListener(FunctionID.valueForKey(rpcMessage.getFunctionName()), listener);
            this._sdlSession.sendRpc(rpcMessage);
        });
    }



    /**
     * @return {RegisterAppInterfaceResponse}
     */
    getRegisterAppInterfaceResponse () {
        return this._registerAppInterfaceResponse;
    }

    /**
     * @return {OnHmiStatus}
     */
    getCurrentHmiStatus () {
        return this._currentHMIStatus;
    }

    /**
     * @return {string}
     */
    getAuthToken () {
        return this._authToken;
    }

    /**
    * @return {RegisterAppInterface}
    */
    _createRegisterAppInterface () {
        const registerAppInterface = new RegisterAppInterface();
        registerAppInterface
            .setSdlMsgVersion(
                new SdlMsgVersion()
                    .setMajorVersion(LifecycleManager.MAX_RPC_VERSION.getMajor())
                    .setMinorVersion(LifecycleManager.MAX_RPC_VERSION.getMinor())
                    .setPatchVersion(LifecycleManager.MAX_RPC_VERSION.getPatch())
            )
            .setAppName(this._appConfig.getAppName())
            .setFullAppId(this._appConfig.getAppId())
            .setNgnMediaScreenAppName(this._appConfig.getShortAppName())
            .setAppHmiType(this._appConfig.getAppTypes())
            .setLanguageDesired(this._appConfig.getLanguageDesired())
            .setHmiDisplayLanguageDesired(this._appConfig.getHmiDisplayLanguageDesired())
            .setIsMediaApplication(this._appConfig.isMediaApp())
            .setDayColorScheme(this._appConfig.getDayColorScheme())
            .setNightColorScheme(this._appConfig.getNightColorScheme())
            .setCorrelationId(LifecycleManager.REGISTER_APP_INTERFACE_CORRELATION_ID);

        // TODO Add all possible items

        return registerAppInterface;
    }


    /* *******************************************************************************************************
     ********************************** INTERNAL - RPC LISTENERS !! START !! *********************************
     *********************************************************************************************************/

    _setupInternalRpcListeners () {
        this._rpcListener = (rpcMessage) => {
            const functionID = FunctionID.valueForKey(rpcMessage.getFunctionName()); // this is the number value

            switch (functionID) {
                case FunctionID.RegisterAppInterface:
                    this._processRaiResponse(rpcMessage);
                    break;
                case FunctionID.OnHMIStatus: {
                    // send a single onProxyConnected, when we go from a null HMI level to a defined HMI level
                    const shouldInit = rpcMessage.getHMILevel() !== null
                        && rpcMessage.getHMILevel() !== undefined
                        && this._currentHMIStatus === null;

                    this._currentHMIStatus = rpcMessage.getHMILevel();

                    if (this._lifecycleListener !== null && this._lifecycleListener !== undefined && shouldInit) {
                        this._lifecycleListener.onProxyConnected(this);
                    }
                    break;
                }
                default:
                // RPC not handled yet in LCM
            }
        };

        this.addRpcListener(FunctionID.RegisterAppInterface, this._rpcListener);
        this.addRpcListener(FunctionID.OnHMIStatus, this._rpcListener);
    }

    /**
     *
     * @param {RegisterAppInterfaceResponse} registerAppInterfaceResponse
     */
    _processRaiResponse (registerAppInterfaceResponse) {
        // Cache this RAI Response as it can be used later
        this._registerAppInterfaceResponse = registerAppInterfaceResponse;

        //  TODO KEY_SDL_MSG_VERSION vs KEY_SYNC_MSG_VERSION sdlVersion: '{GIT_COMMIT}', I think the key name change
        // is meant to make things clearer about this being an sdl version which is not specific to ford's sync.
        // There is a key called sdlVersion that is responding with {GIT_COMMIT} that I'm unsure what it is supposed to do.
        const msgVersion = registerAppInterfaceResponse.getSdlMsgVersion();

        if (msgVersion !== null && msgVersion !== undefined) {
            this._rpcSpecVersion = new Version(msgVersion.getMajorVersion(), msgVersion.getMajorVersion(), msgVersion.getPatchVersion());
        } else {
            this._rpcSpecVersion = LifecycleManager.MAX_RPC_VERSION;
        }


        // TODO check against min RPC spec version config
        if (this._minimumRpcVersion !== null && this._minimumRpcVersion.isNewerThan(this._rpcSpecVersion) == 1) {
            console.warn(`Disconnecting from head unit, the configured minimum RPC version ${this._minimumRpcVersion} is greater than the supported RPC version ${this._rpcSpecVersion}`);
            // TODO: This calls sendRpcMessagePrivate in the Java Suite
            this.sendRpcMessage(new UnregisterAppInterface());
            this._cleanProxy();
        }

        // TODO parse RAI for system capabilities
        // this._systemCapabilityManager.parseRaiResponse(registerAppInterfaceResponse);
    }

    /**
     * Removes all RPC listeners and closes the session
     */
    _cleanProxy () {
        this._rpcListeners.clear();
        if (this._sdlSession !== null && this._sdlSession.getIsConnected()) {
            this._sdlSession.close();
        }
        if (this._encryptionLifecycleManager !== null) {
            this._encryptionLifecycleManager.dispose();
        }
    }
}

LifecycleManager.MAX_RPC_VERSION = new Version(6, 0, 0);
LifecycleManager.REGISTER_APP_INTERFACE_CORRELATION_ID = 65529;
LifecycleManager.UNREGISTER_APP_INTERFACE_CORRELATION_ID = 65530;


export { LifecycleManager };