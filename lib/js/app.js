/*
* Copyright (c) 2020, Livio, Inc.
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

import { AppConfig as manager_AppConfig_js} from './src/manager/AppConfig.js';
import { SdlManager as manager_SdlManager_js} from './src/manager/SdlManager.js';
import { SdlManagerBase as manager_SdlManagerBase_js} from './src/manager/SdlManagerBase.js';
import { SdlManagerListener as manager_SdlManagerListener_js} from './src/manager/SdlManagerListener.js';
import { SubManagerBase as manager_SubManagerBase_js} from './src/manager/SubManagerBase.js';
import { SystemCapabilityManager as manager_SystemCapabilityManager_js} from './src/manager/SystemCapabilityManager.js';
import { FileManager as manager_file_FileManager_js} from './src/manager/file/FileManager.js';
import { FileManagerBase as manager_file_FileManagerBase_js} from './src/manager/file/FileManagerBase.js';
import { SdlArtwork as manager_file_filetypes_SdlArtwork_js} from './src/manager/file/filetypes/SdlArtwork.js';
import { SdlFile as manager_file_filetypes_SdlFile_js} from './src/manager/file/filetypes/SdlFile.js';
import { LifecycleListener as manager_lifecycle_LifecycleListener_js} from './src/manager/lifecycle/LifecycleListener.js';
import { LifecycleManager as manager_lifecycle_LifecycleManager_js} from './src/manager/lifecycle/LifecycleManager.js';
import { PermissionElement as manager_permission_PermissionElement_js} from './src/manager/permission/PermissionElement.js';
import { PermissionFilter as manager_permission_PermissionFilter_js} from './src/manager/permission/PermissionFilter.js';
import { PermissionManager as manager_permission_PermissionManager_js} from './src/manager/permission/PermissionManager.js';
import { PermissionManagerBase as manager_permission_PermissionManagerBase_js} from './src/manager/permission/PermissionManagerBase.js';
import { PermissionStatus as manager_permission_PermissionStatus_js} from './src/manager/permission/PermissionStatus.js';
import { PermissionGroupStatus as manager_permission_enums_PermissionGroupStatus_js} from './src/manager/permission/enums/PermissionGroupStatus.js';
import { PermissionGroupType as manager_permission_enums_PermissionGroupType_js} from './src/manager/permission/enums/PermissionGroupType.js';
import { ChoiceSetManager as manager_screen_ChoiceSetManager_js} from './src/manager/screen/ChoiceSetManager.js';
import { ChoiceSetManagerBase as manager_screen_ChoiceSetManagerBase_js} from './src/manager/screen/ChoiceSetManagerBase.js';
import { MenuManager as manager_screen_MenuManager_js} from './src/manager/screen/MenuManager.js';
import { MenuManagerBase as manager_screen_MenuManagerBase_js} from './src/manager/screen/MenuManagerBase.js';
import { ScreenManager as manager_screen_ScreenManager_js} from './src/manager/screen/ScreenManager.js';
import { ScreenManagerBase as manager_screen_ScreenManagerBase_js} from './src/manager/screen/ScreenManagerBase.js';
import { SoftButtonManager as manager_screen_SoftButtonManager_js} from './src/manager/screen/SoftButtonManager.js';
import { SoftButtonManagerBase as manager_screen_SoftButtonManagerBase_js} from './src/manager/screen/SoftButtonManagerBase.js';
import { TextAndGraphicManager as manager_screen_TextAndGraphicManager_js} from './src/manager/screen/TextAndGraphicManager.js';
import { TextAndGraphicManagerBase as manager_screen_TextAndGraphicManagerBase_js} from './src/manager/screen/TextAndGraphicManagerBase.js';
import { VoiceCommandManager as manager_screen_VoiceCommandManager_js} from './src/manager/screen/VoiceCommandManager.js';
import { VoiceCommandManagerBase as manager_screen_VoiceCommandManagerBase_js} from './src/manager/screen/VoiceCommandManagerBase.js';
import { SoftButtonObject as manager_screen_utils_SoftButtonObject_js} from './src/manager/screen/utils/SoftButtonObject.js';
import { SoftButtonState as manager_screen_utils_SoftButtonState_js} from './src/manager/screen/utils/SoftButtonState.js';
import { VoiceCommand as manager_screen_utils_VoiceCommand_js} from './src/manager/screen/utils/VoiceCommand.js';
import { BinaryFrameHeader as protocol_BinaryFrameHeader_js} from './src/protocol/BinaryFrameHeader.js';
import { MessageFrameAssembler as protocol_MessageFrameAssembler_js} from './src/protocol/MessageFrameAssembler.js';
import { MessageFrameDisassembler as protocol_MessageFrameDisassembler_js} from './src/protocol/MessageFrameDisassembler.js';
import { SdlPacket as protocol_SdlPacket_js} from './src/protocol/SdlPacket.js';
import { SdlPacketFactory as protocol_SdlPacketFactory_js} from './src/protocol/SdlPacketFactory.js';
import { SdlProtocol as protocol_SdlProtocol_js} from './src/protocol/SdlProtocol.js';
import { SdlProtocolBase as protocol_SdlProtocolBase_js} from './src/protocol/SdlProtocolBase.js';
import { SdlProtocolListener as protocol_SdlProtocolListener_js} from './src/protocol/SdlProtocolListener.js';
import { ControlFrameTags as protocol_enums_ControlFrameTags_js} from './src/protocol/enums/ControlFrameTags.js';
import { FrameType as protocol_enums_FrameType_js} from './src/protocol/enums/FrameType.js';
import { ServiceType as protocol_enums_ServiceType_js} from './src/protocol/enums/ServiceType.js';
import { RpcCreator as rpc_RpcCreator_js} from './src/rpc/RpcCreator.js';
import { RpcMessage as rpc_RpcMessage_js} from './src/rpc/RpcMessage.js';
import { RpcNotification as rpc_RpcNotification_js} from './src/rpc/RpcNotification.js';
import { RpcRequest as rpc_RpcRequest_js} from './src/rpc/RpcRequest.js';
import { RpcResponse as rpc_RpcResponse_js} from './src/rpc/RpcResponse.js';
import { RpcStruct as rpc_RpcStruct_js} from './src/rpc/RpcStruct.js';
import { AmbientLightStatus as rpc_enums_AmbientLightStatus_js} from './src/rpc/enums/AmbientLightStatus.js';
import { AppHMIType as rpc_enums_AppHMIType_js} from './src/rpc/enums/AppHMIType.js';
import { AppInterfaceUnregisteredReason as rpc_enums_AppInterfaceUnregisteredReason_js} from './src/rpc/enums/AppInterfaceUnregisteredReason.js';
import { AppServiceType as rpc_enums_AppServiceType_js} from './src/rpc/enums/AppServiceType.js';
import { AudioStreamingIndicator as rpc_enums_AudioStreamingIndicator_js} from './src/rpc/enums/AudioStreamingIndicator.js';
import { AudioStreamingState as rpc_enums_AudioStreamingState_js} from './src/rpc/enums/AudioStreamingState.js';
import { AudioType as rpc_enums_AudioType_js} from './src/rpc/enums/AudioType.js';
import { BitsPerSample as rpc_enums_BitsPerSample_js} from './src/rpc/enums/BitsPerSample.js';
import { ButtonEventMode as rpc_enums_ButtonEventMode_js} from './src/rpc/enums/ButtonEventMode.js';
import { ButtonName as rpc_enums_ButtonName_js} from './src/rpc/enums/ButtonName.js';
import { ButtonPressMode as rpc_enums_ButtonPressMode_js} from './src/rpc/enums/ButtonPressMode.js';
import { CarModeStatus as rpc_enums_CarModeStatus_js} from './src/rpc/enums/CarModeStatus.js';
import { CharacterSet as rpc_enums_CharacterSet_js} from './src/rpc/enums/CharacterSet.js';
import { CompassDirection as rpc_enums_CompassDirection_js} from './src/rpc/enums/CompassDirection.js';
import { ComponentVolumeStatus as rpc_enums_ComponentVolumeStatus_js} from './src/rpc/enums/ComponentVolumeStatus.js';
import { DefrostZone as rpc_enums_DefrostZone_js} from './src/rpc/enums/DefrostZone.js';
import { DeliveryMode as rpc_enums_DeliveryMode_js} from './src/rpc/enums/DeliveryMode.js';
import { DeviceLevelStatus as rpc_enums_DeviceLevelStatus_js} from './src/rpc/enums/DeviceLevelStatus.js';
import { Dimension as rpc_enums_Dimension_js} from './src/rpc/enums/Dimension.js';
import { Direction as rpc_enums_Direction_js} from './src/rpc/enums/Direction.js';
import { DisplayMode as rpc_enums_DisplayMode_js} from './src/rpc/enums/DisplayMode.js';
import { DisplayType as rpc_enums_DisplayType_js} from './src/rpc/enums/DisplayType.js';
import { DistanceUnit as rpc_enums_DistanceUnit_js} from './src/rpc/enums/DistanceUnit.js';
import { DriverDistractionState as rpc_enums_DriverDistractionState_js} from './src/rpc/enums/DriverDistractionState.js';
import { ECallConfirmationStatus as rpc_enums_ECallConfirmationStatus_js} from './src/rpc/enums/ECallConfirmationStatus.js';
import { ElectronicParkBrakeStatus as rpc_enums_ElectronicParkBrakeStatus_js} from './src/rpc/enums/ElectronicParkBrakeStatus.js';
import { EmergencyEventType as rpc_enums_EmergencyEventType_js} from './src/rpc/enums/EmergencyEventType.js';
import { FileType as rpc_enums_FileType_js} from './src/rpc/enums/FileType.js';
import { FuelCutoffStatus as rpc_enums_FuelCutoffStatus_js} from './src/rpc/enums/FuelCutoffStatus.js';
import { FuelType as rpc_enums_FuelType_js} from './src/rpc/enums/FuelType.js';
import { FunctionID as rpc_enums_FunctionID_js} from './src/rpc/enums/FunctionID.js';
import { GlobalProperty as rpc_enums_GlobalProperty_js} from './src/rpc/enums/GlobalProperty.js';
import { HMILevel as rpc_enums_HMILevel_js} from './src/rpc/enums/HMILevel.js';
import { HmiZoneCapabilities as rpc_enums_HmiZoneCapabilities_js} from './src/rpc/enums/HmiZoneCapabilities.js';
import { HybridAppPreference as rpc_enums_HybridAppPreference_js} from './src/rpc/enums/HybridAppPreference.js';
import { IgnitionStableStatus as rpc_enums_IgnitionStableStatus_js} from './src/rpc/enums/IgnitionStableStatus.js';
import { IgnitionStatus as rpc_enums_IgnitionStatus_js} from './src/rpc/enums/IgnitionStatus.js';
import { ImageFieldName as rpc_enums_ImageFieldName_js} from './src/rpc/enums/ImageFieldName.js';
import { ImageType as rpc_enums_ImageType_js} from './src/rpc/enums/ImageType.js';
import { InteractionMode as rpc_enums_InteractionMode_js} from './src/rpc/enums/InteractionMode.js';
import { KeyboardEvent as rpc_enums_KeyboardEvent_js} from './src/rpc/enums/KeyboardEvent.js';
import { KeyboardLayout as rpc_enums_KeyboardLayout_js} from './src/rpc/enums/KeyboardLayout.js';
import { KeypressMode as rpc_enums_KeypressMode_js} from './src/rpc/enums/KeypressMode.js';
import { Language as rpc_enums_Language_js} from './src/rpc/enums/Language.js';
import { LayoutMode as rpc_enums_LayoutMode_js} from './src/rpc/enums/LayoutMode.js';
import { LightName as rpc_enums_LightName_js} from './src/rpc/enums/LightName.js';
import { LightStatus as rpc_enums_LightStatus_js} from './src/rpc/enums/LightStatus.js';
import { MaintenanceModeStatus as rpc_enums_MaintenanceModeStatus_js} from './src/rpc/enums/MaintenanceModeStatus.js';
import { MassageCushion as rpc_enums_MassageCushion_js} from './src/rpc/enums/MassageCushion.js';
import { MassageMode as rpc_enums_MassageMode_js} from './src/rpc/enums/MassageMode.js';
import { MassageZone as rpc_enums_MassageZone_js} from './src/rpc/enums/MassageZone.js';
import { MediaClockFormat as rpc_enums_MediaClockFormat_js} from './src/rpc/enums/MediaClockFormat.js';
import { MediaType as rpc_enums_MediaType_js} from './src/rpc/enums/MediaType.js';
import { MenuLayout as rpc_enums_MenuLayout_js} from './src/rpc/enums/MenuLayout.js';
import { MetadataType as rpc_enums_MetadataType_js} from './src/rpc/enums/MetadataType.js';
import { ModuleType as rpc_enums_ModuleType_js} from './src/rpc/enums/ModuleType.js';
import { NavigationAction as rpc_enums_NavigationAction_js} from './src/rpc/enums/NavigationAction.js';
import { NavigationJunction as rpc_enums_NavigationJunction_js} from './src/rpc/enums/NavigationJunction.js';
import { PRNDL as rpc_enums_PRNDL_js} from './src/rpc/enums/PRNDL.js';
import { PermissionStatus as rpc_enums_PermissionStatus_js} from './src/rpc/enums/PermissionStatus.js';
import { PowerModeQualificationStatus as rpc_enums_PowerModeQualificationStatus_js} from './src/rpc/enums/PowerModeQualificationStatus.js';
import { PowerModeStatus as rpc_enums_PowerModeStatus_js} from './src/rpc/enums/PowerModeStatus.js';
import { PredefinedLayout as rpc_enums_PredefinedLayout_js} from './src/rpc/enums/PredefinedLayout.js';
import { PredefinedWindows as rpc_enums_PredefinedWindows_js} from './src/rpc/enums/PredefinedWindows.js';
import { PrerecordedSpeech as rpc_enums_PrerecordedSpeech_js} from './src/rpc/enums/PrerecordedSpeech.js';
import { PrimaryAudioSource as rpc_enums_PrimaryAudioSource_js} from './src/rpc/enums/PrimaryAudioSource.js';
import { RadioBand as rpc_enums_RadioBand_js} from './src/rpc/enums/RadioBand.js';
import { RadioState as rpc_enums_RadioState_js} from './src/rpc/enums/RadioState.js';
import { RequestType as rpc_enums_RequestType_js} from './src/rpc/enums/RequestType.js';
import { Result as rpc_enums_Result_js} from './src/rpc/enums/Result.js';
import { RpcType as rpc_enums_RpcType_js} from './src/rpc/enums/RpcType.js';
import { SamplingRate as rpc_enums_SamplingRate_js} from './src/rpc/enums/SamplingRate.js';
import { SeatMemoryActionType as rpc_enums_SeatMemoryActionType_js} from './src/rpc/enums/SeatMemoryActionType.js';
import { ServiceUpdateReason as rpc_enums_ServiceUpdateReason_js} from './src/rpc/enums/ServiceUpdateReason.js';
import { SoftButtonType as rpc_enums_SoftButtonType_js} from './src/rpc/enums/SoftButtonType.js';
import { SpeechCapabilities as rpc_enums_SpeechCapabilities_js} from './src/rpc/enums/SpeechCapabilities.js';
import { SupportedSeat as rpc_enums_SupportedSeat_js} from './src/rpc/enums/SupportedSeat.js';
import { SystemAction as rpc_enums_SystemAction_js} from './src/rpc/enums/SystemAction.js';
import { SystemCapabilityType as rpc_enums_SystemCapabilityType_js} from './src/rpc/enums/SystemCapabilityType.js';
import { SystemContext as rpc_enums_SystemContext_js} from './src/rpc/enums/SystemContext.js';
import { TBTState as rpc_enums_TBTState_js} from './src/rpc/enums/TBTState.js';
import { TPMS as rpc_enums_TPMS_js} from './src/rpc/enums/TPMS.js';
import { TemperatureUnit as rpc_enums_TemperatureUnit_js} from './src/rpc/enums/TemperatureUnit.js';
import { TextAlignment as rpc_enums_TextAlignment_js} from './src/rpc/enums/TextAlignment.js';
import { TextFieldName as rpc_enums_TextFieldName_js} from './src/rpc/enums/TextFieldName.js';
import { TimerMode as rpc_enums_TimerMode_js} from './src/rpc/enums/TimerMode.js';
import { TouchType as rpc_enums_TouchType_js} from './src/rpc/enums/TouchType.js';
import { TriggerSource as rpc_enums_TriggerSource_js} from './src/rpc/enums/TriggerSource.js';
import { TurnSignal as rpc_enums_TurnSignal_js} from './src/rpc/enums/TurnSignal.js';
import { UpdateMode as rpc_enums_UpdateMode_js} from './src/rpc/enums/UpdateMode.js';
import { VehicleDataActiveStatus as rpc_enums_VehicleDataActiveStatus_js} from './src/rpc/enums/VehicleDataActiveStatus.js';
import { VehicleDataEventStatus as rpc_enums_VehicleDataEventStatus_js} from './src/rpc/enums/VehicleDataEventStatus.js';
import { VehicleDataNotificationStatus as rpc_enums_VehicleDataNotificationStatus_js} from './src/rpc/enums/VehicleDataNotificationStatus.js';
import { VehicleDataResultCode as rpc_enums_VehicleDataResultCode_js} from './src/rpc/enums/VehicleDataResultCode.js';
import { VehicleDataStatus as rpc_enums_VehicleDataStatus_js} from './src/rpc/enums/VehicleDataStatus.js';
import { VehicleDataType as rpc_enums_VehicleDataType_js} from './src/rpc/enums/VehicleDataType.js';
import { VentilationMode as rpc_enums_VentilationMode_js} from './src/rpc/enums/VentilationMode.js';
import { VideoStreamingCodec as rpc_enums_VideoStreamingCodec_js} from './src/rpc/enums/VideoStreamingCodec.js';
import { VideoStreamingProtocol as rpc_enums_VideoStreamingProtocol_js} from './src/rpc/enums/VideoStreamingProtocol.js';
import { VideoStreamingState as rpc_enums_VideoStreamingState_js} from './src/rpc/enums/VideoStreamingState.js';
import { VrCapabilities as rpc_enums_VrCapabilities_js} from './src/rpc/enums/VrCapabilities.js';
import { WarningLightStatus as rpc_enums_WarningLightStatus_js} from './src/rpc/enums/WarningLightStatus.js';
import { WayPointType as rpc_enums_WayPointType_js} from './src/rpc/enums/WayPointType.js';
import { WindowType as rpc_enums_WindowType_js} from './src/rpc/enums/WindowType.js';
import { WiperStatus as rpc_enums_WiperStatus_js} from './src/rpc/enums/WiperStatus.js';
import { MessageType as rpc_enums_MessageType_js} from './src/rpc/enums/MessageType.js';
import { AddCommand as rpc_messages_AddCommand_js} from './src/rpc/messages/AddCommand.js';
import { AddCommandResponse as rpc_messages_AddCommandResponse_js} from './src/rpc/messages/AddCommandResponse.js';
import { AddSubMenu as rpc_messages_AddSubMenu_js} from './src/rpc/messages/AddSubMenu.js';
import { AddSubMenuResponse as rpc_messages_AddSubMenuResponse_js} from './src/rpc/messages/AddSubMenuResponse.js';
import { Alert as rpc_messages_Alert_js} from './src/rpc/messages/Alert.js';
import { AlertManeuver as rpc_messages_AlertManeuver_js} from './src/rpc/messages/AlertManeuver.js';
import { AlertManeuverResponse as rpc_messages_AlertManeuverResponse_js} from './src/rpc/messages/AlertManeuverResponse.js';
import { AlertResponse as rpc_messages_AlertResponse_js} from './src/rpc/messages/AlertResponse.js';
import { ButtonPress as rpc_messages_ButtonPress_js} from './src/rpc/messages/ButtonPress.js';
import { ButtonPressResponse as rpc_messages_ButtonPressResponse_js} from './src/rpc/messages/ButtonPressResponse.js';
import { CancelInteraction as rpc_messages_CancelInteraction_js} from './src/rpc/messages/CancelInteraction.js';
import { CancelInteractionResponse as rpc_messages_CancelInteractionResponse_js} from './src/rpc/messages/CancelInteractionResponse.js';
import { ChangeRegistration as rpc_messages_ChangeRegistration_js} from './src/rpc/messages/ChangeRegistration.js';
import { ChangeRegistrationResponse as rpc_messages_ChangeRegistrationResponse_js} from './src/rpc/messages/ChangeRegistrationResponse.js';
import { CloseApplication as rpc_messages_CloseApplication_js} from './src/rpc/messages/CloseApplication.js';
import { CloseApplicationResponse as rpc_messages_CloseApplicationResponse_js} from './src/rpc/messages/CloseApplicationResponse.js';
import { CreateInteractionChoiceSet as rpc_messages_CreateInteractionChoiceSet_js} from './src/rpc/messages/CreateInteractionChoiceSet.js';
import { CreateInteractionChoiceSetResponse as rpc_messages_CreateInteractionChoiceSetResponse_js} from './src/rpc/messages/CreateInteractionChoiceSetResponse.js';
import { CreateWindow as rpc_messages_CreateWindow_js} from './src/rpc/messages/CreateWindow.js';
import { CreateWindowResponse as rpc_messages_CreateWindowResponse_js} from './src/rpc/messages/CreateWindowResponse.js';
import { DeleteCommand as rpc_messages_DeleteCommand_js} from './src/rpc/messages/DeleteCommand.js';
import { DeleteCommandResponse as rpc_messages_DeleteCommandResponse_js} from './src/rpc/messages/DeleteCommandResponse.js';
import { DeleteFile as rpc_messages_DeleteFile_js} from './src/rpc/messages/DeleteFile.js';
import { DeleteFileResponse as rpc_messages_DeleteFileResponse_js} from './src/rpc/messages/DeleteFileResponse.js';
import { DeleteInteractionChoiceSet as rpc_messages_DeleteInteractionChoiceSet_js} from './src/rpc/messages/DeleteInteractionChoiceSet.js';
import { DeleteInteractionChoiceSetResponse as rpc_messages_DeleteInteractionChoiceSetResponse_js} from './src/rpc/messages/DeleteInteractionChoiceSetResponse.js';
import { DeleteSubMenu as rpc_messages_DeleteSubMenu_js} from './src/rpc/messages/DeleteSubMenu.js';
import { DeleteSubMenuResponse as rpc_messages_DeleteSubMenuResponse_js} from './src/rpc/messages/DeleteSubMenuResponse.js';
import { DeleteWindow as rpc_messages_DeleteWindow_js} from './src/rpc/messages/DeleteWindow.js';
import { DeleteWindowResponse as rpc_messages_DeleteWindowResponse_js} from './src/rpc/messages/DeleteWindowResponse.js';
import { DiagnosticMessage as rpc_messages_DiagnosticMessage_js} from './src/rpc/messages/DiagnosticMessage.js';
import { DiagnosticMessageResponse as rpc_messages_DiagnosticMessageResponse_js} from './src/rpc/messages/DiagnosticMessageResponse.js';
import { DialNumber as rpc_messages_DialNumber_js} from './src/rpc/messages/DialNumber.js';
import { DialNumberResponse as rpc_messages_DialNumberResponse_js} from './src/rpc/messages/DialNumberResponse.js';
import { EncodedSyncPData as rpc_messages_EncodedSyncPData_js} from './src/rpc/messages/EncodedSyncPData.js';
import { EncodedSyncPDataResponse as rpc_messages_EncodedSyncPDataResponse_js} from './src/rpc/messages/EncodedSyncPDataResponse.js';
import { EndAudioPassThru as rpc_messages_EndAudioPassThru_js} from './src/rpc/messages/EndAudioPassThru.js';
import { EndAudioPassThruResponse as rpc_messages_EndAudioPassThruResponse_js} from './src/rpc/messages/EndAudioPassThruResponse.js';
import { GenericResponseResponse as rpc_messages_GenericResponseResponse_js} from './src/rpc/messages/GenericResponseResponse.js';
import { GetAppServiceData as rpc_messages_GetAppServiceData_js} from './src/rpc/messages/GetAppServiceData.js';
import { GetAppServiceDataResponse as rpc_messages_GetAppServiceDataResponse_js} from './src/rpc/messages/GetAppServiceDataResponse.js';
import { GetCloudAppProperties as rpc_messages_GetCloudAppProperties_js} from './src/rpc/messages/GetCloudAppProperties.js';
import { GetCloudAppPropertiesResponse as rpc_messages_GetCloudAppPropertiesResponse_js} from './src/rpc/messages/GetCloudAppPropertiesResponse.js';
import { GetDTCs as rpc_messages_GetDTCs_js} from './src/rpc/messages/GetDTCs.js';
import { GetDTCsResponse as rpc_messages_GetDTCsResponse_js} from './src/rpc/messages/GetDTCsResponse.js';
import { GetFile as rpc_messages_GetFile_js} from './src/rpc/messages/GetFile.js';
import { GetFileResponse as rpc_messages_GetFileResponse_js} from './src/rpc/messages/GetFileResponse.js';
import { GetInteriorVehicleData as rpc_messages_GetInteriorVehicleData_js} from './src/rpc/messages/GetInteriorVehicleData.js';
import { GetInteriorVehicleDataConsent as rpc_messages_GetInteriorVehicleDataConsent_js} from './src/rpc/messages/GetInteriorVehicleDataConsent.js';
import { GetInteriorVehicleDataConsentResponse as rpc_messages_GetInteriorVehicleDataConsentResponse_js} from './src/rpc/messages/GetInteriorVehicleDataConsentResponse.js';
import { GetInteriorVehicleDataResponse as rpc_messages_GetInteriorVehicleDataResponse_js} from './src/rpc/messages/GetInteriorVehicleDataResponse.js';
import { GetSystemCapability as rpc_messages_GetSystemCapability_js} from './src/rpc/messages/GetSystemCapability.js';
import { GetSystemCapabilityResponse as rpc_messages_GetSystemCapabilityResponse_js} from './src/rpc/messages/GetSystemCapabilityResponse.js';
import { GetVehicleData as rpc_messages_GetVehicleData_js} from './src/rpc/messages/GetVehicleData.js';
import { GetVehicleDataResponse as rpc_messages_GetVehicleDataResponse_js} from './src/rpc/messages/GetVehicleDataResponse.js';
import { GetWayPoints as rpc_messages_GetWayPoints_js} from './src/rpc/messages/GetWayPoints.js';
import { GetWayPointsResponse as rpc_messages_GetWayPointsResponse_js} from './src/rpc/messages/GetWayPointsResponse.js';
import { ListFiles as rpc_messages_ListFiles_js} from './src/rpc/messages/ListFiles.js';
import { ListFilesResponse as rpc_messages_ListFilesResponse_js} from './src/rpc/messages/ListFilesResponse.js';
import { OnAppInterfaceUnregistered as rpc_messages_OnAppInterfaceUnregistered_js} from './src/rpc/messages/OnAppInterfaceUnregistered.js';
import { OnAppServiceData as rpc_messages_OnAppServiceData_js} from './src/rpc/messages/OnAppServiceData.js';
import { OnAudioPassThru as rpc_messages_OnAudioPassThru_js} from './src/rpc/messages/OnAudioPassThru.js';
import { OnButtonEvent as rpc_messages_OnButtonEvent_js} from './src/rpc/messages/OnButtonEvent.js';
import { OnButtonPress as rpc_messages_OnButtonPress_js} from './src/rpc/messages/OnButtonPress.js';
import { OnCommand as rpc_messages_OnCommand_js} from './src/rpc/messages/OnCommand.js';
import { OnDriverDistraction as rpc_messages_OnDriverDistraction_js} from './src/rpc/messages/OnDriverDistraction.js';
import { OnEncodedSyncPData as rpc_messages_OnEncodedSyncPData_js} from './src/rpc/messages/OnEncodedSyncPData.js';
import { OnHMIStatus as rpc_messages_OnHMIStatus_js} from './src/rpc/messages/OnHMIStatus.js';
import { OnHashChange as rpc_messages_OnHashChange_js} from './src/rpc/messages/OnHashChange.js';
import { OnInteriorVehicleData as rpc_messages_OnInteriorVehicleData_js} from './src/rpc/messages/OnInteriorVehicleData.js';
import { OnKeyboardInput as rpc_messages_OnKeyboardInput_js} from './src/rpc/messages/OnKeyboardInput.js';
import { OnLanguageChange as rpc_messages_OnLanguageChange_js} from './src/rpc/messages/OnLanguageChange.js';
import { OnPermissionsChange as rpc_messages_OnPermissionsChange_js} from './src/rpc/messages/OnPermissionsChange.js';
import { OnRCStatus as rpc_messages_OnRCStatus_js} from './src/rpc/messages/OnRCStatus.js';
import { OnSystemCapabilityUpdated as rpc_messages_OnSystemCapabilityUpdated_js} from './src/rpc/messages/OnSystemCapabilityUpdated.js';
import { OnSystemRequest as rpc_messages_OnSystemRequest_js} from './src/rpc/messages/OnSystemRequest.js';
import { OnTBTClientState as rpc_messages_OnTBTClientState_js} from './src/rpc/messages/OnTBTClientState.js';
import { OnTouchEvent as rpc_messages_OnTouchEvent_js} from './src/rpc/messages/OnTouchEvent.js';
import { OnVehicleData as rpc_messages_OnVehicleData_js} from './src/rpc/messages/OnVehicleData.js';
import { OnWayPointChange as rpc_messages_OnWayPointChange_js} from './src/rpc/messages/OnWayPointChange.js';
import { PerformAppServiceInteraction as rpc_messages_PerformAppServiceInteraction_js} from './src/rpc/messages/PerformAppServiceInteraction.js';
import { PerformAppServiceInteractionResponse as rpc_messages_PerformAppServiceInteractionResponse_js} from './src/rpc/messages/PerformAppServiceInteractionResponse.js';
import { PerformAudioPassThru as rpc_messages_PerformAudioPassThru_js} from './src/rpc/messages/PerformAudioPassThru.js';
import { PerformAudioPassThruResponse as rpc_messages_PerformAudioPassThruResponse_js} from './src/rpc/messages/PerformAudioPassThruResponse.js';
import { PerformInteraction as rpc_messages_PerformInteraction_js} from './src/rpc/messages/PerformInteraction.js';
import { PerformInteractionResponse as rpc_messages_PerformInteractionResponse_js} from './src/rpc/messages/PerformInteractionResponse.js';
import { PublishAppService as rpc_messages_PublishAppService_js} from './src/rpc/messages/PublishAppService.js';
import { PublishAppServiceResponse as rpc_messages_PublishAppServiceResponse_js} from './src/rpc/messages/PublishAppServiceResponse.js';
import { PutFile as rpc_messages_PutFile_js} from './src/rpc/messages/PutFile.js';
import { PutFileResponse as rpc_messages_PutFileResponse_js} from './src/rpc/messages/PutFileResponse.js';
import { ReadDID as rpc_messages_ReadDID_js} from './src/rpc/messages/ReadDID.js';
import { ReadDIDResponse as rpc_messages_ReadDIDResponse_js} from './src/rpc/messages/ReadDIDResponse.js';
import { RegisterAppInterface as rpc_messages_RegisterAppInterface_js} from './src/rpc/messages/RegisterAppInterface.js';
import { RegisterAppInterfaceResponse as rpc_messages_RegisterAppInterfaceResponse_js} from './src/rpc/messages/RegisterAppInterfaceResponse.js';
import { ReleaseInteriorVehicleDataModule as rpc_messages_ReleaseInteriorVehicleDataModule_js} from './src/rpc/messages/ReleaseInteriorVehicleDataModule.js';
import { ReleaseInteriorVehicleDataModuleResponse as rpc_messages_ReleaseInteriorVehicleDataModuleResponse_js} from './src/rpc/messages/ReleaseInteriorVehicleDataModuleResponse.js';
import { ResetGlobalProperties as rpc_messages_ResetGlobalProperties_js} from './src/rpc/messages/ResetGlobalProperties.js';
import { ResetGlobalPropertiesResponse as rpc_messages_ResetGlobalPropertiesResponse_js} from './src/rpc/messages/ResetGlobalPropertiesResponse.js';
import { ScrollableMessage as rpc_messages_ScrollableMessage_js} from './src/rpc/messages/ScrollableMessage.js';
import { ScrollableMessageResponse as rpc_messages_ScrollableMessageResponse_js} from './src/rpc/messages/ScrollableMessageResponse.js';
import { SendHapticData as rpc_messages_SendHapticData_js} from './src/rpc/messages/SendHapticData.js';
import { SendHapticDataResponse as rpc_messages_SendHapticDataResponse_js} from './src/rpc/messages/SendHapticDataResponse.js';
import { SendLocation as rpc_messages_SendLocation_js} from './src/rpc/messages/SendLocation.js';
import { SendLocationResponse as rpc_messages_SendLocationResponse_js} from './src/rpc/messages/SendLocationResponse.js';
import { SetAppIcon as rpc_messages_SetAppIcon_js} from './src/rpc/messages/SetAppIcon.js';
import { SetAppIconResponse as rpc_messages_SetAppIconResponse_js} from './src/rpc/messages/SetAppIconResponse.js';
import { SetCloudAppProperties as rpc_messages_SetCloudAppProperties_js} from './src/rpc/messages/SetCloudAppProperties.js';
import { SetCloudAppPropertiesResponse as rpc_messages_SetCloudAppPropertiesResponse_js} from './src/rpc/messages/SetCloudAppPropertiesResponse.js';
import { SetDisplayLayout as rpc_messages_SetDisplayLayout_js} from './src/rpc/messages/SetDisplayLayout.js';
import { SetDisplayLayoutResponse as rpc_messages_SetDisplayLayoutResponse_js} from './src/rpc/messages/SetDisplayLayoutResponse.js';
import { SetGlobalProperties as rpc_messages_SetGlobalProperties_js} from './src/rpc/messages/SetGlobalProperties.js';
import { SetGlobalPropertiesResponse as rpc_messages_SetGlobalPropertiesResponse_js} from './src/rpc/messages/SetGlobalPropertiesResponse.js';
import { SetInteriorVehicleData as rpc_messages_SetInteriorVehicleData_js} from './src/rpc/messages/SetInteriorVehicleData.js';
import { SetInteriorVehicleDataResponse as rpc_messages_SetInteriorVehicleDataResponse_js} from './src/rpc/messages/SetInteriorVehicleDataResponse.js';
import { SetMediaClockTimer as rpc_messages_SetMediaClockTimer_js} from './src/rpc/messages/SetMediaClockTimer.js';
import { SetMediaClockTimerResponse as rpc_messages_SetMediaClockTimerResponse_js} from './src/rpc/messages/SetMediaClockTimerResponse.js';
import { Show as rpc_messages_Show_js} from './src/rpc/messages/Show.js';
import { ShowAppMenu as rpc_messages_ShowAppMenu_js} from './src/rpc/messages/ShowAppMenu.js';
import { ShowAppMenuResponse as rpc_messages_ShowAppMenuResponse_js} from './src/rpc/messages/ShowAppMenuResponse.js';
import { ShowConstantTBT as rpc_messages_ShowConstantTBT_js} from './src/rpc/messages/ShowConstantTBT.js';
import { ShowConstantTBTResponse as rpc_messages_ShowConstantTBTResponse_js} from './src/rpc/messages/ShowConstantTBTResponse.js';
import { ShowResponse as rpc_messages_ShowResponse_js} from './src/rpc/messages/ShowResponse.js';
import { Slider as rpc_messages_Slider_js} from './src/rpc/messages/Slider.js';
import { SliderResponse as rpc_messages_SliderResponse_js} from './src/rpc/messages/SliderResponse.js';
import { Speak as rpc_messages_Speak_js} from './src/rpc/messages/Speak.js';
import { SpeakResponse as rpc_messages_SpeakResponse_js} from './src/rpc/messages/SpeakResponse.js';
import { SubscribeButton as rpc_messages_SubscribeButton_js} from './src/rpc/messages/SubscribeButton.js';
import { SubscribeButtonResponse as rpc_messages_SubscribeButtonResponse_js} from './src/rpc/messages/SubscribeButtonResponse.js';
import { SubscribeVehicleData as rpc_messages_SubscribeVehicleData_js} from './src/rpc/messages/SubscribeVehicleData.js';
import { SubscribeVehicleDataResponse as rpc_messages_SubscribeVehicleDataResponse_js} from './src/rpc/messages/SubscribeVehicleDataResponse.js';
import { SubscribeWayPoints as rpc_messages_SubscribeWayPoints_js} from './src/rpc/messages/SubscribeWayPoints.js';
import { SubscribeWayPointsResponse as rpc_messages_SubscribeWayPointsResponse_js} from './src/rpc/messages/SubscribeWayPointsResponse.js';
import { SystemRequest as rpc_messages_SystemRequest_js} from './src/rpc/messages/SystemRequest.js';
import { SystemRequestResponse as rpc_messages_SystemRequestResponse_js} from './src/rpc/messages/SystemRequestResponse.js';
import { UnpublishAppService as rpc_messages_UnpublishAppService_js} from './src/rpc/messages/UnpublishAppService.js';
import { UnpublishAppServiceResponse as rpc_messages_UnpublishAppServiceResponse_js} from './src/rpc/messages/UnpublishAppServiceResponse.js';
import { UnregisterAppInterface as rpc_messages_UnregisterAppInterface_js} from './src/rpc/messages/UnregisterAppInterface.js';
import { UnregisterAppInterfaceResponse as rpc_messages_UnregisterAppInterfaceResponse_js} from './src/rpc/messages/UnregisterAppInterfaceResponse.js';
import { UnsubscribeButton as rpc_messages_UnsubscribeButton_js} from './src/rpc/messages/UnsubscribeButton.js';
import { UnsubscribeButtonResponse as rpc_messages_UnsubscribeButtonResponse_js} from './src/rpc/messages/UnsubscribeButtonResponse.js';
import { UnsubscribeVehicleData as rpc_messages_UnsubscribeVehicleData_js} from './src/rpc/messages/UnsubscribeVehicleData.js';
import { UnsubscribeVehicleDataResponse as rpc_messages_UnsubscribeVehicleDataResponse_js} from './src/rpc/messages/UnsubscribeVehicleDataResponse.js';
import { UnsubscribeWayPoints as rpc_messages_UnsubscribeWayPoints_js} from './src/rpc/messages/UnsubscribeWayPoints.js';
import { UnsubscribeWayPointsResponse as rpc_messages_UnsubscribeWayPointsResponse_js} from './src/rpc/messages/UnsubscribeWayPointsResponse.js';
import { UpdateTurnList as rpc_messages_UpdateTurnList_js} from './src/rpc/messages/UpdateTurnList.js';
import { UpdateTurnListResponse as rpc_messages_UpdateTurnListResponse_js} from './src/rpc/messages/UpdateTurnListResponse.js';
import { AirbagStatus as rpc_structs_AirbagStatus_js} from './src/rpc/structs/AirbagStatus.js';
import { AppInfo as rpc_structs_AppInfo_js} from './src/rpc/structs/AppInfo.js';
import { AppServiceCapability as rpc_structs_AppServiceCapability_js} from './src/rpc/structs/AppServiceCapability.js';
import { AppServiceData as rpc_structs_AppServiceData_js} from './src/rpc/structs/AppServiceData.js';
import { AppServiceManifest as rpc_structs_AppServiceManifest_js} from './src/rpc/structs/AppServiceManifest.js';
import { AppServiceRecord as rpc_structs_AppServiceRecord_js} from './src/rpc/structs/AppServiceRecord.js';
import { AppServicesCapabilities as rpc_structs_AppServicesCapabilities_js} from './src/rpc/structs/AppServicesCapabilities.js';
import { AudioControlCapabilities as rpc_structs_AudioControlCapabilities_js} from './src/rpc/structs/AudioControlCapabilities.js';
import { AudioControlData as rpc_structs_AudioControlData_js} from './src/rpc/structs/AudioControlData.js';
import { AudioPassThruCapabilities as rpc_structs_AudioPassThruCapabilities_js} from './src/rpc/structs/AudioPassThruCapabilities.js';
import { BeltStatus as rpc_structs_BeltStatus_js} from './src/rpc/structs/BeltStatus.js';
import { BodyInformation as rpc_structs_BodyInformation_js} from './src/rpc/structs/BodyInformation.js';
import { ButtonCapabilities as rpc_structs_ButtonCapabilities_js} from './src/rpc/structs/ButtonCapabilities.js';
import { Choice as rpc_structs_Choice_js} from './src/rpc/structs/Choice.js';
import { ClimateControlCapabilities as rpc_structs_ClimateControlCapabilities_js} from './src/rpc/structs/ClimateControlCapabilities.js';
import { ClimateControlData as rpc_structs_ClimateControlData_js} from './src/rpc/structs/ClimateControlData.js';
import { CloudAppProperties as rpc_structs_CloudAppProperties_js} from './src/rpc/structs/CloudAppProperties.js';
import { ClusterModeStatus as rpc_structs_ClusterModeStatus_js} from './src/rpc/structs/ClusterModeStatus.js';
import { Coordinate as rpc_structs_Coordinate_js} from './src/rpc/structs/Coordinate.js';
import { DIDResult as rpc_structs_DIDResult_js} from './src/rpc/structs/DIDResult.js';
import { DateTime as rpc_structs_DateTime_js} from './src/rpc/structs/DateTime.js';
import { DeviceInfo as rpc_structs_DeviceInfo_js} from './src/rpc/structs/DeviceInfo.js';
import { DeviceStatus as rpc_structs_DeviceStatus_js} from './src/rpc/structs/DeviceStatus.js';
import { DisplayCapabilities as rpc_structs_DisplayCapabilities_js} from './src/rpc/structs/DisplayCapabilities.js';
import { DisplayCapability as rpc_structs_DisplayCapability_js} from './src/rpc/structs/DisplayCapability.js';
import { ECallInfo as rpc_structs_ECallInfo_js} from './src/rpc/structs/ECallInfo.js';
import { EmergencyEvent as rpc_structs_EmergencyEvent_js} from './src/rpc/structs/EmergencyEvent.js';
import { EqualizerSettings as rpc_structs_EqualizerSettings_js} from './src/rpc/structs/EqualizerSettings.js';
import { FuelRange as rpc_structs_FuelRange_js} from './src/rpc/structs/FuelRange.js';
import { GPSData as rpc_structs_GPSData_js} from './src/rpc/structs/GPSData.js';
import { Grid as rpc_structs_Grid_js} from './src/rpc/structs/Grid.js';
import { HMICapabilities as rpc_structs_HMICapabilities_js} from './src/rpc/structs/HMICapabilities.js';
import { HMIPermissions as rpc_structs_HMIPermissions_js} from './src/rpc/structs/HMIPermissions.js';
import { HMISettingsControlCapabilities as rpc_structs_HMISettingsControlCapabilities_js} from './src/rpc/structs/HMISettingsControlCapabilities.js';
import { HMISettingsControlData as rpc_structs_HMISettingsControlData_js} from './src/rpc/structs/HMISettingsControlData.js';
import { HapticRect as rpc_structs_HapticRect_js} from './src/rpc/structs/HapticRect.js';
import { HeadLampStatus as rpc_structs_HeadLampStatus_js} from './src/rpc/structs/HeadLampStatus.js';
import { Image as rpc_structs_Image_js} from './src/rpc/structs/Image.js';
import { ImageField as rpc_structs_ImageField_js} from './src/rpc/structs/ImageField.js';
import { ImageResolution as rpc_structs_ImageResolution_js} from './src/rpc/structs/ImageResolution.js';
import { KeyboardProperties as rpc_structs_KeyboardProperties_js} from './src/rpc/structs/KeyboardProperties.js';
import { LightCapabilities as rpc_structs_LightCapabilities_js} from './src/rpc/structs/LightCapabilities.js';
import { LightControlCapabilities as rpc_structs_LightControlCapabilities_js} from './src/rpc/structs/LightControlCapabilities.js';
import { LightControlData as rpc_structs_LightControlData_js} from './src/rpc/structs/LightControlData.js';
import { LightState as rpc_structs_LightState_js} from './src/rpc/structs/LightState.js';
import { LocationDetails as rpc_structs_LocationDetails_js} from './src/rpc/structs/LocationDetails.js';
import { MassageCushionFirmness as rpc_structs_MassageCushionFirmness_js} from './src/rpc/structs/MassageCushionFirmness.js';
import { MassageModeData as rpc_structs_MassageModeData_js} from './src/rpc/structs/MassageModeData.js';
import { MediaServiceData as rpc_structs_MediaServiceData_js} from './src/rpc/structs/MediaServiceData.js';
import { MediaServiceManifest as rpc_structs_MediaServiceManifest_js} from './src/rpc/structs/MediaServiceManifest.js';
import { MenuParams as rpc_structs_MenuParams_js} from './src/rpc/structs/MenuParams.js';
import { MetadataTags as rpc_structs_MetadataTags_js} from './src/rpc/structs/MetadataTags.js';
import { ModuleData as rpc_structs_ModuleData_js} from './src/rpc/structs/ModuleData.js';
import { ModuleInfo as rpc_structs_ModuleInfo_js} from './src/rpc/structs/ModuleInfo.js';
import { MyKey as rpc_structs_MyKey_js} from './src/rpc/structs/MyKey.js';
import { NavigationCapability as rpc_structs_NavigationCapability_js} from './src/rpc/structs/NavigationCapability.js';
import { NavigationInstruction as rpc_structs_NavigationInstruction_js} from './src/rpc/structs/NavigationInstruction.js';
import { NavigationServiceData as rpc_structs_NavigationServiceData_js} from './src/rpc/structs/NavigationServiceData.js';
import { NavigationServiceManifest as rpc_structs_NavigationServiceManifest_js} from './src/rpc/structs/NavigationServiceManifest.js';
import { OASISAddress as rpc_structs_OASISAddress_js} from './src/rpc/structs/OASISAddress.js';
import { ParameterPermissions as rpc_structs_ParameterPermissions_js} from './src/rpc/structs/ParameterPermissions.js';
import { PermissionItem as rpc_structs_PermissionItem_js} from './src/rpc/structs/PermissionItem.js';
import { PhoneCapability as rpc_structs_PhoneCapability_js} from './src/rpc/structs/PhoneCapability.js';
import { PresetBankCapabilities as rpc_structs_PresetBankCapabilities_js} from './src/rpc/structs/PresetBankCapabilities.js';
import { RGBColor as rpc_structs_RGBColor_js} from './src/rpc/structs/RGBColor.js';
import { RadioControlCapabilities as rpc_structs_RadioControlCapabilities_js} from './src/rpc/structs/RadioControlCapabilities.js';
import { RadioControlData as rpc_structs_RadioControlData_js} from './src/rpc/structs/RadioControlData.js';
import { RdsData as rpc_structs_RdsData_js} from './src/rpc/structs/RdsData.js';
import { Rectangle as rpc_structs_Rectangle_js} from './src/rpc/structs/Rectangle.js';
import { RemoteControlCapabilities as rpc_structs_RemoteControlCapabilities_js} from './src/rpc/structs/RemoteControlCapabilities.js';
import { ScreenParams as rpc_structs_ScreenParams_js} from './src/rpc/structs/ScreenParams.js';
import { SdlMsgVersion as rpc_structs_SdlMsgVersion_js} from './src/rpc/structs/SdlMsgVersion.js';
import { SeatControlCapabilities as rpc_structs_SeatControlCapabilities_js} from './src/rpc/structs/SeatControlCapabilities.js';
import { SeatControlData as rpc_structs_SeatControlData_js} from './src/rpc/structs/SeatControlData.js';
import { SeatLocation as rpc_structs_SeatLocation_js} from './src/rpc/structs/SeatLocation.js';
import { SeatLocationCapability as rpc_structs_SeatLocationCapability_js} from './src/rpc/structs/SeatLocationCapability.js';
import { SeatMemoryAction as rpc_structs_SeatMemoryAction_js} from './src/rpc/structs/SeatMemoryAction.js';
import { SingleTireStatus as rpc_structs_SingleTireStatus_js} from './src/rpc/structs/SingleTireStatus.js';
import { SisData as rpc_structs_SisData_js} from './src/rpc/structs/SisData.js';
import { SoftButton as rpc_structs_SoftButton_js} from './src/rpc/structs/SoftButton.js';
import { SoftButtonCapabilities as rpc_structs_SoftButtonCapabilities_js} from './src/rpc/structs/SoftButtonCapabilities.js';
import { StartTime as rpc_structs_StartTime_js} from './src/rpc/structs/StartTime.js';
import { StationIDNumber as rpc_structs_StationIDNumber_js} from './src/rpc/structs/StationIDNumber.js';
import { SystemCapability as rpc_structs_SystemCapability_js} from './src/rpc/structs/SystemCapability.js';
import { TTSChunk as rpc_structs_TTSChunk_js} from './src/rpc/structs/TTSChunk.js';
import { Temperature as rpc_structs_Temperature_js} from './src/rpc/structs/Temperature.js';
import { TemplateColorScheme as rpc_structs_TemplateColorScheme_js} from './src/rpc/structs/TemplateColorScheme.js';
import { TemplateConfiguration as rpc_structs_TemplateConfiguration_js} from './src/rpc/structs/TemplateConfiguration.js';
import { TextField as rpc_structs_TextField_js} from './src/rpc/structs/TextField.js';
import { TireStatus as rpc_structs_TireStatus_js} from './src/rpc/structs/TireStatus.js';
import { TouchCoord as rpc_structs_TouchCoord_js} from './src/rpc/structs/TouchCoord.js';
import { TouchEvent as rpc_structs_TouchEvent_js} from './src/rpc/structs/TouchEvent.js';
import { TouchEventCapabilities as rpc_structs_TouchEventCapabilities_js} from './src/rpc/structs/TouchEventCapabilities.js';
import { Turn as rpc_structs_Turn_js} from './src/rpc/structs/Turn.js';
import { VehicleDataResult as rpc_structs_VehicleDataResult_js} from './src/rpc/structs/VehicleDataResult.js';
import { VehicleType as rpc_structs_VehicleType_js} from './src/rpc/structs/VehicleType.js';
import { VideoStreamingCapability as rpc_structs_VideoStreamingCapability_js} from './src/rpc/structs/VideoStreamingCapability.js';
import { VideoStreamingFormat as rpc_structs_VideoStreamingFormat_js} from './src/rpc/structs/VideoStreamingFormat.js';
import { VrHelpItem as rpc_structs_VrHelpItem_js} from './src/rpc/structs/VrHelpItem.js';
import { WeatherAlert as rpc_structs_WeatherAlert_js} from './src/rpc/structs/WeatherAlert.js';
import { WeatherData as rpc_structs_WeatherData_js} from './src/rpc/structs/WeatherData.js';
import { WeatherServiceData as rpc_structs_WeatherServiceData_js} from './src/rpc/structs/WeatherServiceData.js';
import { WeatherServiceManifest as rpc_structs_WeatherServiceManifest_js} from './src/rpc/structs/WeatherServiceManifest.js';
import { WindowCapability as rpc_structs_WindowCapability_js} from './src/rpc/structs/WindowCapability.js';
import { WindowTypeCapabilities as rpc_structs_WindowTypeCapabilities_js} from './src/rpc/structs/WindowTypeCapabilities.js';
import { SdlServiceListener as session_SdlServiceListener_js} from './src/session/SdlServiceListener.js';
import { SdlSession as session_SdlSession_js} from './src/session/SdlSession.js';
import { SdlSessionListener as session_SdlSessionListener_js} from './src/session/SdlSessionListener.js';
import { ServiceListenerMap as session_ServiceListenerMap_js} from './src/session/ServiceListenerMap.js';
import { VideoStreamingParameters as streaming_video_VideoStreamingParameters_js} from './src/streaming/video/VideoStreamingParameters.js';
import { CustomTransport as transport_CustomTransport_js} from './src/transport/CustomTransport.js';
import { CustomTransportConfig as transport_CustomTransportConfig_js} from './src/transport/CustomTransportConfig.js';
import { SdlPsm as transport_SdlPsm_js} from './src/transport/SdlPsm.js';
import { SslConfig as transport_SslConfig_js} from './src/transport/SslConfig.js';
import { TransportBase as transport_TransportBase_js} from './src/transport/TransportBase.js';
import { TransportCallback as transport_TransportCallback_js} from './src/transport/TransportCallback.js';
import { TransportConfigBase as transport_TransportConfigBase_js} from './src/transport/TransportConfigBase.js';
import { TransportListener as transport_TransportListener_js} from './src/transport/TransportListener.js';
import { TransportManager as transport_TransportManager_js} from './src/transport/TransportManager.js';
import { TransportManagerBase as transport_TransportManagerBase_js} from './src/transport/TransportManagerBase.js';
import { WebSocketClient as transport_WebSocketClient_js} from './src/transport/WebSocketClient.js';
import { WebSocketClientConfig as transport_WebSocketClientConfig_js} from './src/transport/WebSocketClientConfig.js';
import { TransportType as transport_enums_TransportType_js} from './src/transport/enums/TransportType.js';
import { TransportRecord as transport_util_TransportRecord_js} from './src/transport/util/TransportRecord.js';
import { ArrayTools as util_ArrayTools_js} from './src/util/ArrayTools.js';
import { BitConverter as util_BitConverter_js} from './src/util/BitConverter.js';
import { Bson as util_Bson_js} from './src/util/Bson.js';
import { Enum as util_Enum_js} from './src/util/Enum.js';
import { FileUtils as util_FileUtils_js} from './src/util/FileUtils.js';
import { JsonRpcMarshaller as util_JsonRpcMarshaller_js} from './src/util/JsonRpcMarshaller.js';
import { TextEncoder as util_TextEncoder_js} from './src/util/TextEncoder.js';
import { Version as util_Version_js} from './src/util/Version.js';
import { uuid as util_uuid_js} from './src/util/uuid.js';

const SDL = {
    manager: {
        AppConfig: manager_AppConfig_js,
        SdlManager: manager_SdlManager_js,
        SdlManagerBase: manager_SdlManagerBase_js,
        SdlManagerListener: manager_SdlManagerListener_js,
        SubManagerBase: manager_SubManagerBase_js,
        SystemCapabilityManager: manager_SystemCapabilityManager_js,
        file: {
            FileManager: manager_file_FileManager_js,
            FileManagerBase: manager_file_FileManagerBase_js,
            filetypes: {
                SdlArtwork: manager_file_filetypes_SdlArtwork_js,
                SdlFile: manager_file_filetypes_SdlFile_js,
            },
        },
        lifecycle: {
            LifecycleListener: manager_lifecycle_LifecycleListener_js,
            LifecycleManager: manager_lifecycle_LifecycleManager_js,
        },
        permission: {
            PermissionElement: manager_permission_PermissionElement_js,
            PermissionFilter: manager_permission_PermissionFilter_js,
            PermissionManager: manager_permission_PermissionManager_js,
            PermissionManagerBase: manager_permission_PermissionManagerBase_js,
            PermissionStatus: manager_permission_PermissionStatus_js,
            enums: {
                PermissionGroupStatus: manager_permission_enums_PermissionGroupStatus_js,
                PermissionGroupType: manager_permission_enums_PermissionGroupType_js,
            },
        },
        screen: {
            ChoiceSetManager: manager_screen_ChoiceSetManager_js,
            ChoiceSetManagerBase: manager_screen_ChoiceSetManagerBase_js,
            MenuManager: manager_screen_MenuManager_js,
            MenuManagerBase: manager_screen_MenuManagerBase_js,
            ScreenManager: manager_screen_ScreenManager_js,
            ScreenManagerBase: manager_screen_ScreenManagerBase_js,
            SoftButtonManager: manager_screen_SoftButtonManager_js,
            SoftButtonManagerBase: manager_screen_SoftButtonManagerBase_js,
            TextAndGraphicManager: manager_screen_TextAndGraphicManager_js,
            TextAndGraphicManagerBase: manager_screen_TextAndGraphicManagerBase_js,
            VoiceCommandManager: manager_screen_VoiceCommandManager_js,
            VoiceCommandManagerBase: manager_screen_VoiceCommandManagerBase_js,
            utils: {
                SoftButtonObject: manager_screen_utils_SoftButtonObject_js,
                SoftButtonState: manager_screen_utils_SoftButtonState_js,
                VoiceCommand: manager_screen_utils_VoiceCommand_js,
            },
        },
    },
    protocol: {
        BinaryFrameHeader: protocol_BinaryFrameHeader_js,
        MessageFrameAssembler: protocol_MessageFrameAssembler_js,
        MessageFrameDisassembler: protocol_MessageFrameDisassembler_js,
        SdlPacket: protocol_SdlPacket_js,
        SdlPacketFactory: protocol_SdlPacketFactory_js,
        SdlProtocol: protocol_SdlProtocol_js,
        SdlProtocolBase: protocol_SdlProtocolBase_js,
        SdlProtocolListener: protocol_SdlProtocolListener_js,
        enums: {
            ControlFrameTags: protocol_enums_ControlFrameTags_js,
            FrameType: protocol_enums_FrameType_js,
            ServiceType: protocol_enums_ServiceType_js,
        },
    },
    rpc: {
        RpcCreator: rpc_RpcCreator_js,
        RpcMessage: rpc_RpcMessage_js,
        RpcNotification: rpc_RpcNotification_js,
        RpcRequest: rpc_RpcRequest_js,
        RpcResponse: rpc_RpcResponse_js,
        RpcStruct: rpc_RpcStruct_js,
        enums: {
            AmbientLightStatus: rpc_enums_AmbientLightStatus_js,
            AppHMIType: rpc_enums_AppHMIType_js,
            AppInterfaceUnregisteredReason: rpc_enums_AppInterfaceUnregisteredReason_js,
            AppServiceType: rpc_enums_AppServiceType_js,
            AudioStreamingIndicator: rpc_enums_AudioStreamingIndicator_js,
            AudioStreamingState: rpc_enums_AudioStreamingState_js,
            AudioType: rpc_enums_AudioType_js,
            BitsPerSample: rpc_enums_BitsPerSample_js,
            ButtonEventMode: rpc_enums_ButtonEventMode_js,
            ButtonName: rpc_enums_ButtonName_js,
            ButtonPressMode: rpc_enums_ButtonPressMode_js,
            CarModeStatus: rpc_enums_CarModeStatus_js,
            CharacterSet: rpc_enums_CharacterSet_js,
            CompassDirection: rpc_enums_CompassDirection_js,
            ComponentVolumeStatus: rpc_enums_ComponentVolumeStatus_js,
            DefrostZone: rpc_enums_DefrostZone_js,
            DeliveryMode: rpc_enums_DeliveryMode_js,
            DeviceLevelStatus: rpc_enums_DeviceLevelStatus_js,
            Dimension: rpc_enums_Dimension_js,
            Direction: rpc_enums_Direction_js,
            DisplayMode: rpc_enums_DisplayMode_js,
            DisplayType: rpc_enums_DisplayType_js,
            DistanceUnit: rpc_enums_DistanceUnit_js,
            DriverDistractionState: rpc_enums_DriverDistractionState_js,
            ECallConfirmationStatus: rpc_enums_ECallConfirmationStatus_js,
            ElectronicParkBrakeStatus: rpc_enums_ElectronicParkBrakeStatus_js,
            EmergencyEventType: rpc_enums_EmergencyEventType_js,
            FileType: rpc_enums_FileType_js,
            FuelCutoffStatus: rpc_enums_FuelCutoffStatus_js,
            FuelType: rpc_enums_FuelType_js,
            FunctionID: rpc_enums_FunctionID_js,
            GlobalProperty: rpc_enums_GlobalProperty_js,
            HMILevel: rpc_enums_HMILevel_js,
            HmiZoneCapabilities: rpc_enums_HmiZoneCapabilities_js,
            HybridAppPreference: rpc_enums_HybridAppPreference_js,
            IgnitionStableStatus: rpc_enums_IgnitionStableStatus_js,
            IgnitionStatus: rpc_enums_IgnitionStatus_js,
            ImageFieldName: rpc_enums_ImageFieldName_js,
            ImageType: rpc_enums_ImageType_js,
            InteractionMode: rpc_enums_InteractionMode_js,
            KeyboardEvent: rpc_enums_KeyboardEvent_js,
            KeyboardLayout: rpc_enums_KeyboardLayout_js,
            KeypressMode: rpc_enums_KeypressMode_js,
            Language: rpc_enums_Language_js,
            LayoutMode: rpc_enums_LayoutMode_js,
            LightName: rpc_enums_LightName_js,
            LightStatus: rpc_enums_LightStatus_js,
            MaintenanceModeStatus: rpc_enums_MaintenanceModeStatus_js,
            MassageCushion: rpc_enums_MassageCushion_js,
            MassageMode: rpc_enums_MassageMode_js,
            MassageZone: rpc_enums_MassageZone_js,
            MediaClockFormat: rpc_enums_MediaClockFormat_js,
            MediaType: rpc_enums_MediaType_js,
            MenuLayout: rpc_enums_MenuLayout_js,
            MetadataType: rpc_enums_MetadataType_js,
            ModuleType: rpc_enums_ModuleType_js,
            NavigationAction: rpc_enums_NavigationAction_js,
            NavigationJunction: rpc_enums_NavigationJunction_js,
            PRNDL: rpc_enums_PRNDL_js,
            PermissionStatus: rpc_enums_PermissionStatus_js,
            PowerModeQualificationStatus: rpc_enums_PowerModeQualificationStatus_js,
            PowerModeStatus: rpc_enums_PowerModeStatus_js,
            PredefinedLayout: rpc_enums_PredefinedLayout_js,
            PredefinedWindows: rpc_enums_PredefinedWindows_js,
            PrerecordedSpeech: rpc_enums_PrerecordedSpeech_js,
            PrimaryAudioSource: rpc_enums_PrimaryAudioSource_js,
            RadioBand: rpc_enums_RadioBand_js,
            RadioState: rpc_enums_RadioState_js,
            RequestType: rpc_enums_RequestType_js,
            Result: rpc_enums_Result_js,
            RpcType: rpc_enums_RpcType_js,
            SamplingRate: rpc_enums_SamplingRate_js,
            SeatMemoryActionType: rpc_enums_SeatMemoryActionType_js,
            ServiceUpdateReason: rpc_enums_ServiceUpdateReason_js,
            SoftButtonType: rpc_enums_SoftButtonType_js,
            SpeechCapabilities: rpc_enums_SpeechCapabilities_js,
            SupportedSeat: rpc_enums_SupportedSeat_js,
            SystemAction: rpc_enums_SystemAction_js,
            SystemCapabilityType: rpc_enums_SystemCapabilityType_js,
            SystemContext: rpc_enums_SystemContext_js,
            TBTState: rpc_enums_TBTState_js,
            TPMS: rpc_enums_TPMS_js,
            TemperatureUnit: rpc_enums_TemperatureUnit_js,
            TextAlignment: rpc_enums_TextAlignment_js,
            TextFieldName: rpc_enums_TextFieldName_js,
            TimerMode: rpc_enums_TimerMode_js,
            TouchType: rpc_enums_TouchType_js,
            TriggerSource: rpc_enums_TriggerSource_js,
            TurnSignal: rpc_enums_TurnSignal_js,
            UpdateMode: rpc_enums_UpdateMode_js,
            VehicleDataActiveStatus: rpc_enums_VehicleDataActiveStatus_js,
            VehicleDataEventStatus: rpc_enums_VehicleDataEventStatus_js,
            VehicleDataNotificationStatus: rpc_enums_VehicleDataNotificationStatus_js,
            VehicleDataResultCode: rpc_enums_VehicleDataResultCode_js,
            VehicleDataStatus: rpc_enums_VehicleDataStatus_js,
            VehicleDataType: rpc_enums_VehicleDataType_js,
            VentilationMode: rpc_enums_VentilationMode_js,
            VideoStreamingCodec: rpc_enums_VideoStreamingCodec_js,
            VideoStreamingProtocol: rpc_enums_VideoStreamingProtocol_js,
            VideoStreamingState: rpc_enums_VideoStreamingState_js,
            VrCapabilities: rpc_enums_VrCapabilities_js,
            WarningLightStatus: rpc_enums_WarningLightStatus_js,
            WayPointType: rpc_enums_WayPointType_js,
            WindowType: rpc_enums_WindowType_js,
            WiperStatus: rpc_enums_WiperStatus_js,
            MessageType: rpc_enums_MessageType_js,
        },
        messages: {
            AddCommand: rpc_messages_AddCommand_js,
            AddCommandResponse: rpc_messages_AddCommandResponse_js,
            AddSubMenu: rpc_messages_AddSubMenu_js,
            AddSubMenuResponse: rpc_messages_AddSubMenuResponse_js,
            Alert: rpc_messages_Alert_js,
            AlertManeuver: rpc_messages_AlertManeuver_js,
            AlertManeuverResponse: rpc_messages_AlertManeuverResponse_js,
            AlertResponse: rpc_messages_AlertResponse_js,
            ButtonPress: rpc_messages_ButtonPress_js,
            ButtonPressResponse: rpc_messages_ButtonPressResponse_js,
            CancelInteraction: rpc_messages_CancelInteraction_js,
            CancelInteractionResponse: rpc_messages_CancelInteractionResponse_js,
            ChangeRegistration: rpc_messages_ChangeRegistration_js,
            ChangeRegistrationResponse: rpc_messages_ChangeRegistrationResponse_js,
            CloseApplication: rpc_messages_CloseApplication_js,
            CloseApplicationResponse: rpc_messages_CloseApplicationResponse_js,
            CreateInteractionChoiceSet: rpc_messages_CreateInteractionChoiceSet_js,
            CreateInteractionChoiceSetResponse: rpc_messages_CreateInteractionChoiceSetResponse_js,
            CreateWindow: rpc_messages_CreateWindow_js,
            CreateWindowResponse: rpc_messages_CreateWindowResponse_js,
            DeleteCommand: rpc_messages_DeleteCommand_js,
            DeleteCommandResponse: rpc_messages_DeleteCommandResponse_js,
            DeleteFile: rpc_messages_DeleteFile_js,
            DeleteFileResponse: rpc_messages_DeleteFileResponse_js,
            DeleteInteractionChoiceSet: rpc_messages_DeleteInteractionChoiceSet_js,
            DeleteInteractionChoiceSetResponse: rpc_messages_DeleteInteractionChoiceSetResponse_js,
            DeleteSubMenu: rpc_messages_DeleteSubMenu_js,
            DeleteSubMenuResponse: rpc_messages_DeleteSubMenuResponse_js,
            DeleteWindow: rpc_messages_DeleteWindow_js,
            DeleteWindowResponse: rpc_messages_DeleteWindowResponse_js,
            DiagnosticMessage: rpc_messages_DiagnosticMessage_js,
            DiagnosticMessageResponse: rpc_messages_DiagnosticMessageResponse_js,
            DialNumber: rpc_messages_DialNumber_js,
            DialNumberResponse: rpc_messages_DialNumberResponse_js,
            EncodedSyncPData: rpc_messages_EncodedSyncPData_js,
            EncodedSyncPDataResponse: rpc_messages_EncodedSyncPDataResponse_js,
            EndAudioPassThru: rpc_messages_EndAudioPassThru_js,
            EndAudioPassThruResponse: rpc_messages_EndAudioPassThruResponse_js,
            GenericResponseResponse: rpc_messages_GenericResponseResponse_js,
            GetAppServiceData: rpc_messages_GetAppServiceData_js,
            GetAppServiceDataResponse: rpc_messages_GetAppServiceDataResponse_js,
            GetCloudAppProperties: rpc_messages_GetCloudAppProperties_js,
            GetCloudAppPropertiesResponse: rpc_messages_GetCloudAppPropertiesResponse_js,
            GetDTCs: rpc_messages_GetDTCs_js,
            GetDTCsResponse: rpc_messages_GetDTCsResponse_js,
            GetFile: rpc_messages_GetFile_js,
            GetFileResponse: rpc_messages_GetFileResponse_js,
            GetInteriorVehicleData: rpc_messages_GetInteriorVehicleData_js,
            GetInteriorVehicleDataConsent: rpc_messages_GetInteriorVehicleDataConsent_js,
            GetInteriorVehicleDataConsentResponse: rpc_messages_GetInteriorVehicleDataConsentResponse_js,
            GetInteriorVehicleDataResponse: rpc_messages_GetInteriorVehicleDataResponse_js,
            GetSystemCapability: rpc_messages_GetSystemCapability_js,
            GetSystemCapabilityResponse: rpc_messages_GetSystemCapabilityResponse_js,
            GetVehicleData: rpc_messages_GetVehicleData_js,
            GetVehicleDataResponse: rpc_messages_GetVehicleDataResponse_js,
            GetWayPoints: rpc_messages_GetWayPoints_js,
            GetWayPointsResponse: rpc_messages_GetWayPointsResponse_js,
            ListFiles: rpc_messages_ListFiles_js,
            ListFilesResponse: rpc_messages_ListFilesResponse_js,
            OnAppInterfaceUnregistered: rpc_messages_OnAppInterfaceUnregistered_js,
            OnAppServiceData: rpc_messages_OnAppServiceData_js,
            OnAudioPassThru: rpc_messages_OnAudioPassThru_js,
            OnButtonEvent: rpc_messages_OnButtonEvent_js,
            OnButtonPress: rpc_messages_OnButtonPress_js,
            OnCommand: rpc_messages_OnCommand_js,
            OnDriverDistraction: rpc_messages_OnDriverDistraction_js,
            OnEncodedSyncPData: rpc_messages_OnEncodedSyncPData_js,
            OnHMIStatus: rpc_messages_OnHMIStatus_js,
            OnHashChange: rpc_messages_OnHashChange_js,
            OnInteriorVehicleData: rpc_messages_OnInteriorVehicleData_js,
            OnKeyboardInput: rpc_messages_OnKeyboardInput_js,
            OnLanguageChange: rpc_messages_OnLanguageChange_js,
            OnPermissionsChange: rpc_messages_OnPermissionsChange_js,
            OnRCStatus: rpc_messages_OnRCStatus_js,
            OnSystemCapabilityUpdated: rpc_messages_OnSystemCapabilityUpdated_js,
            OnSystemRequest: rpc_messages_OnSystemRequest_js,
            OnTBTClientState: rpc_messages_OnTBTClientState_js,
            OnTouchEvent: rpc_messages_OnTouchEvent_js,
            OnVehicleData: rpc_messages_OnVehicleData_js,
            OnWayPointChange: rpc_messages_OnWayPointChange_js,
            PerformAppServiceInteraction: rpc_messages_PerformAppServiceInteraction_js,
            PerformAppServiceInteractionResponse: rpc_messages_PerformAppServiceInteractionResponse_js,
            PerformAudioPassThru: rpc_messages_PerformAudioPassThru_js,
            PerformAudioPassThruResponse: rpc_messages_PerformAudioPassThruResponse_js,
            PerformInteraction: rpc_messages_PerformInteraction_js,
            PerformInteractionResponse: rpc_messages_PerformInteractionResponse_js,
            PublishAppService: rpc_messages_PublishAppService_js,
            PublishAppServiceResponse: rpc_messages_PublishAppServiceResponse_js,
            PutFile: rpc_messages_PutFile_js,
            PutFileResponse: rpc_messages_PutFileResponse_js,
            ReadDID: rpc_messages_ReadDID_js,
            ReadDIDResponse: rpc_messages_ReadDIDResponse_js,
            RegisterAppInterface: rpc_messages_RegisterAppInterface_js,
            RegisterAppInterfaceResponse: rpc_messages_RegisterAppInterfaceResponse_js,
            ReleaseInteriorVehicleDataModule: rpc_messages_ReleaseInteriorVehicleDataModule_js,
            ReleaseInteriorVehicleDataModuleResponse: rpc_messages_ReleaseInteriorVehicleDataModuleResponse_js,
            ResetGlobalProperties: rpc_messages_ResetGlobalProperties_js,
            ResetGlobalPropertiesResponse: rpc_messages_ResetGlobalPropertiesResponse_js,
            ScrollableMessage: rpc_messages_ScrollableMessage_js,
            ScrollableMessageResponse: rpc_messages_ScrollableMessageResponse_js,
            SendHapticData: rpc_messages_SendHapticData_js,
            SendHapticDataResponse: rpc_messages_SendHapticDataResponse_js,
            SendLocation: rpc_messages_SendLocation_js,
            SendLocationResponse: rpc_messages_SendLocationResponse_js,
            SetAppIcon: rpc_messages_SetAppIcon_js,
            SetAppIconResponse: rpc_messages_SetAppIconResponse_js,
            SetCloudAppProperties: rpc_messages_SetCloudAppProperties_js,
            SetCloudAppPropertiesResponse: rpc_messages_SetCloudAppPropertiesResponse_js,
            SetDisplayLayout: rpc_messages_SetDisplayLayout_js,
            SetDisplayLayoutResponse: rpc_messages_SetDisplayLayoutResponse_js,
            SetGlobalProperties: rpc_messages_SetGlobalProperties_js,
            SetGlobalPropertiesResponse: rpc_messages_SetGlobalPropertiesResponse_js,
            SetInteriorVehicleData: rpc_messages_SetInteriorVehicleData_js,
            SetInteriorVehicleDataResponse: rpc_messages_SetInteriorVehicleDataResponse_js,
            SetMediaClockTimer: rpc_messages_SetMediaClockTimer_js,
            SetMediaClockTimerResponse: rpc_messages_SetMediaClockTimerResponse_js,
            Show: rpc_messages_Show_js,
            ShowAppMenu: rpc_messages_ShowAppMenu_js,
            ShowAppMenuResponse: rpc_messages_ShowAppMenuResponse_js,
            ShowConstantTBT: rpc_messages_ShowConstantTBT_js,
            ShowConstantTBTResponse: rpc_messages_ShowConstantTBTResponse_js,
            ShowResponse: rpc_messages_ShowResponse_js,
            Slider: rpc_messages_Slider_js,
            SliderResponse: rpc_messages_SliderResponse_js,
            Speak: rpc_messages_Speak_js,
            SpeakResponse: rpc_messages_SpeakResponse_js,
            SubscribeButton: rpc_messages_SubscribeButton_js,
            SubscribeButtonResponse: rpc_messages_SubscribeButtonResponse_js,
            SubscribeVehicleData: rpc_messages_SubscribeVehicleData_js,
            SubscribeVehicleDataResponse: rpc_messages_SubscribeVehicleDataResponse_js,
            SubscribeWayPoints: rpc_messages_SubscribeWayPoints_js,
            SubscribeWayPointsResponse: rpc_messages_SubscribeWayPointsResponse_js,
            SystemRequest: rpc_messages_SystemRequest_js,
            SystemRequestResponse: rpc_messages_SystemRequestResponse_js,
            UnpublishAppService: rpc_messages_UnpublishAppService_js,
            UnpublishAppServiceResponse: rpc_messages_UnpublishAppServiceResponse_js,
            UnregisterAppInterface: rpc_messages_UnregisterAppInterface_js,
            UnregisterAppInterfaceResponse: rpc_messages_UnregisterAppInterfaceResponse_js,
            UnsubscribeButton: rpc_messages_UnsubscribeButton_js,
            UnsubscribeButtonResponse: rpc_messages_UnsubscribeButtonResponse_js,
            UnsubscribeVehicleData: rpc_messages_UnsubscribeVehicleData_js,
            UnsubscribeVehicleDataResponse: rpc_messages_UnsubscribeVehicleDataResponse_js,
            UnsubscribeWayPoints: rpc_messages_UnsubscribeWayPoints_js,
            UnsubscribeWayPointsResponse: rpc_messages_UnsubscribeWayPointsResponse_js,
            UpdateTurnList: rpc_messages_UpdateTurnList_js,
            UpdateTurnListResponse: rpc_messages_UpdateTurnListResponse_js,
        },
        structs: {
            AirbagStatus: rpc_structs_AirbagStatus_js,
            AppInfo: rpc_structs_AppInfo_js,
            AppServiceCapability: rpc_structs_AppServiceCapability_js,
            AppServiceData: rpc_structs_AppServiceData_js,
            AppServiceManifest: rpc_structs_AppServiceManifest_js,
            AppServiceRecord: rpc_structs_AppServiceRecord_js,
            AppServicesCapabilities: rpc_structs_AppServicesCapabilities_js,
            AudioControlCapabilities: rpc_structs_AudioControlCapabilities_js,
            AudioControlData: rpc_structs_AudioControlData_js,
            AudioPassThruCapabilities: rpc_structs_AudioPassThruCapabilities_js,
            BeltStatus: rpc_structs_BeltStatus_js,
            BodyInformation: rpc_structs_BodyInformation_js,
            ButtonCapabilities: rpc_structs_ButtonCapabilities_js,
            Choice: rpc_structs_Choice_js,
            ClimateControlCapabilities: rpc_structs_ClimateControlCapabilities_js,
            ClimateControlData: rpc_structs_ClimateControlData_js,
            CloudAppProperties: rpc_structs_CloudAppProperties_js,
            ClusterModeStatus: rpc_structs_ClusterModeStatus_js,
            Coordinate: rpc_structs_Coordinate_js,
            DIDResult: rpc_structs_DIDResult_js,
            DateTime: rpc_structs_DateTime_js,
            DeviceInfo: rpc_structs_DeviceInfo_js,
            DeviceStatus: rpc_structs_DeviceStatus_js,
            DisplayCapabilities: rpc_structs_DisplayCapabilities_js,
            DisplayCapability: rpc_structs_DisplayCapability_js,
            ECallInfo: rpc_structs_ECallInfo_js,
            EmergencyEvent: rpc_structs_EmergencyEvent_js,
            EqualizerSettings: rpc_structs_EqualizerSettings_js,
            FuelRange: rpc_structs_FuelRange_js,
            GPSData: rpc_structs_GPSData_js,
            Grid: rpc_structs_Grid_js,
            HMICapabilities: rpc_structs_HMICapabilities_js,
            HMIPermissions: rpc_structs_HMIPermissions_js,
            HMISettingsControlCapabilities: rpc_structs_HMISettingsControlCapabilities_js,
            HMISettingsControlData: rpc_structs_HMISettingsControlData_js,
            HapticRect: rpc_structs_HapticRect_js,
            HeadLampStatus: rpc_structs_HeadLampStatus_js,
            Image: rpc_structs_Image_js,
            ImageField: rpc_structs_ImageField_js,
            ImageResolution: rpc_structs_ImageResolution_js,
            KeyboardProperties: rpc_structs_KeyboardProperties_js,
            LightCapabilities: rpc_structs_LightCapabilities_js,
            LightControlCapabilities: rpc_structs_LightControlCapabilities_js,
            LightControlData: rpc_structs_LightControlData_js,
            LightState: rpc_structs_LightState_js,
            LocationDetails: rpc_structs_LocationDetails_js,
            MassageCushionFirmness: rpc_structs_MassageCushionFirmness_js,
            MassageModeData: rpc_structs_MassageModeData_js,
            MediaServiceData: rpc_structs_MediaServiceData_js,
            MediaServiceManifest: rpc_structs_MediaServiceManifest_js,
            MenuParams: rpc_structs_MenuParams_js,
            MetadataTags: rpc_structs_MetadataTags_js,
            ModuleData: rpc_structs_ModuleData_js,
            ModuleInfo: rpc_structs_ModuleInfo_js,
            MyKey: rpc_structs_MyKey_js,
            NavigationCapability: rpc_structs_NavigationCapability_js,
            NavigationInstruction: rpc_structs_NavigationInstruction_js,
            NavigationServiceData: rpc_structs_NavigationServiceData_js,
            NavigationServiceManifest: rpc_structs_NavigationServiceManifest_js,
            OASISAddress: rpc_structs_OASISAddress_js,
            ParameterPermissions: rpc_structs_ParameterPermissions_js,
            PermissionItem: rpc_structs_PermissionItem_js,
            PhoneCapability: rpc_structs_PhoneCapability_js,
            PresetBankCapabilities: rpc_structs_PresetBankCapabilities_js,
            RGBColor: rpc_structs_RGBColor_js,
            RadioControlCapabilities: rpc_structs_RadioControlCapabilities_js,
            RadioControlData: rpc_structs_RadioControlData_js,
            RdsData: rpc_structs_RdsData_js,
            Rectangle: rpc_structs_Rectangle_js,
            RemoteControlCapabilities: rpc_structs_RemoteControlCapabilities_js,
            ScreenParams: rpc_structs_ScreenParams_js,
            SdlMsgVersion: rpc_structs_SdlMsgVersion_js,
            SeatControlCapabilities: rpc_structs_SeatControlCapabilities_js,
            SeatControlData: rpc_structs_SeatControlData_js,
            SeatLocation: rpc_structs_SeatLocation_js,
            SeatLocationCapability: rpc_structs_SeatLocationCapability_js,
            SeatMemoryAction: rpc_structs_SeatMemoryAction_js,
            SingleTireStatus: rpc_structs_SingleTireStatus_js,
            SisData: rpc_structs_SisData_js,
            SoftButton: rpc_structs_SoftButton_js,
            SoftButtonCapabilities: rpc_structs_SoftButtonCapabilities_js,
            StartTime: rpc_structs_StartTime_js,
            StationIDNumber: rpc_structs_StationIDNumber_js,
            SystemCapability: rpc_structs_SystemCapability_js,
            TTSChunk: rpc_structs_TTSChunk_js,
            Temperature: rpc_structs_Temperature_js,
            TemplateColorScheme: rpc_structs_TemplateColorScheme_js,
            TemplateConfiguration: rpc_structs_TemplateConfiguration_js,
            TextField: rpc_structs_TextField_js,
            TireStatus: rpc_structs_TireStatus_js,
            TouchCoord: rpc_structs_TouchCoord_js,
            TouchEvent: rpc_structs_TouchEvent_js,
            TouchEventCapabilities: rpc_structs_TouchEventCapabilities_js,
            Turn: rpc_structs_Turn_js,
            VehicleDataResult: rpc_structs_VehicleDataResult_js,
            VehicleType: rpc_structs_VehicleType_js,
            VideoStreamingCapability: rpc_structs_VideoStreamingCapability_js,
            VideoStreamingFormat: rpc_structs_VideoStreamingFormat_js,
            VrHelpItem: rpc_structs_VrHelpItem_js,
            WeatherAlert: rpc_structs_WeatherAlert_js,
            WeatherData: rpc_structs_WeatherData_js,
            WeatherServiceData: rpc_structs_WeatherServiceData_js,
            WeatherServiceManifest: rpc_structs_WeatherServiceManifest_js,
            WindowCapability: rpc_structs_WindowCapability_js,
            WindowTypeCapabilities: rpc_structs_WindowTypeCapabilities_js,
        },
    },
    session: {
        SdlServiceListener: session_SdlServiceListener_js,
        SdlSession: session_SdlSession_js,
        SdlSessionListener: session_SdlSessionListener_js,
        ServiceListenerMap: session_ServiceListenerMap_js,
    },
    streaming: {
        video: {
            VideoStreamingParameters: streaming_video_VideoStreamingParameters_js,
        },
    },
    transport: {
        CustomTransport: transport_CustomTransport_js,
        CustomTransportConfig: transport_CustomTransportConfig_js,
        SdlPsm: transport_SdlPsm_js,
        SslConfig: transport_SslConfig_js,
        TransportBase: transport_TransportBase_js,
        TransportCallback: transport_TransportCallback_js,
        TransportConfigBase: transport_TransportConfigBase_js,
        TransportListener: transport_TransportListener_js,
        TransportManager: transport_TransportManager_js,
        TransportManagerBase: transport_TransportManagerBase_js,
        WebSocketClient: transport_WebSocketClient_js,
        WebSocketClientConfig: transport_WebSocketClientConfig_js,
        enums: {
            TransportType: transport_enums_TransportType_js,
        },
        util: {
            TransportRecord: transport_util_TransportRecord_js,
        },
    },
    util: {
        ArrayTools: util_ArrayTools_js,
        BitConverter: util_BitConverter_js,
        Bson: util_Bson_js,
        Enum: util_Enum_js,
        FileUtils: util_FileUtils_js,
        JsonRpcMarshaller: util_JsonRpcMarshaller_js,
        TextEncoder: util_TextEncoder_js,
        Version: util_Version_js,
        uuid: util_uuid_js,
    },
};

export default SDL;