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

// const { SdlPsm, Application } = require('../../../');
// const Application = require('../../../lib/js/Application');

// const SdlPsm =  require('../../../lib/js/transport/SdlPsm');
import { RpcMessage } from '../../js/rpc/RpcMessage';
import { RpcType } from '../../js/rpc/enums/RpcType';
import { ProtocolMessage } from '../../js/transport/ProtocolMessage';

const SdlPsm = require('../../../lib/js/dev-only/SdlPsm');

const Application = require('../../../lib/js/Application');

console.log(SdlPsm, Application);
const EventEmitter = require('events');

// const str2ab = require('arraybuffer-to-string');

class SdlManagerNode extends EventEmitter {

    //transport may request a new session.
    //transport should know the sessionId
    //session -> transport.
    //session type, session config.
    //TODO expect an application.
    constructor(application) {
        super();

        this.application = application;
        this.messageId = 1;
        this.correlationId = 1;
    }

    /**
     * Create a manager and start it.
     * @param connection
     * @param appConfig
     * @returns {Promise<SdlManagerNode>}
     */
    static async createWsManager(connection, appConfig) {
        console.log(`Application`, Application);
        let application = new Application(appConfig);
        let obj = new SdlManagerNode(application);
        obj.setWebSocketConnection(connection);

        await obj.start();
        return obj;
    }

    sendDataToTransport(data) {
        console.log(`sendData`, data.toString());

        let sdlPsm = SdlPsm.parseChunk(data);

        let {
            state,
            version,
            sessionId,
            dataLength,
            compression,
            frameType,
            serviceType,
            controlFrameInfo,
            messageId,
            dataStart,
            states,
            // function_id,
            // jsonData,
            frames,
        } = sdlPsm;
        console.log(`sendData`, dataLength, sessionId);
        if (frames[0]) {
            let { function_id, correlation_id } = frames[0];
            let jsonData = frames[0].jsonData;

            console.log(`sendData`, JSON.stringify(jsonData, null, 4), { function_id, correlation_id });

        }

        if (this.connectionType === SdlManagerNode.CONNECTION_TYPE_WS) {
            //TODO handle as part of TransportBase?
            this.wsConnection.send(data);
            return;
        }
        throw new Error(`Unhandled Connection Type ${this.connectionType}`);
    }

    /**
     * Creates and initializes manager for incoming websocket connection.
     * @param ws
     * @returns {Promise<void>}
     */
    setWebSocketConnection(wsConnection) {
        this.connectionType = SdlManagerNode.CONNECTION_TYPE_WS;
        this.wsConnection = wsConnection;
        this._createWsConnectionHandles();
    }

    _setSessionId(sessionId) {
        if (this._sessionId !== sessionId) {
            console.log(`sessionId updated`, this._sessionId, sessionId);
            this._sessionId = sessionId;
            this.emit('sessionIdChange', sessionId);

        } else {
            console.log(`sessionId is already ${sessionId}`);

        }
    }

    _updateHmiStatus(jsonData)
    {

    }

    //TODO should be handled by the transport.
    _createWsConnectionHandles() {
        let self = this;
        let coreWs = this.wsConnection;

        //handle
        coreWs.on('message', async msg => {
            // console.log(`received message from core`, msg);
            let data = msg;

            let payloadStr;
            const dataAry = new Uint8Array(data);
            // let fullString = SdlPsm.uint8arrayToStringMethod(dataAry);

            console.log(`received message from core`);
            // console.log(fullString);
            let sdlPsm = SdlPsm.parseChunk(dataAry);

            let {
                state,
                version,
                sessionId,
                dataLength,
                compression,
                frameType,
                serviceType,
                controlFrameInfo,
                messageId,
                dataStart,
                states,
                // function_id,
                // jsonData,
                frames,
            } = sdlPsm;
            self._setSessionId(sessionId);
            let function_id, correlation_id, jsonData;

            // let jsonData;

            if (frames.length === 1) {
                jsonData = frames[0].jsonData;
                function_id = frames[0].function_id;
                correlation_id = frames[0].correlation_id;
            }
            let method = SdlPsm.getFunctionById(function_id);
            console.log(`payload from core:`, JSON.stringify(jsonData), {
                function_id,
                version,
                frameType,
                correlation_id,
                messageId,
                method
            });

            if (method === 'OnHMIStatus') {
                self._updateHmiStatus(jsonData);
            }

            let notifications = {
                'OnHMIStatus': true,
            };

            if (notifications[method])
            {
                console.log(`emit notification`,method);
                //TODO rpc request.
                //TODO move this to the transport or another class.
                self.emit(method,jsonData);
            }

        });

        coreWs.on('close', () => {
            console.log('WebSocket was closed');
        });
    }

