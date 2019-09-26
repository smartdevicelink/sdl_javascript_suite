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

class SdlProxyBase {

    /**
    * @constructor
    */
    constructor()
    {

    }
    // com/smartdevicelink/proxy/SdlProxyBase.java

    //sendRPCMessagePrivate
    //creates ProtocolMessage object.
    // ProtocolMessage pm = new ProtocolMessage();
    // pm.setData(msgBytes);
    // pm.setMessageType(MessageType.RPC);
    // pm.setSessionType(SessionType.RPC);
    // pm.setFunctionID(FunctionID.getFunctionId(message.getFunctionName()));
    // pm.setPayloadProtected(message.isPayloadProtected());

    //Queues the protocolmessage
    // _outgoingProxyMessageDispatcher.queueMessage(pm);
    //TODO is queue required?



//     protected void sendRPCMessagePrivate(RPCMessage message) throws SdlException {
//     try {
//     SdlTrace.logRPCEvent(InterfaceActivityDirection.Transmit, message, SDL_LIB_TRACE_KEY);
//
//     //FIXME this is temporary until the next major release of the library where OK is removed
//     if (message.getMessageType().equals(RPCMessage.KEY_REQUEST)) {
//     RPCRequest request = (RPCRequest) message;
//     if (FunctionID.SUBSCRIBE_BUTTON.toString().equals(request.getFunctionName())
// || FunctionID.UNSUBSCRIBE_BUTTON.toString().equals(request.getFunctionName())
// || FunctionID.BUTTON_PRESS.toString().equals(request.getFunctionName())) {
//
//     ButtonName buttonName = (ButtonName) request.getObject(ButtonName.class, SubscribeButton.KEY_BUTTON_NAME);
//
//
//     if (rpcSpecVersion != null) {
//     if (rpcSpecVersion.getMajor() < 5) {
//
//     if (ButtonName.PLAY_PAUSE.equals(buttonName)) {
//     request.setParameters(SubscribeButton.KEY_BUTTON_NAME, ButtonName.OK);
// }
// } else { //Newer than version 5.0.0
//     if (ButtonName.OK.equals(buttonName)) {
//         RPCRequest request2 = new RPCRequest(request);
//         request2.setParameters(SubscribeButton.KEY_BUTTON_NAME, ButtonName.PLAY_PAUSE);
//         request2.setOnRPCResponseListener(request.getOnRPCResponseListener());
//         sendRPCMessagePrivate(request2);
//         return;
//     }
// }
// }
//
// }
// }
//
// message.format(rpcSpecVersion,true);
// byte[] msgBytes = JsonRPCMarshaller.marshall(message, (byte)getProtocolVersion().getMajor());
//
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
//
//
// if (message.getMessageType().equals(RPCMessage.KEY_REQUEST)) {  // Request Specifics
//     pm.setRPCType((byte)0x00);
//     RPCRequest request = (RPCRequest) message;
//     if (request.getCorrelationID() == null) {
//         //Log error here
//         throw new SdlException("CorrelationID cannot be null. RPC: " + request.getFunctionName(), SdlExceptionCause.INVALID_ARGUMENT);
//     } else {
//         pm.setCorrID(request.getCorrelationID());
//     }
//     if (request.getFunctionName().equalsIgnoreCase(FunctionID.PUT_FILE.name())) {
//         pm.setPriorityCoefficient(1);
//     }
// } else if (message.getMessageType().equals(RPCMessage.KEY_RESPONSE)) {  // Response Specifics
//     pm.setRPCType((byte)0x01);
//     RPCResponse response = (RPCResponse) message;
//     if (response.getCorrelationID() == null) {
//         //Log error here
//         throw new SdlException("CorrelationID cannot be null. RPC: " + response.getFunctionName(), SdlExceptionCause.INVALID_ARGUMENT);
//     } else {
//         pm.setCorrID(response.getCorrelationID());
//     }
// } else if (message.getMessageType().equals(RPCMessage.KEY_NOTIFICATION)) { // Notification Specifics
//     pm.setRPCType((byte)0x02);
// } else {
//     //Log error here
//     throw new SdlException("RPC message is not a valid type", SdlExceptionCause.INVALID_ARGUMENT);
// }
//
// // Queue this outgoing message
// synchronized(OUTGOING_MESSAGE_QUEUE_THREAD_LOCK) {
//     if (_outgoingProxyMessageDispatcher != null) {
//         _outgoingProxyMessageDispatcher.queueMessage(pm);
//         //Since the message is queued we can add it's listener to our list, if it is a Request
//         if (message.getMessageType().equals(RPCMessage.KEY_REQUEST)) {
//             RPCRequest request = (RPCRequest) message;
//             OnRPCResponseListener listener = request.getOnRPCResponseListener();
//             addOnRPCResponseListener(listener, request.getCorrelationID(), msgBytes.length);
//         }
//     }
// }
// } catch (OutOfMemoryError e) {
//     SdlTrace.logProxyEvent("OutOfMemory exception while sending message " + message.getFunctionName(), SDL_LIB_TRACE_KEY);
//     throw new SdlException("OutOfMemory exception while sending message " + message.getFunctionName(), e, SdlExceptionCause.INVALID_ARGUMENT);
// }
// }



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

export { SdlProxyBase };
