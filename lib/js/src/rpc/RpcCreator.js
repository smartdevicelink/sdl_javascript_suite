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

// messages
import { AddCommand } from './messages/AddCommand.js';
import { AddCommandResponse } from './messages/AddCommandResponse.js';
import { OnHmiStatus } from './messages/OnHmiStatus.js';
import { OnLanguageChange } from './messages/OnLanguageChange.js';
import { PutFile } from './messages/PutFile.js';
import { PutFileResponse } from './messages/PutFileResponse.js';
import { RegisterAppInterface } from './messages/RegisterAppInterface.js';
import { RegisterAppInterfaceResponse } from './messages/RegisterAppInterfaceResponse.js';
import { SetAppIcon } from './messages/SetAppIcon.js';
import { SetAppIconResponse } from './messages/SetAppIconResponse.js';
import { Show } from './messages/Show.js';
import { ShowResponse } from './messages/ShowResponse.js';
import { UnregisterAppInterface } from './messages/UnregisterAppInterface.js';

// other
import { RpcType } from './enums/RpcType.js';
import { FunctionID } from './enums/FunctionID.js';
import { JsonRpcMarshaller } from './../util/JsonRpcMarshaller.js';
import { BinaryFrameHeader } from './../protocol/BinaryFrameHeader.js';

class RpcCreator {

    /**
     * Converts an SdlPacket to an RpcMessage
     * @param {SdlPacket} sdlPacket
     * @return {RpcMessage}
     */
    static construct (sdlPacket) {
        const payload = sdlPacket.getPayload();
        const binaryFrameHeader = BinaryFrameHeader.fromBinaryHeader(payload);

        let message;
        const rpcType = binaryFrameHeader.getRpcType();
        const rpcName = RpcType.keyForValue(rpcType);
        const correlationId = binaryFrameHeader.getCorrelationId();
        const functionId = binaryFrameHeader.getFunctionId();
        const functionName = FunctionID.keyForValue(functionId);
        const bulkData = binaryFrameHeader.getBulkData();
        const jsonData = binaryFrameHeader.getJsonData();
        const params = {
            parameters: JsonRpcMarshaller.unmarshall(jsonData),
        };

        switch (functionId) {
            case FunctionID.AddCommand:
                if (rpcType === RpcType.REQUEST) 
                    message = new AddCommand(params);
                else if (rpcType === RpcType.RESPONSE) 
                    message = new AddCommandResponse(params);
                break;
            case FunctionID.OnHMIStatus: //TODO: should OnHMIStatus be OnHmiStatus, or the class name change to OnHMIStatus? or is this fine as is?
                if (rpcType === RpcType.NOTIFICATION) 
                    message = new OnHmiStatus(params);
                break;
            case FunctionID.OnLanguageChange:
                if (rpcType === RpcType.NOTIFICATION) 
                    message = new OnLanguageChange(params);
                break;
            case FunctionID.PutFile:
                if (rpcType === RpcType.REQUEST) 
                    message = new PutFile(params);
                else if (rpcType === RpcType.RESPONSE) 
                    message = new PutFileResponse(params);
                break;
            case FunctionID.RegisterAppInterface:
                if (rpcType === RpcType.REQUEST) 
                    message = new RegisterAppInterface(params);
                else if (rpcType === RpcType.RESPONSE) 
                    message = new RegisterAppInterfaceResponse(params);
                break;
            case FunctionID.SetAppIcon:
                if (rpcType === RpcType.REQUEST) 
                    message = new SetAppIcon(params);
                else if (rpcType === RpcType.RESPONSE) 
                    message = new SetAppIconResponse(params);
                break;
            case FunctionID.Show:
                if (rpcType === RpcType.REQUEST) 
                    message = new Show(params);
                else if (rpcType === RpcType.RESPONSE) 
                    message = new ShowResponse(params);
                break;
            case FunctionID.UnregisterAppInterface:
                if (rpcType === RpcType.REQUEST) 
                    message = new UnregisterAppInterface(params);
                // else if (rpcType === RpcType.RESPONSE) TODO: make UnregisterAppInterfaceResponse
                break;
            default:
                message = null;
        }

        if (message === null || message === undefined) { // informs of missing classes
            console.warn(`RpcCreator couldn't construct an RPC for the ${functionName} ${rpcName}`);
            return null;
        }

        if (rpcType === RpcType.REQUEST || rpcType === RpcType.RESPONSE) {
            message.setCorrelationID(correlationId);
        }
        if (bulkData) {
            message.setBulkData(bulkData);
        }

        return message;
    }
}

export { RpcCreator };
