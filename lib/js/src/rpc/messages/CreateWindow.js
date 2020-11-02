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
import { RpcRequest } from '../RpcRequest.js';
import { WindowType } from '../enums/WindowType.js';

/**
 * Create a new window on the display with the specified window type.
 */
class CreateWindow extends RpcRequest {
    /**
     * Initalizes an instance of CreateWindow.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 6.0.0
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionId(FunctionID.CreateWindow);
    }

    /**
     * Set the WindowID
     * @param {Number} id - A unique ID to identify the window. The value of '0' will always be the default main window on the main display and should not be used in this context as it will already be created for the app. See PredefinedWindows enum. Creating a window with an ID that is already in use will be rejected with `INVALID_ID`. - The desired WindowID.
     * @returns {CreateWindow} - The class instance for method chaining.
     */
    setWindowID (id) {
        this.setParameter(CreateWindow.KEY_WINDOW_ID, id);
        return this;
    }

    /**
     * Get the WindowID
     * @returns {Number} - the KEY_WINDOW_ID value
     */
    getWindowID () {
        return this.getParameter(CreateWindow.KEY_WINDOW_ID);
    }

    /**
     * Set the WindowName
     * @param {String} name - The window name to be used by the HMI. The name of the pre-created default window will match the app name. Multiple apps can share the same window name except for the default main window. Creating a window with a name which is already in use by the app will result in `DUPLICATE_NAME`. - The desired WindowName.
     * {'string_min_length': 1, 'string_max_length': 100}
     * @returns {CreateWindow} - The class instance for method chaining.
     */
    setWindowName (name) {
        this.setParameter(CreateWindow.KEY_WINDOW_NAME, name);
        return this;
    }

    /**
     * Get the WindowName
     * @returns {String} - the KEY_WINDOW_NAME value
     */
    getWindowName () {
        return this.getParameter(CreateWindow.KEY_WINDOW_NAME);
    }

    /**
     * Set the Type
     * @param {WindowType} type - The type of the window to be created. Main window or widget. - The desired Type.
     * @returns {CreateWindow} - The class instance for method chaining.
     */
    setType (type) {
        this._validateType(WindowType, type);
        this.setParameter(CreateWindow.KEY_TYPE, type);
        return this;
    }

    /**
     * Get the Type
     * @returns {WindowType} - the KEY_TYPE value
     */
    getType () {
        return this.getObject(WindowType, CreateWindow.KEY_TYPE);
    }

    /**
     * Set the AssociatedServiceType
     * @param {String} type - Allows an app to create a widget related to a specific service type. As an example if a `MEDIA` app becomes active, this app becomes audible and is allowed to play audio. Actions such as skip or play/pause will be directed to this active media app. In case of widgets, the system can provide a single "media" widget which will act as a placeholder for the active media app. It is only allowed to have one window per service type. This means that a media app can only have a single MEDIA widget. Still the app can create widgets omitting this parameter. Those widgets would be available as app specific widgets that are permanently included in the HMI. This parameter is related to widgets only. The default main window, which is pre-created during app registration, will be created based on the HMI types specified in the app registration request. - The desired AssociatedServiceType.
     * {'string_min_length': 1}
     * @returns {CreateWindow} - The class instance for method chaining.
     */
    setAssociatedServiceType (type) {
        this.setParameter(CreateWindow.KEY_ASSOCIATED_SERVICE_TYPE, type);
        return this;
    }

    /**
     * Get the AssociatedServiceType
     * @returns {String} - the KEY_ASSOCIATED_SERVICE_TYPE value
     */
    getAssociatedServiceType () {
        return this.getParameter(CreateWindow.KEY_ASSOCIATED_SERVICE_TYPE);
    }

    /**
     * Set the DuplicateUpdatesFromWindowID
     * @param {Number} id - Optional parameter. Specify whether the content sent to an existing window should be duplicated to the created window. If there isn't a window with the ID, the request will be rejected with `INVALID_DATA`. - The desired DuplicateUpdatesFromWindowID.
     * @returns {CreateWindow} - The class instance for method chaining.
     */
    setDuplicateUpdatesFromWindowID (id) {
        this.setParameter(CreateWindow.KEY_DUPLICATE_UPDATES_FROM_WINDOW_ID, id);
        return this;
    }

    /**
     * Get the DuplicateUpdatesFromWindowID
     * @returns {Number} - the KEY_DUPLICATE_UPDATES_FROM_WINDOW_ID value
     */
    getDuplicateUpdatesFromWindowID () {
        return this.getParameter(CreateWindow.KEY_DUPLICATE_UPDATES_FROM_WINDOW_ID);
    }
}

CreateWindow.KEY_WINDOW_ID = 'windowID';
CreateWindow.KEY_WINDOW_NAME = 'windowName';
CreateWindow.KEY_TYPE = 'type';
CreateWindow.KEY_ASSOCIATED_SERVICE_TYPE = 'associatedServiceType';
CreateWindow.KEY_DUPLICATE_UPDATES_FROM_WINDOW_ID = 'duplicateUpdatesFromWindowID';

export { CreateWindow };