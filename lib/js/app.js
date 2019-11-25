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
import { MessageFrameDisassembler } from './src/protocol/MessageFrameDisassembler.js';
import { SdlPacket } from './src/protocol/SdlPacket.js';
import { SdlPacketFactory } from './src/protocol/SdlPacketFactory.js';
import { SdlProtocol } from './src/protocol/SdlProtocol.js';
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
import { AppHMIType } from './src/rpc/enums/AppHMIType.js';
import { AudioStreamingState } from './src/rpc/enums/AudioStreamingState.js';
import { AudioType } from './src/rpc/enums/AudioType.js';
import { BitsPerSample } from './src/rpc/enums/BitsPerSample.js';
import { ButtonName } from './src/rpc/enums/ButtonName.js';
import { CharacterSet } from './src/rpc/enums/CharacterSet.js';
import { DisplayType } from './src/rpc/enums/DisplayType.js';
import { FileType } from './src/rpc/enums/FileType.js';
import { FunctionID } from './src/rpc/enums/FunctionID.js';
import { HMILevel } from './src/rpc/enums/HMILevel.js';
import { HmiZoneCapabilities } from './src/rpc/enums/HmiZoneCapabilities.js';
import { ImageFieldName } from './src/rpc/enums/ImageFieldName.js';
import { ImageType } from './src/rpc/enums/ImageType.js';
import { Language } from './src/rpc/enums/Language.js';
import { MediaClockFormat } from './src/rpc/enums/MediaClockFormat.js';
import { MetadataType } from './src/rpc/enums/MetadataType.js';
import { PrerecordedSpeech } from './src/rpc/enums/PrerecordedSpeech.js';
import { Result } from './src/rpc/enums/Result.js';
import { RpcType } from './src/rpc/enums/RpcType.js';
import { SamplingRate } from './src/rpc/enums/SamplingRate.js';
import { SoftButtonType } from './src/rpc/enums/SoftButtonType.js';
import { SpeechCapabilities } from './src/rpc/enums/SpeechCapabilities.js';
import { SystemAction } from './src/rpc/enums/SystemAction.js';
import { SystemContext } from './src/rpc/enums/SystemContext.js';
import { TextAlignment } from './src/rpc/enums/TextAlignment.js';
import { TextFieldName } from './src/rpc/enums/TextFieldName.js';
import { VideoStreamingState } from './src/rpc/enums/VideoStreamingState.js';
import { VrCapabilities } from './src/rpc/enums/VrCapabilities.js';
import { AddCommand } from './src/rpc/messages/AddCommand.js';
import { AddCommandResponse } from './src/rpc/messages/AddCommandResponse.js';
import { OnHmiStatus } from './src/rpc/messages/OnHmiStatus.js';
import { OnLanguageChange } from './src/rpc/messages/OnLanguageChange.js';
import { PutFile } from './src/rpc/messages/PutFile.js';
import { PutFileResponse } from './src/rpc/messages/PutFileResponse.js';
import { RegisterAppInterface } from './src/rpc/messages/RegisterAppInterface.js';
import { RegisterAppInterfaceResponse } from './src/rpc/messages/RegisterAppInterfaceResponse.js';
import { SetAppIcon } from './src/rpc/messages/SetAppIcon.js';
import { SetAppIconResponse } from './src/rpc/messages/SetAppIconResponse.js';
import { Show } from './src/rpc/messages/Show.js';
import { ShowResponse } from './src/rpc/messages/ShowResponse.js';
import { UnregisterAppInterface } from './src/rpc/messages/UnregisterAppInterface.js';
import { AppInfo } from './src/rpc/structs/AppInfo.js';
import { AudioPassThruCapabilities } from './src/rpc/structs/AudioPassThruCapabilities.js';
import { ButtonCapabilities } from './src/rpc/structs/ButtonCapabilities.js';
import { DeviceInfo } from './src/rpc/structs/DeviceInfo.js';
import { DisplayCapabilities } from './src/rpc/structs/DisplayCapabilities.js';
import { Grid } from './src/rpc/structs/Grid.js';
import { HMICapabilities } from './src/rpc/structs/HMICapabilities.js';
import { Image } from './src/rpc/structs/Image.js';
import { ImageField } from './src/rpc/structs/ImageField.js';
import { ImageResolution } from './src/rpc/structs/ImageResolution.js';
import { MenuParams } from './src/rpc/structs/MenuParams.js';
import { MetadataTags } from './src/rpc/structs/MetadataTags.js';
import { ModuleInfo } from './src/rpc/structs/ModuleInfo.js';
import { PresetBankCapabilities } from './src/rpc/structs/PresetBankCapabilities.js';
import { RGBColor } from './src/rpc/structs/RGBColor.js';
import { ScreenParams } from './src/rpc/structs/ScreenParams.js';
import { SdlMsgVersion } from './src/rpc/structs/SdlMsgVersion.js';
import { SoftButton } from './src/rpc/structs/SoftButton.js';
import { SoftButtonCapabilities } from './src/rpc/structs/SoftButtonCapabilities.js';
import { TTSChunk } from './src/rpc/structs/TTSChunk.js';
import { TemplateColorScheme } from './src/rpc/structs/TemplateColorScheme.js';
import { TextField } from './src/rpc/structs/TextField.js';
import { TouchEventCapabilities } from './src/rpc/structs/TouchEventCapabilities.js';
import { VehicleType } from './src/rpc/structs/VehicleType.js';
import { SdlServiceListener } from './src/session/SdlServiceListener.js';
import { SdlSession } from './src/session/SdlSession.js';
import { SdlSessionListener } from './src/session/SdlSessionListener.js';
import { ServiceListenerMap } from './src/session/ServiceListenerMap.js';
import { WsClientSession } from './src/session/WsClientSession.js';
import { SdlPsm } from './src/transport/SdlPsm.js';
import { SslConfig } from './src/transport/SslConfig.js';
import { TransportBase } from './src/transport/TransportBase.js';
import { TransportConfigBase } from './src/transport/TransportConfigBase.js';
import { TransportListener } from './src/transport/TransportListener.js';
import { TransportManagerBase } from './src/transport/TransportManagerBase.js';
import { WebsocketClientTransportManager } from './src/transport/WebsocketClientTransportManager.js';
import { WebsocketTransportConfig } from './src/transport/WebsocketTransportConfig.js';
import { TransportType } from './src/transport/enums/TransportType.js';
import { BitConverter } from './src/util/BitConverter.js';
import { Bson } from './src/util/Bson.js';
import { Enum } from './src/util/Enum.js';
import { JsonRpcMarshaller } from './src/util/JsonRpcMarshaller.js';
import { TextEncoder } from './src/util/TextEncoder.js';
import { Version } from './src/util/Version.js';

