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
 * Enumeration linking function names with function IDs in SmartDeviceLink protocol. Assumes enumeration starts at value 0.
 * @typedef {Enum} FunctionID
 * @property {Object} _MAP
 */
class FunctionID extends Enum {
    /**
     * Constructor for FunctionID.
     * @class
     * @since SmartDeviceLink 1.0.0
     */
    constructor () {
        super();
    }

    /**
     * Get the enum value for RESERVED.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get RESERVED () {
        return FunctionID._MAP.RESERVED;
    }

    /**
     * Get the enum value for RegisterAppInterface.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get RegisterAppInterface () {
        return FunctionID._MAP.RegisterAppInterface;
    }

    /**
     * Get the enum value for UnregisterAppInterface.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get UnregisterAppInterface () {
        return FunctionID._MAP.UnregisterAppInterface;
    }

    /**
     * Get the enum value for SetGlobalProperties.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get SetGlobalProperties () {
        return FunctionID._MAP.SetGlobalProperties;
    }

    /**
     * Get the enum value for ResetGlobalProperties.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get ResetGlobalProperties () {
        return FunctionID._MAP.ResetGlobalProperties;
    }

    /**
     * Get the enum value for AddCommand.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get AddCommand () {
        return FunctionID._MAP.AddCommand;
    }

    /**
     * Get the enum value for DeleteCommand.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get DeleteCommand () {
        return FunctionID._MAP.DeleteCommand;
    }

    /**
     * Get the enum value for AddSubMenu.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get AddSubMenu () {
        return FunctionID._MAP.AddSubMenu;
    }

    /**
     * Get the enum value for DeleteSubMenu.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get DeleteSubMenu () {
        return FunctionID._MAP.DeleteSubMenu;
    }

    /**
     * Get the enum value for CreateInteractionChoiceSet.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get CreateInteractionChoiceSet () {
        return FunctionID._MAP.CreateInteractionChoiceSet;
    }

    /**
     * Get the enum value for PerformInteraction.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get PerformInteraction () {
        return FunctionID._MAP.PerformInteraction;
    }

    /**
     * Get the enum value for DeleteInteractionChoiceSet.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get DeleteInteractionChoiceSet () {
        return FunctionID._MAP.DeleteInteractionChoiceSet;
    }

    /**
     * Get the enum value for Alert.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get Alert () {
        return FunctionID._MAP.Alert;
    }

    /**
     * Get the enum value for Show.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get Show () {
        return FunctionID._MAP.Show;
    }

    /**
     * Get the enum value for Speak.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get Speak () {
        return FunctionID._MAP.Speak;
    }

    /**
     * Get the enum value for SetMediaClockTimer.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get SetMediaClockTimer () {
        return FunctionID._MAP.SetMediaClockTimer;
    }

    /**
     * Get the enum value for PerformAudioPassThru.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get PerformAudioPassThru () {
        return FunctionID._MAP.PerformAudioPassThru;
    }

    /**
     * Get the enum value for EndAudioPassThru.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get EndAudioPassThru () {
        return FunctionID._MAP.EndAudioPassThru;
    }

    /**
     * Get the enum value for SubscribeButton.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get SubscribeButton () {
        return FunctionID._MAP.SubscribeButton;
    }

    /**
     * Get the enum value for UnsubscribeButton.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get UnsubscribeButton () {
        return FunctionID._MAP.UnsubscribeButton;
    }

    /**
     * Get the enum value for SubscribeVehicleData.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get SubscribeVehicleData () {
        return FunctionID._MAP.SubscribeVehicleData;
    }

    /**
     * Get the enum value for UnsubscribeVehicleData.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get UnsubscribeVehicleData () {
        return FunctionID._MAP.UnsubscribeVehicleData;
    }

    /**
     * Get the enum value for GetVehicleData.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get GetVehicleData () {
        return FunctionID._MAP.GetVehicleData;
    }

    /**
     * Get the enum value for ReadDID.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get ReadDID () {
        return FunctionID._MAP.ReadDID;
    }

    /**
     * Get the enum value for GetDTCs.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get GetDTCs () {
        return FunctionID._MAP.GetDTCs;
    }

    /**
     * Get the enum value for ScrollableMessage.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get ScrollableMessage () {
        return FunctionID._MAP.ScrollableMessage;
    }

    /**
     * Get the enum value for Slider.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get Slider () {
        return FunctionID._MAP.Slider;
    }

    /**
     * Get the enum value for ShowConstantTBT.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get ShowConstantTBT () {
        return FunctionID._MAP.ShowConstantTBT;
    }

    /**
     * Get the enum value for AlertManeuver.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get AlertManeuver () {
        return FunctionID._MAP.AlertManeuver;
    }

    /**
     * Get the enum value for UpdateTurnList.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get UpdateTurnList () {
        return FunctionID._MAP.UpdateTurnList;
    }

    /**
     * Get the enum value for ChangeRegistration.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get ChangeRegistration () {
        return FunctionID._MAP.ChangeRegistration;
    }

    /**
     * Get the enum value for GenericResponse.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get GenericResponse () {
        return FunctionID._MAP.GenericResponse;
    }

    /**
     * Get the enum value for PutFile.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get PutFile () {
        return FunctionID._MAP.PutFile;
    }

    /**
     * Get the enum value for DeleteFile.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get DeleteFile () {
        return FunctionID._MAP.DeleteFile;
    }

    /**
     * Get the enum value for ListFiles.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get ListFiles () {
        return FunctionID._MAP.ListFiles;
    }

    /**
     * Get the enum value for SetAppIcon.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get SetAppIcon () {
        return FunctionID._MAP.SetAppIcon;
    }

    /**
     * Get the enum value for SetDisplayLayout.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get SetDisplayLayout () {
        return FunctionID._MAP.SetDisplayLayout;
    }

    /**
     * Get the enum value for DiagnosticMessage.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get DiagnosticMessage () {
        return FunctionID._MAP.DiagnosticMessage;
    }

    /**
     * Get the enum value for SystemRequest.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get SystemRequest () {
        return FunctionID._MAP.SystemRequest;
    }

    /**
     * Get the enum value for SendLocation.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get SendLocation () {
        return FunctionID._MAP.SendLocation;
    }

    /**
     * Get the enum value for DialNumber.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get DialNumber () {
        return FunctionID._MAP.DialNumber;
    }

    /**
     * Get the enum value for ButtonPress.
     * @since SmartDeviceLink 4.5.0
     * @returns {Number} - The enum value.
     */
    static get ButtonPress () {
        return FunctionID._MAP.ButtonPress;
    }

