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

import { Enum } from '../../util/Enum.js';

/**
 * Enumeration linking function names with function IDs in SmartDeviceLink protocol. Assumes enumeration starts at
 * value 0.
 * @typedef {Enum} FunctionID
 * @property {Object} _MAP
 */
class FunctionID extends Enum {
    /**
     * Constructor for FunctionID.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for RESERVED.
     * @returns {Number} - The enum value.
     */
    static get RESERVED () {
        return FunctionID._MAP.RESERVED;
    }

    /**
     * Get the enum value for RegisterAppInterface.
     * @returns {Number} - The enum value.
     */
    static get RegisterAppInterface () {
        return FunctionID._MAP.RegisterAppInterface;
    }

    /**
     * Get the enum value for UnregisterAppInterface.
     * @returns {Number} - The enum value.
     */
    static get UnregisterAppInterface () {
        return FunctionID._MAP.UnregisterAppInterface;
    }

    /**
     * Get the enum value for SetGlobalProperties.
     * @returns {Number} - The enum value.
     */
    static get SetGlobalProperties () {
        return FunctionID._MAP.SetGlobalProperties;
    }

    /**
     * Get the enum value for ResetGlobalProperties.
     * @returns {Number} - The enum value.
     */
    static get ResetGlobalProperties () {
        return FunctionID._MAP.ResetGlobalProperties;
    }

    /**
     * Get the enum value for AddCommand.
     * @returns {Number} - The enum value.
     */
    static get AddCommand () {
        return FunctionID._MAP.AddCommand;
    }

    /**
     * Get the enum value for DeleteCommand.
     * @returns {Number} - The enum value.
     */
    static get DeleteCommand () {
        return FunctionID._MAP.DeleteCommand;
    }

    /**
     * Get the enum value for AddSubMenu.
     * @returns {Number} - The enum value.
     */
    static get AddSubMenu () {
        return FunctionID._MAP.AddSubMenu;
    }

    /**
     * Get the enum value for DeleteSubMenu.
     * @returns {Number} - The enum value.
     */
    static get DeleteSubMenu () {
        return FunctionID._MAP.DeleteSubMenu;
    }

    /**
     * Get the enum value for CreateInteractionChoiceSet.
     * @returns {Number} - The enum value.
     */
    static get CreateInteractionChoiceSet () {
        return FunctionID._MAP.CreateInteractionChoiceSet;
    }

    /**
     * Get the enum value for PerformInteraction.
     * @returns {Number} - The enum value.
     */
    static get PerformInteraction () {
        return FunctionID._MAP.PerformInteraction;
    }

    /**
     * Get the enum value for DeleteInteractionChoiceSet.
     * @returns {Number} - The enum value.
     */
    static get DeleteInteractionChoiceSet () {
        return FunctionID._MAP.DeleteInteractionChoiceSet;
    }

    /**
     * Get the enum value for Alert.
     * @returns {Number} - The enum value.
     */
    static get Alert () {
        return FunctionID._MAP.Alert;
    }

    /**
     * Get the enum value for Show.
     * @returns {Number} - The enum value.
     */
    static get Show () {
        return FunctionID._MAP.Show;
    }

    /**
     * Get the enum value for Speak.
     * @returns {Number} - The enum value.
     */
    static get Speak () {
        return FunctionID._MAP.Speak;
    }

    /**
     * Get the enum value for SetMediaClockTimer.
     * @returns {Number} - The enum value.
     */
    static get SetMediaClockTimer () {
        return FunctionID._MAP.SetMediaClockTimer;
    }

    /**
     * Get the enum value for PerformAudioPassThru.
     * @returns {Number} - The enum value.
     */
    static get PerformAudioPassThru () {
        return FunctionID._MAP.PerformAudioPassThru;
    }

    /**
     * Get the enum value for EndAudioPassThru.
     * @returns {Number} - The enum value.
     */
    static get EndAudioPassThru () {
        return FunctionID._MAP.EndAudioPassThru;
    }

    /**
     * Get the enum value for SubscribeButton.
     * @returns {Number} - The enum value.
     */
    static get SubscribeButton () {
        return FunctionID._MAP.SubscribeButton;
    }

    /**
     * Get the enum value for UnsubscribeButton.
     * @returns {Number} - The enum value.
     */
    static get UnsubscribeButton () {
        return FunctionID._MAP.UnsubscribeButton;
    }

