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
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.SetGlobalProperties);
    }

    /**
     * @param {SeatLocation} location - Location of the user's seat. Default is driver's seat location if it is not set
     *                                  yet.
     * @return {SetGlobalProperties}
     */
    setUserLocation (location) {
        this.validateType(SeatLocation, location);
        this.setParameter(SetGlobalProperties.KEY_USER_LOCATION, location);
        return this;
    }

    /**
     * @return {SeatLocation}
     */
    getUserLocation () {
        return this.getObject(SeatLocation, SetGlobalProperties.KEY_USER_LOCATION);
    }

    /**
     * @param {TTSChunk[]} prompt - The help prompt. An array of text chunks of type TTSChunk. See TTSChunk. The array
     *                              must have at least one item.
     * @return {SetGlobalProperties}
     */
    setHelpPrompt (prompt) {
        this.validateType(TTSChunk, prompt, true);
        this.setParameter(SetGlobalProperties.KEY_HELP_PROMPT, prompt);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getHelpPrompt () {
        return this.getObject(TTSChunk, SetGlobalProperties.KEY_HELP_PROMPT);
    }

    /**
     * @param {TTSChunk[]} prompt - Help text for a wait timeout. An array of text chunks of type TTSChunk. See
     *                              TTSChunk. The array must have at least one item.
     * @return {SetGlobalProperties}
     */
    setTimeoutPrompt (prompt) {
        this.validateType(TTSChunk, prompt, true);
        this.setParameter(SetGlobalProperties.KEY_TIMEOUT_PROMPT, prompt);
        return this;
    }

    /**
     * @return {TTSChunk[]}
     */
    getTimeoutPrompt () {
        return this.getObject(TTSChunk, SetGlobalProperties.KEY_TIMEOUT_PROMPT);
    }

    /**
     * @param {String} title - VR Help Title text. If omitted on supported displays, the default module help title shall
     *                         be used. If omitted and one or more vrHelp items are provided, the request will be
     *                         rejected.
     * @return {SetGlobalProperties}
     */
    setVrHelpTitle (title) {
        this.setParameter(SetGlobalProperties.KEY_VR_HELP_TITLE, title);
        return this;
    }

    /**
     * @return {String}
     */
    getVrHelpTitle () {
        return this.getParameter(SetGlobalProperties.KEY_VR_HELP_TITLE);
    }

    /**
     * @param {VrHelpItem[]} help - VR Help Items. If omitted on supported displays, the default SmartDeviceLink VR help
     *                              / What Can I Say? screen shall be used. If the list of VR Help Items contains
     *                              nonsequential positions (e.g. [1,2,4]), the RPC shall be rejected. If omitted and a
     *                              vrHelpTitle is provided, the request will be rejected.
     * @return {SetGlobalProperties}
     */
    setVrHelp (help) {
        this.validateType(VrHelpItem, help, true);
        this.setParameter(SetGlobalProperties.KEY_VR_HELP, help);
        return this;
    }

    /**
     * @return {VrHelpItem[]}
     */
    getVrHelp () {
        return this.getObject(VrHelpItem, SetGlobalProperties.KEY_VR_HELP);
    }

    /**
     * @param {String} title - Optional text to label an app menu button (for certain touchscreen platforms).
     * @return {SetGlobalProperties}
     */
    setMenuTitle (title) {
        this.setParameter(SetGlobalProperties.KEY_MENU_TITLE, title);
        return this;
    }

    /**
     * @return {String}
     */
    getMenuTitle () {
        return this.getParameter(SetGlobalProperties.KEY_MENU_TITLE);
    }

    /**
     * @param {Image} icon - Optional icon to draw on an app menu button (for certain touchscreen platforms).
     * @return {SetGlobalProperties}
     */
    setMenuIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(SetGlobalProperties.KEY_MENU_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
     */
    getMenuIcon () {
        return this.getObject(Image, SetGlobalProperties.KEY_MENU_ICON);
    }

    /**
     * @param {KeyboardProperties} properties - On-screen keyboard configuration (if available).
     * @return {SetGlobalProperties}
     */
    setKeyboardProperties (properties) {
        this.validateType(KeyboardProperties, properties);
        this.setParameter(SetGlobalProperties.KEY_KEYBOARD_PROPERTIES, properties);
        return this;
    }

    /**
     * @return {KeyboardProperties}
     */
    getKeyboardProperties () {
        return this.getObject(KeyboardProperties, SetGlobalProperties.KEY_KEYBOARD_PROPERTIES);
    }

    /**
     * @param {MenuLayout} layout - Sets the layout of the main menu screen. If this is sent while a menu is already on-
     *                              screen, the head unit will change the display to the new layout type.
     * @return {SetGlobalProperties}
     */
    setMenuLayout (layout) {
        this.validateType(MenuLayout, layout);
        this.setParameter(SetGlobalProperties.KEY_MENU_LAYOUT, layout);
        return this;
    }

    /**
     * @return {MenuLayout}
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