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

import { RegisterAppInterface } from "../../rpc/messages/RegisterAppInterface.js"
import { RpcRequest } from "../../rpc/RpcRequest.js"
import { RpcResponse } from "../../rpc/RpcResponse.js"
import { RpcListener } from "../../rpc/RpcListener.js"
import { SdlSession } from "../../session/SdlSession.js"
import { SdlSessionListener } from "../../session/SdlSessionListener.js"
import { Version } from "../../util/Version.js"
import { ArrayTools } from "../../util/ArrayTools.js"
import { SdlMsgVersion } from "../../rpc/structs/SdlMsgVersion.js"
import { FunctionID } from "../../rpc/enums/FunctionID.js"
import { ServiceType } from "../../protocol/enums/ServiceType.js"

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
    constructor(appConfig, lifecycleListener) {
        if (appConfig === null || lifecycleListener === null
            || appConfig === undefined || lifecycleListener === undefined
        ) {
            throw 'Params must not be null'
        }

        this._appConfig = appConfig;
        this._lifecycleListener = lifecycleListener;
        this._sdlSession = new SdlSession(this._appConfig.getTransportConfig(), this._createSessionListener());

        //This is by default until we receive the RAI Response
        this._rpcSpecVersion = new Version(1, 0, 0);

        this._currentHMIStatus = null;
        this._firstTimeFull = true;
        this._responseListeners = new Map(); //use object notation {} instead?
        this._maxCorrelationId = 0; //TODO remove when correlation gen is implemented
        this._rpcListeners = null;

    }

    /**
     * @return {SdlSessionListener}
     */
    _createSessionListener() {
        const sessionListener = new SdlSessionListener();
        sessionListener.setOnProtocolSessionStarted((serviceType, sessionID, version, correlationID, hashID, isEncrypted) => {
            //Session has been started
            //TODO check min protocol spec version
            //if (sesionType != null) { : this if statement was removed. not sure what the original intention of this was

            if (serviceType === ServiceType.RPC) {
                if (this._appConfig !== null) {
                    //TODO call prepare on config to make sure it is satisfactory 
                    this.sendRpcMessage(this._createRegisterAppInterface());
                }
            }
        });
        sessionListener.setOnProtocolSessionEnded((serviceType, sessionID, correlationID) => {
            //Session has been ended
        });
        sessionListener.setOnProtocolSessionEndedNACKed((serviceType, sessionID, correlationID) => {
            //TODO im not sure why we have this
        });
        sessionListener.setOnRpcMessageReceived((rpcMessage) => {
            //Message has been received 
            this._handleRPC(rpcMessage);
        });
        sessionListener.setOnTransportConnected(() => {
            //TODO should we pass anything here? Do we actually need this?
            //transport has been connected
            this._sdlSession.startService(ServiceType.RPC, 0, false);
        });

        return sessionListener;
    }

    /**
     * @param { RpcMessage } rpcMessage
     */
    _handleRPC(rpcMessage) {
        if (rpcMessage === null || rpcMessage.getFunctionName() === null) {
            return;
        }

        const functionID = FunctionID.valueForString(rpcMessage.getFunctionName()); // this is the number value
        if (this._rpcListeners !== null) {
            const listenerArray = this._rpcListeners.get(functionID);
            if (listenerArray !== null && listenerArray !== undefined) {
                listenerArray.forEach(function (item, index) {
                    item.onRpcMessage(rpcMessage);
                });
            }
        }

        //Handle individual RPC listeners for request/response pairs
        if (rpcMessage instanceof RpcResponse) {
            //null check not needed. its always defined in the constructor
            if (this._responseListeners !== null && this._responseListeners.has(rpcMessage.getCorrelationID())) {
                this._responseListeners.get(rpcMessage.getCorrelationID()).resolve();
            }
        }
    }

    /**
    * @return {LifecycleManager}
    */
    start() {
        this._setupInternalRpcListeners();
        //null check not needed. its always defined in the constructor
        if (this._sdlSession !== null) {
            this._sdlSession.start();
        }
        return this;
    }

    stop() {
        //null check not needed. its always defined in the constructor
        if (this._sdlSession !== null) {
            this._sdlSession.close()
        }
    }


    /**
     * 
     * @param {FunctionID} functionID 
     * @param {RpcListener} rpcListener 
     */
    addRpcListener(functionID, rpcListener) {
        if (this._rpcListeners === null) {
            this._rpcListeners = new Map(); //<Number, Array<RpcListener>>
            //just make an empty map in the constructor and avoid the null check
        }
        let listenerArray = this._rpcListeners.get(functionID);
        //If no array exists yet for this function id, create one
        if (listenerArray === null || listenerArray === undefined) {
            this._rpcListeners.set(functionID, []);
            listenerArray = this._rpcListeners.get(functionID);
        }
        listenerArray.push(rpcListener);
    }

    /**
     * 
     * @param {FunctionID} functionID 
     * @param {RpcListener} rpcListener 
     */
    removeOnRPCListener(functionID, rpcListener) {
        if (this._rpcListeners !== null && rpcListener !== null) {

            const listenerArray = this._rpcListeners.get(functionID);
            if (listenerArray !== null) {
                this._rpcListeners.set(functionID, ArrayTools.arrayRemove(listenerArray, rpcListener));
            }
        }
    }

    /**
     * 
     * @param {RpcMessage} rpcMessage 
     */
    sendRpcMessage(rpcMessage) {
        if (rpcMessage !== null && this._sdlSession !== null && this._sdlSession.getIsConnected()) {
            //TODO we still need to make proper changes to handle specific cases for RPCs ie PLAY_PAUSE / OK

            //TODO create a correlation id generator and handle this in the RPC classes
            if (rpcMessage instanceof RpcRequest) {
                if (rpcMessage.getFunctionName !== FunctionID.RegisterAppInterface) { //RAI has a a protected id
                    rpcMessage.setCorrelationId(++this._maxCorrelationId)
                }
                // TODO: getOnRPCResponsePromise is not defined for RpcMessage
                if (rpcMessage.getOnRPCResponsePromise() !== null) {
                    //Set the individual response listener for this RPC message
                    this._responseListeners.set(rpcMessage.getCorrelationID(), rpcMessage.getOnRPCResponsePromise());
                }
            }
            this._sdlSession.sendRpc(rpcMessage);
        }
    }



    /**
     * @return {RegisterAppInterfaceResponse}
     */
    getRegisterAppInterfaceResponse() {
        return this._registerAppInterfaceResponse;
    }



    /**
    * @return {RegisterAppInterface}
    */
    _createRegisterAppInterface() {
        const registerAppInterface = new RegisterAppInterface();
        registerAppInterface.setSdlMsgVersion(new SdlMsgVersion().setMajorVersion(LifecycleManager.MAX_RPC_VERSION.getMajor()).setMinorVersion(LifecycleManager.MAX_RPC_VERSION.getMinor()).setPatchVersion(LifecycleManager.MAX_RPC_VERSION.getPatch()))
            .setAppName(this._appConfig.getAppName())
            .setFullAppId(this._appConfig.getAppId())
            .setNgnMediaScreenAppName(this._appConfig.getShortAppName())
            .setAppHmiType(this._appConfig.getAppTypes())
            .setLanguageDesired(this._appConfig.getLanguageDesired())
            .setHmiDisplayLanguageDesired(this._appConfig.getHmiDisplayLanguageDesired())
            .setIsMediaApplication(this._appConfig.isMediaApp())
            .setDayColorScheme(this._appConfig.getDayColorScheme())
            .setNightColorScheme(this._appConfig.getNightColorScheme())
            .setCorrelationID(LifecycleManager.REGISTER_APP_INTERFACE_CORRELATION_ID);

        //TODO Add all possible items

        return registerAppInterface;
    }


    /* *******************************************************************************************************
     ********************************** INTERNAL - RPC LISTENERS !! START !! *********************************
     *********************************************************************************************************/

    _setupInternalRpcListeners() {
        this._rpcListener = new RpcListener().setOnRpcMessage(rpcMessage => {
            const functionID = FunctionID.valueForString(rpcMessage.getFunctionName()); // this is the number value

            switch (functionID) {
                case FunctionID.RegisterAppInterface:
                    //TODO: the object that comes in uses _parameters, but the RpcMessage class expects a parameters property!
                    rpcMessage.parameters = rpcMessage._parameters;
                    const rai = new RegisterAppInterface(rpcMessage);
                    this._processRaiResponse(rai);
                    break;
                case FunctionID.OnHMIStatus:
                    this._currentHMIStatus = rpcMessage.getHMILevel(); //we know this is a OnHMIStatus object now
                    const shouldInit = this._currentHMIStatus === null;
                    if (this._lifecycleListener !== null && shouldInit) {
                        this._lifecycleListener.onProxyConnected(this);
                    }
                    break;
                default:
                // RPC not handled yet in LCM
            }
        });

        this.addRpcListener(FunctionID.RegisterAppInterface, this._rpcListener);
        this.addRpcListener(FunctionID.OnHMIStatus, this._rpcListener);
    }

    /**
     * 
     * @param {RegisterAppInterfaceResponse} registerAppInterfaceResponse 
     */
    _processRaiResponse(registerAppInterfaceResponse) {
        //TODO: when a new message comes in, it's not "casted" to its appropriate class, so it just comes in as pure JSON
        //this means it wont have any of the class methods it would have. 

        //Cache this RAI Response as it can be used later
        this._registerAppInterfaceResponse = registerAppInterfaceResponse;

        const msgVersion = registerAppInterfaceResponse.getSdlMsgVersion()
        if (msgVersion !== null) {
            this._rpcSpecVersion = new Version(msgVersion.getMajorVersion(), msgVersion.getMajorVersion(), msgVersion.getPatchVersion());
        } else {
            this._rpcSpecVersion = LifecycleManager.MAX_RPC_VERSION;
        }

        //TODO check against min RPC spec version config

        //TODO parse RAI for system capabilities

    }



}

LifecycleManager.MAX_RPC_VERSION = new Version(6, 0, 0);
LifecycleManager.REGISTER_APP_INTERFACE_CORRELATION_ID = 65529;
LifecycleManager.UNREGISTER_APP_INTERFACE_CORRELATION_ID = 65530;


export { LifecycleManager };