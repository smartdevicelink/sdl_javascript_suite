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

import { RpcMessage } from '../../js/rpc/RpcMessage';
import { RpcType } from '../../js/rpc/enums/RpcType';
import { ProtocolMessage } from '../../js/transport/ProtocolMessage';
import { RpcResponse } from '../../js/rpc/RpcResponse';
import { FunctionID } from '../../js/rpc/enums/FunctionID';

//TODO remove dev-only
// import { SdlPsm } from '../../js/transport/SdlPsm';
import { SdlPsm } from '../../js/dev-only/SdlPsm';
import { Application } from '../../js/Application';
import {EventEmitter} from 'events';

class SdlManagerNode extends EventEmitter {


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
        if (frames[0]) {
            let { function_id, correlation_id } = frames[0];
            let jsonData = frames[0].jsonData;
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
            this._sessionId = sessionId;
            this.emit(SdlManagerNode.EVENT_SESSION_ID_CHANGE, sessionId);
        }
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
                let response = new RpcResponse(
                    {
                        parameters,
                        correlationID,
                    }
                );


                //TODO ID in all places instead of Id.
                //permissionItem:
                self.emit(SdlManagerNode.ON_RPC_RESPONSE, {response,messageID: messageId,parameters});

                let notifications = {
                    'OnHMIStatus': true,
                };

                if (notifications[method]) {
                    self.emit(method, response);
                }

            }



        });

        coreWs.on('close', () => {
            //TODO logging with winston or some other logger.
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
                resolve();
            });
        });

    }

    async _registerAppInterface() {
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

    async sendRPC(message,timeout) {
        try {
            let self = this;
            timeout = timeout || 60 * 5 * 1000;

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
                        self.removeListener(SdlManagerNode.ON_RPC_RESPONSE, onRPCResponse);
                        clearTimeout(timeoutHandler);
                        return resolve(response);
                    }

                };
                self.sendDataToTransport(pm.getData());

                self.on(SdlManagerNode.ON_RPC_RESPONSE , onRPCResponse);

                timeoutHandler = setTimeout(function() {
                    self.removeListener(SdlManagerNode.ON_RPC_RESPONSE, onRPCResponse);
                    return reject(`Timeout for request`);
                },timeout);

            });

        } catch (e) {
            //TODO handle
            throw e;
        }
    }


}

SdlManagerNode.CONNECTION_TYPE_WS = 'WS';

SdlManagerNode.ON_RPC_RESPONSE = 'OnRpcResponse';
SdlManagerNode.EVENT_SESSION_ID_CHANGE = 'sessionIdChange';

module.exports = SdlManagerNode;
