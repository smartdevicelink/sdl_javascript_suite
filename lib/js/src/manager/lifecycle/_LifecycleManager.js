/*
* Copyright (c) 2020, Livio, Inc.
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
import { MessageType } from '../../rpc/enums/MessageType.js';
import { _SdlSession } from '../../session/_SdlSession.js';
import { _SdlSessionListener } from '../../session/_SdlSessionListener.js';
import { Version } from '../../util/Version.js';
import { _ArrayTools } from '../../util/_ArrayTools.js';
import { SdlMsgVersion } from '../../rpc/structs/SdlMsgVersion.js';
import { FunctionID } from '../../rpc/enums/FunctionID.js';
import { _ServiceType } from '../../protocol/enums/_ServiceType.js';
import { SystemInfo } from '../../util/SystemInfo.js';
import { AppHMIType } from '../../rpc/enums/AppHMIType.js';
import { PredefinedLayout } from '../../rpc/enums/PredefinedLayout.js';

/**
 * This class should also be marked private and behind the SdlManager API
 *
 * usage should be:
 * var lcm = new _LifecycleManager(lifecycleConfig, lifecycleListener);
 * lcm.setRpcListener( ... );
 * lcm.start();
 * ....
 *
 * lifecycleListener.OnProxyConnected(){
 * //Possible to start sending RPCs, HMI level should be NONE to start
 *
 * }
 * @private
 */
class _LifecycleManager {
    /**
     * Initializes an instance of _LifecycleManager.
     * @class
     * @private
     * @param {LifecycleConfig} lifecycleConfig - An instance of LifecycleConfig.
     * @param {_LifecycleListener} lifecycleListener - An instance of _LifecycleListener.
     */
    constructor (lifecycleConfig, lifecycleListener) {
        if (lifecycleConfig === null || lifecycleListener === null
            || lifecycleConfig === undefined || lifecycleListener === undefined
        ) {
            throw new Error('Params must not be null');
        }

        this._lifecycleConfig = lifecycleConfig;
        this._lifecycleListener = lifecycleListener;
        this._sdlSession = new _SdlSession(this._lifecycleConfig.getTransportConfig(), this._createSessionListener());

        // This is by default until we receive the RAI Response
        this._rpcSpecVersion = new Version(1, 0, 0);

        this._minimumProtocolVersion = this._lifecycleConfig.getMinimumProtocolVersion();
        this._minimumRpcVersion = this._lifecycleConfig.getMinimumRpcVersion();

        this._currentHMIStatus = null;
        this._firstTimeFull = true;
        this._maxCorrelationId = 0;
        this._rpcListeners = new Map(); // <Number, Array<function(RpcResponse)>>
        this._systemCapabilityManager = new SystemCapabilityManager(this);
        this._encryptionLifecycleManager = null;
        this._registerAppInterfaceResponse = null;

        this._didCheckSystemInfo = false;
        this._lastDisplayLayoutRequestTemplate = null;
        this._initialMediaCapabilities = null;
    }

    /**
     * Listen to session events and react to them
     * @private
     * @returns {_SdlSessionListener} - The created _SdlSessionListener.
     */
    _createSessionListener () {
        const sessionListener = new _SdlSessionListener();
        sessionListener.setOnProtocolSessionStarted((serviceType, sessionID, version, correlationID, hashID, isEncrypted, systemInfo) => {
            // Session has been started
            if (this._minimumProtocolVersion !== null && this._minimumProtocolVersion.isNewerThan(this.getProtocolVersion()) === 1) {
                console.warn(`Disconnecting from head unit, the configured minimum protocol version ${this._minimumProtocolVersion} is greater than the supported protocol version ${this.getProtocolVersion()}`);
                this._sdlSession.endService(serviceType, this._sdlSession.getSessionId());
                return this._cleanProxy();
            }

            if (systemInfo && !this._didCheckSystemInfo) {
                this._didCheckSystemInfo = true;
                if (!this.onSystemInfoReceived(systemInfo)) {
                    console.warn('Disconnecting from head unit, the system info was not accepted.');
                    this._sdlSession.endService(serviceType, this._sdlSession.getSessionId());
                    return this._cleanProxy();
                }
            }

            if (serviceType === _ServiceType.RPC) {
                if (this._lifecycleConfig !== null && this._lifecycleConfig !== undefined) {
                    this.sendRpcResolve(this._createRegisterAppInterface());
                }
            }
        });
        sessionListener.setOnProtocolSessionEnded((serviceType, sessionID, correlationID) => {
            // Session has been ended
        });
        sessionListener.setOnProtocolSessionEndedNACKed((serviceType, sessionID, correlationID) => {});
        sessionListener.setOnRpcMessageReceived((rpcMessage) => {
            // Message has been received
            this._handleRpc(rpcMessage);
        });
        sessionListener.setOnTransportConnected(() => {
            // transport has been connected
            this._sdlSession.startService(_ServiceType.RPC, 0, false);
        });
        sessionListener.setOnAuthTokenReceived((authToken, sessionId) => {
            this._authToken = authToken;
        });

        return sessionListener;
    }

