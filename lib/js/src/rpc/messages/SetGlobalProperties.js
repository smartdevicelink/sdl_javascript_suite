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

import { FunctionID } from '../enums/FunctionID.js';
import { Image } from '../structs/Image.js';
import { KeyboardProperties } from '../structs/KeyboardProperties.js';
import { MenuLayout } from '../enums/MenuLayout.js';
import { RpcRequest } from '../RpcRequest.js';
import { SeatLocation } from '../structs/SeatLocation.js';
import { TTSChunk } from '../structs/TTSChunk.js';
import { VrHelpItem } from '../structs/VrHelpItem.js';

/**
 * Allows setting global properties.
 */
class SetGlobalProperties extends RpcRequest {
    /**
     * Initalizes an instance of SetGlobalProperties.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.SetGlobalProperties);
    }

    /**
     * Set the UserLocation
     * @param {SeatLocation} location - Location of the user's seat. Default is driver's seat location if it is not set yet. - The desired UserLocation.
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setUserLocation (location) {
        this._validateType(SeatLocation, location);
        this.setParameter(SetGlobalProperties.KEY_USER_LOCATION, location);
        return this;
    }

    /**
     * Get the UserLocation
     * @returns {SeatLocation} - the KEY_USER_LOCATION value
     */
    getUserLocation () {
        return this.getObject(SeatLocation, SetGlobalProperties.KEY_USER_LOCATION);
    }

    /**
     * Set the HelpPrompt
     * @param {TTSChunk[]} prompt - The help prompt. An array of text chunks of type TTSChunk. See TTSChunk. The array must have at least one item. - The desired HelpPrompt.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setHelpPrompt (prompt) {
        this._validateType(TTSChunk, prompt, true);
        this.setParameter(SetGlobalProperties.KEY_HELP_PROMPT, prompt);
        return this;
    }

    /**
     * Get the HelpPrompt
     * @returns {TTSChunk[]} - the KEY_HELP_PROMPT value
     */
    getHelpPrompt () {
        return this.getObject(TTSChunk, SetGlobalProperties.KEY_HELP_PROMPT);
    }

    /**
     * Set the TimeoutPrompt
     * @param {TTSChunk[]} prompt - Help text for a wait timeout. An array of text chunks of type TTSChunk. See TTSChunk. The array must have at least one item. - The desired TimeoutPrompt.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setTimeoutPrompt (prompt) {
        this._validateType(TTSChunk, prompt, true);
        this.setParameter(SetGlobalProperties.KEY_TIMEOUT_PROMPT, prompt);
        return this;
    }

    /**
     * Get the TimeoutPrompt
     * @returns {TTSChunk[]} - the KEY_TIMEOUT_PROMPT value
     */
    getTimeoutPrompt () {
        return this.getObject(TTSChunk, SetGlobalProperties.KEY_TIMEOUT_PROMPT);
    }

    /**
     * Set the VrHelpTitle
     * @param {String} title - VR Help Title text. If omitted on supported displays, the default module help title shall be used. If omitted and one or more vrHelp items are provided, the request will be rejected. - The desired VrHelpTitle.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setVrHelpTitle (title) {
        this.setParameter(SetGlobalProperties.KEY_VR_HELP_TITLE, title);
        return this;
    }

    /**
     * Get the VrHelpTitle
     * @returns {String} - the KEY_VR_HELP_TITLE value
     */
    getVrHelpTitle () {
        return this.getParameter(SetGlobalProperties.KEY_VR_HELP_TITLE);
    }

