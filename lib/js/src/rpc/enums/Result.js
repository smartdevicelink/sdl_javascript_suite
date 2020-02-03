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
 * @typedef {Enum} Result
 * @property {Object} _MAP
 */
class Result extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * The request succeeded
     * @return {String}
     */
    static get SUCCESS () {
        return Result._MAP.SUCCESS;
    }

    /**
     * The request is not supported by the headunit
     * @return {String}
     */
    static get UNSUPPORTED_REQUEST () {
        return Result._MAP.UNSUPPORTED_REQUEST;
    }

    /**
     * A button that was requested for subscription is not supported under the current system.
     * @return {String}
     */
    static get UNSUPPORTED_RESOURCE () {
        return Result._MAP.UNSUPPORTED_RESOURCE;
    }

    /**
     * RPC is not authorized in local policy table.
     * @return {String}
     */
    static get DISALLOWED () {
        return Result._MAP.DISALLOWED;
    }

    /**
     * The requested command was rejected, e.g. because mobile app is in background and cannot perform any HMI
     * commands. Or an HMI command (e.g. Speak) is rejected because a higher priority HMI command (e.g. Alert) is
     * playing.
     * @return {String}
     */
    static get REJECTED () {
        return Result._MAP.REJECTED;
    }

    /**
     * A command was aborted, for example due to user interaction (e.g. user pressed button). Or an HMI command (e.g.
     * Speak) is aborted because a higher priority HMI command (e.g. Alert) was requested.
     * @return {String}
     */
    static get ABORTED () {
        return Result._MAP.ABORTED;
    }

    /**
     * A command was ignored, because the intended result is already in effect. For example, SetMediaClockTimer was
     * used to pause the media clock although the clock is paused already. NOTE: potentially replaces
     * SUBSCRIBED_ALREADY
     * @return {String}
     */
    static get IGNORED () {
        return Result._MAP.IGNORED;
    }

    /**
     * The user interrupted the RPC (e.g. PerformAudioPassThru) and indicated to start over. Note, the app must issue
     * the new RPC.
     * @return {String}
     */
    static get RETRY () {
        return Result._MAP.RETRY;
    }

    /**
     * The data may not be changed, because it is currently in use. For example when trying to delete a command set
     * that is currently involved in an interaction.
     * @return {String}
     */
    static get IN_USE () {
        return Result._MAP.IN_USE;
    }

    /**
     * The requested vehicle data is not available on this vehicle or is not published.
     * @return {String}
     */
    static get VEHICLE_DATA_NOT_AVAILABLE () {
        return Result._MAP.VEHICLE_DATA_NOT_AVAILABLE;
    }

    /**
     * Overlay reached the maximum timeout and closed.
     * @return {String}
     */
    static get TIMED_OUT () {
        return Result._MAP.TIMED_OUT;
    }

    /**
     * The data sent is invalid. For example: Invalid Json syntax Parameters out of bounds (number or enum range)
     * Mandatory parameters not provided Parameter provided with wrong type Invalid characters Empty string
     * @return {String}
     */
    static get INVALID_DATA () {
        return Result._MAP.INVALID_DATA;
    }

    /**
     * @return {String}
     */
    static get CHAR_LIMIT_EXCEEDED () {
        return Result._MAP.CHAR_LIMIT_EXCEEDED;
    }

    /**
     * One of the provided IDs is not valid. For example This applies to CorrelationID, SubscriptionID, CommandID,
     * MenuID, etc.
     * @return {String}
     */
    static get INVALID_ID () {
        return Result._MAP.INVALID_ID;
    }

    /**
     * There was a conflict with an registered name (application or menu item) or vr command
     * @return {String}
     */
    static get DUPLICATE_NAME () {
        return Result._MAP.DUPLICATE_NAME;
    }

    /**
     * An command can not be executed because no application has been registered with RegisterApplication.
     * @return {String}
     */
    static get APPLICATION_NOT_REGISTERED () {
        return Result._MAP.APPLICATION_NOT_REGISTERED;
    }

    /**
     * The requested language is currently not supported. Might be because of a mismatch of the currently active
     * language on the headunit and the requested language
     * @return {String}
     */
    static get WRONG_LANGUAGE () {
        return Result._MAP.WRONG_LANGUAGE;
    }

    /**
     * The system could not process the request because the necessary memory couldn't be allocated
     * @return {String}
     */
    static get OUT_OF_MEMORY () {
        return Result._MAP.OUT_OF_MEMORY;
    }

    /**
     * There are too many requests pending (means, that the response has not been delivered, yet).There may be a
     * maximum of 1000 pending requests at a time.
     * @return {String}
     */
    static get TOO_MANY_PENDING_REQUESTS () {
        return Result._MAP.TOO_MANY_PENDING_REQUESTS;
    }

    /**
     * There are already too many registered applications
     * @return {String}
     */
    static get TOO_MANY_APPLICATIONS () {
        return Result._MAP.TOO_MANY_APPLICATIONS;
    }

    /**
     * RegisterApplication has been called again, after a RegisterApplication was successful before.
     * @return {String}
     */
    static get APPLICATION_REGISTERED_ALREADY () {
        return Result._MAP.APPLICATION_REGISTERED_ALREADY;
    }

    /**
     * The RPC (e.g. SubscribeVehicleData) executed successfully but one or more items have a warning or failure.
     * @return {String}
     */
    static get WARNINGS () {
        return Result._MAP.WARNINGS;
    }

    /**
     * Provided data is valid but something went wrong in the lower layers.
     * @return {String}
     */
    static get GENERIC_ERROR () {
        return Result._MAP.GENERIC_ERROR;
    }

    /**
     * RPC is included in a functional group explicitly blocked by the user.
     * @return {String}
     */
    static get USER_DISALLOWED () {
        return Result._MAP.USER_DISALLOWED;
    }

    /**
     * The RPC (e.g. ReadDID) executed successfully but the data exceeded the platform maximum threshold and thus,
     * only part of the data is available.
     * @return {String}
     */
    static get TRUNCATED_DATA () {
        return Result._MAP.TRUNCATED_DATA;
    }

    /**
     * Sync doesn't support the protocol that is requested by the mobile application
     * @return {String}
     */
    static get UNSUPPORTED_VERSION () {
        return Result._MAP.UNSUPPORTED_VERSION;
    }

    /**
     * The user has turned off access to vehicle data, and it is globally unavailable to mobile applications.
     * @return {String}
     */
    static get VEHICLE_DATA_NOT_ALLOWED () {
        return Result._MAP.VEHICLE_DATA_NOT_ALLOWED;
    }

    /**
     * A specified file could not be found on the headunit.
     * @return {String}
     */
    static get FILE_NOT_FOUND () {
        return Result._MAP.FILE_NOT_FOUND;
    }

    /**
     * User selected to Cancel Route.
     * @return {String}
     */
    static get CANCEL_ROUTE () {
        return Result._MAP.CANCEL_ROUTE;
    }

    /**
     * The RPC (e.g. Slider) executed successfully and the user elected to save the current position / value.
     * @return {String}
     */
    static get SAVED () {
        return Result._MAP.SAVED;
    }

    /**
     * The certificate provided during authentication is invalid.
     * @return {String}
     */
    static get INVALID_CERT () {
        return Result._MAP.INVALID_CERT;
    }

    /**
     * The certificate provided during authentication is expired.
     * @return {String}
     */
    static get EXPIRED_CERT () {
        return Result._MAP.EXPIRED_CERT;
    }

    /**
     * The provided hash ID does not match the hash of the current set of registered data or the core could not resume
     * the previous data.
     * @return {String}
     */
    static get RESUME_FAILED () {
        return Result._MAP.RESUME_FAILED;
    }

    /**
     * The requested information is currently not available. This is different than UNSUPPORTED_RESOURCE because it
     * implies the data is at some point available.
     * @return {String}
     */
    static get DATA_NOT_AVAILABLE () {
        return Result._MAP.DATA_NOT_AVAILABLE;
    }

    /**
     * The value being set is read only
     * @return {String}
     */
    static get READ_ONLY () {
        return Result._MAP.READ_ONLY;
    }

    /**
     * The data sent failed to pass CRC check in receiver end
     * @return {String}
     */
    static get CORRUPTED_DATA () {
        return Result._MAP.CORRUPTED_DATA;
    }

    /**
     * SDL receives an un-encrypted RPC request that needs protection.
     * @return {String}
     */
    static get ENCRYPTION_NEEDED () {
        return Result._MAP.ENCRYPTION_NEEDED;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return Result._valueForKey(key, Result._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return Result._keyForValue(value, Result._MAP);
    }
}