    /**
     * Get the current protocol version
     * @returns {Version} - An instance of Version.
     */
    getProtocolVersion () {
        return this._sdlSession.getProtocolVersion();
    }

    /**
     * Invoke listeners for received RPCs
     * @private
     * @param { RpcMessage } rpcMessage - The incoming RPC Message.
     */
    _handleRpc (rpcMessage) {
        if (rpcMessage === null || rpcMessage === undefined || rpcMessage.getFunctionId() === null || rpcMessage.getFunctionId() === undefined) {
            return;
        }

        this.fixIncorrectDisplayCapabilities(rpcMessage);
        const functionID = FunctionID.valueForKey(rpcMessage.getFunctionId()); // this is the number value
        const listenerArray = this._rpcListeners.get(functionID);
        if (Array.isArray(listenerArray)) {
            listenerArray.forEach(function (listener) {
                listener(rpcMessage);
            });
        }
    }

    /**
     * After this method finishes, the manager is ready
     * @returns {_LifecycleManager} - A reference to this instance to support method chaining.
     */
    start () {
        this._setupInternalRpcListeners();
        this._sdlSession.start();
        return this;
    }

    /**
     * Teardown method
     */
    stop () {
        this._sdlSession.close();
    }

    /**
     * Gets the system capability manager
     * @param {SdlManager} sdlManager - A reference to an instance of SdlManager
     * @returns {SystemCapabilityManager|null} - A reference to the SystemCapabilityManager.
     */
    getSystemCapabilityManager (sdlManager) {
        if (sdlManager !== null) {
            return this._systemCapabilityManager;
        }
        return null;
    }

    /**
     * Determine whether or not the SDL Session is connected
     * @returns {Boolean} - Whether or not the session is connected.
     */
    isConnected () {
        if (this._sdlSession !== null) {
            return this._sdlSession.getIsConnected();
        } else {
            return false;
        }
    }

    /**
     * Add a listener for a specific RPC
     * @param {Number} functionId - A FunctionID enum value.
     * @param {function} callback - A function to invoke when the FunctionID occurs.
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
     * Remove a listener for a specific RPC
     * @param {Number} functionId - A FunctionID enum value.
     * @param {function} callback - A function to invoke when the FunctionID occurs.
     */
    removeRpcListener (functionId, callback) {
        if (typeof callback === 'function') {
            const listenerArray = this._rpcListeners.get(functionId);
            if (Array.isArray(listenerArray)) {
                this._rpcListeners.set(functionId, _ArrayTools.arrayRemove(listenerArray, callback));
            }
        }
    }

