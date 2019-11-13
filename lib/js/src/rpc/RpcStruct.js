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

import { Enum } from '../util/Enum.js';

class RpcStruct {

    /**
    * @constructor
    */
    constructor(parameters = {}) {
        this._isFormatRequested = false;
        this._rpcSpecVersion = null;
        this._parameters = JSON.parse(JSON.stringify(parameters || {}));
    }

    /**
    * @return {Object}
    */
    getParameters() {
        return JSON.parse(JSON.stringify(this._parameters));
    }

    /**
    * @param {String} key
    * @return {*}
    */
    getParameter(key) {
        return this._parameters[key];
    }

    /**
    * @param {String} key
    * @param {*} value
    * @return {RpcStruct}
    */
    setParameter(key, value) {
        if (value === null) {
            delete this._parameters[key];
        } else {
            this._parameters[key] = value;
        }

        return this;
    }

    /**
    * @param {Function} tClass
    * @param {String} key
    * @return {Object}
    */
    getObject(tClass, key) {
        return this.formatObject(tClass, this.getParameter(key));
    }

    /**
    * @param {Function} tClass
    * @param {Object} obj
    * @return {null|Object}
    */
    formatObject(tClass, obj) {
        if (obj === null) {
            return null;
        } else if (obj.constructor === tClass) {
            // if tClass is String and obj is a String, this should execute
            return obj;
        } else if (obj.constructor === String) {
            if (tClass instanceof Enum) {
                return tClass.valueForString(obj);
            } else if (tClass instanceof String) {
                // this may be redundant
                return obj;
            }
            return null;
        } else if (obj.constructor === Object) {
            if (tClass instanceof RpcStruct) {
                return new tClass(obj);
            }
            return null;
        } else if (obj.constructor === Array) {
            // TODO: ensure completeness
            if (obj.length > 0) {
                let outArray = [];
                for (item in obj) {
                    outArray.push(this.formatObject(tclass, item));
                }
                return outArray;
            }
        }
        return null;
    }

    /**
    * @param {Function} tClass
    * @param {Object} obj
    */
    validateType(tClass, obj) {
        if (
            (tClass instanceof Enum && tClass.valueForString(obj) === null)
            || (obj !== null && obj.constructor !== tClass)
        ) {
            throw `${obj.name} must be of type ${tClass.name}`;
        }
    }

}

export { RpcStruct };