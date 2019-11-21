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

import { LifecycleManager } from './src/manager/lifecycle/LifecycleManager.js';
import { BinaryFrameHeader } from './src/protocol/BinaryFrameHeader.js';
import { MessageFrameAssembler } from './src/protocol/MessageFrameAssembler.js';
import { SdlPacket } from './src/protocol/SdlPacket.js';
import { SdlProtocolBase } from './src/protocol/SdlProtocolBase.js';
import { SdlProtocolListener } from './src/protocol/SdlProtocolListener.js';
import { ControlFrameTags } from './src/protocol/enums/ControlFrameTags.js';
import { FrameType } from './src/protocol/enums/FrameType.js';
import { ServiceType } from './src/protocol/enums/ServiceType.js';
import { RpcMessage } from './src/rpc/RpcMessage.js';
import { RpcNotification } from './src/rpc/RpcNotification.js';
import { RpcRequest } from './src/rpc/RpcRequest.js';
import { RpcResponse } from './src/rpc/RpcResponse.js';
import { RpcStruct } from './src/rpc/RpcStruct.js';
import { FunctionID } from './src/rpc/enums/FunctionID.js';
import { ImageType } from './src/rpc/enums/ImageType.js';
import { Language } from './src/rpc/enums/Language.js';
import { Result } from './src/rpc/enums/Result.js';
import { RpcType } from './src/rpc/enums/RpcType.js';
import { AddCommand } from './src/rpc/messages/AddCommand.js';
import { AddCommandResponse } from './src/rpc/messages/AddCommandResponse.js';
import { OnLanguageChange } from './src/rpc/messages/OnLanguageChange.js';
import { Image } from './src/rpc/structs/Image.js';
import { MenuParams } from './src/rpc/structs/MenuParams.js';
import { SdlSession } from './src/session/SdlSession.js';
import { SdlSessionListener } from './src/session/SdlSessionListener.js';
import { SdlPsm } from './src/transport/SdlPsm.js';
import { SslConfig } from './src/transport/SslConfig.js';
import { TransportBase } from './src/transport/TransportBase.js';
import { TransportConfigBase } from './src/transport/TransportConfigBase.js';
import { TransportListener } from './src/transport/TransportListener.js';
import { TransportManagerBase } from './src/transport/TransportManagerBase.js';
import { TransportType } from './src/transport/enums/TransportType.js';
import { BitConverter } from './src/util/BitConverter.js';
import { Bson } from './src/util/Bson.js';
import { Enum } from './src/util/Enum.js';
import { JsonRpcMarshaller } from './src/util/JsonRpcMarshaller.js';
import { Version } from './src/util/Version.js';
import { bson.common } from './src/util/third_party/bson.common.js';

const SDL = {
    manager: {
        lifecycle: {
            LifecycleManager
        }
    },
    protocol: {
        BinaryFrameHeader,
        MessageFrameAssembler,
        SdlPacket,
        SdlProtocolBase,
        SdlProtocolListener,
        enums: {
            ControlFrameTags,
            FrameType,
            ServiceType
        }
    },
    rpc: {
        RpcMessage,
        RpcNotification,
        RpcRequest,
        RpcResponse,
        RpcStruct,
        enums: {
            FunctionID,
            ImageType,
            Language,
            Result,
            RpcType
        },
        messages: {
            AddCommand,
            AddCommandResponse,
            OnLanguageChange
        },
        structs: {
            Image,
            MenuParams
        }
    },
    session: {
        SdlSession,
        SdlSessionListener
    },
    transport: {
        SdlPsm,
        SslConfig,
        TransportBase,
        TransportConfigBase,
        TransportListener,
        TransportManagerBase,
        enums: {
            TransportType
        }
    },
    util: {
        BitConverter,
        Bson,
        Enum,
        JsonRpcMarshaller,
        Version,
        third_party: {
            bson.common
        }
    }
}

export default SDL;