    /**
     * Get the enum value for GetInteriorVehicleData.
     * @since SmartDeviceLink 4.5.0
     * @returns {Number} - The enum value.
     */
    static get GetInteriorVehicleData () {
        return FunctionID._MAP.GetInteriorVehicleData;
    }

    /**
     * Get the enum value for SetInteriorVehicleData.
     * @since SmartDeviceLink 4.5.0
     * @returns {Number} - The enum value.
     */
    static get SetInteriorVehicleData () {
        return FunctionID._MAP.SetInteriorVehicleData;
    }

    /**
     * Get the enum value for GetWayPoints.
     * @since SmartDeviceLink 4.1.0
     * @returns {Number} - The enum value.
     */
    static get GetWayPoints () {
        return FunctionID._MAP.GetWayPoints;
    }

    /**
     * Get the enum value for SubscribeWayPoints.
     * @since SmartDeviceLink 4.1.0
     * @returns {Number} - The enum value.
     */
    static get SubscribeWayPoints () {
        return FunctionID._MAP.SubscribeWayPoints;
    }

    /**
     * Get the enum value for UnsubscribeWayPoints.
     * @since SmartDeviceLink 4.1.0
     * @returns {Number} - The enum value.
     */
    static get UnsubscribeWayPoints () {
        return FunctionID._MAP.UnsubscribeWayPoints;
    }

    /**
     * Get the enum value for GetSystemCapability.
     * @since SmartDeviceLink 4.5.0
     * @returns {Number} - The enum value.
     */
    static get GetSystemCapability () {
        return FunctionID._MAP.GetSystemCapability;
    }

    /**
     * Get the enum value for SendHapticData.
     * @since SmartDeviceLink 4.5.0
     * @returns {Number} - The enum value.
     */
    static get SendHapticData () {
        return FunctionID._MAP.SendHapticData;
    }

    /**
     * Get the enum value for SetCloudAppProperties.
     * @since SmartDeviceLink 5.1.0
     * @returns {Number} - The enum value.
     */
    static get SetCloudAppProperties () {
        return FunctionID._MAP.SetCloudAppProperties;
    }