    /**
     * Get the enum value for SubscribeVehicleData.
     * @returns {Number} - The enum value.
     */
    static get SubscribeVehicleData () {
        return FunctionID._MAP.SubscribeVehicleData;
    }

    /**
     * Get the enum value for UnsubscribeVehicleData.
     * @returns {Number} - The enum value.
     */
    static get UnsubscribeVehicleData () {
        return FunctionID._MAP.UnsubscribeVehicleData;
    }

    /**
     * Get the enum value for GetVehicleData.
     * @returns {Number} - The enum value.
     */
    static get GetVehicleData () {
        return FunctionID._MAP.GetVehicleData;
    }

    /**
     * Get the enum value for ReadDID.
     * @returns {Number} - The enum value.
     */
    static get ReadDID () {
        return FunctionID._MAP.ReadDID;
    }

    /**
     * Get the enum value for GetDTCs.
     * @returns {Number} - The enum value.
     */
    static get GetDTCs () {
        return FunctionID._MAP.GetDTCs;
    }

    /**
     * Get the enum value for ScrollableMessage.
     * @returns {Number} - The enum value.
     */
    static get ScrollableMessage () {
        return FunctionID._MAP.ScrollableMessage;
    }

    /**
     * Get the enum value for Slider.
     * @returns {Number} - The enum value.
     */
    static get Slider () {
        return FunctionID._MAP.Slider;
    }

    /**
     * Get the enum value for ShowConstantTBT.
     * @returns {Number} - The enum value.
     */
    static get ShowConstantTBT () {
        return FunctionID._MAP.ShowConstantTBT;
    }

    /**
     * Get the enum value for AlertManeuver.
     * @returns {Number} - The enum value.
     */
    static get AlertManeuver () {
        return FunctionID._MAP.AlertManeuver;
    }

    /**
     * Get the enum value for UpdateTurnList.
     * @returns {Number} - The enum value.
     */
    static get UpdateTurnList () {
        return FunctionID._MAP.UpdateTurnList;
    }

    /**
     * Get the enum value for ChangeRegistration.
     * @returns {Number} - The enum value.
     */
    static get ChangeRegistration () {
        return FunctionID._MAP.ChangeRegistration;
    }

    /**
     * Get the enum value for GenericResponse.
     * @returns {Number} - The enum value.
     */
    static get GenericResponse () {
        return FunctionID._MAP.GenericResponse;
    }

    /**
     * Get the enum value for PutFile.
     * @returns {Number} - The enum value.
     */
    static get PutFile () {
        return FunctionID._MAP.PutFile;
    }

    /**
     * Get the enum value for DeleteFile.
     * @returns {Number} - The enum value.
     */
    static get DeleteFile () {
        return FunctionID._MAP.DeleteFile;
    }

    /**
     * Get the enum value for ListFiles.
     * @returns {Number} - The enum value.
     */
    static get ListFiles () {
        return FunctionID._MAP.ListFiles;
    }

    /**
     * Get the enum value for SetAppIcon.
     * @returns {Number} - The enum value.
     */
    static get SetAppIcon () {
        return FunctionID._MAP.SetAppIcon;
    }

    /**
     * Get the enum value for SetDisplayLayout.
     * @returns {Number} - The enum value.
     */
    static get SetDisplayLayout () {
        return FunctionID._MAP.SetDisplayLayout;
    }

    /**
     * Get the enum value for DiagnosticMessage.
     * @returns {Number} - The enum value.
     */
    static get DiagnosticMessage () {
        return FunctionID._MAP.DiagnosticMessage;
    }

    /**
     * Get the enum value for SystemRequest.
     * @returns {Number} - The enum value.
     */
    static get SystemRequest () {
        return FunctionID._MAP.SystemRequest;
    }

    /**
     * Get the enum value for SendLocation.
     * @returns {Number} - The enum value.
     */
    static get SendLocation () {
        return FunctionID._MAP.SendLocation;
    }

    /**
     * Get the enum value for DialNumber.
     * @returns {Number} - The enum value.
     */
    static get DialNumber () {
        return FunctionID._MAP.DialNumber;
    }

    /**
     * Get the enum value for ButtonPress.
     * @returns {Number} - The enum value.
     */
    static get ButtonPress () {
        return FunctionID._MAP.ButtonPress;
    }

