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

import { AppConfig } from './../js/src/manager/AppConfig.js';
import { LifecycleListener } from './../js/src/manager/lifecycle/LifecycleListener.js';
import { LifecycleManager } from './../js/src/manager/lifecycle/LifecycleManager.js';
import { BinaryFrameHeader } from './../js/src/protocol/BinaryFrameHeader.js';
import { MessageFrameAssembler } from './../js/src/protocol/MessageFrameAssembler.js';
import { MessageFrameDisassembler } from './../js/src/protocol/MessageFrameDisassembler.js';
import { SdlPacket } from './../js/src/protocol/SdlPacket.js';
import { SdlPacketFactory } from './../js/src/protocol/SdlPacketFactory.js';
import { SdlProtocol } from './../js/src/protocol/SdlProtocol.js';
import { SdlProtocolBase } from './../js/src/protocol/SdlProtocolBase.js';
import { SdlProtocolListener } from './../js/src/protocol/SdlProtocolListener.js';
import { ControlFrameTags } from './../js/src/protocol/enums/ControlFrameTags.js';
import { FrameType } from './../js/src/protocol/enums/FrameType.js';
import { ServiceType } from './../js/src/protocol/enums/ServiceType.js';
import { RpcCreator } from './../js/src/rpc/RpcCreator.js';
import { RpcListener } from './../js/src/rpc/RpcListener.js';
import { RpcMessage } from './../js/src/rpc/RpcMessage.js';
import { RpcNotification } from './../js/src/rpc/RpcNotification.js';
import { RpcRequest } from './../js/src/rpc/RpcRequest.js';
import { RpcResponse } from './../js/src/rpc/RpcResponse.js';
import { RpcStruct } from './../js/src/rpc/RpcStruct.js';
import { AppHMIType } from './../js/src/rpc/enums/AppHMIType.js';
import { AudioStreamingState } from './../js/src/rpc/enums/AudioStreamingState.js';
import { AudioType } from './../js/src/rpc/enums/AudioType.js';
import { BitsPerSample } from './../js/src/rpc/enums/BitsPerSample.js';
import { ButtonName } from './../js/src/rpc/enums/ButtonName.js';
import { CharacterSet } from './../js/src/rpc/enums/CharacterSet.js';
import { DisplayType } from './../js/src/rpc/enums/DisplayType.js';
import { FileType } from './../js/src/rpc/enums/FileType.js';
import { FunctionID } from './../js/src/rpc/enums/FunctionID.js';
import { HMILevel } from './../js/src/rpc/enums/HMILevel.js';
import { HmiZoneCapabilities } from './../js/src/rpc/enums/HmiZoneCapabilities.js';
import { ImageFieldName } from './../js/src/rpc/enums/ImageFieldName.js';
import { ImageType } from './../js/src/rpc/enums/ImageType.js';
import { Language } from './../js/src/rpc/enums/Language.js';
import { MediaClockFormat } from './../js/src/rpc/enums/MediaClockFormat.js';
import { MetadataType } from './../js/src/rpc/enums/MetadataType.js';
import { PrerecordedSpeech } from './../js/src/rpc/enums/PrerecordedSpeech.js';
import { Result } from './../js/src/rpc/enums/Result.js';
import { RpcType } from './../js/src/rpc/enums/RpcType.js';
import { SamplingRate } from './../js/src/rpc/enums/SamplingRate.js';
import { SoftButtonType } from './../js/src/rpc/enums/SoftButtonType.js';
import { SpeechCapabilities } from './../js/src/rpc/enums/SpeechCapabilities.js';
import { SystemAction } from './../js/src/rpc/enums/SystemAction.js';
import { SystemContext } from './../js/src/rpc/enums/SystemContext.js';
import { TextAlignment } from './../js/src/rpc/enums/TextAlignment.js';
import { TextFieldName } from './../js/src/rpc/enums/TextFieldName.js';
import { VideoStreamingCodec } from './../js/src/rpc/enums/VideoStreamingCodec.js';
import { VideoStreamingProtocol } from './../js/src/rpc/enums/VideoStreamingProtocol.js';
import { VideoStreamingState } from './../js/src/rpc/enums/VideoStreamingState.js';
import { VrCapabilities } from './../js/src/rpc/enums/VrCapabilities.js';
import { AddCommand } from './../js/src/rpc/messages/AddCommand.js';
import { AddCommandResponse } from './../js/src/rpc/messages/AddCommandResponse.js';
import { OnHmiStatus } from './../js/src/rpc/messages/OnHmiStatus.js';
import { OnLanguageChange } from './../js/src/rpc/messages/OnLanguageChange.js';
import { PutFile } from './../js/src/rpc/messages/PutFile.js';
import { PutFileResponse } from './../js/src/rpc/messages/PutFileResponse.js';
import { RegisterAppInterface } from './../js/src/rpc/messages/RegisterAppInterface.js';
import { RegisterAppInterfaceResponse } from './../js/src/rpc/messages/RegisterAppInterfaceResponse.js';
import { SetAppIcon } from './../js/src/rpc/messages/SetAppIcon.js';
import { SetAppIconResponse } from './../js/src/rpc/messages/SetAppIconResponse.js';
import { Show } from './../js/src/rpc/messages/Show.js';
import { ShowResponse } from './../js/src/rpc/messages/ShowResponse.js';
import { UnregisterAppInterface } from './../js/src/rpc/messages/UnregisterAppInterface.js';
import { AppInfo } from './../js/src/rpc/structs/AppInfo.js';
import { AudioPassThruCapabilities } from './../js/src/rpc/structs/AudioPassThruCapabilities.js';
import { ButtonCapabilities } from './../js/src/rpc/structs/ButtonCapabilities.js';
import { DeviceInfo } from './../js/src/rpc/structs/DeviceInfo.js';
import { DisplayCapabilities } from './../js/src/rpc/structs/DisplayCapabilities.js';
import { Grid } from './../js/src/rpc/structs/Grid.js';
import { HMICapabilities } from './../js/src/rpc/structs/HMICapabilities.js';
import { Image } from './../js/src/rpc/structs/Image.js';
import { ImageField } from './../js/src/rpc/structs/ImageField.js';
import { ImageResolution } from './../js/src/rpc/structs/ImageResolution.js';
import { MenuParams } from './../js/src/rpc/structs/MenuParams.js';
import { MetadataTags } from './../js/src/rpc/structs/MetadataTags.js';
import { ModuleInfo } from './../js/src/rpc/structs/ModuleInfo.js';
import { PresetBankCapabilities } from './../js/src/rpc/structs/PresetBankCapabilities.js';
import { RGBColor } from './../js/src/rpc/structs/RGBColor.js';
import { ScreenParams } from './../js/src/rpc/structs/ScreenParams.js';
import { SdlMsgVersion } from './../js/src/rpc/structs/SdlMsgVersion.js';
import { SoftButton } from './../js/src/rpc/structs/SoftButton.js';
import { SoftButtonCapabilities } from './../js/src/rpc/structs/SoftButtonCapabilities.js';
import { TTSChunk } from './../js/src/rpc/structs/TTSChunk.js';
import { TemplateColorScheme } from './../js/src/rpc/structs/TemplateColorScheme.js';
import { TextField } from './../js/src/rpc/structs/TextField.js';
import { TouchEventCapabilities } from './../js/src/rpc/structs/TouchEventCapabilities.js';
import { VehicleType } from './../js/src/rpc/structs/VehicleType.js';
import { VideoStreamingCapability } from './../js/src/rpc/structs/VideoStreamingCapability.js';
import { VideoStreamingFormat } from './../js/src/rpc/structs/VideoStreamingFormat.js';
import { SdlServiceListener } from './../js/src/session/SdlServiceListener.js';
import { SdlSession } from './../js/src/session/SdlSession.js';
import { SdlSessionListener } from './../js/src/session/SdlSessionListener.js';
import { ServiceListenerMap } from './../js/src/session/ServiceListenerMap.js';
import { VideoStreamingParameters } from './../js/src/streaming/video/VideoStreamingParameters.js';
import { CustomTransport } from './../js/src/transport/CustomTransport.js';
import { CustomTransportConfig } from './../js/src/transport/CustomTransportConfig.js';
import { SdlPsm } from './../js/src/transport/SdlPsm.js';
import { SslConfig } from './../js/src/transport/SslConfig.js';
import { TransportBase } from './../js/src/transport/TransportBase.js';
import { TransportCallback } from './../js/src/transport/TransportCallback.js';
import { TransportConfigBase } from './../js/src/transport/TransportConfigBase.js';
import { TransportListener } from './../js/src/transport/TransportListener.js';
import TransportManager from './src/transport/TransportManager.js';
import { TransportManagerBase } from './../js/src/transport/TransportManagerBase.js';
import { WebSocketClient } from './../js/src/transport/WebSocketClient.js';
import { WebSocketClientConfig } from './../js/src/transport/WebSocketClientConfig.js';
import { TransportType } from './../js/src/transport/enums/TransportType.js';
import { TransportRecord } from './../js/src/transport/util/TransportRecord.js';
import { ArrayTools } from './../js/src/util/ArrayTools.js';
import { BitConverter } from './../js/src/util/BitConverter.js';
import { Bson } from './../js/src/util/Bson.js';
import { Enum } from './../js/src/util/Enum.js';
import { JsonRpcMarshaller } from './../js/src/util/JsonRpcMarshaller.js';
import { TextEncoder } from './../js/src/util/TextEncoder.js';
import { Version } from './../js/src/util/Version.js';
import WebSocketServer from './src/transport/WebSocketServer.js';
import WebSocketServerConfig from './src/transport/WebSocketServerConfig.js';

const SDL = {
    manager: {
        AppConfig,
        lifecycle: {
            LifecycleListener,
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
        RpcCreator,
        RpcListener,
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
            VideoStreamingCodec,
            VideoStreamingProtocol,
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
            VehicleType,
            VideoStreamingCapability,
            VideoStreamingFormat
        }
    },
    session: {
        SdlServiceListener,
        SdlSession,
        SdlSessionListener,
        ServiceListenerMap
    },
    streaming: {
        video: {
            VideoStreamingParameters
        }
    },
    transport: {
        CustomTransport,
        CustomTransportConfig,
        SdlPsm,
        SslConfig,
        TransportBase,
        TransportCallback,
        TransportConfigBase,
        TransportListener,
        TransportManager,
        TransportManagerBase,
        WebSocketClient,
        WebSocketClientConfig,
        enums: {
            TransportType
        },
        util: {
            TransportRecord
        },
        WebSocketServer,
        WebSocketServerConfig
    },
    util: {
        ArrayTools,
        BitConverter,
        Bson,
        Enum,
        JsonRpcMarshaller,
        TextEncoder,
        Version
    }
};

export default SDL;