    /**
     * Handles the logic of sending a message and listening for a response for requests
     * @deprecated since version 1.1. Replaced by sendRpcResolve
     * @param {RpcMessage} rpcMessage - The RPC message to send.
     * @returns {Promise} - Resolves if the RPC response is SUCCESS, otherwise rejects
     */
    sendRpcMessage (rpcMessage = null) {
        return new Promise((resolve, reject) => {
            if (!(rpcMessage !== null && this._sdlSession.getIsConnected())) {
                reject('RpcMessage is empty or the Session is not connected');
                return;
            }

            const listener = (rpcResponse) => {
                if (rpcMessage.getCorrelationId() === rpcResponse.getCorrelationId()) {
                    this.removeRpcListener(FunctionID.valueForKey(rpcMessage.getFunctionId()), listener);
                    this.removeRpcListener(FunctionID.GenericResponse, listener);
                    if (rpcResponse.getResultCode() === Result.SUCCESS || rpcResponse.getResultCode() === Result.WARNINGS) {
                        if (rpcResponse.getResultCode() === Result.WARNINGS) {
                            console.warn(rpcResponse.getInfo());
                        }
                        resolve(rpcResponse);
                    } else {
                        console.error(rpcResponse.getInfo());
                        reject(rpcResponse);
                    }
                }
            };

            switch (rpcMessage.getMessageType()) {
                case MessageType.request:
                    if (rpcMessage.getCorrelationId() === null || rpcMessage.getCorrelationId() === undefined) {
                        rpcMessage.setCorrelationId(++this._maxCorrelationId);
                    }
                    this.addRpcListener(FunctionID.valueForKey(rpcMessage.getFunctionId()), listener);
                    // listen for GenericResponse as well, in the case of interacting with older head units
                    this.addRpcListener(FunctionID.GenericResponse, listener);
                    this._sdlSession.sendRpc(rpcMessage);
                    break;
                case MessageType.response:
                case MessageType.notification:
                    // Don't expect a response for these message types - just send and resolve!
                    this._sdlSession.sendRpc(rpcMessage);
                    resolve(null);
                    break;
            }
        });
    }

    /**
     * Handles the logic of sending a message and listening for a response for requests
     * @param {RpcMessage} rpcMessage - The RPC message to send.
     * @returns {Promise} - Resolves regardless of the result code returned
     */
    sendRpcResolve (rpcMessage = null) {
        return new Promise((resolve, reject) => {
            if (!(rpcMessage !== null && this._sdlSession.getIsConnected())) {
                reject('RpcMessage is empty or the Session is not connected');
                return;
            }

            const listener = (rpcResponse) => {
                if (rpcMessage.getCorrelationId() === rpcResponse.getCorrelationId()) {
                    this.removeRpcListener(FunctionID.valueForKey(rpcMessage.getFunctionId()), listener);
                    this.removeRpcListener(FunctionID.GenericResponse, listener);
                    resolve(rpcResponse);
                }
            };

            switch (rpcMessage.getMessageType()) {
                case MessageType.request:
                    if (rpcMessage.getCorrelationId() === null || rpcMessage.getCorrelationId() === undefined) {
                        rpcMessage.setCorrelationId(++this._maxCorrelationId);
                    }
                    // Ford Sync bug returning incorrect display capabilities (https://github.com/smartdevicelink/sdl_javascript_suite/issues/446). Save the next desired layout type to the update capabilities when the SetDisplayLayout response is received
                    if (rpcMessage.getFunctionName() === 'SetDisplayLayout') {
                        this._lastDisplayLayoutRequestTemplate = rpcMessage.getDisplayLayout();
                    }
                    this.addRpcListener(FunctionID.valueForKey(rpcMessage.getFunctionId()), listener);
                    // listen for GenericResponse as well, in the case of interacting with older head units
                    this.addRpcListener(FunctionID.GenericResponse, listener);
                    this._sdlSession.sendRpc(rpcMessage);
                    break;
                case MessageType.response:
                case MessageType.notification:
                    // Don't expect a response for these message types - just send and resolve!
                    this._sdlSession.sendRpc(rpcMessage);
                    resolve(null);
                    break;
            }
        });
    }

    /**
     * Gets the register app interface response
     * @returns {RegisterAppInterfaceResponse} - The RegisterAppInterfaceResponse.
     */
    getRegisterAppInterfaceResponse () {
        return this._registerAppInterfaceResponse;
    }

    /**
     * Gets the HMI status
     * @returns {OnHmiStatus} - The HMI Status.
     */
    getCurrentHmiStatus () {
        return this._currentHMIStatus;
    }

    /**
     * Gets the auth token
     * @returns {string} - The auth token.
     */
    getAuthToken () {
        return this._authToken;
    }

    /**
     * Gets the SDL message version
     * @returns {SdlMsgVersion} - A new SdlMsgVersion instance.
     */
    getSdlMsgVersion () {
        return new SdlMsgVersion()
            .setMajorVersion(this._rpcSpecVersion.getMajor())
            .setMinorVersion(this._rpcSpecVersion.getMinor())
            .setPatchVersion(this._rpcSpecVersion.getPatch());
    }

