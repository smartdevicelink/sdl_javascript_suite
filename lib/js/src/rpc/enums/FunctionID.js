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

import { Enum } from '../../util/Enum.js';

/**
 * @typedef {Enum} FunctionID
 * @property {Object} _MAP
 */
class FunctionID extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
    * @return {Number}
    */
    static get RegisterAppInterface () {
        return FunctionID._MAP.RegisterAppInterface;
    }

    /**
    * @return {Number}
    */
    static get UnregisterAppInterface () {
        return FunctionID._MAP.UnregisterAppInterface;
    }

    /**
    * @return {Number}
    */
    static get SetGlobalProperties () {
        return FunctionID._MAP.SetGlobalProperties;
    }

    /**
    * @return {Number}
    */
    static get ResetGlobalProperties () {
        return FunctionID._MAP.ResetGlobalProperties;
    }

    /**
    * @return {Number}
    */
    static get AddCommand () {
        return FunctionID._MAP.AddCommand;
    }

    /**
    * @return {Number}
    */
    static get DeleteCommand () {
        return FunctionID._MAP.DeleteCommand;
    }

    /**
    * @return {Number}
    */
    static get AddSubMenu () {
        return FunctionID._MAP.AddSubMenu;
    }

    /**
    * @return {Number}
    */
    static get DeleteSubMenu () {
        return FunctionID._MAP.DeleteSubMenu;
    }

    /**
    * @return {Number}
    */
    static get CreateInteractionChoiceSet () {
        return FunctionID._MAP.CreateInteractionChoiceSet;
    }

    /**
    * @return {Number}
    */
    static get PerformInteraction () {
        return FunctionID._MAP.PerformInteraction;
    }

    /**
    * @return {Number}
    */
    static get DeleteInteractionChoiceSet () {
        return FunctionID._MAP.DeleteInteractionChoiceSet;
    }

    /**
    * @return {Number}
    */
    static get Alert () {
        return FunctionID._MAP.Alert;
    }

    /**
    * @return {Number}
    */
    static get Show () {
        return FunctionID._MAP.Show;
    }

    /**
    * @return {Number}
    */
    static get Speak () {
        return FunctionID._MAP.Speak;
    }

    /**
    * @return {Number}
    */
    static get SetMediaClockTimer () {
        return FunctionID._MAP.SetMediaClockTimer;
    }

    /**
    * @return {Number}
    */
    static get PerformAudioPassThru () {
        return FunctionID._MAP.PerformAudioPassThru;
    }

    /**
    * @return {Number}
    */
    static get EndAudioPassThru () {
        return FunctionID._MAP.EndAudioPassThru;
    }

    /**
    * @return {Number}
    */
    static get SubscribeButton () {
        return FunctionID._MAP.SubscribeButton;
    }

    /**
    * @return {Number}
    */
    static get UnsubscribeButton () {
        return FunctionID._MAP.UnsubscribeButton;
    }

    /**
    * @return {Number}
    */
    static get SubscribeVehicleData () {
        return FunctionID._MAP.SubscribeVehicleData;
    }

    /**
    * @return {Number}
    */
    static get UnsubscribeVehicleData () {
        return FunctionID._MAP.UnsubscribeVehicleData;
    }

    /**
    * @return {Number}
    */
    static get GetVehicleData () {
        return FunctionID._MAP.GetVehicleData;
    }

    /**
    * @return {Number}
    */
    static get ReadDID () {
        return FunctionID._MAP.ReadDID;
    }

    /**
    * @return {Number}
    */
    static get GetDTCs () {
        return FunctionID._MAP.GetDTCs;
    }

    /**
    * @return {Number}
    */
    static get ScrollableMessage () {
        return FunctionID._MAP.ScrollableMessage;
    }

    /**
    * @return {Number}
    */
    static get Slider () {
        return FunctionID._MAP.Slider;
    }

    /**
    * @return {Number}
    */
    static get ShowConstantTBT () {
        return FunctionID._MAP.ShowConstantTBT;
    }

    /**
    * @return {Number}
    */
    static get AlertManeuver () {
        return FunctionID._MAP.AlertManeuver;
    }

    /**
    * @return {Number}
    */
    static get UpdateTurnList () {
        return FunctionID._MAP.UpdateTurnList;
    }

    /**
    * @return {Number}
    */
    static get ChangeRegistration () {
        return FunctionID._MAP.ChangeRegistration;
    }

    /**
    * @return {Number}
    */
    static get GenericResponse () {
        return FunctionID._MAP.GenericResponse;
    }

    /**
    * @return {Number}
    */
    static get PutFile () {
        return FunctionID._MAP.PutFile;
    }

    /**
    * @return {Number}
    */
    static get DeleteFile () {
        return FunctionID._MAP.DeleteFile;
    }

    /**
    * @return {Number}
    */
    static get ListFiles () {
        return FunctionID._MAP.ListFiles;
    }

    /**
    * @return {Number}
    */
    static get SetAppIcon () {
        return FunctionID._MAP.SetAppIcon;
    }

    /**
    * @return {Number}
    */
    static get SetDisplayLayout () {
        return FunctionID._MAP.SetDisplayLayout;
    }

    /**
    * @return {Number}
    */
    static get DiagnosticMessage () {
        return FunctionID._MAP.DiagnosticMessage;
    }

    /**
    * @return {Number}
    */
    static get SystemRequest () {
        return FunctionID._MAP.SystemRequest;
    }

    /**
    * @return {Number}
    */
    static get SendLocation () {
        return FunctionID._MAP.SendLocation;
    }

    /**
    * @return {Number}
    */
    static get DialNumber () {
        return FunctionID._MAP.DialNumber;
    }

    /**
    * @return {Number}
    */
    static get ButtonPress () {
        return FunctionID._MAP.ButtonPress;
    }

    /**
    * @return {Number}
    */
    static get GetInteriorVehicleData () {
        return FunctionID._MAP.GetInteriorVehicleData;
    }

    /**
    * @return {Number}
    */
    static get SetInteriorVehicleData () {
        return FunctionID._MAP.SetInteriorVehicleData;
    }

    /**
    * @return {Number}
    */
    static get GetWayPoints () {
        return FunctionID._MAP.GetWayPoints;
    }

    /**
    * @return {Number}
    */
    static get SubscribeWayPoints () {
        return FunctionID._MAP.SubscribeWayPoints;
    }

    /**
    * @return {Number}
    */
    static get UnsubscribeWayPoints () {
        return FunctionID._MAP.UnsubscribeWayPoints;
    }

    /**
    * @return {Number}
    */
    static get GetSystemCapability () {
        return FunctionID._MAP.GetSystemCapability;
    }

    /**
    * @return {Number}
    */
    static get SendHapticData () {
        return FunctionID._MAP.SendHapticData;
    }

    /**
    * @return {Number}
    */
    static get SetCloudAppProperties () {
        return FunctionID._MAP.SetCloudAppProperties;
    }

    /**
    * @return {Number}
    */
    static get GetCloudAppProperties () {
        return FunctionID._MAP.GetCloudAppProperties;
    }

    /**
    * @return {Number}
    */
    static get PublishAppService () {
        return FunctionID._MAP.PublishAppService;
    }

    /**
    * @return {Number}
    */
    static get GetAppServiceData () {
        return FunctionID._MAP.GetAppServiceData;
    }

    /**
    * @return {Number}
    */
    static get GetFile () {
        return FunctionID._MAP.GetFile;
    }

    /**
    * @return {Number}
    */
    static get PerformAppServiceInteraction () {
        return FunctionID._MAP.PerformAppServiceInteraction;
    }

    /**
    * @return {Number}
    */
    static get UnpublishAppService () {
        return FunctionID._MAP.UnpublishAppService;
    }

    /**
    * @return {Number}
    */
    static get CancelInteraction () {
        return FunctionID._MAP.CancelInteraction;
    }

    /**
    * @return {Number}
    */
    static get CloseApplication () {
        return FunctionID._MAP.CloseApplication;
    }

    /**
    * @return {Number}
    */
    static get ShowAppMenu () {
        return FunctionID._MAP.ShowAppMenu;
    }

    /**
    * @return {Number}
    */
    static get CreateWindow () {
        return FunctionID._MAP.CreateWindow;
    }

    /**
    * @return {Number}
    */
    static get DeleteWindow () {
        return FunctionID._MAP.DeleteWindow;
    }

    /**
    * @return {Number}
    */
    static get GetInteriorVehicleDataConsent () {
        return FunctionID._MAP.GetInteriorVehicleDataConsent;
    }

    /**
    * @return {Number}
    */
    static get ReleaseInteriorVehicleDataModule () {
        return FunctionID._MAP.ReleaseInteriorVehicleDataModule;
    }

    /**
    * @return {Number}
    */
    static get OnHMIStatus () {
        return FunctionID._MAP.OnHMIStatus;
    }

    /**
    * @return {Number}
    */
    static get OnAppInterfaceUnregistered () {
        return FunctionID._MAP.OnAppInterfaceUnregistered;
    }

    /**
    * @return {Number}
    */
    static get OnButtonEvent () {
        return FunctionID._MAP.OnButtonEvent;
    }

    /**
    * @return {Number}
    */
    static get OnButtonPress () {
        return FunctionID._MAP.OnButtonPress;
    }

    /**
    * @return {Number}
    */
    static get OnVehicleData () {
        return FunctionID._MAP.OnVehicleData;
    }

    /**
    * @return {Number}
    */
    static get OnCommand () {
        return FunctionID._MAP.OnCommand;
    }

    /**
    * @return {Number}
    */
    static get OnTBTClientState () {
        return FunctionID._MAP.OnTBTClientState;
    }

    /**
    * @return {Number}
    */
    static get OnDriverDistraction () {
        return FunctionID._MAP.OnDriverDistraction;
    }

    /**
    * @return {Number}
    */
    static get OnPermissionsChange () {
        return FunctionID._MAP.OnPermissionsChange;
    }

    /**
    * @return {Number}
    */
    static get OnAudioPassThru () {
        return FunctionID._MAP.OnAudioPassThru;
    }

    /**
    * @return {Number}
    */
    static get OnLanguageChange () {
        return FunctionID._MAP.OnLanguageChange;
    }

    /**
    * @return {Number}
    */
    static get OnKeyboardInput () {
        return FunctionID._MAP.OnKeyboardInput;
    }

    /**
    * @return {Number}
    */
    static get OnTouchEvent () {
        return FunctionID._MAP.OnTouchEvent;
    }

    /**
    * @return {Number}
    */
    static get OnSystemRequest () {
        return FunctionID._MAP.OnSystemRequest;
    }

    /**
    * @return {Number}
    */
    static get OnHashChange () {
        return FunctionID._MAP.OnHashChange;
    }

    /**
    * @return {Number}
    */
    static get OnInteriorVehicleData () {
        return FunctionID._MAP.OnInteriorVehicleData;
    }

    /**
    * @return {Number}
    */
    static get OnWayPointChange () {
        return FunctionID._MAP.OnWayPointChange;
    }

    /**
    * @return {Number}
    */
    static get OnRCStatus () {
        return FunctionID._MAP.OnRCStatus;
    }

    /**
    * @return {Number}
    */
    static get OnAppServiceData () {
        return FunctionID._MAP.OnAppServiceData;
    }

    /**
    * @return {Number}
    */
    static get OnSystemCapabilityUpdated () {
        return FunctionID._MAP.OnSystemCapabilityUpdated;
    }

    /**
    * Get the value for the given enum key
    * @param value - A key to find in the map of the subclass
    * @return {*} - Returns a value if found, or null if not found
    */
    static valueForKey (key) {
        return FunctionID._valueForKey(key, FunctionID._MAP);
    }

    /**
    * Get the key for the given enum value
    * @param value - A primitive value to find the matching key for in the map of the subclass
    * @return {*} - Returns a key if found, or null if not found
    */
    static keyForValue (value) {
        return FunctionID._keyForValue(value, FunctionID._MAP);
    }
}