    /**
     * Returns when app has received a sessionId.
     *
     * TODO timeout.
     * @param application
     * @returns {Promise<void>}
     */
    async start() {
        let self = this;

        console.log(`start`);
        // return new Promise(async function(resolve) {
        //     // self.once('sessionIdChange', async function() {
        //     //     console.log(`sessionIdChange`);
        //     //     await self._registerAppInterface();
        //     //     resolve();
        //     // });
        //
        //     await self._sendInitRequest(); //protocolVersion5.2.0 and wait for response.
        // });

        await self._sendInitRequest(); //protocolVersion5.2.0 and wait for response.

        await self._registerAppInterface();

    }

    async _sendInitRequest() {
        let self = this;
        let connectionRequest = SdlPsm.INIT_REQUEST;
        //  protocolVersion5.2.0
        self.wsConnection.send(connectionRequest);

        return new Promise(function(resolve) {
            self.once('sessionIdChange', async function() {
                console.log(`sessionIdChange`);
                // await self._registerAppInterface();
                resolve();
            });
        });

    }

    async _registerAppInterface() {
        console.log(`sending appinterface request`);

        //TODO send as an RPCRequest instead of the more generic RPCMessage.

        // let appRequest = {
        //     'method': 'RegisterAppInterface',
        //     'params':
        //     this.application,
        //
        // };
        let rpcMessage = new RpcMessage({
                                            parameters: this.application.getRegisterAppInterfaceParams(),
                                            rpcType: RpcType.REQUEST,
                                            functionName: `RegisterAppInterface`,
                                            // correlationID: this.getNextCorrelationID(); //TODO correlationID checking.
                                            //bulkData. JSON bulk data message body.
                                        });

        let result = await this.sendRPC(rpcMessage);

        console.log(`application result`, result);

        // rpcMessage.setBulkData(SdlPsm.buildRPC());

        // super(store.parameters);
        // this._isEncrypted = false;
        // this._rpcType = store.rpcType;
        // this._functionName = store.functionName;
        // this._correlationID = store.correlationID;
        // this._bulkData = this.setBulkData(store.bulkData);

    }

    /**
     * Create a websocket based connection.
     * @param config
     */
    async connect(config) {

        if (type === SdlManager.CONNECTION_TYPE_WS) {
            //listen on port and wait for responses from sdl_core...
            //creating a server should be distinct from this.

        }
        throw new Error(`Unknown Connection Type ${type}`);
    }

    //should have a session and be able to send rpcs.

    //TODO should be the primary listener for incoming?

