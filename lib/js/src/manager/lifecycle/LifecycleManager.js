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
import { RegisterAppInterfaceResponse } from "../../rpc/messages/RegisterAppInterfaceResponse.js"
import { AppConfig } from "../AppConfig.js"
import { RpcMessage } from "../../rpc/RpcMessage.js"
import { RpcRequest } from "../../rpc/RpcRequest.js"
import { RpcResponse } from "../../rpc/RpcResponse.js"
import { RpcListener } from "../../rpc/RpcListener.js"
import { SdlSession } from "../../session/SdlSession.js"
import { SdlSessionListener } from "../../session/SdlSessionListener.js"
import { Version } from "../../util/Version.js"
import { ArrayTools } from "../../util/ArrayTools.js"
import { SdlMsgVersion } from "../../rpc/structs/SdlMsgVersion.js"
import { FunctionID } from "../../rpc/enums/FunctionID.js"
import { RpcResponse } from "../../rpc/RpcResponse.js"
import { ServiceType } from "../../protocol/enums/ServiceType.js"
import { LifecycleListener } from "./LifecycleListener.js"

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
        if (appConfig == null || lifecycleListener == null) {
            throw 'Params must not be null'
        }

        this._appConfig = appConfig;
        this._lifecycleListener = lifecycleListener;
        this._sdlSession = new SdlSession(this._appConfig.getTransportConfig(), this._createSessionListener());

        //This is by default until we receive the RAI Response
        this._rpcSpecVersion = new Version(1, 0, 0);

        this._currentHMIStatus = null;
        this._firstTimeFull = true;
        this._responseListeners = new Map();
        this._maxCorrelationId = 0; //TODO remove when correlation gen is implemented

    }

    /**
     * @return {SdlSessionListener}
     */
    _createSessionListener() {
        var sessionListener = new SdlSessionListener();
        sessionListener.setOnProtocolSessionStarted(function (serviceType, sessionID, version, correlationID, hashID, isEncrypted) {
            //Session has been started
            if (sesionType != null) {
                //TODO check min protocol spec version

                if (serviceType == ServiceType.RPC) {
                    if (this._appConfig != null) {
                        //TODO call prepare on config to make sure it is satisfactory 
                        this.sendRpc(this._createRegisterAppInterface());

                    }
                }
            }
        });
        sessionListener.setOnProtocolSessionEnded(function (serviceType, sessionID, correlationID) {
            //Session has been ended
        });
        sessionListener.setOnProtocolSessionEndedNACKed(function (serviceType, sessionID, correlationID) {
            //TODO im not sure why we have this
        });
        sessionListener.setOnRpcMessageReceived(function (rpcMessage) {
            //Message has been recieved 
            if (rpcMessage != null) {
                this._handleRPC(rpcMessage);
            }
        });
        sessionListener.setOnTransportConnected(function () {
            //TODO should we pass anything here? Do we actually need this?
            //transport has been connected
        });

        return new SdlSessionListener();
    }

    /**
     * @param { RpcMessage } rpcMessage
     */
    _handleRPC(rpcMessage) {
        if (rpcMessage == null || rpcMessage.getFunctionName() == null) {
            return;
        }

        var functionID = rpcMessage.getFunctionName(); //I believe this is the number value
        if (this.rpcListeners != null) {
            var listenerArray = this.rpcListeners.get(functionID);
            if (listenerArray != null) {
                listenerArray.forEach(function (item, index) {
                    item.onRpcMessage(rpcMessage);
                });
            }
        }

        //Handle individual RPC listeners for request/response pairs
        if (rpcMessage instanceof RpcResponse) {
            if (this._responseListeners != null && this._responseListeners.has(rpcMessage.getCorrelationID())) {
                this._responseListeners.get(rpcMessage.getCorrelationID()).resolve();
            }
        }
    }

    /**
    * @return {LifecycleManager}
    */
    start() {
        _setupInternalRpcListeners();
        session.startSession();
        return this;
    }

    stop() {
        if (this._session != null) {
            this._session.close()
        }
    }


    /**
     * 
     * @param {FunctionID} functionID 
     * @param {RpcListener} rpcListener 
     */
    addRpcListener(functionID, rpcListener) {
        if (this.rpcListeners == null) {
            this.rpcListeners = new Map(); //<Number, Array<RpcListener>>
        }
        var listenerArray = this.rpcListeners.get(functionID);
        //If no array exists yet for this function id, create one
        if (listenerArray == null) {
            this.rpcListeners.set(functionID, new Array());
            listenerArray = this.rpcListeners.get(functionID);
        }

        listenerArray.push(rpcListener);
    }

    /**
     * 
     * @param {FunctionID} functionID 
     * @param {RpcListener} rpcListener 
     */
    removeOnRPCListener(functionID, rpcListener) {
        if (this.rpcListeners != null && rpcListener != null) {

            var listenerArray = this.rpcListeners.get(functionID);
            if (listenerArray != null) {
                this.rpcListeners.set(functionID, ArrayTools.arrayRemove(listenerArray, rpcListener));
            }
        }
    }

    /**
     * 
     * @param {RpcMessage} rpcMessage 
     */
    sendRpcMessage(rpcMessage) {
        if (rpcMessage != null && this._sdlSession != null && this._sdlSession.isConnected()) {
            //TODO we still need to make proper changes to handle specific cases for RPCs ie PLAY_PAUSE / OK

            //TODO create a correlation id generator and handle this in the RPC classes
            if (rpcMessage instanceof RpcRequest) {
                if (rpcMessage.getFunctionName != FunctionID.RegisterAppInterface) { //RAI has a a protected id
                    rpcMessage.setCorrelationId(++this._maxCorrelationId)
                }
                if (rpcMessage.getOnRPCResponsePromise() != null) {
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
        return this._regsiterAppIterfaceReponse;
    }



    /**
    * @return {RegisterAppInterface}
    */
    _createRegisterAppInterface() {
        var registerAppInterface = new RegisterAppInterface();
        registerAppInterface.setSdlMsgVersion(new SdlMsgVersion().setMajorVersion(LifecycleManager.MAX_RPC_VERSION.getMajor()).setMinorVersion(LifecycleManager.MAX_RPC_VERSION.getMinor()).setPatchVersion(LifecycleManager.MAX_RPC_VERSION.getPatch()))
            .setAppName(this._appConfig.getAppName())
            .setFullAppId(this._appConfig.getAppId())
            .setNgnMediaScreenAppName(this._appConfig.getShortAppName())
            .setAppHmiType(this._appConfig.getAppTypes())
            .setLanguageDesired(this._appConfig.getLanguageDesired())
            .setHmiDisplayLanguageDesired(this._appConfig.getHmiDisplayLanguageDesired())
            .setIsMediaApplication(this._appConfig.isMediaApp())
            .setDayColorScheme(this.appConfig.getDayColorScheme())
            .setNightColorScheme(this.appConfig.getNightColorScheme())
            .setCorrelationID(LifecycleManager.REGISTER_APP_INTERFACE_CORRELATION_ID);

        //TODO Add all possible items

        return registerAppInterface;
    }


    /* *******************************************************************************************************
     ********************************** INTERNAL - RPC LISTENERS !! START !! *********************************
     *********************************************************************************************************/

    _setupInternalRpcListeners() {
        this._rpcListener = new RpcListener().setOnRpcMessage(function (rpcMessage) {
            var functionName = rpcMessage.getFunctionName();
            switch (functionName) {
                case FunctionID.RegisterAppInterface:
                    _processRaiResponse(rpcMessage);
                    break;
                case FunctionID.OnHmiStatus:
                    var shouldInit = this._currentHMIStatus == null;
                    currentHMIStatus = rpcMessage;
                    if (lifecycleListener != null && shouldInit) {
                        lifecycleListener.onProxyConnected(this);
                    }
                    break;
                default:
                // RPC not handled yet in LCM
            }
        });

        this.addRpcListener(FunctionID.REGISTER_APP_INTERFACE, this._rpcListener);
    }

    /**
     * 
     * @param {RegisterAppInterfaceResponse} registerAppInterfaceResonse 
     */
    _processRaiResponse(registerAppInterfaceResonse) {

        //Cache this RAI Response as it can be used later
        this._regsiterAppIterfaceReponse = registerAppInterfaceResonse;

        var msgVersion = registerAppInterfaceResonse.getSdlMsgVersion()
        if (msgVerison != null) {
            this._rpcSpecVersion = new Version(msgVerison.getMajorVersion(), msgVerison.getMajorVersion(), msgVerison.getPatchVersion());
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