    /**
     * Adds a listener for a system capability
     * @param {SystemCapabilityType} systemCapabilityType - A SystemCapabilityType enum value.
     * @param {function} listener - A listener function to invoke when the capability changes.
     */
    addOnSystemCapabilityListener (systemCapabilityType, listener) {
        this._systemCapabilityManager.addOnSystemCapabilityListener(systemCapabilityType, listener);
    }

    /**
     * Removes a listener for a system capability
     * @param {SystemCapabilityType} systemCapabilityType - A SystemCapabilityType enum value.
     * @param {function} listener - A listener function to invoke when the capability changes.
     * @returns {Boolean} - Whether or not a listener was removed.
     */
    removeOnSystemCapabilityListener (systemCapabilityType, listener) {
        return this._systemCapabilityManager.removeOnSystemCapabilityListener(systemCapabilityType, listener);
    }

    /**
     * Prepares an RAI to send
     * @private
     * @returns {RegisterAppInterface} - A populated instance of RegisterAppInterface.
     */
    _createRegisterAppInterface () {
        const registerAppInterface = new RegisterAppInterface();
        registerAppInterface
            .setSdlMsgVersion(
                new SdlMsgVersion()
                    .setMajorVersion(_LifecycleManager.MAX_RPC_VERSION.getMajor())
                    .setMinorVersion(_LifecycleManager.MAX_RPC_VERSION.getMinor())
                    .setPatchVersion(_LifecycleManager.MAX_RPC_VERSION.getPatch())
            )
            .setAppName(this._lifecycleConfig.getAppName())
            .setFullAppId(this._lifecycleConfig.getAppId())
            .setNgnMediaScreenAppName(this._lifecycleConfig.getShortAppName())
            .setAppHMIType(this._lifecycleConfig.getAppTypes())
            .setLanguageDesired(this._lifecycleConfig.getLanguageDesired())
            .setHmiDisplayLanguageDesired(this._lifecycleConfig.getLanguageDesired())
            .setIsMediaApplication(this._lifecycleConfig._isMediaApp)
            .setDayColorScheme(this._lifecycleConfig.getDayColorScheme())
            .setNightColorScheme(this._lifecycleConfig.getNightColorScheme())
            .setVrSynonyms(this._lifecycleConfig.getVrSynonyms())
            .setCorrelationId(_LifecycleManager.REGISTER_APP_INTERFACE_CORRELATION_ID)
            .setHashID(this._lifecycleConfig.getResumeHash());

        if (this._lifecycleConfig.getTtsName() !== null) {
            registerAppInterface.setTtsName(this._lifecycleConfig.getTtsName());
        }

        return registerAppInterface;
    }

    /**
     * Set the onSystemInfoReceived function.
     * @param {function} listener - A function to be invoked when the event occurs.
     * @returns {_LifecycleManager} - A reference to this instance to allow method chaining.
     */
    setOnSystemInfoReceived (listener) {
        this._onSystemInfoReceived = listener;
        return this;
    }

    /**
     * Safely attempts to invoke the onSystemInfoReceived event.
     * @param {SystemInfo} systemInfo - the system info of vehicle that this session is currently active on.
     * @returns {Boolean} Return true if this session should continue, false if the session should end
     */
    onSystemInfoReceived (systemInfo) {
        if (typeof this._onSystemInfoReceived === 'function') {
            return !!this._onSystemInfoReceived(systemInfo);
        }
        return true;
    }

    /**
     * 
     * @param {*} setDisplayLayoutResponse 
     */
    fixIncorrectDisplayCapabilities (rpc) {
        if (MessageType.response === rpc.getMessageType() && rpc.getFunctionId() === 'SetDisplayLayout' &&
                this._initialMediaCapabilities !== null && this._lastDisplayLayoutRequestTemplate === PredefinedLayout.MEDIA) {
            rpc.setDisplayCapabilities(this._initialMediaCapabilities);
        }
    }


    /* *******************************************************************************************************
     ********************************** INTERNAL - RPC LISTENERS !! START !! *********************************
     *********************************************************************************************************/