    /**
     * Get the enum value for GetInteriorVehicleData.
     * @returns {Number} - The enum value.
     */
    static get GetInteriorVehicleData () {
        return FunctionID._MAP.GetInteriorVehicleData;
    }

    /**
     * Get the enum value for SetInteriorVehicleData.
     * @returns {Number} - The enum value.
     */
    static get SetInteriorVehicleData () {
        return FunctionID._MAP.SetInteriorVehicleData;
    }

    /**
     * Get the enum value for GetWayPoints.
     * @returns {Number} - The enum value.
     */
    static get GetWayPoints () {
        return FunctionID._MAP.GetWayPoints;
    }

    /**
     * Get the enum value for SubscribeWayPoints.
     * @returns {Number} - The enum value.
     */
    static get SubscribeWayPoints () {
        return FunctionID._MAP.SubscribeWayPoints;
    }

    /**
     * Get the enum value for UnsubscribeWayPoints.
     * @returns {Number} - The enum value.
     */
    static get UnsubscribeWayPoints () {
        return FunctionID._MAP.UnsubscribeWayPoints;
    }

    /**
     * Get the enum value for GetSystemCapability.
     * @returns {Number} - The enum value.
     */
    static get GetSystemCapability () {
        return FunctionID._MAP.GetSystemCapability;
    }

    /**
     * Get the enum value for SendHapticData.
     * @returns {Number} - The enum value.
     */
    static get SendHapticData () {
        return FunctionID._MAP.SendHapticData;
    }

    /**
     * Get the enum value for SetCloudAppProperties.
     * @returns {Number} - The enum value.
     */
    static get SetCloudAppProperties () {
        return FunctionID._MAP.SetCloudAppProperties;
    }

    /**
     * Get the enum value for GetCloudAppProperties.
     * @returns {Number} - The enum value.
     */
    static get GetCloudAppProperties () {
        return FunctionID._MAP.GetCloudAppProperties;
    }

    /**
     * Get the enum value for PublishAppService.
     * @returns {Number} - The enum value.
     */
    static get PublishAppService () {
        return FunctionID._MAP.PublishAppService;
    }

    /**
     * Get the enum value for GetAppServiceData.
     * @returns {Number} - The enum value.
     */
    static get GetAppServiceData () {
        return FunctionID._MAP.GetAppServiceData;
    }

    /**
     * Get the enum value for GetFile.
     * @returns {Number} - The enum value.
     */
    static get GetFile () {
        return FunctionID._MAP.GetFile;
    }

    /**
     * Get the enum value for PerformAppServiceInteraction.
     * @returns {Number} - The enum value.
     */
    static get PerformAppServiceInteraction () {
        return FunctionID._MAP.PerformAppServiceInteraction;
    }

    /**
     * Get the enum value for UnpublishAppService.
     * @returns {Number} - The enum value.
     */
    static get UnpublishAppService () {
        return FunctionID._MAP.UnpublishAppService;
    }

    /**
     * Get the enum value for CancelInteraction.
     * @returns {Number} - The enum value.
     */
    static get CancelInteraction () {
        return FunctionID._MAP.CancelInteraction;
    }

    /**
     * Get the enum value for CloseApplication.
     * @returns {Number} - The enum value.
     */
    static get CloseApplication () {
        return FunctionID._MAP.CloseApplication;
    }

    /**
     * Get the enum value for ShowAppMenu.
     * @returns {Number} - The enum value.
     */
    static get ShowAppMenu () {
        return FunctionID._MAP.ShowAppMenu;
    }

    /**
     * Get the enum value for CreateWindow.
     * @returns {Number} - The enum value.
     */
    static get CreateWindow () {
        return FunctionID._MAP.CreateWindow;
    }

    /**
     * Get the enum value for DeleteWindow.
     * @returns {Number} - The enum value.
     */
    static get DeleteWindow () {
        return FunctionID._MAP.DeleteWindow;
    }

    /**
     * Get the enum value for GetInteriorVehicleDataConsent.
     * @returns {Number} - The enum value.
     */
    static get GetInteriorVehicleDataConsent () {
        return FunctionID._MAP.GetInteriorVehicleDataConsent;
    }

    /**
     * Get the enum value for ReleaseInteriorVehicleDataModule.
     * @returns {Number} - The enum value.
     */
    static get ReleaseInteriorVehicleDataModule () {
        return FunctionID._MAP.ReleaseInteriorVehicleDataModule;
    }

