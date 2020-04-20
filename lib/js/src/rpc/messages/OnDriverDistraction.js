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

import { DriverDistractionState } from '../enums/DriverDistractionState.js';
import { FunctionID } from '../enums/FunctionID.js';
import { RpcNotification } from '../RpcNotification.js';

/**
 * Provides driver distraction state to mobile applications
 */
class OnDriverDistraction extends RpcNotification {
    /**
     * Initalizes an instance of OnDriverDistraction.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.OnDriverDistraction);
    }

    /**
     * Set the State
     * @param {DriverDistractionState} state - Current State of Driver Distraction - The desired State.
     * @returns {OnDriverDistraction} - The class instance for method chaining.
     */
    setState (state) {
        this.validateType(DriverDistractionState, state);
        this.setParameter(OnDriverDistraction.KEY_STATE, state);
        return this;
    }

    /**
     * Get the State
     * @returns {DriverDistractionState} - the KEY_STATE value
     */
    getState () {
        return this.getObject(DriverDistractionState, OnDriverDistraction.KEY_STATE);
    }

    /**
     * Set the LockScreenDismissalEnabled
     * @param {Boolean} enabled - If enabled, the lock screen will be able to be dismissed while connected to SDL, - The desired LockScreenDismissalEnabled.
     * allowing users the ability to interact with the app. Dismissals should include a
     * warning to the user and ensure that they are not the driver.
     * @returns {OnDriverDistraction} - The class instance for method chaining.
     */
    setLockScreenDismissalEnabled (enabled) {
        this.setParameter(OnDriverDistraction.KEY_LOCK_SCREEN_DISMISSAL_ENABLED, enabled);
        return this;
    }

    /**
     * Get the LockScreenDismissalEnabled
     * @returns {Boolean} - the KEY_LOCK_SCREEN_DISMISSAL_ENABLED value
     */
    getLockScreenDismissalEnabled () {
        return this.getParameter(OnDriverDistraction.KEY_LOCK_SCREEN_DISMISSAL_ENABLED);
    }

    /**
     * Set the LockScreenDismissalWarning
     * @param {String} warning - Warning message to be displayed on the lock screen when dismissal is enabled. This - The desired LockScreenDismissalWarning.
     * warning should be used to ensure that the user is not the driver of the vehicle, ex.
     * `Swipe down to dismiss, acknowledging that you are not the driver.`. This parameter
     * must be present if "lockScreenDismissalEnabled" is set to true.
     * @returns {OnDriverDistraction} - The class instance for method chaining.
     */
    setLockScreenDismissalWarning (warning) {
        this.setParameter(OnDriverDistraction.KEY_LOCK_SCREEN_DISMISSAL_WARNING, warning);
        return this;
    }

    /**
     * Get the LockScreenDismissalWarning
     * @returns {String} - the KEY_LOCK_SCREEN_DISMISSAL_WARNING value
     */
    getLockScreenDismissalWarning () {
        return this.getParameter(OnDriverDistraction.KEY_LOCK_SCREEN_DISMISSAL_WARNING);
    }
}

OnDriverDistraction.KEY_STATE = 'state';
OnDriverDistraction.KEY_LOCK_SCREEN_DISMISSAL_ENABLED = 'lockScreenDismissalEnabled';
OnDriverDistraction.KEY_LOCK_SCREEN_DISMISSAL_WARNING = 'lockScreenDismissalWarning';

export { OnDriverDistraction };