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

class Result extends Enum {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    static get SUCCESS() {
        return Result.MAP.SUCCESS;
    }

    static get UNSUPPORTED_REQUEST() {
        return Result.MAP.UNSUPPORTED_REQUEST;
    }

    static get UNSUPPORTED_RESOURCE() {
        return Result.MAP.UNSUPPORTED_REQUEST;
    }

    static get DISALLOWED() {
        return Result.MAP.DISALLOWED;
    }

    static get REJECTED() {
        return Result.MAP.REJECTED;
    }

    static get ABORTED() {
        return Result.MAP.ABORTED;
    }

    static get IGNORED() {
        return Result.MAP.IGNORED;
    }

    static get RETRY() {
        return Result.MAP.RETRY;
    }

    static get IN_USE() {
        return Result.MAP.IN_USE;
    }

    static get VEHICLE_DATA_NOT_AVAILABLE() {
        return Result.MAP.VEHICLE_DATA_NOT_AVAILABLE;
    }

    static get TIMED_OUT() {
        return Result.MAP.TIMED_OUT;
    }

    static get INVALID_DATA() {
        return Result.MAP.INVALID_DATA;
    }

    static get CHAR_LIMIT_EXCEEDED() {
        return Result.MAP.CHAR_LIMIT_EXCEEDED;
    }

    static get INVALID_ID() {
        return Result.MAP.INVALID_ID;
    }

    static get DUPLICATE_NAME() {
        return Result.MAP.DUPLICATE_NAME;
    }

    static get APPLICATION_NOT_REGISTERED() {
        return Result.MAP.APPLICATION_NOT_REGISTERED;
    }

    static get WRONG_LANGUAGE() {
        return Result.MAP.WRONG_LANGUAGE;
    }

    static get OUT_OF_MEMORY() {
        return Result.MAP.OUT_OF_MEMORY;
    }

    static get TOO_MANY_PENDING_REQUESTS() {
        return Result.MAP.TOO_MANY_PENDING_REQUESTS;
    }

    static get TOO_MANY_APPLICATIONS() {
        return Result.MAP.TOO_MANY_APPLICATIONS;
    }

    static get APPLICATION_REGISTERED_ALREADY() {
        return Result.MAP.APPLICATION_REGISTERED_ALREADY;
    }

    static get WARNINGS() {
        return Result.MAP.WARNINGS;
    }

    static get GENERIC_ERROR() {
        return Result.MAP.GENERIC_ERROR;
    }

    static get USER_DISALLOWED() {
        return Result.MAP.USER_DISALLOWED;
    }

    static get TRUNCATED_DATA() {
        return Result.MAP.TRUNCATED_DATA;
    }

    static get UNSUPPORTED_VERSION() {
        return Result.MAP.UNSUPPORTED_VERSION;
    }

    static get VEHICLE_DATA_NOT_ALLOWED() {
        return Result.MAP.VEHICLE_DATA_NOT_ALLOWED;
    }

    static get FILE_NOT_FOUND() {
        return Result.MAP.FILE_NOT_FOUND;
    }

    static get CANCEL_ROUTE() {
        return Result.MAP.CANCEL_ROUTE;
    }

    static get SAVED() {
        return Result.MAP.SAVED;
    }

    static get INVALID_CERT() {
        return Result.MAP.INVALID_CERT;
    }

    static get EXPIRED_CERT() {
        return Result.MAP.EXPIRED_CERT;
    }

    static get RESUME_FAILED() {
        return Result.MAP.RESUME_FAILED;
    }

    static get DATA_NOT_AVAILABLE() {
        return Result.MAP.DATA_NOT_AVAILABLE;
    }

    static get READ_ONLY() {
        return Result.MAP.READ_ONLY;
    }

    static get CORRUPTED_DATA() {
        return Result.MAP.CORRUPTED_DATA;
    }

    static valueForString(value) {
        return Result.valueForStringInternal(value, Result.MAP);
    }

    static keyForValue(value) {
        return Result.keyForValueInternal(value, Result.MAP);
    }

}

Result.MAP = Object.freeze({
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
