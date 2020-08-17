/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
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
import { AddSubMenu } from './messages/AddSubMenu.js';
import { AddSubMenuResponse } from './messages/AddSubMenuResponse.js';
import { Alert } from './messages/Alert.js';
import { AlertManeuver } from './messages/AlertManeuver.js';
import { AlertManeuverResponse } from './messages/AlertManeuverResponse.js';
import { AlertResponse } from './messages/AlertResponse.js';
import { ButtonPress } from './messages/ButtonPress.js';
import { ButtonPressResponse } from './messages/ButtonPressResponse.js';
import { CancelInteraction } from './messages/CancelInteraction.js';
import { CancelInteractionResponse } from './messages/CancelInteractionResponse.js';
import { ChangeRegistration } from './messages/ChangeRegistration.js';
import { ChangeRegistrationResponse } from './messages/ChangeRegistrationResponse.js';
import { CloseApplication } from './messages/CloseApplication.js';
import { CloseApplicationResponse } from './messages/CloseApplicationResponse.js';
import { CreateInteractionChoiceSet } from './messages/CreateInteractionChoiceSet.js';
import { CreateInteractionChoiceSetResponse } from './messages/CreateInteractionChoiceSetResponse.js';
import { CreateWindow } from './messages/CreateWindow.js';
import { CreateWindowResponse } from './messages/CreateWindowResponse.js';
import { DeleteCommand } from './messages/DeleteCommand.js';
import { DeleteCommandResponse } from './messages/DeleteCommandResponse.js';
import { DeleteFile } from './messages/DeleteFile.js';
import { DeleteFileResponse } from './messages/DeleteFileResponse.js';
import { DeleteInteractionChoiceSet } from './messages/DeleteInteractionChoiceSet.js';
import { DeleteInteractionChoiceSetResponse } from './messages/DeleteInteractionChoiceSetResponse.js';
import { DeleteSubMenu } from './messages/DeleteSubMenu.js';
import { DeleteSubMenuResponse } from './messages/DeleteSubMenuResponse.js';
import { DeleteWindow } from './messages/DeleteWindow.js';
import { DeleteWindowResponse } from './messages/DeleteWindowResponse.js';
import { DiagnosticMessage } from './messages/DiagnosticMessage.js';
import { DiagnosticMessageResponse } from './messages/DiagnosticMessageResponse.js';
import { DialNumber } from './messages/DialNumber.js';
import { DialNumberResponse } from './messages/DialNumberResponse.js';
import { EncodedSyncPData } from './messages/EncodedSyncPData.js';
import { EncodedSyncPDataResponse } from './messages/EncodedSyncPDataResponse.js';
import { EndAudioPassThru } from './messages/EndAudioPassThru.js';
import { EndAudioPassThruResponse } from './messages/EndAudioPassThruResponse.js';
import { GenericResponseResponse } from './messages/GenericResponseResponse.js';
import { GetAppServiceData } from './messages/GetAppServiceData.js';
import { GetAppServiceDataResponse } from './messages/GetAppServiceDataResponse.js';
import { GetCloudAppProperties } from './messages/GetCloudAppProperties.js';
import { GetCloudAppPropertiesResponse } from './messages/GetCloudAppPropertiesResponse.js';
import { GetDTCs } from './messages/GetDTCs.js';
import { GetDTCsResponse } from './messages/GetDTCsResponse.js';
import { GetFile } from './messages/GetFile.js';
import { GetFileResponse } from './messages/GetFileResponse.js';
import { GetInteriorVehicleData } from './messages/GetInteriorVehicleData.js';
import { GetInteriorVehicleDataConsent } from './messages/GetInteriorVehicleDataConsent.js';
import { GetInteriorVehicleDataConsentResponse } from './messages/GetInteriorVehicleDataConsentResponse.js';
import { GetInteriorVehicleDataResponse } from './messages/GetInteriorVehicleDataResponse.js';
import { GetSystemCapability } from './messages/GetSystemCapability.js';
import { GetSystemCapabilityResponse } from './messages/GetSystemCapabilityResponse.js';
import { GetVehicleData } from './messages/GetVehicleData.js';
import { GetVehicleDataResponse } from './messages/GetVehicleDataResponse.js';
import { GetWayPoints } from './messages/GetWayPoints.js';
import { GetWayPointsResponse } from './messages/GetWayPointsResponse.js';
import { ListFiles } from './messages/ListFiles.js';
import { ListFilesResponse } from './messages/ListFilesResponse.js';
import { OnAppInterfaceUnregistered } from './messages/OnAppInterfaceUnregistered.js';
import { OnAppServiceData } from './messages/OnAppServiceData.js';
import { OnAudioPassThru } from './messages/OnAudioPassThru.js';
import { OnButtonEvent } from './messages/OnButtonEvent.js';
import { OnButtonPress } from './messages/OnButtonPress.js';
import { OnCommand } from './messages/OnCommand.js';
import { OnDriverDistraction } from './messages/OnDriverDistraction.js';
import { OnEncodedSyncPData } from './messages/OnEncodedSyncPData.js';
import { OnHMIStatus } from './messages/OnHMIStatus.js';
import { OnHashChange } from './messages/OnHashChange.js';
import { OnInteriorVehicleData } from './messages/OnInteriorVehicleData.js';
import { OnKeyboardInput } from './messages/OnKeyboardInput.js';
import { OnLanguageChange } from './messages/OnLanguageChange.js';
import { OnPermissionsChange } from './messages/OnPermissionsChange.js';
import { OnSubtleAlertPressed } from './messages/OnSubtleAlertPressed.js';
import { OnRCStatus } from './messages/OnRCStatus.js';
import { OnSystemCapabilityUpdated } from './messages/OnSystemCapabilityUpdated.js';
import { OnSystemRequest } from './messages/OnSystemRequest.js';
import { OnTBTClientState } from './messages/OnTBTClientState.js';
import { OnTouchEvent } from './messages/OnTouchEvent.js';
import { OnUpdateFile } from './messages/OnUpdateFile.js';
import { OnUpdateSubMenu } from './messages/OnUpdateSubMenu.js';
import { OnVehicleData } from './messages/OnVehicleData.js';
import { OnWayPointChange } from './messages/OnWayPointChange.js';
import { PerformAppServiceInteraction } from './messages/PerformAppServiceInteraction.js';
import { PerformAppServiceInteractionResponse } from './messages/PerformAppServiceInteractionResponse.js';
import { PerformAudioPassThru } from './messages/PerformAudioPassThru.js';
import { PerformAudioPassThruResponse } from './messages/PerformAudioPassThruResponse.js';
import { PerformInteraction } from './messages/PerformInteraction.js';
import { PerformInteractionResponse } from './messages/PerformInteractionResponse.js';
import { PublishAppService } from './messages/PublishAppService.js';
import { PublishAppServiceResponse } from './messages/PublishAppServiceResponse.js';
import { PutFile } from './messages/PutFile.js';
import { PutFileResponse } from './messages/PutFileResponse.js';
import { ReadDID } from './messages/ReadDID.js';
import { ReadDIDResponse } from './messages/ReadDIDResponse.js';
import { RegisterAppInterface } from './messages/RegisterAppInterface.js';
import { RegisterAppInterfaceResponse } from './messages/RegisterAppInterfaceResponse.js';
import { ReleaseInteriorVehicleDataModule } from './messages/ReleaseInteriorVehicleDataModule.js';
import { ReleaseInteriorVehicleDataModuleResponse } from './messages/ReleaseInteriorVehicleDataModuleResponse.js';
import { ResetGlobalProperties } from './messages/ResetGlobalProperties.js';
import { ResetGlobalPropertiesResponse } from './messages/ResetGlobalPropertiesResponse.js';
import { ScrollableMessage } from './messages/ScrollableMessage.js';
import { ScrollableMessageResponse } from './messages/ScrollableMessageResponse.js';
import { SendHapticData } from './messages/SendHapticData.js';
import { SendHapticDataResponse } from './messages/SendHapticDataResponse.js';
import { SendLocation } from './messages/SendLocation.js';
import { SendLocationResponse } from './messages/SendLocationResponse.js';
import { SetAppIcon } from './messages/SetAppIcon.js';
import { SetAppIconResponse } from './messages/SetAppIconResponse.js';
import { SetCloudAppProperties } from './messages/SetCloudAppProperties.js';
import { SetCloudAppPropertiesResponse } from './messages/SetCloudAppPropertiesResponse.js';
import { SetDisplayLayout } from './messages/SetDisplayLayout.js';
import { SetDisplayLayoutResponse } from './messages/SetDisplayLayoutResponse.js';
import { SetGlobalProperties } from './messages/SetGlobalProperties.js';
import { SetGlobalPropertiesResponse } from './messages/SetGlobalPropertiesResponse.js';
import { SetInteriorVehicleData } from './messages/SetInteriorVehicleData.js';
import { SetInteriorVehicleDataResponse } from './messages/SetInteriorVehicleDataResponse.js';
import { SetMediaClockTimer } from './messages/SetMediaClockTimer.js';
import { SetMediaClockTimerResponse } from './messages/SetMediaClockTimerResponse.js';
import { Show } from './messages/Show.js';
import { ShowAppMenu } from './messages/ShowAppMenu.js';
import { ShowAppMenuResponse } from './messages/ShowAppMenuResponse.js';
import { ShowConstantTBT } from './messages/ShowConstantTBT.js';
import { ShowConstantTBTResponse } from './messages/ShowConstantTBTResponse.js';
import { ShowResponse } from './messages/ShowResponse.js';
import { Slider } from './messages/Slider.js';
import { SliderResponse } from './messages/SliderResponse.js';
import { Speak } from './messages/Speak.js';
import { SpeakResponse } from './messages/SpeakResponse.js';
import { SubscribeButton } from './messages/SubscribeButton.js';
import { SubscribeButtonResponse } from './messages/SubscribeButtonResponse.js';
import { SubscribeVehicleData } from './messages/SubscribeVehicleData.js';
import { SubscribeVehicleDataResponse } from './messages/SubscribeVehicleDataResponse.js';
import { SubscribeWayPoints } from './messages/SubscribeWayPoints.js';
import { SubscribeWayPointsResponse } from './messages/SubscribeWayPointsResponse.js';
import { SubtleAlert } from './messages/SubtleAlert.js';
import { SubtleAlertResponse } from './messages/SubtleAlertResponse.js';
import { SystemRequest } from './messages/SystemRequest.js';
import { SystemRequestResponse } from './messages/SystemRequestResponse.js';
import { UnpublishAppService } from './messages/UnpublishAppService.js';
import { UnpublishAppServiceResponse } from './messages/UnpublishAppServiceResponse.js';
import { UnregisterAppInterface } from './messages/UnregisterAppInterface.js';
import { UnregisterAppInterfaceResponse } from './messages/UnregisterAppInterfaceResponse.js';
import { UnsubscribeButton } from './messages/UnsubscribeButton.js';
import { UnsubscribeButtonResponse } from './messages/UnsubscribeButtonResponse.js';
import { UnsubscribeVehicleData } from './messages/UnsubscribeVehicleData.js';
import { UnsubscribeVehicleDataResponse } from './messages/UnsubscribeVehicleDataResponse.js';
import { UnsubscribeWayPoints } from './messages/UnsubscribeWayPoints.js';
import { UnsubscribeWayPointsResponse } from './messages/UnsubscribeWayPointsResponse.js';
import { UpdateTurnList } from './messages/UpdateTurnList.js';
import { UpdateTurnListResponse } from './messages/UpdateTurnListResponse.js';