    //TODO
    //	/**
    // 	 * Send RPC Message
    // 	 * @param message RPCMessage
    // 	 */
    // 	@Override
    // 	public void sendRPC(RPCMessage message) {
    // 		try{
    // 			proxy.sendRPC(message);
    // 		}catch (SdlException exception){
    // 			handleSdlException(exception);
    // 		}
    // 	}
    //TODO: is an RPCResponseListener necessary?
    // setOnRPCResponseListener
    //com/smartdevicelink/managers/SdlManager.java
    //com/smartdevicelink/proxy/SdlProxyBase.java
//     public void sendRPC(RPCMessage message) throws SdlException {
//     if (_proxyDisposed) {
//         throw new SdlException("This object has been disposed, it is no long capable of executing methods.", SdlExceptionCause.SDL_PROXY_DISPOSED);
//     }
//
//     // Test if request is null
//     if (message == null) {
//     SdlTrace.logProxyEvent("Application called sendRPCRequest method with a null RPCRequest.", SDL_LIB_TRACE_KEY);
//     throw new IllegalArgumentException("sendRPCRequest cannot be called with a null request.");
// }
//
// SdlTrace.logProxyEvent("Application called sendRPCRequest method for RPCRequest: ." + message.getFunctionName(), SDL_LIB_TRACE_KEY);
//
// // Test if SdlConnection is null
// synchronized(CONNECTION_REFERENCE_LOCK) {
//     if (!getIsConnected()) {
//         SdlTrace.logProxyEvent("Application attempted to send and RPCRequest without a connected transport.", SDL_LIB_TRACE_KEY);
//         throw new SdlException("There is no valid connection to SDL. sendRPCRequest cannot be called until SDL has been connected.", SdlExceptionCause.SDL_UNAVAILABLE);
//     }
// }
//
// // Test for illegal correlation ID
// if (message.getMessageType().equals(RPCMessage.KEY_REQUEST)) {
//     RPCRequest request = (RPCRequest) message;
//     if (isCorrelationIDProtected(request.getCorrelationID())) {
//
//         SdlTrace.logProxyEvent("Application attempted to use the reserved correlation ID, " + request.getCorrelationID(), SDL_LIB_TRACE_KEY);
//         throw new SdlException("Invalid correlation ID. The correlation ID, " + request.getCorrelationID()
//                                    + " , is a reserved correlation ID.", SdlExceptionCause.RESERVED_CORRELATION_ID);
//     }
// }
// // Throw exception if RPCRequest is sent when SDL is unavailable
// if (!_appInterfaceRegisterd && !message.getFunctionName().equals(FunctionID.REGISTER_APP_INTERFACE.toString())) {
//
//     SdlTrace.logProxyEvent("Application attempted to send an RPCRequest (non-registerAppInterface), before the interface was registerd.", SDL_LIB_TRACE_KEY);
//     throw new SdlException("SDL is currently unavailable. RPC Requests cannot be sent.", SdlExceptionCause.SDL_UNAVAILABLE);
// }
//
// if (_advancedLifecycleManagementEnabled) {
//     if (message.getFunctionName().equals(FunctionID.REGISTER_APP_INTERFACE.toString())
//         || message.getFunctionName().equals(FunctionID.UNREGISTER_APP_INTERFACE.toString())) {
//
//         SdlTrace.logProxyEvent("Application attempted to send a RegisterAppInterface or UnregisterAppInterface while using ALM.", SDL_LIB_TRACE_KEY);
//         throw new SdlException("The RPCRequest, " + message.getFunctionName() +
//                                    ", is un-allowed using the Advanced Lifecycle Management Model.", SdlExceptionCause.INCORRECT_LIFECYCLE_MODEL);
//     }
// }
//
// sendRPCMessagePrivate(message);
// }

    getNextMessageId() {
        return this.messageId++;
    }

    getNextCorrelationId() {
        return this.correlationId++;
    }

    async sendRPCJson(functionName,parameters) {
        let rpcMessage = new RpcMessage(
            {
                functionName,
                parameters,
                rpcType: RpcType.REQUEST,
            }
        );

        let result = await this.sendRPC(rpcMessage);
    }

    async sendRPC(message) {
        try {
            let self = this;
            console.log(`sendRPC`, message);

            let pm = ProtocolMessage.buildRPC(message,
                                              this._sessionId,
                                              this.getNextMessageId(),
                                              this.getNextCorrelationId());

            return new Promise(async function(resolve) {

                let onRPCResponse = function(rpcResponse) {
                    console.log(`reveiced response`);
                    self.removeListener('onRPCResponse', onRPCResponse);

                    return resolve(rpcResponse);
                };
                self.sendDataToTransport(pm.getData());

                self.on('onRPCResponse', onRPCResponse);

            });

        } catch (e) {
            //TODO handle
            throw e;
        }
    }

    // async sendRPCJSON(jsonObj)
    // {
    //     let data = SdlPsm.buildRPC({
    //                                    messageId: this.messageId,
    //                                    sessionId: this.sessionId,
    //                                    requestJSON,
    //                                    buffer
    //                                });
    //
    //
    //     return data;
    //
    // }

}

SdlManagerNode.CONNECTION_TYPE_WS = 'WS';

module.exports = SdlManagerNode;