const SDL = {
    manager: {
        lifecycle: {
            LifecycleManager
        }
    },
    protocol: {
        BinaryFrameHeader,
        MessageFrameAssembler,
        MessageFrameDisassembler,
        SdlPacket,
        SdlPacketFactory,
        SdlProtocol,
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
            AppHMIType,
            AudioStreamingState,
            AudioType,
            BitsPerSample,
            ButtonName,
            CharacterSet,
            DisplayType,
            FileType,
            FunctionID,
            HMILevel,
            HmiZoneCapabilities,
            ImageFieldName,
            ImageType,
            Language,
            MediaClockFormat,
            MetadataType,
            PrerecordedSpeech,
            Result,
            RpcType,
            SamplingRate,
            SoftButtonType,
            SpeechCapabilities,
            SystemAction,
            SystemContext,
            TextAlignment,
            TextFieldName,
            VideoStreamingState,
            VrCapabilities
        },
        messages: {
            AddCommand,
            AddCommandResponse,
            OnHmiStatus,
            OnLanguageChange,
            PutFile,
            PutFileResponse,
            RegisterAppInterface,
            RegisterAppInterfaceResponse,
            SetAppIcon,
            SetAppIconResponse,
            Show,
            ShowResponse,
            UnregisterAppInterface
        },
        structs: {
            AppInfo,
            AudioPassThruCapabilities,
            ButtonCapabilities,
            DeviceInfo,
            DisplayCapabilities,
            Grid,
            HMICapabilities,
            Image,
            ImageField,
            ImageResolution,
            MenuParams,
            MetadataTags,
            ModuleInfo,
            PresetBankCapabilities,
            RGBColor,
            ScreenParams,
            SdlMsgVersion,
            SoftButton,
            SoftButtonCapabilities,
            TTSChunk,
            TemplateColorScheme,
            TextField,
            TouchEventCapabilities,
            VehicleType
        }
    },
    session: {
        SdlServiceListener,
        SdlSession,
        SdlSessionListener,
        ServiceListenerMap,
        WsClientSession
    },
    transport: {
        SdlPsm,
        SslConfig,
        TransportBase,
        TransportConfigBase,
        TransportListener,
        TransportManagerBase,
        WebsocketClientTransportManager,
        WebsocketTransportConfig,
        enums: {
            TransportType
        }
    },
    util: {
        BitConverter,
        Bson,
        Enum,
        JsonRpcMarshaller,
        TextEncoder,
        Version
    }
}

export default SDL;