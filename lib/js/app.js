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

import { AppConfig } from './src/manager/AppConfig.js';
import { BaseSubManager } from './src/manager/BaseSubManager.js';
import { BaseFileManager } from './src/manager/file/BaseFileManager.js';
import { FileManager } from './src/manager/file/FileManager.js';
import { SdlArtwork } from './src/manager/file/filetypes/SdlArtwork.js';
import { SdlFile } from './src/manager/file/filetypes/SdlFile.js';
import { LifecycleListener } from './src/manager/lifecycle/LifecycleListener.js';
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
import { RpcCreator } from './src/rpc/RpcCreator.js';
import { RpcListener } from './src/rpc/RpcListener.js';
import { RpcMessage } from './src/rpc/RpcMessage.js';
import { RpcNotification } from './src/rpc/RpcNotification.js';
import { RpcRequest } from './src/rpc/RpcRequest.js';
import { RpcResponse } from './src/rpc/RpcResponse.js';
import { RpcStruct } from './src/rpc/RpcStruct.js';
import { AmbientLightStatus } from './src/rpc/enums/AmbientLightStatus.js';
import { AppHMIType } from './src/rpc/enums/AppHMIType.js';
import { AppInterfaceUnregisteredReason } from './src/rpc/enums/AppInterfaceUnregisteredReason.js';
import { AppServiceType } from './src/rpc/enums/AppServiceType.js';
import { AudioStreamingIndicator } from './src/rpc/enums/AudioStreamingIndicator.js';
import { AudioStreamingState } from './src/rpc/enums/AudioStreamingState.js';
import { AudioType } from './src/rpc/enums/AudioType.js';
import { BitsPerSample } from './src/rpc/enums/BitsPerSample.js';
import { ButtonEventMode } from './src/rpc/enums/ButtonEventMode.js';
import { ButtonName } from './src/rpc/enums/ButtonName.js';
import { ButtonPressMode } from './src/rpc/enums/ButtonPressMode.js';
import { CarModeStatus } from './src/rpc/enums/CarModeStatus.js';
import { CharacterSet } from './src/rpc/enums/CharacterSet.js';
import { CompassDirection } from './src/rpc/enums/CompassDirection.js';
import { ComponentVolumeStatus } from './src/rpc/enums/ComponentVolumeStatus.js';
import { DefrostZone } from './src/rpc/enums/DefrostZone.js';
import { DeliveryMode } from './src/rpc/enums/DeliveryMode.js';
import { DeviceLevelStatus } from './src/rpc/enums/DeviceLevelStatus.js';
import { Dimension } from './src/rpc/enums/Dimension.js';
import { Direction } from './src/rpc/enums/Direction.js';
import { DisplayMode } from './src/rpc/enums/DisplayMode.js';
import { DisplayType } from './src/rpc/enums/DisplayType.js';
import { DistanceUnit } from './src/rpc/enums/DistanceUnit.js';
import { DriverDistractionState } from './src/rpc/enums/DriverDistractionState.js';
import { ECallConfirmationStatus } from './src/rpc/enums/ECallConfirmationStatus.js';
import { ElectronicParkBrakeStatus } from './src/rpc/enums/ElectronicParkBrakeStatus.js';
import { EmergencyEventType } from './src/rpc/enums/EmergencyEventType.js';
import { FileType } from './src/rpc/enums/FileType.js';
import { FuelCutoffStatus } from './src/rpc/enums/FuelCutoffStatus.js';
import { FuelType } from './src/rpc/enums/FuelType.js';
import { FunctionID } from './src/rpc/enums/FunctionID.js';
import { GlobalProperty } from './src/rpc/enums/GlobalProperty.js';
import { HMILevel } from './src/rpc/enums/HMILevel.js';
import { HmiZoneCapabilities } from './src/rpc/enums/HmiZoneCapabilities.js';
import { HybridAppPreference } from './src/rpc/enums/HybridAppPreference.js';
import { IgnitionStableStatus } from './src/rpc/enums/IgnitionStableStatus.js';
import { IgnitionStatus } from './src/rpc/enums/IgnitionStatus.js';
import { ImageFieldName } from './src/rpc/enums/ImageFieldName.js';
import { ImageType } from './src/rpc/enums/ImageType.js';
import { InteractionMode } from './src/rpc/enums/InteractionMode.js';
import { KeyboardEvent } from './src/rpc/enums/KeyboardEvent.js';
import { KeyboardLayout } from './src/rpc/enums/KeyboardLayout.js';
import { KeypressMode } from './src/rpc/enums/KeypressMode.js';
import { Language } from './src/rpc/enums/Language.js';
import { LayoutMode } from './src/rpc/enums/LayoutMode.js';
import { LightName } from './src/rpc/enums/LightName.js';
import { LightStatus } from './src/rpc/enums/LightStatus.js';
import { MaintenanceModeStatus } from './src/rpc/enums/MaintenanceModeStatus.js';
import { MassageCushion } from './src/rpc/enums/MassageCushion.js';
import { MassageMode } from './src/rpc/enums/MassageMode.js';
import { MassageZone } from './src/rpc/enums/MassageZone.js';
import { MediaClockFormat } from './src/rpc/enums/MediaClockFormat.js';
import { MediaType } from './src/rpc/enums/MediaType.js';
import { MenuLayout } from './src/rpc/enums/MenuLayout.js';
import { MetadataType } from './src/rpc/enums/MetadataType.js';
import { ModuleType } from './src/rpc/enums/ModuleType.js';
import { NavigationAction } from './src/rpc/enums/NavigationAction.js';
import { NavigationJunction } from './src/rpc/enums/NavigationJunction.js';
import { PRNDL } from './src/rpc/enums/PRNDL.js';
import { PermissionStatus } from './src/rpc/enums/PermissionStatus.js';
import { PowerModeQualificationStatus } from './src/rpc/enums/PowerModeQualificationStatus.js';
import { PowerModeStatus } from './src/rpc/enums/PowerModeStatus.js';
import { PredefinedLayout } from './src/rpc/enums/PredefinedLayout.js';
import { PredefinedWindows } from './src/rpc/enums/PredefinedWindows.js';
import { PrerecordedSpeech } from './src/rpc/enums/PrerecordedSpeech.js';
import { PrimaryAudioSource } from './src/rpc/enums/PrimaryAudioSource.js';
import { RadioBand } from './src/rpc/enums/RadioBand.js';
import { RadioState } from './src/rpc/enums/RadioState.js';
import { RequestType } from './src/rpc/enums/RequestType.js';
import { Result } from './src/rpc/enums/Result.js';
import { RpcType } from './src/rpc/enums/RpcType.js';
import { SamplingRate } from './src/rpc/enums/SamplingRate.js';
import { SeatMemoryActionType } from './src/rpc/enums/SeatMemoryActionType.js';
import { ServiceUpdateReason } from './src/rpc/enums/ServiceUpdateReason.js';
import { SoftButtonType } from './src/rpc/enums/SoftButtonType.js';
import { SpeechCapabilities } from './src/rpc/enums/SpeechCapabilities.js';
import { SupportedSeat } from './src/rpc/enums/SupportedSeat.js';
import { SystemAction } from './src/rpc/enums/SystemAction.js';
import { SystemCapabilityType } from './src/rpc/enums/SystemCapabilityType.js';
import { SystemContext } from './src/rpc/enums/SystemContext.js';
import { TBTState } from './src/rpc/enums/TBTState.js';
import { TPMS } from './src/rpc/enums/TPMS.js';
import { TemperatureUnit } from './src/rpc/enums/TemperatureUnit.js';
import { TextAlignment } from './src/rpc/enums/TextAlignment.js';
import { TextFieldName } from './src/rpc/enums/TextFieldName.js';
import { TimerMode } from './src/rpc/enums/TimerMode.js';
import { TouchType } from './src/rpc/enums/TouchType.js';
import { TriggerSource } from './src/rpc/enums/TriggerSource.js';
import { TurnSignal } from './src/rpc/enums/TurnSignal.js';
import { UpdateMode } from './src/rpc/enums/UpdateMode.js';
import { VehicleDataActiveStatus } from './src/rpc/enums/VehicleDataActiveStatus.js';
import { VehicleDataEventStatus } from './src/rpc/enums/VehicleDataEventStatus.js';
import { VehicleDataNotificationStatus } from './src/rpc/enums/VehicleDataNotificationStatus.js';
import { VehicleDataResultCode } from './src/rpc/enums/VehicleDataResultCode.js';
import { VehicleDataStatus } from './src/rpc/enums/VehicleDataStatus.js';
import { VehicleDataType } from './src/rpc/enums/VehicleDataType.js';
import { VentilationMode } from './src/rpc/enums/VentilationMode.js';
import { VideoStreamingCodec } from './src/rpc/enums/VideoStreamingCodec.js';
import { VideoStreamingProtocol } from './src/rpc/enums/VideoStreamingProtocol.js';
import { VideoStreamingState } from './src/rpc/enums/VideoStreamingState.js';
import { VrCapabilities } from './src/rpc/enums/VrCapabilities.js';
import { WarningLightStatus } from './src/rpc/enums/WarningLightStatus.js';
import { WayPointType } from './src/rpc/enums/WayPointType.js';
import { WindowType } from './src/rpc/enums/WindowType.js';
import { WiperStatus } from './src/rpc/enums/WiperStatus.js';
import { messageType } from './src/rpc/enums/messageType.js';
import { AddCommand } from './src/rpc/messages/AddCommand.js';
import { AddCommandResponse } from './src/rpc/messages/AddCommandResponse.js';
import { AddSubMenu } from './src/rpc/messages/AddSubMenu.js';
import { AddSubMenuResponse } from './src/rpc/messages/AddSubMenuResponse.js';
import { Alert } from './src/rpc/messages/Alert.js';
import { AlertManeuver } from './src/rpc/messages/AlertManeuver.js';
import { AlertManeuverResponse } from './src/rpc/messages/AlertManeuverResponse.js';
import { AlertResponse } from './src/rpc/messages/AlertResponse.js';
import { ButtonPress } from './src/rpc/messages/ButtonPress.js';
import { ButtonPressResponse } from './src/rpc/messages/ButtonPressResponse.js';
import { CancelInteraction } from './src/rpc/messages/CancelInteraction.js';
import { CancelInteractionResponse } from './src/rpc/messages/CancelInteractionResponse.js';
import { ChangeRegistration } from './src/rpc/messages/ChangeRegistration.js';
import { ChangeRegistrationResponse } from './src/rpc/messages/ChangeRegistrationResponse.js';
import { CloseApplication } from './src/rpc/messages/CloseApplication.js';
import { CloseApplicationResponse } from './src/rpc/messages/CloseApplicationResponse.js';
import { CreateInteractionChoiceSet } from './src/rpc/messages/CreateInteractionChoiceSet.js';
import { CreateInteractionChoiceSetResponse } from './src/rpc/messages/CreateInteractionChoiceSetResponse.js';
import { CreateWindow } from './src/rpc/messages/CreateWindow.js';
import { CreateWindowResponse } from './src/rpc/messages/CreateWindowResponse.js';
import { DeleteCommand } from './src/rpc/messages/DeleteCommand.js';
import { DeleteCommandResponse } from './src/rpc/messages/DeleteCommandResponse.js';
import { DeleteFile } from './src/rpc/messages/DeleteFile.js';
import { DeleteFileResponse } from './src/rpc/messages/DeleteFileResponse.js';
import { DeleteInteractionChoiceSet } from './src/rpc/messages/DeleteInteractionChoiceSet.js';
import { DeleteInteractionChoiceSetResponse } from './src/rpc/messages/DeleteInteractionChoiceSetResponse.js';
import { DeleteSubMenu } from './src/rpc/messages/DeleteSubMenu.js';
import { DeleteSubMenuResponse } from './src/rpc/messages/DeleteSubMenuResponse.js';
import { DeleteWindow } from './src/rpc/messages/DeleteWindow.js';
import { DeleteWindowResponse } from './src/rpc/messages/DeleteWindowResponse.js';
import { DiagnosticMessage } from './src/rpc/messages/DiagnosticMessage.js';
import { DiagnosticMessageResponse } from './src/rpc/messages/DiagnosticMessageResponse.js';
import { DialNumber } from './src/rpc/messages/DialNumber.js';
import { DialNumberResponse } from './src/rpc/messages/DialNumberResponse.js';
import { EncodedSyncPData } from './src/rpc/messages/EncodedSyncPData.js';
import { EncodedSyncPDataResponse } from './src/rpc/messages/EncodedSyncPDataResponse.js';
import { EndAudioPassThru } from './src/rpc/messages/EndAudioPassThru.js';
import { EndAudioPassThruResponse } from './src/rpc/messages/EndAudioPassThruResponse.js';
import { GenericResponseResponse } from './src/rpc/messages/GenericResponseResponse.js';
import { GetAppServiceData } from './src/rpc/messages/GetAppServiceData.js';
import { GetAppServiceDataResponse } from './src/rpc/messages/GetAppServiceDataResponse.js';
import { GetCloudAppProperties } from './src/rpc/messages/GetCloudAppProperties.js';
import { GetCloudAppPropertiesResponse } from './src/rpc/messages/GetCloudAppPropertiesResponse.js';
import { GetDTCs } from './src/rpc/messages/GetDTCs.js';
import { GetDTCsResponse } from './src/rpc/messages/GetDTCsResponse.js';
import { GetFile } from './src/rpc/messages/GetFile.js';
import { GetFileResponse } from './src/rpc/messages/GetFileResponse.js';
import { GetInteriorVehicleData } from './src/rpc/messages/GetInteriorVehicleData.js';
import { GetInteriorVehicleDataConsent } from './src/rpc/messages/GetInteriorVehicleDataConsent.js';
import { GetInteriorVehicleDataConsentResponse } from './src/rpc/messages/GetInteriorVehicleDataConsentResponse.js';
import { GetInteriorVehicleDataResponse } from './src/rpc/messages/GetInteriorVehicleDataResponse.js';
import { GetSystemCapability } from './src/rpc/messages/GetSystemCapability.js';
import { GetSystemCapabilityResponse } from './src/rpc/messages/GetSystemCapabilityResponse.js';
import { GetVehicleData } from './src/rpc/messages/GetVehicleData.js';
import { GetVehicleDataResponse } from './src/rpc/messages/GetVehicleDataResponse.js';
import { GetWayPoints } from './src/rpc/messages/GetWayPoints.js';
import { GetWayPointsResponse } from './src/rpc/messages/GetWayPointsResponse.js';
import { ListFiles } from './src/rpc/messages/ListFiles.js';
import { ListFilesResponse } from './src/rpc/messages/ListFilesResponse.js';
import { OnAppInterfaceUnregistered } from './src/rpc/messages/OnAppInterfaceUnregistered.js';
import { OnAppServiceData } from './src/rpc/messages/OnAppServiceData.js';
import { OnAudioPassThru } from './src/rpc/messages/OnAudioPassThru.js';
import { OnButtonEvent } from './src/rpc/messages/OnButtonEvent.js';
import { OnButtonPress } from './src/rpc/messages/OnButtonPress.js';
import { OnCommand } from './src/rpc/messages/OnCommand.js';
import { OnDriverDistraction } from './src/rpc/messages/OnDriverDistraction.js';
import { OnEncodedSyncPData } from './src/rpc/messages/OnEncodedSyncPData.js';
import { OnHMIStatus } from './src/rpc/messages/OnHMIStatus.js';
import { OnHashChange } from './src/rpc/messages/OnHashChange.js';
import { OnInteriorVehicleData } from './src/rpc/messages/OnInteriorVehicleData.js';
import { OnKeyboardInput } from './src/rpc/messages/OnKeyboardInput.js';
import { OnLanguageChange } from './src/rpc/messages/OnLanguageChange.js';
import { OnPermissionsChange } from './src/rpc/messages/OnPermissionsChange.js';
import { OnRCStatus } from './src/rpc/messages/OnRCStatus.js';
import { OnSystemCapabilityUpdated } from './src/rpc/messages/OnSystemCapabilityUpdated.js';
import { OnSystemRequest } from './src/rpc/messages/OnSystemRequest.js';
import { OnTBTClientState } from './src/rpc/messages/OnTBTClientState.js';
import { OnTouchEvent } from './src/rpc/messages/OnTouchEvent.js';
import { OnVehicleData } from './src/rpc/messages/OnVehicleData.js';
import { OnWayPointChange } from './src/rpc/messages/OnWayPointChange.js';
import { PerformAppServiceInteraction } from './src/rpc/messages/PerformAppServiceInteraction.js';
import { PerformAppServiceInteractionResponse } from './src/rpc/messages/PerformAppServiceInteractionResponse.js';
import { PerformAudioPassThru } from './src/rpc/messages/PerformAudioPassThru.js';
import { PerformAudioPassThruResponse } from './src/rpc/messages/PerformAudioPassThruResponse.js';
import { PerformInteraction } from './src/rpc/messages/PerformInteraction.js';
import { PerformInteractionResponse } from './src/rpc/messages/PerformInteractionResponse.js';
import { PublishAppService } from './src/rpc/messages/PublishAppService.js';
import { PublishAppServiceResponse } from './src/rpc/messages/PublishAppServiceResponse.js';
import { PutFile } from './src/rpc/messages/PutFile.js';
import { PutFileResponse } from './src/rpc/messages/PutFileResponse.js';
import { ReadDID } from './src/rpc/messages/ReadDID.js';
import { ReadDIDResponse } from './src/rpc/messages/ReadDIDResponse.js';
import { RegisterAppInterface } from './src/rpc/messages/RegisterAppInterface.js';
import { RegisterAppInterfaceResponse } from './src/rpc/messages/RegisterAppInterfaceResponse.js';
import { ReleaseInteriorVehicleDataModule } from './src/rpc/messages/ReleaseInteriorVehicleDataModule.js';
import { ReleaseInteriorVehicleDataModuleResponse } from './src/rpc/messages/ReleaseInteriorVehicleDataModuleResponse.js';
import { ResetGlobalProperties } from './src/rpc/messages/ResetGlobalProperties.js';
import { ResetGlobalPropertiesResponse } from './src/rpc/messages/ResetGlobalPropertiesResponse.js';
import { ScrollableMessage } from './src/rpc/messages/ScrollableMessage.js';
import { ScrollableMessageResponse } from './src/rpc/messages/ScrollableMessageResponse.js';
import { SendHapticData } from './src/rpc/messages/SendHapticData.js';
import { SendHapticDataResponse } from './src/rpc/messages/SendHapticDataResponse.js';
import { SendLocation } from './src/rpc/messages/SendLocation.js';
import { SendLocationResponse } from './src/rpc/messages/SendLocationResponse.js';
import { SetAppIcon } from './src/rpc/messages/SetAppIcon.js';
import { SetAppIconResponse } from './src/rpc/messages/SetAppIconResponse.js';
import { SetCloudAppProperties } from './src/rpc/messages/SetCloudAppProperties.js';
import { SetCloudAppPropertiesResponse } from './src/rpc/messages/SetCloudAppPropertiesResponse.js';
import { SetDisplayLayout } from './src/rpc/messages/SetDisplayLayout.js';
import { SetDisplayLayoutResponse } from './src/rpc/messages/SetDisplayLayoutResponse.js';
import { SetGlobalProperties } from './src/rpc/messages/SetGlobalProperties.js';
import { SetGlobalPropertiesResponse } from './src/rpc/messages/SetGlobalPropertiesResponse.js';
import { SetInteriorVehicleData } from './src/rpc/messages/SetInteriorVehicleData.js';
import { SetInteriorVehicleDataResponse } from './src/rpc/messages/SetInteriorVehicleDataResponse.js';
import { SetMediaClockTimer } from './src/rpc/messages/SetMediaClockTimer.js';
import { SetMediaClockTimerResponse } from './src/rpc/messages/SetMediaClockTimerResponse.js';
import { Show } from './src/rpc/messages/Show.js';
import { ShowAppMenu } from './src/rpc/messages/ShowAppMenu.js';
import { ShowAppMenuResponse } from './src/rpc/messages/ShowAppMenuResponse.js';
import { ShowConstantTBT } from './src/rpc/messages/ShowConstantTBT.js';
import { ShowConstantTBTResponse } from './src/rpc/messages/ShowConstantTBTResponse.js';
import { ShowResponse } from './src/rpc/messages/ShowResponse.js';
import { Slider } from './src/rpc/messages/Slider.js';
import { SliderResponse } from './src/rpc/messages/SliderResponse.js';
import { Speak } from './src/rpc/messages/Speak.js';
import { SpeakResponse } from './src/rpc/messages/SpeakResponse.js';
import { SubscribeButton } from './src/rpc/messages/SubscribeButton.js';
import { SubscribeButtonResponse } from './src/rpc/messages/SubscribeButtonResponse.js';
import { SubscribeVehicleData } from './src/rpc/messages/SubscribeVehicleData.js';
import { SubscribeVehicleDataResponse } from './src/rpc/messages/SubscribeVehicleDataResponse.js';
import { SubscribeWayPoints } from './src/rpc/messages/SubscribeWayPoints.js';
import { SubscribeWayPointsResponse } from './src/rpc/messages/SubscribeWayPointsResponse.js';
import { SystemRequest } from './src/rpc/messages/SystemRequest.js';
import { SystemRequestResponse } from './src/rpc/messages/SystemRequestResponse.js';
import { UnpublishAppService } from './src/rpc/messages/UnpublishAppService.js';
import { UnpublishAppServiceResponse } from './src/rpc/messages/UnpublishAppServiceResponse.js';
import { UnregisterAppInterface } from './src/rpc/messages/UnregisterAppInterface.js';
import { UnregisterAppInterfaceResponse } from './src/rpc/messages/UnregisterAppInterfaceResponse.js';
import { UnsubscribeButton } from './src/rpc/messages/UnsubscribeButton.js';
import { UnsubscribeButtonResponse } from './src/rpc/messages/UnsubscribeButtonResponse.js';
import { UnsubscribeVehicleData } from './src/rpc/messages/UnsubscribeVehicleData.js';
import { UnsubscribeVehicleDataResponse } from './src/rpc/messages/UnsubscribeVehicleDataResponse.js';
import { UnsubscribeWayPoints } from './src/rpc/messages/UnsubscribeWayPoints.js';
import { UnsubscribeWayPointsResponse } from './src/rpc/messages/UnsubscribeWayPointsResponse.js';
import { UpdateTurnList } from './src/rpc/messages/UpdateTurnList.js';
import { UpdateTurnListResponse } from './src/rpc/messages/UpdateTurnListResponse.js';
import { AirbagStatus } from './src/rpc/structs/AirbagStatus.js';
import { AppInfo } from './src/rpc/structs/AppInfo.js';
import { AppServiceCapability } from './src/rpc/structs/AppServiceCapability.js';
import { AppServiceData } from './src/rpc/structs/AppServiceData.js';
import { AppServiceManifest } from './src/rpc/structs/AppServiceManifest.js';
import { AppServiceRecord } from './src/rpc/structs/AppServiceRecord.js';
import { AppServicesCapabilities } from './src/rpc/structs/AppServicesCapabilities.js';
import { AudioControlCapabilities } from './src/rpc/structs/AudioControlCapabilities.js';
import { AudioControlData } from './src/rpc/structs/AudioControlData.js';
import { AudioPassThruCapabilities } from './src/rpc/structs/AudioPassThruCapabilities.js';
import { BeltStatus } from './src/rpc/structs/BeltStatus.js';
import { BodyInformation } from './src/rpc/structs/BodyInformation.js';
import { ButtonCapabilities } from './src/rpc/structs/ButtonCapabilities.js';
import { Choice } from './src/rpc/structs/Choice.js';
import { ClimateControlCapabilities } from './src/rpc/structs/ClimateControlCapabilities.js';
import { ClimateControlData } from './src/rpc/structs/ClimateControlData.js';
import { CloudAppProperties } from './src/rpc/structs/CloudAppProperties.js';
import { ClusterModeStatus } from './src/rpc/structs/ClusterModeStatus.js';
import { Coordinate } from './src/rpc/structs/Coordinate.js';
import { DIDResult } from './src/rpc/structs/DIDResult.js';
import { DateTime } from './src/rpc/structs/DateTime.js';
import { DeviceInfo } from './src/rpc/structs/DeviceInfo.js';
import { DeviceStatus } from './src/rpc/structs/DeviceStatus.js';
import { DisplayCapabilities } from './src/rpc/structs/DisplayCapabilities.js';
import { DisplayCapability } from './src/rpc/structs/DisplayCapability.js';
import { ECallInfo } from './src/rpc/structs/ECallInfo.js';
import { EmergencyEvent } from './src/rpc/structs/EmergencyEvent.js';
import { EqualizerSettings } from './src/rpc/structs/EqualizerSettings.js';
import { FuelRange } from './src/rpc/structs/FuelRange.js';
import { GPSData } from './src/rpc/structs/GPSData.js';
import { Grid } from './src/rpc/structs/Grid.js';
import { HMICapabilities } from './src/rpc/structs/HMICapabilities.js';
import { HMIPermissions } from './src/rpc/structs/HMIPermissions.js';
import { HMISettingsControlCapabilities } from './src/rpc/structs/HMISettingsControlCapabilities.js';
import { HMISettingsControlData } from './src/rpc/structs/HMISettingsControlData.js';
import { HapticRect } from './src/rpc/structs/HapticRect.js';
import { HeadLampStatus } from './src/rpc/structs/HeadLampStatus.js';
import { Image } from './src/rpc/structs/Image.js';
import { ImageField } from './src/rpc/structs/ImageField.js';
import { ImageResolution } from './src/rpc/structs/ImageResolution.js';
import { KeyboardProperties } from './src/rpc/structs/KeyboardProperties.js';
import { LightCapabilities } from './src/rpc/structs/LightCapabilities.js';
import { LightControlCapabilities } from './src/rpc/structs/LightControlCapabilities.js';
import { LightControlData } from './src/rpc/structs/LightControlData.js';
import { LightState } from './src/rpc/structs/LightState.js';
import { LocationDetails } from './src/rpc/structs/LocationDetails.js';
import { MassageCushionFirmness } from './src/rpc/structs/MassageCushionFirmness.js';
import { MassageModeData } from './src/rpc/structs/MassageModeData.js';
import { MediaServiceData } from './src/rpc/structs/MediaServiceData.js';
import { MediaServiceManifest } from './src/rpc/structs/MediaServiceManifest.js';
import { MenuParams } from './src/rpc/structs/MenuParams.js';
import { MetadataTags } from './src/rpc/structs/MetadataTags.js';
import { ModuleData } from './src/rpc/structs/ModuleData.js';
import { ModuleInfo } from './src/rpc/structs/ModuleInfo.js';
import { MyKey } from './src/rpc/structs/MyKey.js';
import { NavigationCapability } from './src/rpc/structs/NavigationCapability.js';
import { NavigationInstruction } from './src/rpc/structs/NavigationInstruction.js';
import { NavigationServiceData } from './src/rpc/structs/NavigationServiceData.js';
import { NavigationServiceManifest } from './src/rpc/structs/NavigationServiceManifest.js';
import { OASISAddress } from './src/rpc/structs/OASISAddress.js';
import { ParameterPermissions } from './src/rpc/structs/ParameterPermissions.js';
import { PermissionItem } from './src/rpc/structs/PermissionItem.js';
import { PhoneCapability } from './src/rpc/structs/PhoneCapability.js';
import { PresetBankCapabilities } from './src/rpc/structs/PresetBankCapabilities.js';
import { RGBColor } from './src/rpc/structs/RGBColor.js';
import { RadioControlCapabilities } from './src/rpc/structs/RadioControlCapabilities.js';
import { RadioControlData } from './src/rpc/structs/RadioControlData.js';
import { RdsData } from './src/rpc/structs/RdsData.js';
import { Rectangle } from './src/rpc/structs/Rectangle.js';
import { RemoteControlCapabilities } from './src/rpc/structs/RemoteControlCapabilities.js';
import { ScreenParams } from './src/rpc/structs/ScreenParams.js';
import { SdlMsgVersion } from './src/rpc/structs/SdlMsgVersion.js';
import { SeatControlCapabilities } from './src/rpc/structs/SeatControlCapabilities.js';
import { SeatControlData } from './src/rpc/structs/SeatControlData.js';
import { SeatLocation } from './src/rpc/structs/SeatLocation.js';
import { SeatLocationCapability } from './src/rpc/structs/SeatLocationCapability.js';
import { SeatMemoryAction } from './src/rpc/structs/SeatMemoryAction.js';
import { SingleTireStatus } from './src/rpc/structs/SingleTireStatus.js';
import { SisData } from './src/rpc/structs/SisData.js';
import { SoftButton } from './src/rpc/structs/SoftButton.js';
import { SoftButtonCapabilities } from './src/rpc/structs/SoftButtonCapabilities.js';
import { StartTime } from './src/rpc/structs/StartTime.js';
import { StationIDNumber } from './src/rpc/structs/StationIDNumber.js';
import { SystemCapability } from './src/rpc/structs/SystemCapability.js';
import { TTSChunk } from './src/rpc/structs/TTSChunk.js';
import { Temperature } from './src/rpc/structs/Temperature.js';
import { TemplateColorScheme } from './src/rpc/structs/TemplateColorScheme.js';
import { TemplateConfiguration } from './src/rpc/structs/TemplateConfiguration.js';
import { TextField } from './src/rpc/structs/TextField.js';
import { TireStatus } from './src/rpc/structs/TireStatus.js';
import { TouchCoord } from './src/rpc/structs/TouchCoord.js';
import { TouchEvent } from './src/rpc/structs/TouchEvent.js';
import { TouchEventCapabilities } from './src/rpc/structs/TouchEventCapabilities.js';
import { Turn } from './src/rpc/structs/Turn.js';
import { VehicleDataResult } from './src/rpc/structs/VehicleDataResult.js';
import { VehicleType } from './src/rpc/structs/VehicleType.js';
import { VideoStreamingCapability } from './src/rpc/structs/VideoStreamingCapability.js';
import { VideoStreamingFormat } from './src/rpc/structs/VideoStreamingFormat.js';
import { VrHelpItem } from './src/rpc/structs/VrHelpItem.js';
import { WeatherAlert } from './src/rpc/structs/WeatherAlert.js';
import { WeatherData } from './src/rpc/structs/WeatherData.js';
import { WeatherServiceData } from './src/rpc/structs/WeatherServiceData.js';
import { WeatherServiceManifest } from './src/rpc/structs/WeatherServiceManifest.js';
import { WindowCapability } from './src/rpc/structs/WindowCapability.js';
import { WindowTypeCapabilities } from './src/rpc/structs/WindowTypeCapabilities.js';
import { SdlServiceListener } from './src/session/SdlServiceListener.js';
import { SdlSession } from './src/session/SdlSession.js';
import { SdlSessionListener } from './src/session/SdlSessionListener.js';
import { ServiceListenerMap } from './src/session/ServiceListenerMap.js';
import { VideoStreamingParameters } from './src/streaming/video/VideoStreamingParameters.js';
import { CustomTransport } from './src/transport/CustomTransport.js';
import { CustomTransportConfig } from './src/transport/CustomTransportConfig.js';
import { SdlPsm } from './src/transport/SdlPsm.js';
import { SslConfig } from './src/transport/SslConfig.js';
import { TransportBase } from './src/transport/TransportBase.js';
import { TransportCallback } from './src/transport/TransportCallback.js';
import { TransportConfigBase } from './src/transport/TransportConfigBase.js';
import { TransportListener } from './src/transport/TransportListener.js';
import { TransportManager } from './src/transport/TransportManager.js';
import { TransportManagerBase } from './src/transport/TransportManagerBase.js';
import { WebSocketClient } from './src/transport/WebSocketClient.js';
import { WebSocketClientConfig } from './src/transport/WebSocketClientConfig.js';
import { TransportType } from './src/transport/enums/TransportType.js';
import { TransportRecord } from './src/transport/util/TransportRecord.js';
import { ArrayTools } from './src/util/ArrayTools.js';
import { BitConverter } from './src/util/BitConverter.js';
import { Bson } from './src/util/Bson.js';
import { Enum } from './src/util/Enum.js';
import { FileUtils } from './src/util/FileUtils.js';
import { JsonRpcMarshaller } from './src/util/JsonRpcMarshaller.js';
import { TextEncoder } from './src/util/TextEncoder.js';
import { Version } from './src/util/Version.js';