    /**
     * Get the enum value for GetCloudAppProperties.
     * @since SmartDeviceLink 5.1.0
     * @returns {Number} - The enum value.
     */
    static get GetCloudAppProperties () {
        return FunctionID._MAP.GetCloudAppProperties;
    }

    /**
     * Get the enum value for PublishAppService.
     * @since SmartDeviceLink 5.1.0
     * @returns {Number} - The enum value.
     */
    static get PublishAppService () {
        return FunctionID._MAP.PublishAppService;
    }

    /**
     * Get the enum value for GetAppServiceData.
     * @since SmartDeviceLink 5.1.0
     * @returns {Number} - The enum value.
     */
    static get GetAppServiceData () {
        return FunctionID._MAP.GetAppServiceData;
    }

    /**
     * Get the enum value for GetFile.
     * @since SmartDeviceLink 5.1.0
     * @returns {Number} - The enum value.
     */
    static get GetFile () {
        return FunctionID._MAP.GetFile;
    }

    /**
     * Get the enum value for PerformAppServiceInteraction.
     * @since SmartDeviceLink 5.1.0
     * @returns {Number} - The enum value.
     */
    static get PerformAppServiceInteraction () {
        return FunctionID._MAP.PerformAppServiceInteraction;
    }

    /**
     * Get the enum value for UnpublishAppService.
     * @since SmartDeviceLink 6.0.0
     * @returns {Number} - The enum value.
     */
    static get UnpublishAppService () {
        return FunctionID._MAP.UnpublishAppService;
    }

    /**
     * Get the enum value for CancelInteraction.
     * @since SmartDeviceLink 6.0.0
     * @returns {Number} - The enum value.
     */
    static get CancelInteraction () {
        return FunctionID._MAP.CancelInteraction;
    }

    /**
     * Get the enum value for CloseApplication.
     * @since SmartDeviceLink 6.0.0
     * @returns {Number} - The enum value.
     */
    static get CloseApplication () {
        return FunctionID._MAP.CloseApplication;
    }

    /**
     * Get the enum value for ShowAppMenu.
     * @since SmartDeviceLink 6.0.0
     * @returns {Number} - The enum value.
     */
    static get ShowAppMenu () {
        return FunctionID._MAP.ShowAppMenu;
    }

    /**
     * Get the enum value for CreateWindow.
     * @since SmartDeviceLink 6.0.0
     * @returns {Number} - The enum value.
     */
    static get CreateWindow () {
        return FunctionID._MAP.CreateWindow;
    }

    /**
     * Get the enum value for DeleteWindow.
     * @since SmartDeviceLink 6.0.0
     * @returns {Number} - The enum value.
     */
    static get DeleteWindow () {
        return FunctionID._MAP.DeleteWindow;
    }

    /**
     * Get the enum value for GetInteriorVehicleDataConsent.
     * @since SmartDeviceLink 6.0.0
     * @returns {Number} - The enum value.
     */
    static get GetInteriorVehicleDataConsent () {
        return FunctionID._MAP.GetInteriorVehicleDataConsent;
    }

    /**
     * Get the enum value for ReleaseInteriorVehicleDataModule.
     * @since SmartDeviceLink 6.0.0
     * @returns {Number} - The enum value.
     */
    static get ReleaseInteriorVehicleDataModule () {
        return FunctionID._MAP.ReleaseInteriorVehicleDataModule;
    }

    /**
     * Get the enum value for SubtleAlert.
     * @since SmartDeviceLink 7.0.0
     * @returns {Number} - The enum value.
     */
    static get SubtleAlert () {
        return FunctionID._MAP.SubtleAlert;
    }