Result._MAP = Object.freeze({
    'SUCCESS': 'SUCCESS',
    'UNSUPPORTED_REQUEST': 'UNSUPPORTED_REQUEST',
    'UNSUPPORTED_RESOURCE': 'UNSUPPORTED_RESOURCE',
    'DISALLOWED': 'DISALLOWED',
    'REJECTED': 'REJECTED',
    'ABORTED': 'ABORTED',
    'IGNORED': 'IGNORED',
    'RETRY': 'RETRY',
    'IN_USE': 'IN_USE',
    'VEHICLE_DATA_NOT_AVAILABLE': 'VEHICLE_DATA_NOT_AVAILABLE',
    'TIMED_OUT': 'TIMED_OUT',
    'INVALID_DATA': 'INVALID_DATA',
    'CHAR_LIMIT_EXCEEDED': 'CHAR_LIMIT_EXCEEDED',
    'INVALID_ID': 'INVALID_ID',
    'DUPLICATE_NAME': 'DUPLICATE_NAME',
    'APPLICATION_NOT_REGISTERED': 'APPLICATION_NOT_REGISTERED',
    'WRONG_LANGUAGE': 'WRONG_LANGUAGE',
    'OUT_OF_MEMORY': 'OUT_OF_MEMORY',
    'TOO_MANY_PENDING_REQUESTS': 'TOO_MANY_PENDING_REQUESTS',
    'TOO_MANY_APPLICATIONS': 'TOO_MANY_APPLICATIONS',
    'APPLICATION_REGISTERED_ALREADY': 'APPLICATION_REGISTERED_ALREADY',
    'WARNINGS': 'WARNINGS',
    'GENERIC_ERROR': 'GENERIC_ERROR',
    'USER_DISALLOWED': 'USER_DISALLOWED',
    'TRUNCATED_DATA': 'TRUNCATED_DATA',
    'UNSUPPORTED_VERSION': 'UNSUPPORTED_VERSION',
    'VEHICLE_DATA_NOT_ALLOWED': 'VEHICLE_DATA_NOT_ALLOWED',
    'FILE_NOT_FOUND': 'FILE_NOT_FOUND',
    'CANCEL_ROUTE': 'CANCEL_ROUTE',
    'SAVED': 'SAVED',
    'INVALID_CERT': 'INVALID_CERT',
    'EXPIRED_CERT': 'EXPIRED_CERT',
    'RESUME_FAILED': 'RESUME_FAILED',
    'DATA_NOT_AVAILABLE': 'DATA_NOT_AVAILABLE',
    'READ_ONLY': 'READ_ONLY',
    'CORRUPTED_DATA': 'CORRUPTED_DATA',
    'ENCRYPTION_NEEDED': 'ENCRYPTION_NEEDED',
});

export { Result };