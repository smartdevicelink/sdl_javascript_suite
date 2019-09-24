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

class SdlManagerNode extends EventEmitter {

    //transport may request a new session.
    //transport should know the sessionId
    //session -> transport.
    //session type, session config.
    //TODO expect an application.
    constructor(application) {
        super();
    }

    /**
     * Create a manager and start it.
     * @param connection
     * @param appConfig
     * @returns {Promise<SdlManagerNode>}
     */
    static async createWsManager(connection,appConfig)
    {
        let application = new Application(appConfig);
        let obj = new SdlManagerNode(application);
        obj.setWebSocketConnection(connection);

        await obj.start();
        return obj;
    }

    async sendDataToTransport(data) {
        if (this.connectionType === SdlManagerNode.CONNECTION_TYPE_WS) {
            //TODO handle as part of TransportBase?
            this.ws.send(data);
        }
        throw new Error(`Unhandled Connection Type ${this.connectionType}`);
    }

    /**
     * Creates and initializes manager for incoming websocket connection.
     * @param ws
     * @returns {Promise<void>}
     */
    setWebSocketConnection(wsConnection) {
        this.wsConnection = wsConnection;
        this._createWsConnectionHandles();
    }

    _createWsConnectionHandles()
    {

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


        return new Promise(async function(resolve) {
            self.once('sessionIdChange', async function() {
                await self._registerAppInterface();
                resolve();
            });

            await self._sendInitRequest(); //protocolVersion5.2.0 and wait for response.
        });

    }

    async _sendInitRequest()
    {
        let self = this;
        let connectionRequest = SdlPsm.INIT_REQUEST;
        //  protocolVersion5.2.0
        self.wsConnection.send(connectionRequest);

        return new Promise(function(resolve) {
            self.once('sessionIdChange', async function() {
                console.log(`New Session Id received`);
                // await self._registerAppInterface();
                resolve();
            });
        })

    }

    async _registerAppInterface()
    {

    }



    _initWsConnectionHandles() {

        this.wsConnection.on('message', function() {

        });

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
    async sendRPC(message) {
        try {
            //manager should know the sdlSession.

            //manager should have a reference to the websocket connection or a class that manages this properly.

            //manager should not use websocket directly.

            //TODO when is proxy meant to be used?
            // proxy.sendRPC(message);

            // ProtocolMessage pm = new ProtocolMessage();
            // pm.setData(msgBytes);
            // pm.setMessageType(MessageType.RPC);
            // pm.setSessionType(SessionType.RPC);
            // pm.setFunctionID(FunctionID.getFunctionId(message.getFunctionName()));
            // pm.setPayloadProtected(message.isPayloadProtected());

            // ProtocolMessage pm = new ProtocolMessage();
// pm.setData(msgBytes);
// pm.setMessageType(MessageType.RPC);
// pm.setSessionType(SessionType.RPC);
// pm.setFunctionID(FunctionID.getFunctionId(message.getFunctionName()));
// pm.setPayloadProtected(message.isPayloadProtected());
//
// if (sdlSession != null) {
//     pm.setSessionID(sdlSession.getSessionId());
// }
//
// if (message.getBulkData() != null) {
//     pm.setBulkData(message.getBulkData());
// }

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