    /**
     * Listens for the RAI and OnHMIStatus RPCs
     * @private
     */
    _setupInternalRpcListeners () {
        let gotOnHmiStatus = false;
        let gotRegisterAppInterfaceResponse = false;

        this._rpcListener = (rpcMessage) => {
            const functionID = FunctionID.valueForKey(rpcMessage.getFunctionId()); // this is the number value

            switch (functionID) {
                case FunctionID.RegisterAppInterface:
                    if (rpcMessage.getMessageType() === MessageType.request) {
                        break; // ignore RAI requests
                    }
                    gotRegisterAppInterfaceResponse = true;
                    this._processRaiResponse(rpcMessage);
                    break;
                case FunctionID.OnHMIStatus: {
                    // send a single onProxyConnected, when we go from a null HMI level to a defined HMI level
                    const shouldInit = rpcMessage.getHmiLevel() !== null
                        && rpcMessage.getHmiLevel() !== undefined
                        && this._currentHMIStatus === null;

                    this._currentHMIStatus = rpcMessage.getHmiLevel();

                    if (this._lifecycleListener !== null && this._lifecycleListener !== undefined && shouldInit) {
                        gotOnHmiStatus = true;
                    }
                    break;
                }
                default:
                // RPC not handled yet in LCM
            }

            // wait for both the RAIR and the OnHMIStatus before invoking onProxyConnected
            // this solves a race condition when SdlManager invokes _checkLifecycleConfiguration and attempts to get the RAIR
            if (gotOnHmiStatus && gotRegisterAppInterfaceResponse) {
                this._lifecycleListener.onProxyConnected(this); // we need RAIR information before invoking this method!
            }
        };


        this.addRpcListener(FunctionID.RegisterAppInterface, this._rpcListener);
        this.addRpcListener(FunctionID.OnHMIStatus, this._rpcListener);
    }

    /**
     * Stores the message version from the RAIR and passes it to the system capability manager
     * @private
     * @param {RegisterAppInterfaceResponse} registerAppInterfaceResponse - The RegisterAppInterfaceResponse to parse.
     */
    _processRaiResponse (registerAppInterfaceResponse) {
        // Cache this RAI Response as it can be used later
        this._registerAppInterfaceResponse = registerAppInterfaceResponse;

        // is meant to make things clearer about this being an sdl version which is not specific to ford's sync.
        // There is a key called sdlVersion that is responding with {GIT_COMMIT} that I'm unsure what it is supposed to do.
        const msgVersion = registerAppInterfaceResponse.getSdlMsgVersion();

        if (msgVersion !== null && msgVersion !== undefined) {
            this._rpcSpecVersion = new Version(msgVersion.getMajorVersion(), msgVersion.getMinorVersion(), msgVersion.getPatchVersion());
        } else {
            this._rpcSpecVersion = _LifecycleManager.MAX_RPC_VERSION;
        }

        if (this._minimumRpcVersion !== null && this._minimumRpcVersion.isNewerThan(this._rpcSpecVersion) === 1) {
            console.warn(`Disconnecting from head unit, the configured minimum RPC version ${this._minimumRpcVersion} is greater than the supported RPC version ${this._rpcSpecVersion}`);
            this.sendRpcResolve(new UnregisterAppInterface());
            this._cleanProxy();
        }

        if (!this._didCheckSystemInfo) {
            this._didCheckSystemInfo = true;
            const vehicleType = registerAppInterfaceResponse.getVehicleType();
            const systemSoftwareVersion = registerAppInterfaceResponse.getSystemSoftwareVersion();
            let systemInfo = null;
            if (vehicleType || systemSoftwareVersion) {
                systemInfo = new SystemInfo(vehicleType, systemSoftwareVersion);
            }
            if (systemInfo && !this.onSystemInfoReceived(systemInfo)) {
                console.warn('Disconnecting from head unit, the system info was not accepted.');
                this.sendRpcResolve(new UnregisterAppInterface());
                this._cleanProxy();
            }
            if (this._lifecycleConfig.getAppTypes().includes(AppHMIType.MEDIA)) {
                this._initialMediaCapabilities = registerAppInterfaceResponse.getDisplayCapabilities();
            }
        }

        // parse RAI for system capabilities
        this._systemCapabilityManager._parseRaiResponse(registerAppInterfaceResponse);
    }

    /**
     * Removes all RPC listeners and closes the session
     * @private
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

_LifecycleManager.MAX_RPC_VERSION = new Version(7, 1, 0);
_LifecycleManager.REGISTER_APP_INTERFACE_CORRELATION_ID = 65529;
_LifecycleManager.UNREGISTER_APP_INTERFACE_CORRELATION_ID = 65530;


export { _LifecycleManager };