    /**
     * Get the enum value for OnHMIStatus.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get OnHMIStatus () {
        return FunctionID._MAP.OnHMIStatus;
    }

    /**
     * Get the enum value for OnAppInterfaceUnregistered.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get OnAppInterfaceUnregistered () {
        return FunctionID._MAP.OnAppInterfaceUnregistered;
    }

    /**
     * Get the enum value for OnButtonEvent.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get OnButtonEvent () {
        return FunctionID._MAP.OnButtonEvent;
    }

    /**
     * Get the enum value for OnButtonPress.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get OnButtonPress () {
        return FunctionID._MAP.OnButtonPress;
    }

    /**
     * Get the enum value for OnVehicleData.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get OnVehicleData () {
        return FunctionID._MAP.OnVehicleData;
    }

    /**
     * Get the enum value for OnCommand.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get OnCommand () {
        return FunctionID._MAP.OnCommand;
    }

    /**
     * Get the enum value for OnTBTClientState.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get OnTBTClientState () {
        return FunctionID._MAP.OnTBTClientState;
    }

    /**
     * Get the enum value for OnDriverDistraction.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get OnDriverDistraction () {
        return FunctionID._MAP.OnDriverDistraction;
    }

    /**
     * Get the enum value for OnPermissionsChange.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get OnPermissionsChange () {
        return FunctionID._MAP.OnPermissionsChange;
    }

    /**
     * Get the enum value for OnAudioPassThru.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get OnAudioPassThru () {
        return FunctionID._MAP.OnAudioPassThru;
    }

    /**
     * Get the enum value for OnLanguageChange.
     * @since SmartDeviceLink 2.0.0
     * @returns {Number} - The enum value.
     */
    static get OnLanguageChange () {
        return FunctionID._MAP.OnLanguageChange;
    }

    /**
     * Get the enum value for OnKeyboardInput.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get OnKeyboardInput () {
        return FunctionID._MAP.OnKeyboardInput;
    }

    /**
     * Get the enum value for OnTouchEvent.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get OnTouchEvent () {
        return FunctionID._MAP.OnTouchEvent;
    }

    /**
     * Get the enum value for OnSystemRequest.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get OnSystemRequest () {
        return FunctionID._MAP.OnSystemRequest;
    }

    /**
     * Get the enum value for OnHashChange.
     * @since SmartDeviceLink 3.0.0
     * @returns {Number} - The enum value.
     */
    static get OnHashChange () {
        return FunctionID._MAP.OnHashChange;
    }

    /**
     * Get the enum value for OnInteriorVehicleData.
     * @since SmartDeviceLink 4.5.0
     * @returns {Number} - The enum value.
     */
    static get OnInteriorVehicleData () {
        return FunctionID._MAP.OnInteriorVehicleData;
    }

    /**
     * Get the enum value for OnWayPointChange.
     * @since SmartDeviceLink 4.1.0
     * @returns {Number} - The enum value.
     */
    static get OnWayPointChange () {
        return FunctionID._MAP.OnWayPointChange;
    }

    /**
     * Get the enum value for OnRCStatus.
     * @since SmartDeviceLink 5.0.0
     * @returns {Number} - The enum value.
     */
    static get OnRCStatus () {
        return FunctionID._MAP.OnRCStatus;
    }

    /**
     * Get the enum value for OnAppServiceData.
     * @since SmartDeviceLink 5.1.0
     * @returns {Number} - The enum value.
     */
    static get OnAppServiceData () {
        return FunctionID._MAP.OnAppServiceData;
    }

    /**
     * Get the enum value for OnSystemCapabilityUpdated.
     * @since SmartDeviceLink 5.1.0
     * @returns {Number} - The enum value.
     */
    static get OnSystemCapabilityUpdated () {
        return FunctionID._MAP.OnSystemCapabilityUpdated;
    }

    /**
     * Get the enum value for OnSubtleAlertPressed.
     * @since SmartDeviceLink 7.0.0
     * @returns {Number} - The enum value.
     */
    static get OnSubtleAlertPressed () {
        return FunctionID._MAP.OnSubtleAlertPressed;
    }

    /**
     * Get the enum value for OnUpdateFile.
     * @since SmartDeviceLink 7.0.0
     * @returns {Number} - The enum value.
     */
    static get OnUpdateFile () {
        return FunctionID._MAP.OnUpdateFile;
    }

    /**
     * Get the enum value for OnUpdateSubMenu.
     * @since SmartDeviceLink 7.0.0
     * @returns {Number} - The enum value.
     */
    static get OnUpdateSubMenu () {
        return FunctionID._MAP.OnUpdateSubMenu;
    }

    /**
     * Get the enum value for EncodedSyncPData.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get EncodedSyncPData () {
        return FunctionID._MAP.EncodedSyncPData;
    }

    /**
     * Get the enum value for SdlPData.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get SdlPData () {
        return FunctionID._MAP.SdlPData;
    }

    /**
     * Get the enum value for OnEncodedSyncPData.
     * @since SmartDeviceLink 1.0.0
     * @returns {Number} - The enum value.
     */
    static get OnEncodedSyncPData () {
        return FunctionID._MAP.OnEncodedSyncPData;
    }