    /**
     * Set the VrHelp
     * @param {VrHelpItem[]} help - VR Help Items. If omitted on supported displays, the default SmartDeviceLink VR help / What Can I Say? screen shall be used. If the list of VR Help Items contains nonsequential positions (e.g. [1,2,4]), the RPC shall be rejected. If omitted and a vrHelpTitle is provided, the request will be rejected. - The desired VrHelp.
     * {'array_min_size': 1, 'array_max_size': 100}
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setVrHelp (help) {
        this._validateType(VrHelpItem, help, true);
        this.setParameter(SetGlobalProperties.KEY_VR_HELP, help);
        return this;
    }

    /**
     * Get the VrHelp
     * @returns {VrHelpItem[]} - the KEY_VR_HELP value
     */
    getVrHelp () {
        return this.getObject(VrHelpItem, SetGlobalProperties.KEY_VR_HELP);
    }

    /**
     * Set the MenuTitle
     * @param {String} title - Optional text to label an app menu button (for certain touchscreen platforms). - The desired MenuTitle.
     * {'string_min_length': 1, 'string_max_length': 500}
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setMenuTitle (title) {
        this.setParameter(SetGlobalProperties.KEY_MENU_TITLE, title);
        return this;
    }

    /**
     * Get the MenuTitle
     * @returns {String} - the KEY_MENU_TITLE value
     */
    getMenuTitle () {
        return this.getParameter(SetGlobalProperties.KEY_MENU_TITLE);
    }

    /**
     * Set the MenuIcon
     * @param {Image} icon - Optional icon to draw on an app menu button (for certain touchscreen platforms). - The desired MenuIcon.
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setMenuIcon (icon) {
        this._validateType(Image, icon);
        this.setParameter(SetGlobalProperties.KEY_MENU_ICON, icon);
        return this;
    }

    /**
     * Get the MenuIcon
     * @returns {Image} - the KEY_MENU_ICON value
     */
    getMenuIcon () {
        return this.getObject(Image, SetGlobalProperties.KEY_MENU_ICON);
    }

    /**
     * Set the KeyboardProperties
     * @param {KeyboardProperties} properties - On-screen keyboard configuration (if available). - The desired KeyboardProperties.
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setKeyboardProperties (properties) {
        this._validateType(KeyboardProperties, properties);
        this.setParameter(SetGlobalProperties.KEY_KEYBOARD_PROPERTIES, properties);
        return this;
    }

    /**
     * Get the KeyboardProperties
     * @returns {KeyboardProperties} - the KEY_KEYBOARD_PROPERTIES value
     */
    getKeyboardProperties () {
        return this.getObject(KeyboardProperties, SetGlobalProperties.KEY_KEYBOARD_PROPERTIES);
    }

    /**
     * Set the MenuLayout
     * @param {MenuLayout} layout - Sets the layout of the main menu screen. If this is sent while a menu is already on-screen, the head unit will change the display to the new layout type. - The desired MenuLayout.
     * @returns {SetGlobalProperties} - The class instance for method chaining.
     */
    setMenuLayout (layout) {
        this._validateType(MenuLayout, layout);
        this.setParameter(SetGlobalProperties.KEY_MENU_LAYOUT, layout);
        return this;
    }

    /**
     * Get the MenuLayout
     * @returns {MenuLayout} - the KEY_MENU_LAYOUT value
     */
    getMenuLayout () {
        return this.getObject(MenuLayout, SetGlobalProperties.KEY_MENU_LAYOUT);
    }
}

SetGlobalProperties.KEY_USER_LOCATION = 'userLocation';
SetGlobalProperties.KEY_HELP_PROMPT = 'helpPrompt';
SetGlobalProperties.KEY_TIMEOUT_PROMPT = 'timeoutPrompt';
SetGlobalProperties.KEY_VR_HELP_TITLE = 'vrHelpTitle';
SetGlobalProperties.KEY_VR_HELP = 'vrHelp';
SetGlobalProperties.KEY_MENU_TITLE = 'menuTitle';
SetGlobalProperties.KEY_MENU_ICON = 'menuIcon';
SetGlobalProperties.KEY_KEYBOARD_PROPERTIES = 'keyboardProperties';
SetGlobalProperties.KEY_MENU_LAYOUT = 'menuLayout';

export { SetGlobalProperties };