const SDL = {
    manager: {
        AppConfig,
        BaseSubManager,
        file: {
            BaseFileManager,
            FileManager,
            filetypes: {
                SdlArtwork,
                SdlFile,
            },
        },
        lifecycle: {
            LifecycleListener,
            LifecycleManager,
        },
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
            ServiceType,
        },
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
            AmbientLightStatus,
            AppHMIType,
            AppInterfaceUnregisteredReason,
            AppServiceType,
            AudioStreamingIndicator,
            AudioStreamingState,
            AudioType,
            BitsPerSample,
            ButtonEventMode,
            ButtonName,
            ButtonPressMode,
            CarModeStatus,
            CharacterSet,
            CompassDirection,
            ComponentVolumeStatus,
            DefrostZone,
            DeliveryMode,
            DeviceLevelStatus,
            Dimension,
            Direction,
            DisplayMode,
            DisplayType,
            DistanceUnit,
            DriverDistractionState,
            ECallConfirmationStatus,
            ElectronicParkBrakeStatus,
            EmergencyEventType,
            FileType,
            FuelCutoffStatus,
            FuelType,
            FunctionID,
            GlobalProperty,
            HMILevel,
            HmiZoneCapabilities,
            HybridAppPreference,
            IgnitionStableStatus,
            IgnitionStatus,
            ImageFieldName,
            ImageType,
            InteractionMode,
            KeyboardEvent,
            KeyboardLayout,
            KeypressMode,
            Language,
            LayoutMode,
            LightName,
            LightStatus,
            MaintenanceModeStatus,
            MassageCushion,
            MassageMode,
            MassageZone,
            MediaClockFormat,
            MediaType,
            MenuLayout,
            MetadataType,
            ModuleType,
            NavigationAction,
            NavigationJunction,
            PRNDL,
            PermissionStatus,
            PowerModeQualificationStatus,
            PowerModeStatus,
            PredefinedLayout,
            PredefinedWindows,
            PrerecordedSpeech,
            PrimaryAudioSource,
            RadioBand,
            RadioState,
            RequestType,
            Result,
            RpcType,
            SamplingRate,
            SeatMemoryActionType,
            ServiceUpdateReason,
            SoftButtonType,
            SpeechCapabilities,
            SupportedSeat,
            SystemAction,
            SystemCapabilityType,
            SystemContext,
            TBTState,
            TPMS,
            TemperatureUnit,
            TextAlignment,
            TextFieldName,
            TimerMode,
            TouchType,
            TriggerSource,
            TurnSignal,
            UpdateMode,
            VehicleDataActiveStatus,
            VehicleDataEventStatus,
            VehicleDataNotificationStatus,
            VehicleDataResultCode,
            VehicleDataStatus,
            VehicleDataType,
            VentilationMode,
            VideoStreamingCodec,
            VideoStreamingProtocol,
            VideoStreamingState,
            VrCapabilities,
            WarningLightStatus,
            WayPointType,
            WindowType,
            WiperStatus,
            messageType,
        },
        messages: {
            AddCommand,
            AddCommandResponse,
            AddSubMenu,
            AddSubMenuResponse,
            Alert,
            AlertManeuver,
            AlertManeuverResponse,
            AlertResponse,
            ButtonPress,
            ButtonPressResponse,
            CancelInteraction,
            CancelInteractionResponse,
            ChangeRegistration,
            ChangeRegistrationResponse,
            CloseApplication,
            CloseApplicationResponse,
            CreateInteractionChoiceSet,
            CreateInteractionChoiceSetResponse,
            CreateWindow,
            CreateWindowResponse,
            DeleteCommand,
            DeleteCommandResponse,
            DeleteFile,
            DeleteFileResponse,
            DeleteInteractionChoiceSet,
            DeleteInteractionChoiceSetResponse,
            DeleteSubMenu,
            DeleteSubMenuResponse,
            DeleteWindow,
            DeleteWindowResponse,
            DiagnosticMessage,
            DiagnosticMessageResponse,
            DialNumber,
            DialNumberResponse,
            EncodedSyncPData,
            EncodedSyncPDataResponse,
            EndAudioPassThru,
            EndAudioPassThruResponse,
            GenericResponseResponse,
            GetAppServiceData,
            GetAppServiceDataResponse,
            GetCloudAppProperties,
            GetCloudAppPropertiesResponse,
            GetDTCs,
            GetDTCsResponse,
            GetFile,
            GetFileResponse,
            GetInteriorVehicleData,
            GetInteriorVehicleDataConsent,
            GetInteriorVehicleDataConsentResponse,
            GetInteriorVehicleDataResponse,
            GetSystemCapability,
            GetSystemCapabilityResponse,
            GetVehicleData,
            GetVehicleDataResponse,
            GetWayPoints,
            GetWayPointsResponse,
            ListFiles,
            ListFilesResponse,
            OnAppInterfaceUnregistered,
            OnAppServiceData,
            OnAudioPassThru,
            OnButtonEvent,
            OnButtonPress,
            OnCommand,
            OnDriverDistraction,
            OnEncodedSyncPData,
            OnHMIStatus,
            OnHashChange,
            OnInteriorVehicleData,
            OnKeyboardInput,
            OnLanguageChange,
            OnPermissionsChange,
            OnRCStatus,
            OnSystemCapabilityUpdated,
            OnSystemRequest,
            OnTBTClientState,
            OnTouchEvent,
            OnVehicleData,
            OnWayPointChange,
            PerformAppServiceInteraction,
            PerformAppServiceInteractionResponse,
            PerformAudioPassThru,
            PerformAudioPassThruResponse,
            PerformInteraction,
            PerformInteractionResponse,
            PublishAppService,
            PublishAppServiceResponse,
            PutFile,
            PutFileResponse,
            ReadDID,
            ReadDIDResponse,
            RegisterAppInterface,
            RegisterAppInterfaceResponse,
            ReleaseInteriorVehicleDataModule,
            ReleaseInteriorVehicleDataModuleResponse,
            ResetGlobalProperties,
            ResetGlobalPropertiesResponse,
            ScrollableMessage,
            ScrollableMessageResponse,
            SendHapticData,
            SendHapticDataResponse,
            SendLocation,
            SendLocationResponse,
            SetAppIcon,
            SetAppIconResponse,
            SetCloudAppProperties,
            SetCloudAppPropertiesResponse,
            SetDisplayLayout,
            SetDisplayLayoutResponse,
            SetGlobalProperties,
            SetGlobalPropertiesResponse,
            SetInteriorVehicleData,
            SetInteriorVehicleDataResponse,
            SetMediaClockTimer,
            SetMediaClockTimerResponse,
            Show,
            ShowAppMenu,
            ShowAppMenuResponse,
            ShowConstantTBT,
            ShowConstantTBTResponse,
            ShowResponse,
            Slider,
            SliderResponse,
            Speak,
            SpeakResponse,
            SubscribeButton,
            SubscribeButtonResponse,
            SubscribeVehicleData,
            SubscribeVehicleDataResponse,
            SubscribeWayPoints,
            SubscribeWayPointsResponse,
            SystemRequest,
            SystemRequestResponse,
            UnpublishAppService,
            UnpublishAppServiceResponse,
            UnregisterAppInterface,
            UnregisterAppInterfaceResponse,
            UnsubscribeButton,
            UnsubscribeButtonResponse,
            UnsubscribeVehicleData,
            UnsubscribeVehicleDataResponse,
            UnsubscribeWayPoints,
            UnsubscribeWayPointsResponse,
            UpdateTurnList,
            UpdateTurnListResponse,
        },
        structs: {
            AirbagStatus,
            AppInfo,
            AppServiceCapability,
            AppServiceData,
            AppServiceManifest,
            AppServiceRecord,
            AppServicesCapabilities,
            AudioControlCapabilities,
            AudioControlData,
            AudioPassThruCapabilities,
            BeltStatus,
            BodyInformation,
            ButtonCapabilities,
            Choice,
            ClimateControlCapabilities,
            ClimateControlData,
            CloudAppProperties,
            ClusterModeStatus,
            Coordinate,
            DIDResult,
            DateTime,
            DeviceInfo,
            DeviceStatus,
            DisplayCapabilities,
            DisplayCapability,
            ECallInfo,
            EmergencyEvent,
            EqualizerSettings,
            FuelRange,
            GPSData,
            Grid,
            HMICapabilities,
            HMIPermissions,
            HMISettingsControlCapabilities,
            HMISettingsControlData,
            HapticRect,
            HeadLampStatus,
            Image,
            ImageField,
            ImageResolution,
            KeyboardProperties,
            LightCapabilities,
            LightControlCapabilities,
            LightControlData,
            LightState,
            LocationDetails,
            MassageCushionFirmness,
            MassageModeData,
            MediaServiceData,
            MediaServiceManifest,
            MenuParams,
            MetadataTags,
            ModuleData,
            ModuleInfo,
            MyKey,
            NavigationCapability,
            NavigationInstruction,
            NavigationServiceData,
            NavigationServiceManifest,
            OASISAddress,
            ParameterPermissions,
            PermissionItem,
            PhoneCapability,
            PresetBankCapabilities,
            RGBColor,
            RadioControlCapabilities,
            RadioControlData,
            RdsData,
            Rectangle,
            RemoteControlCapabilities,
            ScreenParams,
            SdlMsgVersion,
            SeatControlCapabilities,
            SeatControlData,
            SeatLocation,
            SeatLocationCapability,
            SeatMemoryAction,
            SingleTireStatus,
            SisData,
            SoftButton,
            SoftButtonCapabilities,
            StartTime,
            StationIDNumber,
            SystemCapability,
            TTSChunk,
            Temperature,
            TemplateColorScheme,
            TemplateConfiguration,
            TextField,
            TireStatus,
            TouchCoord,
            TouchEvent,
            TouchEventCapabilities,
            Turn,
            VehicleDataResult,
            VehicleType,
            VideoStreamingCapability,
            VideoStreamingFormat,
            VrHelpItem,
            WeatherAlert,
            WeatherData,
            WeatherServiceData,
            WeatherServiceManifest,
            WindowCapability,
            WindowTypeCapabilities,
        },
    },
    session: {
        SdlServiceListener,
        SdlSession,
        SdlSessionListener,
        ServiceListenerMap,
    },
    streaming: {
        video: {
            VideoStreamingParameters,
        },
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
            TransportType,
        },
        util: {
            TransportRecord,
        },
    },
    util: {
        ArrayTools,
        BitConverter,
        Bson,
        Enum,
        FileUtils,
        JsonRpcMarshaller,
        TextEncoder,
        Version,
    },
};

export default SDL;