    /**
     * Get the enum value for OnHMIStatus.
     * @returns {Number} - The enum value.
     */
    static get OnHMIStatus () {
        return FunctionID._MAP.OnHMIStatus;
    }

    /**
     * Get the enum value for OnAppInterfaceUnregistered.
     * @returns {Number} - The enum value.
     */
    static get OnAppInterfaceUnregistered () {
        return FunctionID._MAP.OnAppInterfaceUnregistered;
    }

    /**
     * Get the enum value for OnButtonEvent.
     * @returns {Number} - The enum value.
     */
    static get OnButtonEvent () {
        return FunctionID._MAP.OnButtonEvent;
    }

    /**
     * Get the enum value for OnButtonPress.
     * @returns {Number} - The enum value.
     */
    static get OnButtonPress () {
        return FunctionID._MAP.OnButtonPress;
    }

    /**
     * Get the enum value for OnVehicleData.
     * @returns {Number} - The enum value.
     */
    static get OnVehicleData () {
        return FunctionID._MAP.OnVehicleData;
    }

    /**
     * Get the enum value for OnCommand.
     * @returns {Number} - The enum value.
     */
    static get OnCommand () {
        return FunctionID._MAP.OnCommand;
    }

    /**
     * Get the enum value for OnTBTClientState.
     * @returns {Number} - The enum value.
     */
    static get OnTBTClientState () {
        return FunctionID._MAP.OnTBTClientState;
    }

    /**
     * Get the enum value for OnDriverDistraction.
     * @returns {Number} - The enum value.
     */
    static get OnDriverDistraction () {
        return FunctionID._MAP.OnDriverDistraction;
    }

    /**
     * Get the enum value for OnPermissionsChange.
     * @returns {Number} - The enum value.
     */
    static get OnPermissionsChange () {
        return FunctionID._MAP.OnPermissionsChange;
    }

    /**
     * Get the enum value for OnAudioPassThru.
     * @returns {Number} - The enum value.
     */
    static get OnAudioPassThru () {
        return FunctionID._MAP.OnAudioPassThru;
    }

    /**
     * Get the enum value for OnLanguageChange.
     * @returns {Number} - The enum value.
     */
    static get OnLanguageChange () {
        return FunctionID._MAP.OnLanguageChange;
    }

    /**
     * Get the enum value for OnKeyboardInput.
     * @returns {Number} - The enum value.
     */
    static get OnKeyboardInput () {
        return FunctionID._MAP.OnKeyboardInput;
    }

    /**
     * Get the enum value for OnTouchEvent.
     * @returns {Number} - The enum value.
     */
    static get OnTouchEvent () {
        return FunctionID._MAP.OnTouchEvent;
    }

    /**
     * Get the enum value for OnSystemRequest.
     * @returns {Number} - The enum value.
     */
    static get OnSystemRequest () {
        return FunctionID._MAP.OnSystemRequest;
    }

    /**
     * Get the enum value for OnHashChange.
     * @returns {Number} - The enum value.
     */
    static get OnHashChange () {
        return FunctionID._MAP.OnHashChange;
    }

    /**
     * Get the enum value for OnInteriorVehicleData.
     * @returns {Number} - The enum value.
     */
    static get OnInteriorVehicleData () {
        return FunctionID._MAP.OnInteriorVehicleData;
    }

    /**
     * Get the enum value for OnWayPointChange.
     * @returns {Number} - The enum value.
     */
    static get OnWayPointChange () {
        return FunctionID._MAP.OnWayPointChange;
    }

    /**
     * Get the enum value for OnRCStatus.
     * @returns {Number} - The enum value.
     */
    static get OnRCStatus () {
        return FunctionID._MAP.OnRCStatus;
    }

    /**
     * Get the enum value for OnAppServiceData.
     * @returns {Number} - The enum value.
     */
    static get OnAppServiceData () {
        return FunctionID._MAP.OnAppServiceData;
    }

    /**
     * Get the enum value for OnSystemCapabilityUpdated.
     * @returns {Number} - The enum value.
     */
    static get OnSystemCapabilityUpdated () {
        return FunctionID._MAP.OnSystemCapabilityUpdated;
    }