    /**
     * Get the enum value for OnSyncPData.
     * @since SmartDeviceLink 1.0.0
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

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(FunctionID._MAP);
    }
}

FunctionID._MAP = Object.freeze({
    'RESERVED': 'RESERVED',
    'RegisterAppInterface': 0x01,
    'UnregisterAppInterface': 0x02,
    'SetGlobalProperties': 0x03,
    'ResetGlobalProperties': 0x04,
    'AddCommand': 0x05,
    'DeleteCommand': 0x06,
    'AddSubMenu': 0x07,
    'DeleteSubMenu': 0x08,
    'CreateInteractionChoiceSet': 0x09,
    'PerformInteraction': 0x0A,
    'DeleteInteractionChoiceSet': 0x0B,
    'Alert': 0x0C,
    'Show': 0x0D,
    'Speak': 0x0E,
    'SetMediaClockTimer': 0x0F,
    'PerformAudioPassThru': 0x10,
    'EndAudioPassThru': 0x11,
    'SubscribeButton': 0x12,
    'UnsubscribeButton': 0x13,
    'SubscribeVehicleData': 0x14,
    'UnsubscribeVehicleData': 0x15,
    'GetVehicleData': 0x16,
    'ReadDID': 0x17,
    'GetDTCs': 0x18,
    'ScrollableMessage': 0x19,
    'Slider': 0x1A,
    'ShowConstantTBT': 0x1B,
    'AlertManeuver': 0x1C,
    'UpdateTurnList': 0x1D,
    'ChangeRegistration': 0x1E,
    'GenericResponse': 0x1F,
    'PutFile': 0x20,
    'DeleteFile': 0x21,
    'ListFiles': 0x22,
    'SetAppIcon': 0x23,
    'SetDisplayLayout': 0x24,
    'DiagnosticMessage': 0x25,
    'SystemRequest': 0x26,
    'SendLocation': 0x27,
    'DialNumber': 0x28,
    'ButtonPress': 0x29,
    'GetInteriorVehicleData': 0x2B,
    'SetInteriorVehicleData': 0x2C,
    'GetWayPoints': 0x2D,
    'SubscribeWayPoints': 0x2E,
    'UnsubscribeWayPoints': 0x2F,
    'GetSystemCapability': 0x30,
    'SendHapticData': 0x31,
    'SetCloudAppProperties': 0x32,
    'GetCloudAppProperties': 0x33,
    'PublishAppService': 0x34,
    'GetAppServiceData': 0x35,
    'GetFile': 0x36,
    'PerformAppServiceInteraction': 0x37,
    'UnpublishAppService': 0x38,
    'CancelInteraction': 0x39,
    'CloseApplication': 0x3A,
    'ShowAppMenu': 0x3B,
    'CreateWindow': 0x3C,
    'DeleteWindow': 0x3D,
    'GetInteriorVehicleDataConsent': 0x3E,
    'ReleaseInteriorVehicleDataModule': 0x3F,
    'SubtleAlert': 0x40,
    'OnHMIStatus': 0x8000,
    'OnAppInterfaceUnregistered': 0x8001,
    'OnButtonEvent': 0x8002,
    'OnButtonPress': 0x8003,
    'OnVehicleData': 0x8004,
    'OnCommand': 0x8005,
    'OnTBTClientState': 0x8006,
    'OnDriverDistraction': 0x8007,
    'OnPermissionsChange': 0x8008,
    'OnAudioPassThru': 0x8009,
    'OnLanguageChange': 0x800A,
    'OnKeyboardInput': 0x800B,
    'OnTouchEvent': 0x800C,
    'OnSystemRequest': 0x800D,
    'OnHashChange': 0x800E,
    'OnInteriorVehicleData': 0x800F,
    'OnWayPointChange': 0x8010,
    'OnRCStatus': 0x8011,
    'OnAppServiceData': 0x8012,
    'OnSystemCapabilityUpdated': 0x8013,
    'OnSubtleAlertPressed': 0x8014,
    'OnUpdateFile': 0x8015,
    'OnUpdateSubMenu': 0x8016,
    'EncodedSyncPData': 0x10000,
    'SyncPData': 0x10001,
    'OnEncodedSyncPData': 0x18000,
    'OnSyncPData': 0x18001,
});

export { FunctionID };