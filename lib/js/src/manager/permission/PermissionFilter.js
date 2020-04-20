/*
* Copyright (c) 2020, Livio, Inc.
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

import { uuid } from '../../util/uuid.js';

/**
 * PermissionFilter holds all the required information for a specific PermissionChange Listener
 */
class PermissionFilter {
    /**
     * Create a new instance of PermissionElement
     * @class
     * @param {String} id - A string to uniquely identify this instance of the Filter. If null, will automatically generate a UUIDv4.
     * @param {PermissionElement[]} permissionElements - An array of PermissionElement items
     * @param {Number} groupType - A number representing a PermissionGroupType
     * @param {function} listener - A function to be called upon permission change in the format of function(allowedPermissions, permissionGroupStatus)
     */
    constructor (id = null, permissionElements = [], groupType, listener) {
        if (id === null) {
            this._id = uuid();
        } else {
            this._id = id;
        }
        this._permissionElements = permissionElements;
        this._groupType = groupType;
        this._listener = listener;
    }

    /**
     * Retreives the Filter's ID
     * @returns {String} - The ID of the Filter
     */
    getId () {
        return this._id;
    }

    /**
     * Set the Filter's ID
     * @param {String} id - A string to uniquely identify this instance of the Filter. If null, will automatically generate a UUIDv4.
     * @returns {PermissionFilter} - A reference to this instance to support method chaining.
     */
    setId (id = null) {
        if (id === null) {
            this._id = uuid();
        } else {
            this._id = id;
        }
        return this;
    }

    /**
     * Retreives an array of the Filter's PermissionElement items
     * @returns {PermissionElement[]} - An array of PermissionElement items.
     */
    getPermissionElements () {
        return this._permissionElements;
    }

    /**
     * Set the permission elements to listen for
     * @param {PermissionElement[]} elements - An array of PermissionElement items
     * @returns {PermissionFilter} - A reference to this instance to support method chaining.
     */
    setPermissionElements (elements) {
        this._permissionElements = elements;
        return this;
    }

    /**
     * Retreives the Filter's Permission Group Type
     * @returns {Number} - A number representing a PermissionGroupType
     */
    getGroupType () {
        return this._groupType;
    }

    /**
     * Set the group type
     * @param {Number} type - A number representing a PermissionGroupType
     * @returns {PermissionFilter} - A reference to this instance to support method chaining.
     */
    setGroupType (type) {
        this._groupType = type;
        return this;
    }

    /**
     * Retreives a reference to the Filter's listener function
     * @returns {function} - The Filter's listener function.
     */
    getListener () {
        return this._listener;
    }

    /**
     * Set the listener function
     * @param {function} listener - A function to be called upon permission change in the format of function(allowedPermissions, permissionGroupStatus)
     * @returns {PermissionFilter} - A reference to this instance to support method chaining.
     */
    setListener (listener) {
        this._listener = listener;
        return this;
    }

    /**
     * Invokes the filter listener if it is a function
     * @param {String[]} allowedPermissions - An array of permission strings
     * @param {Number} permissionGroupStatus - A number representing a PermissionGroupStatus
     */
    onListener (allowedPermissions, permissionGroupStatus) {
        if (typeof this._listener === 'function') {
            this._listener(allowedPermissions, permissionGroupStatus);
        }
    }
}

export { PermissionFilter };