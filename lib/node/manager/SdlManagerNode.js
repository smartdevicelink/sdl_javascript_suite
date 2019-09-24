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
import { RpcResponse } from '../../js/rpc/RpcResponse';
import { FunctionID } from '../../js/rpc/enums/FunctionID';

const SdlPsm = require('../../../lib/js/dev-only/SdlPsm');

const Application = require('../../../lib/js/Application');

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
        let application = new Application(appConfig);
        let obj = new SdlManagerNode(application);
        (async function() {
            await obj.setWebSocketConnection(connection);
            await obj.start();
        })();
        return obj;
    }

    sendDataToTransport(data) {
        // console.log(`sendData`, data.toString());

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
        // console.log(`sendData`, dataLength, sessionId);
        if (frames[0]) {
            let { function_id, correlation_id } = frames[0];
            let jsonData = frames[0].jsonData;

            // console.log(`sendData`, JSON.stringify(jsonData, null, 4), { function_id, correlation_id });

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

    _updateHmiStatus(jsonData) {

    }

    //TODO should be handled by the transport.
    _createWsConnectionHandles() {
        let self = this;
        let coreWs = this.wsConnection;

        //handle
        coreWs.on('message', async msg => {
            let data = msg;

            const dataAry = new Uint8Array(data);

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
            console.log(`received message`,messageId,{serviceType});

            if (this.messageId < messageId)
            {
                console.log(`update messageId`);
                this.messageId = messageId;
            }

            self._setSessionId(sessionId);
            let function_id, correlationID, jsonData, parameters;

            if (serviceType === SdlPsm.SERVICE_TYPE_RPC) {
                if (frames.length === 1) {
                    parameters = frames[0].jsonData; //TODO rename response to parameters.
                    function_id = frames[0].function_id;
                    correlationID = frames[0].correlation_id;
                }

                let method = FunctionID.getNameFromId(function_id);

                if (!method)
                {
                    throw new Error(`Unhandled response function_id: ${function_id} `);
                    //TODO handle these.
                    // return;
                }
                // super(store.parameters);
                // this._isEncrypted = false;
                // this._rpcType = store.rpcType;
                // this._functionName = store.functionName;
                // this._correlationID = store.correlationID;
                // this._bulkData = this.setBulkData(store.bulkData);
                let response = new RpcResponse(
                    {
                        parameters,
                        correlationID,
                        // messageId

                        // functionName
                    }
                );


                //TODO ID in all places instead of Id.
                //permissionItem:
                self.emit(SdlManagerNode.ON_RPC_RESPONSE, {response,messageID: messageId,parameters});

                let notifications = {
                    'OnHMIStatus': true,
                };
                if (method === 'OnHMIStatus') {
                    self._updateHmiStatus(parameters);
                }
                if (notifications[method]) {
                    console.log(`emit notification`, method);
                    //TODO rpc request.
                    //TODO move this to the transport or another class.
                    self.emit(method, response);
                }

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

        let rpcResponse = await this.sendRPC(rpcMessage);

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

    //com/smartdevicelink/protocol/SdlProtocolBase.java
    getNextMessageId() {
        return ++this.messageId;
    }

    getNextCorrelationId() {
        return ++this.correlationId;
    }

    async sendRPCJson(functionName, parameters) {
        let rpcMessage = new RpcMessage(
            {
                functionName,
                parameters,
                rpcType: RpcType.REQUEST,
            }
        );
        let result = await this.sendRPC(rpcMessage);

        return result;
    }

    async sendRPC(message) {
        try {
            let self = this;
            // console.log(`sendRPC`, message);

            let correlationID = this.getNextCorrelationId();
            let requestMessageID = this.getNextMessageId();
            let pm = ProtocolMessage.buildRPC(message,
                                              this._sessionId,
                                              requestMessageID,
                                              correlationID);

            let timeoutHandler;
            return new Promise(async function(resolve,reject) {

                let onRPCResponse = function(data) {
                    let {response,messageID,parameters} = data;
                    let responseCorrelationId = response.getCorrelationID();
                    if (responseCorrelationId === correlationID)
                    {
                        console.log(`found response for request `,messageID,message.getFunctionName(),{parameters});
                        self.removeListener(SdlManagerNode.ON_RPC_RESPONSE, onRPCResponse);
                        clearTimeout(timeoutHandler);
                        return resolve(response);
                    }
                    // else {
                    //     // console.log(`correlationIDs ${responseCorrelationId} ${correlationID} do not match.`)
                    // }

                    // console.log(`response function name`,response.getFunctionName());

                    // if (message.getFunctionName() === 'RegisterAppInterface')
                    // {
                    //     console.log(`special handling on RegisterAppInterface`);
                    //     // console.log(`response function name`,response.getFunctionName());
                    //     // if (response.getFunctionName() === 'RegisterAppInterface')
                    //     // {
                    //     self.removeListener(SdlManagerNode.ON_RPC_RESPONSE, onRPCResponse);
                    //     clearTimeout(timeoutHandler);
                    //
                    //         console.log(`update messageID`,messageID);
                    //         self.messageId = messageID;
                    //         return resolve(response);
                    //     // }
                    // }
                    // rpcResponse.getMessageID();
                    // let responseCorrelationId = rpcResponse.getCorrelationID();
                    // if (requestMessageID === messageID)
                    // {
                    //     console.log(`found response for request `,messageID,message.getFunctionName(),{parameters});
                    //     self.removeListener(SdlManagerNode.ON_RPC_RESPONSE, onRPCResponse);
                    //     clearTimeout(timeoutHandler);
                    //     return resolve(response);
                    // }
                    // else {
                    //     console.log(`messageIDs ${requestMessageID} ${messageID} do not match.`)
                    // }
                    // console.log(`reveiced response`);

                };
                self.sendDataToTransport(pm.getData());

                self.on(SdlManagerNode.ON_RPC_RESPONSE , onRPCResponse);

                timeoutHandler = setTimeout(function() {
                    self.removeListener(SdlManagerNode.ON_RPC_RESPONSE, onRPCResponse);
                    console.log(`failed to get response for`,message);
                    return reject(false);
                },5000)

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

SdlManagerNode.ON_RPC_RESPONSE = 'OnRpcResponse';

module.exports = SdlManagerNode;