FunctionID._MAP = Object.freeze({
    'RegisterAppInterface':                0x01,
    'UnregisterAppInterface':              0x02,
    'SetGlobalProperties':                 0x03,
    'ResetGlobalProperties':               0x04,
    'AddCommand':                          0x05,
    'DeleteCommand':                       0x06,
    'AddSubMenu':                          0x07,
    'DeleteSubMenu':                       0x08,
    'CreateInteractionChoiceSet':          0x09,
    'PerformInteraction':                  0x0A,
    'DeleteInteractionChoiceSet':          0x0B,
    'Alert':                               0x0C,
    'Show':                                0x0D,
    'Speak':                               0x0E,
    'SetMediaClockTimer':                  0x0F,
    'PerformAudioPassThru':                0x10,
    'EndAudioPassThru':                    0x11,
    'SubscribeButton':                     0x12,
    'UnsubscribeButton':                   0x13,
    'SubscribeVehicleData':                0x14,
    'UnsubscribeVehicleData':              0x15,
    'GetVehicleData':                      0x16,
    'ReadDID':                             0x17,
    'GetDTCs':                             0x18,
    'ScrollableMessage':                   0x19,
    'Slider':                              0x1A,
    'ShowConstantTBT':                     0x1B,
    'AlertManeuver':                       0x1C,
    'UpdateTurnList':                      0x1D,
    'ChangeRegistration':                  0x1E,
    'GenericResponse':                     0x1F,
    'PutFile':                             0x20,
    'DeleteFile':                          0x21,
    'ListFiles':                           0x22,
    'SetAppIcon':                          0x23,
    'SetDisplayLayout':                    0x24,
    'DiagnosticMessage':                   0x25,
    'SystemRequest':                       0x26,
    'SendLocation':                        0x27,
    'DialNumber':                          0x28,
    'ButtonPress':                         0x29,
    'GetInteriorVehicleData':              0x2B,
    'SetInteriorVehicleData':              0x2C,
    'GetWayPoints':                        0x2D,
    'SubscribeWayPoints':                  0x2E,
    'UnsubscribeWayPoints':                0x2F,
    'GetSystemCapability':                 0x30,
    'SendHapticData':                      0x31,
    'SetCloudAppProperties':               0x32,
    'GetCloudAppProperties':               0x33,
    'PublishAppService':                   0x34,
    'GetAppServiceData':                   0x35,
    'GetFile':                             0x36,
    'PerformAppServiceInteraction':        0x37,
    'UnpublishAppService':                 0x38,
    'CancelInteraction':                   0x39,
    'CloseApplication':                    0x3A,
    'ShowAppMenu':                         0x3B,
    'CreateWindow':                        0x3C,
    'DeleteWindow':                        0x3D,
    'GetInteriorVehicleDataConsent':       0x3E,
    'ReleaseInteriorVehicleDataModule':    0x3F,
    'OnHMIStatus':                         0x8000,
    'OnAppInterfaceUnregistered':          0x8001,
    'OnButtonEvent':                       0x8002,
    'OnButtonPress':                       0x8003,
    'OnVehicleData':                       0x8004,
    'OnCommand':                           0x8005,
    'OnTBTClientState':                    0x8006,
    'OnDriverDistraction':                 0x8007,
    'OnPermissionsChange':                 0x8008,
    'OnAudioPassThru':                     0x8009,
    'OnLanguageChange':                    0x800A,
    'OnKeyboardInput':                     0x800B,
    'OnTouchEvent':                        0x800C,
    'OnSystemRequest':                     0x800D,
    'OnHashChange':                        0x800E,
    'OnInteriorVehicleData':               0x800F,
    'OnWayPointChange':                    0x8010,
    'OnRCStatus':                          0x8011,
    'OnAppServiceData':                    0x8012,
    'OnSystemCapabilityUpdated':           0x8013,
});

export { FunctionID };