    /**
     * Get the enum value for EncodedSyncPData.
     * @returns {Number} - The enum value.
     */
    static get EncodedSyncPData () {
        return FunctionID._MAP.EncodedSyncPData;
    }

    /**
     * Get the enum value for SdlPData.
     * @returns {Number} - The enum value.
     */
    static get SdlPData () {
        return FunctionID._MAP.SdlPData;
    }

    /**
     * Get the enum value for OnEncodedSyncPData.
     * @returns {Number} - The enum value.
     */
    static get OnEncodedSyncPData () {
        return FunctionID._MAP.OnEncodedSyncPData;
    }

    /**
     * Get the enum value for OnSyncPData.
     * @returns {Number} - The enum value.
     */
    static get OnSyncPData () {
        return FunctionID._MAP.OnSyncPData;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return FunctionID._valueForKey(key, FunctionID._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return FunctionID._keyForValue(value, FunctionID._MAP);
    }
}

FunctionID._MAP = Object.freeze({
    'RESERVED': 0,
    'RegisterAppInterface': 1,
    'UnregisterAppInterface': 2,
    'SetGlobalProperties': 3,
    'ResetGlobalProperties': 4,
    'AddCommand': 5,
    'DeleteCommand': 6,
    'AddSubMenu': 7,
    'DeleteSubMenu': 8,
    'CreateInteractionChoiceSet': 9,
    'PerformInteraction': 10,
    'DeleteInteractionChoiceSet': 11,
    'Alert': 12,
    'Show': 13,
    'Speak': 14,
    'SetMediaClockTimer': 15,
    'PerformAudioPassThru': 16,
    'EndAudioPassThru': 17,
    'SubscribeButton': 18,
    'UnsubscribeButton': 19,
    'SubscribeVehicleData': 20,
    'UnsubscribeVehicleData': 21,
    'GetVehicleData': 22,
    'ReadDID': 23,
    'GetDTCs': 24,
    'ScrollableMessage': 25,
    'Slider': 26,
    'ShowConstantTBT': 27,
    'AlertManeuver': 28,
    'UpdateTurnList': 29,
    'ChangeRegistration': 30,
    'GenericResponse': 31,
    'PutFile': 32,
    'DeleteFile': 33,
    'ListFiles': 34,
    'SetAppIcon': 35,
    'SetDisplayLayout': 36,
    'DiagnosticMessage': 37,
    'SystemRequest': 38,
    'SendLocation': 39,
    'DialNumber': 40,
    'ButtonPress': 41,
    'GetInteriorVehicleData': 43,
    'SetInteriorVehicleData': 44,
    'GetWayPoints': 45,
    'SubscribeWayPoints': 46,
    'UnsubscribeWayPoints': 47,
    'GetSystemCapability': 48,
    'SendHapticData': 49,
    'SetCloudAppProperties': 50,
    'GetCloudAppProperties': 51,
    'PublishAppService': 52,
    'GetAppServiceData': 53,
    'GetFile': 54,
    'PerformAppServiceInteraction': 55,
    'UnpublishAppService': 56,
    'CancelInteraction': 57,
    'CloseApplication': 58,
    'ShowAppMenu': 59,
    'CreateWindow': 60,
    'DeleteWindow': 61,
    'GetInteriorVehicleDataConsent': 62,
    'ReleaseInteriorVehicleDataModule': 63,
    'OnHMIStatus': 32768,
    'OnAppInterfaceUnregistered': 32769,
    'OnButtonEvent': 32770,
    'OnButtonPress': 32771,
    'OnVehicleData': 32772,
    'OnCommand': 32773,
    'OnTBTClientState': 32774,
    'OnDriverDistraction': 32775,
    'OnPermissionsChange': 32776,
    'OnAudioPassThru': 32777,
    'OnLanguageChange': 32778,
    'OnKeyboardInput': 32779,
    'OnTouchEvent': 32780,
    'OnSystemRequest': 32781,
    'OnHashChange': 32782,
    'OnInteriorVehicleData': 32783,
    'OnWayPointChange': 32784,
    'OnRCStatus': 32785,
    'OnAppServiceData': 32786,
    'OnSystemCapabilityUpdated': 32787,
    'EncodedSyncPData': 65536,
    'SyncPData': 65537,
    'OnEncodedSyncPData': 98304,
    'OnSyncPData': 98305,
});

export { FunctionID };