// other
import { MessageType } from './enums/MessageType.js';
import { FunctionID } from './enums/FunctionID.js';
import { _JsonRpcMarshaller } from './../util/_JsonRpcMarshaller.js';
import { _BinaryFrameHeader } from './../protocol/_BinaryFrameHeader.js';

class RpcCreator {
    /**
     * Converts an _SdlPacket to an RpcMessage
     * @param {_SdlPacket} sdlPacket - An _SdlPacket to convert.
     * @returns {RpcMessage} - The constructed RpcMessage.
     */
    static construct (sdlPacket) {
        const payload = sdlPacket.getPayload();
        const binaryFrameHeader = _BinaryFrameHeader.fromBinaryHeader(payload);

        let message;
        const messageType = binaryFrameHeader.getMessageType();
        const rpcName = MessageType.keyForValue(messageType);
        const correlationId = binaryFrameHeader.getCorrelationId();
        const functionId = binaryFrameHeader.getFunctionId();
        const functionName = FunctionID.keyForValue(functionId);
        const bulkData = binaryFrameHeader.getBulkData();
        const jsonData = binaryFrameHeader.getJsonData();
        const params = {};
        // not-empty object check
        if (Object.keys(jsonData).length !== 0) {
            params.parameters = _JsonRpcMarshaller.unmarshall(jsonData);
        }

        switch (functionId) {
            case FunctionID.RegisterAppInterface:
                if (messageType === MessageType.request) {
                    message = new RegisterAppInterface(params);
                } else if (messageType === MessageType.response) {
                    message = new RegisterAppInterfaceResponse(params);
                }
                break;
            case FunctionID.UnregisterAppInterface:
                if (messageType === MessageType.request) {
                    message = new UnregisterAppInterface(params);
                } else if (messageType === MessageType.response) {
                    message = new UnregisterAppInterfaceResponse(params);
                }
                break;
            case FunctionID.CreateWindow:
                if (messageType === MessageType.request) {
                    message = new CreateWindow(params);
                } else if (messageType === MessageType.response) {
                    message = new CreateWindowResponse(params);
                }
                break;
            case FunctionID.DeleteWindow:
                if (messageType === MessageType.request) {
                    message = new DeleteWindow(params);
                } else if (messageType === MessageType.response) {
                    message = new DeleteWindowResponse(params);
                }
                break;
            case FunctionID.SetGlobalProperties:
                if (messageType === MessageType.request) {
                    message = new SetGlobalProperties(params);
                } else if (messageType === MessageType.response) {
                    message = new SetGlobalPropertiesResponse(params);
                }
                break;
            case FunctionID.ResetGlobalProperties:
                if (messageType === MessageType.request) {
                    message = new ResetGlobalProperties(params);
                } else if (messageType === MessageType.response) {
                    message = new ResetGlobalPropertiesResponse(params);
                }
                break;
            case FunctionID.AddCommand:
                if (messageType === MessageType.request) {
                    message = new AddCommand(params);
                } else if (messageType === MessageType.response) {
                    message = new AddCommandResponse(params);
                }
                break;
            case FunctionID.DeleteCommand:
                if (messageType === MessageType.request) {
                    message = new DeleteCommand(params);
                } else if (messageType === MessageType.response) {
                    message = new DeleteCommandResponse(params);
                }
                break;
            case FunctionID.AddSubMenu:
                if (messageType === MessageType.request) {
                    message = new AddSubMenu(params);
                } else if (messageType === MessageType.response) {
                    message = new AddSubMenuResponse(params);
                }
                break;
            case FunctionID.DeleteSubMenu:
                if (messageType === MessageType.request) {
                    message = new DeleteSubMenu(params);
                } else if (messageType === MessageType.response) {
                    message = new DeleteSubMenuResponse(params);
                }
                break;
            case FunctionID.ShowAppMenu:
                if (messageType === MessageType.request) {
                    message = new ShowAppMenu(params);
                } else if (messageType === MessageType.response) {
                    message = new ShowAppMenuResponse(params);
                }
                break;
            case FunctionID.CreateInteractionChoiceSet:
                if (messageType === MessageType.request) {
                    message = new CreateInteractionChoiceSet(params);
                } else if (messageType === MessageType.response) {
                    message = new CreateInteractionChoiceSetResponse(params);
                }
                break;
            case FunctionID.PerformInteraction:
                if (messageType === MessageType.request) {
                    message = new PerformInteraction(params);
                } else if (messageType === MessageType.response) {
                    message = new PerformInteractionResponse(params);
                }
                break;
            case FunctionID.DeleteInteractionChoiceSet:
                if (messageType === MessageType.request) {
                    message = new DeleteInteractionChoiceSet(params);
                } else if (messageType === MessageType.response) {
                    message = new DeleteInteractionChoiceSetResponse(params);
                }
                break;
            case FunctionID.Alert:
                if (messageType === MessageType.request) {
                    message = new Alert(params);
                } else if (messageType === MessageType.response) {
                    message = new AlertResponse(params);
                }
                break;
            case FunctionID.Show:
                if (messageType === MessageType.request) {
                    message = new Show(params);
                } else if (messageType === MessageType.response) {
                    message = new ShowResponse(params);
                }
                break;
            case FunctionID.SubtleAlert:
                if (messageType === MessageType.request) {
                    message = new SubtleAlert(params);
                } else if (messageType === MessageType.response) {
                    message = new SubtleAlertResponse(params);
                }
                break;
            case FunctionID.OnSubtleAlertPressed:
                if (messageType === MessageType.notification) {
                    message = new OnSubtleAlertPressed(params);
                }
                break;
            case FunctionID.Speak:
                if (messageType === MessageType.request) {
                    message = new Speak(params);
                } else if (messageType === MessageType.response) {
                    message = new SpeakResponse(params);
                }
                break;
            case FunctionID.SetMediaClockTimer:
                if (messageType === MessageType.request) {
                    message = new SetMediaClockTimer(params);
                } else if (messageType === MessageType.response) {
                    message = new SetMediaClockTimerResponse(params);
                }
                break;
            case FunctionID.PerformAudioPassThru:
                if (messageType === MessageType.request) {
                    message = new PerformAudioPassThru(params);
                } else if (messageType === MessageType.response) {
                    message = new PerformAudioPassThruResponse(params);
                }
                break;
            case FunctionID.EndAudioPassThru:
                if (messageType === MessageType.request) {
                    message = new EndAudioPassThru(params);
                } else if (messageType === MessageType.response) {
                    message = new EndAudioPassThruResponse(params);
                }
                break;
            case FunctionID.SubscribeButton:
                if (messageType === MessageType.request) {
                    message = new SubscribeButton(params);
                } else if (messageType === MessageType.response) {
                    message = new SubscribeButtonResponse(params);
                }
                break;
            case FunctionID.UnsubscribeButton:
                if (messageType === MessageType.request) {
                    message = new UnsubscribeButton(params);
                } else if (messageType === MessageType.response) {
                    message = new UnsubscribeButtonResponse(params);
                }
                break;
            case FunctionID.SubscribeVehicleData:
                if (messageType === MessageType.request) {
                    message = new SubscribeVehicleData(params);
                } else if (messageType === MessageType.response) {
                    message = new SubscribeVehicleDataResponse(params);
                }
                break;
            case FunctionID.UnsubscribeVehicleData:
                if (messageType === MessageType.request) {
                    message = new UnsubscribeVehicleData(params);
                } else if (messageType === MessageType.response) {
                    message = new UnsubscribeVehicleDataResponse(params);
                }
                break;
            case FunctionID.GetVehicleData:
                if (messageType === MessageType.request) {
                    message = new GetVehicleData(params);
                } else if (messageType === MessageType.response) {
                    message = new GetVehicleDataResponse(params);
                }
                break;
            case FunctionID.ReadDID:
                if (messageType === MessageType.request) {
                    message = new ReadDID(params);
                } else if (messageType === MessageType.response) {
                    message = new ReadDIDResponse(params);
                }
                break;
            case FunctionID.GetDTCs:
                if (messageType === MessageType.request) {
                    message = new GetDTCs(params);
                } else if (messageType === MessageType.response) {
                    message = new GetDTCsResponse(params);
                }
                break;
            case FunctionID.DiagnosticMessage:
                if (messageType === MessageType.request) {
                    message = new DiagnosticMessage(params);
                } else if (messageType === MessageType.response) {
                    message = new DiagnosticMessageResponse(params);
                }
                break;
            case FunctionID.ScrollableMessage:
                if (messageType === MessageType.request) {
                    message = new ScrollableMessage(params);
                } else if (messageType === MessageType.response) {
                    message = new ScrollableMessageResponse(params);
                }
                break;
            case FunctionID.Slider:
                if (messageType === MessageType.request) {
                    message = new Slider(params);
                } else if (messageType === MessageType.response) {
                    message = new SliderResponse(params);
                }
                break;
            case FunctionID.ShowConstantTBT:
                if (messageType === MessageType.request) {
                    message = new ShowConstantTBT(params);
                } else if (messageType === MessageType.response) {
                    message = new ShowConstantTBTResponse(params);
                }
                break;
            case FunctionID.AlertManeuver:
                if (messageType === MessageType.request) {
                    message = new AlertManeuver(params);
                } else if (messageType === MessageType.response) {
                    message = new AlertManeuverResponse(params);
                }
                break;
            case FunctionID.UpdateTurnList:
                if (messageType === MessageType.request) {
                    message = new UpdateTurnList(params);
                } else if (messageType === MessageType.response) {
                    message = new UpdateTurnListResponse(params);
                }
                break;
            case FunctionID.ChangeRegistration:
                if (messageType === MessageType.request) {
                    message = new ChangeRegistration(params);
                } else if (messageType === MessageType.response) {
                    message = new ChangeRegistrationResponse(params);
                }
                break;
            case FunctionID.GenericResponse:
                if (messageType === MessageType.response) {
                    message = new GenericResponseResponse(params);
                }
                break;
            case FunctionID.PutFile:
                if (messageType === MessageType.request) {
                    message = new PutFile(params);
                } else if (messageType === MessageType.response) {
                    message = new PutFileResponse(params);
                }
                break;
            case FunctionID.GetFile:
                if (messageType === MessageType.request) {
                    message = new GetFile(params);
                } else if (messageType === MessageType.response) {
                    message = new GetFileResponse(params);
                }
                break;
            case FunctionID.DeleteFile:
                if (messageType === MessageType.request) {
                    message = new DeleteFile(params);
                } else if (messageType === MessageType.response) {
                    message = new DeleteFileResponse(params);
                }
                break;
            case FunctionID.ListFiles:
                if (messageType === MessageType.request) {
                    message = new ListFiles(params);
                } else if (messageType === MessageType.response) {
                    message = new ListFilesResponse(params);
                }
                break;
            case FunctionID.SetAppIcon:
                if (messageType === MessageType.request) {
                    message = new SetAppIcon(params);
                } else if (messageType === MessageType.response) {
                    message = new SetAppIconResponse(params);
                }
                break;
            case FunctionID.SetDisplayLayout:
                if (messageType === MessageType.request) {
                    message = new SetDisplayLayout(params);
                } else if (messageType === MessageType.response) {
                    message = new SetDisplayLayoutResponse(params);
                }
                break;
            case FunctionID.SystemRequest:
                if (messageType === MessageType.request) {
                    message = new SystemRequest(params);
                } else if (messageType === MessageType.response) {
                    message = new SystemRequestResponse(params);
                }
                break;
            case FunctionID.SendLocation:
                if (messageType === MessageType.request) {
                    message = new SendLocation(params);
                } else if (messageType === MessageType.response) {
                    message = new SendLocationResponse(params);
                }
                break;
            case FunctionID.DialNumber:
                if (messageType === MessageType.request) {
                    message = new DialNumber(params);
                } else if (messageType === MessageType.response) {
                    message = new DialNumberResponse(params);
                }
                break;
            case FunctionID.ButtonPress:
                if (messageType === MessageType.request) {
                    message = new ButtonPress(params);
                } else if (messageType === MessageType.response) {
                    message = new ButtonPressResponse(params);
                }
                break;
            case FunctionID.GetInteriorVehicleData:
                if (messageType === MessageType.request) {
                    message = new GetInteriorVehicleData(params);
                } else if (messageType === MessageType.response) {
                    message = new GetInteriorVehicleDataResponse(params);
                }
                break;
            case FunctionID.GetInteriorVehicleDataConsent:
                if (messageType === MessageType.request) {
                    message = new GetInteriorVehicleDataConsent(params);
                } else if (messageType === MessageType.response) {
                    message = new GetInteriorVehicleDataConsentResponse(params);
                }
                break;
            case FunctionID.ReleaseInteriorVehicleDataModule:
                if (messageType === MessageType.request) {
                    message = new ReleaseInteriorVehicleDataModule(params);
                } else if (messageType === MessageType.response) {
                    message = new ReleaseInteriorVehicleDataModuleResponse(params);
                }
                break;
            case FunctionID.SetInteriorVehicleData:
                if (messageType === MessageType.request) {
                    message = new SetInteriorVehicleData(params);
                } else if (messageType === MessageType.response) {
                    message = new SetInteriorVehicleDataResponse(params);
                }
                break;
            case FunctionID.SubscribeWayPoints:
                if (messageType === MessageType.request) {
                    message = new SubscribeWayPoints(params);
                } else if (messageType === MessageType.response) {
                    message = new SubscribeWayPointsResponse(params);
                }
                break;
            case FunctionID.GetWayPoints:
                if (messageType === MessageType.request) {
                    message = new GetWayPoints(params);
                } else if (messageType === MessageType.response) {
                    message = new GetWayPointsResponse(params);
                }
                break;
            case FunctionID.UnsubscribeWayPoints:
                if (messageType === MessageType.request) {
                    message = new UnsubscribeWayPoints(params);
                } else if (messageType === MessageType.response) {
                    message = new UnsubscribeWayPointsResponse(params);
                }
                break;
            case FunctionID.GetSystemCapability:
                if (messageType === MessageType.request) {
                    message = new GetSystemCapability(params);
                } else if (messageType === MessageType.response) {
                    message = new GetSystemCapabilityResponse(params);
                }
                break;
            case FunctionID.SendHapticData:
                if (messageType === MessageType.request) {
                    message = new SendHapticData(params);
                } else if (messageType === MessageType.response) {
                    message = new SendHapticDataResponse(params);
                }
                break;
            case FunctionID.SetCloudAppProperties:
                if (messageType === MessageType.request) {
                    message = new SetCloudAppProperties(params);
                } else if (messageType === MessageType.response) {
                    message = new SetCloudAppPropertiesResponse(params);
                }
                break;
            case FunctionID.GetCloudAppProperties:
                if (messageType === MessageType.request) {
                    message = new GetCloudAppProperties(params);
                } else if (messageType === MessageType.response) {
                    message = new GetCloudAppPropertiesResponse(params);
                }
                break;
            case FunctionID.PublishAppService:
                if (messageType === MessageType.request) {
                    message = new PublishAppService(params);
                } else if (messageType === MessageType.response) {
                    message = new PublishAppServiceResponse(params);
                }
                break;
            case FunctionID.UnpublishAppService:
                if (messageType === MessageType.request) {
                    message = new UnpublishAppService(params);
                } else if (messageType === MessageType.response) {
                    message = new UnpublishAppServiceResponse(params);
                }
                break;
            case FunctionID.GetAppServiceData:
                if (messageType === MessageType.request) {
                    message = new GetAppServiceData(params);
                } else if (messageType === MessageType.response) {
                    message = new GetAppServiceDataResponse(params);
                }
                break;
            case FunctionID.PerformAppServiceInteraction:
                if (messageType === MessageType.request) {
                    message = new PerformAppServiceInteraction(params);
                } else if (messageType === MessageType.response) {
                    message = new PerformAppServiceInteractionResponse(params);
                }
                break;
            case FunctionID.CancelInteraction:
                if (messageType === MessageType.request) {
                    message = new CancelInteraction(params);
                } else if (messageType === MessageType.response) {
                    message = new CancelInteractionResponse(params);
                }
                break;
            case FunctionID.CloseApplication:
                if (messageType === MessageType.request) {
                    message = new CloseApplication(params);
                } else if (messageType === MessageType.response) {
                    message = new CloseApplicationResponse(params);
                }
                break;
            case FunctionID.OnHMIStatus:
                if (messageType === MessageType.notification) {
                    message = new OnHMIStatus(params);
                }
                break;
            case FunctionID.OnAppInterfaceUnregistered:
                if (messageType === MessageType.notification) {
                    message = new OnAppInterfaceUnregistered(params);
                }
                break;
            case FunctionID.OnButtonEvent:
                if (messageType === MessageType.notification) {
                    message = new OnButtonEvent(params);
                }
                break;
            case FunctionID.OnButtonPress:
                if (messageType === MessageType.notification) {
                    message = new OnButtonPress(params);
                }
                break;
            case FunctionID.OnVehicleData:
                if (messageType === MessageType.notification) {
                    message = new OnVehicleData(params);
                }
                break;
            case FunctionID.OnCommand:
                if (messageType === MessageType.notification) {
                    message = new OnCommand(params);
                }
                break;
            case FunctionID.OnTBTClientState:
                if (messageType === MessageType.notification) {
                    message = new OnTBTClientState(params);
                }
                break;
            case FunctionID.OnDriverDistraction:
                if (messageType === MessageType.notification) {
                    message = new OnDriverDistraction(params);
                }
                break;
            case FunctionID.OnPermissionsChange:
                if (messageType === MessageType.notification) {
                    message = new OnPermissionsChange(params);
                }
                break;
            case FunctionID.OnAudioPassThru:
                if (messageType === MessageType.notification) {
                    message = new OnAudioPassThru(params);
                }
                break;
            case FunctionID.OnLanguageChange:
                if (messageType === MessageType.notification) {
                    message = new OnLanguageChange(params);
                }
                break;
            case FunctionID.OnKeyboardInput:
                if (messageType === MessageType.notification) {
                    message = new OnKeyboardInput(params);
                }
                break;
            case FunctionID.OnTouchEvent:
                if (messageType === MessageType.notification) {
                    message = new OnTouchEvent(params);
                }
                break;
            case FunctionID.OnSystemRequest:
                if (messageType === MessageType.notification) {
                    message = new OnSystemRequest(params);
                }
                break;
            case FunctionID.OnHashChange:
                if (messageType === MessageType.notification) {
                    message = new OnHashChange(params);
                }
                break;
            case FunctionID.OnWayPointChange:
                if (messageType === MessageType.notification) {
                    message = new OnWayPointChange(params);
                }
                break;
            case FunctionID.OnInteriorVehicleData:
                if (messageType === MessageType.notification) {
                    message = new OnInteriorVehicleData(params);
                }
                break;
            case FunctionID.OnRCStatus:
                if (messageType === MessageType.notification) {
                    message = new OnRCStatus(params);
                }
                break;
            case FunctionID.OnAppServiceData:
                if (messageType === MessageType.notification) {
                    message = new OnAppServiceData(params);
                }
                break;
            case FunctionID.OnSystemCapabilityUpdated:
                if (messageType === MessageType.notification) {
                    message = new OnSystemCapabilityUpdated(params);
                }
                break;
            case FunctionID.OnUpdateFile:
                if (messageType === MessageType.notification) {
                    message = new OnUpdateFile(params);
                }
                break;
            case FunctionID.OnUpdateSubMenu:
                if (messageType === MessageType.notification) {
                    message = new OnUpdateSubMenu(params);
                }
                break;
            case FunctionID.EncodedSyncPData:
                if (messageType === MessageType.request) {
                    message = new EncodedSyncPData(params);
                } else if (messageType === MessageType.response) {
                    message = new EncodedSyncPDataResponse(params);
                }
                break;
            case FunctionID.OnEncodedSyncPData:
                if (messageType === MessageType.notification) {
                    message = new OnEncodedSyncPData(params);
                }
                break;
            default:
                message = null;
        }

        if (message === null || message === undefined) { // informs of missing classes
            console.warn(`RpcCreator couldn't construct an RPC for the ${functionName} ${rpcName}`);
            return null;
        }

        if (messageType === MessageType.request || messageType === MessageType.response) {
            message.setCorrelationId(correlationId);
        }
        if (bulkData) {
            message.setBulkData(bulkData);
        }

        return message;
    }
}


export { RpcCreator };