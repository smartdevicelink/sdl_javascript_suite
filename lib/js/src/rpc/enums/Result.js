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
 * @typedef {Enum} Result
 * @property {Object} _MAP
 */
class Result extends Enum {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @return {String} 
     */
    static get SUCCESS() {
        return Result._MAP.SUCCESS;
    }

    /**
     * @return {String} 
     */
    static get UNSUPPORTED_REQUEST() {
        return Result._MAP.UNSUPPORTED_REQUEST;
    }

    /**
     * @return {String} 
     */
    static get UNSUPPORTED_RESOURCE() {
        return Result._MAP.UNSUPPORTED_REQUEST;
    }

    /**
     * @return {String} 
     */
    static get DISALLOWED() {
        return Result._MAP.DISALLOWED;
    }

    /**
     * @return {String} 
     */
    static get REJECTED() {
        return Result._MAP.REJECTED;
    }

    /**
     * @return {String} 
     */
    static get ABORTED() {
        return Result._MAP.ABORTED;
    }

    /**
     * @return {String} 
     */
    static get IGNORED() {
        return Result._MAP.IGNORED;
    }

    /**
     * @return {String} 
     */
    static get RETRY() {
        return Result._MAP.RETRY;
    }

    /**
     * @return {String} 
     */
    static get IN_USE() {
        return Result._MAP.IN_USE;
    }

    /**
     * @return {String} 
     */
    static get VEHICLE_DATA_NOT_AVAILABLE() {
        return Result._MAP.VEHICLE_DATA_NOT_AVAILABLE;
    }

    /**
     * @return {String} 
     */
    static get TIMED_OUT() {
        return Result._MAP.TIMED_OUT;
    }

    /**
     * @return {String} 
     */
    static get INVALID_DATA() {
        return Result._MAP.INVALID_DATA;
    }

    /**
     * @return {String} 
     */
    static get CHAR_LIMIT_EXCEEDED() {
        return Result._MAP.CHAR_LIMIT_EXCEEDED;
    }

    /**
     * @return {String} 
     */
    static get INVALID_ID() {
        return Result._MAP.INVALID_ID;
    }

    /**
     * @return {String} 
     */
    static get DUPLICATE_NAME() {
        return Result._MAP.DUPLICATE_NAME;
    }

    /**
     * @return {String} 
     */
    static get APPLICATION_NOT_REGISTERED() {
        return Result._MAP.APPLICATION_NOT_REGISTERED;
    }

    /**
     * @return {String} 
     */
    static get WRONG_LANGUAGE() {
        return Result._MAP.WRONG_LANGUAGE;
    }

    /**
     * @return {String} 
     */
    static get OUT_OF_MEMORY() {
        return Result._MAP.OUT_OF_MEMORY;
    }

    /**
     * @return {String} 
     */
    static get TOO_MANY_PENDING_REQUESTS() {
        return Result._MAP.TOO_MANY_PENDING_REQUESTS;
    }

    /**
     * @return {String} 
     */
    static get TOO_MANY_APPLICATIONS() {
        return Result._MAP.TOO_MANY_APPLICATIONS;
    }

    /**
     * @return {String} 
     */
    static get APPLICATION_REGISTERED_ALREADY() {
        return Result._MAP.APPLICATION_REGISTERED_ALREADY;
    }

    /**
     * @return {String} 
     */
    static get WARNINGS() {
        return Result._MAP.WARNINGS;
    }

    /**
     * @return {String} 
     */
    static get GENERIC_ERROR() {
        return Result._MAP.GENERIC_ERROR;
    }

    /**
     * @return {String} 
     */
    static get USER_DISALLOWED() {
        return Result._MAP.USER_DISALLOWED;
    }

    /**
     * @return {String} 
     */
    static get TRUNCATED_DATA() {
        return Result._MAP.TRUNCATED_DATA;
    }

    /**
     * @return {String} 
     */
    static get UNSUPPORTED_VERSION() {
        return Result._MAP.UNSUPPORTED_VERSION;
    }

    /**
     * @return {String} 
     */
    static get VEHICLE_DATA_NOT_ALLOWED() {
        return Result._MAP.VEHICLE_DATA_NOT_ALLOWED;
    }

    /**
     * @return {String} 
     */
    static get FILE_NOT_FOUND() {
        return Result._MAP.FILE_NOT_FOUND;
    }

    /**
     * @return {String} 
     */
    static get CANCEL_ROUTE() {
        return Result._MAP.CANCEL_ROUTE;
    }

    /**
     * @return {String} 
     */
    static get SAVED() {
        return Result._MAP.SAVED;
    }

    /**
     * @return {String} 
     */
    static get INVALID_CERT() {
        return Result._MAP.INVALID_CERT;
    }

    /**
     * @return {String} 
     */
    static get EXPIRED_CERT() {
        return Result._MAP.EXPIRED_CERT;
    }

    /**
     * @return {String} 
     */
    static get RESUME_FAILED() {
        return Result._MAP.RESUME_FAILED;
    }

    /**
     * @return {String} 
     */
    static get DATA_NOT_AVAILABLE() {
        return Result._MAP.DATA_NOT_AVAILABLE;
    }

    /**
     * @return {String} 
     */
    static get READ_ONLY() {
        return Result._MAP.READ_ONLY;
    }

    /**
     * @return {String} 
     */
    static get CORRUPTED_DATA() {
        return Result._MAP.CORRUPTED_DATA;
    }

    /**
    * Confirms whether the value passed in exists in the Enums of this class
    * @param {String} value
    * @return {null|String} - Returns null if the enum value doesn't exist
    */
    static valueForString(value) {
        return Result.valueForStringInternal(value, Result._MAP);
    }

    /**
    * Returns the key of the map with the corresponding value
    * @param {String} value
    * @return {null|String} - Returns null if not found
    */
    static keyForValue(value) {
        return Result.keyForValueInternal(value, Result._MAP);
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
});

export { Result };
