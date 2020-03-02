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
    * Initializes an instance of RpcStruct.
    * @constructor
    * @param {Object} parameters - An object mapping of parameter key-values
    */
    constructor (parameters = {}) {
        this._isFormatRequested = false;
        this._rpcSpecVersion = null;
        this._parameters = parameters || {};
    }

    /**
    * @return {Object}
    */
    getParameters () {
        return this._parameters;
    }

    /**
    * @param {String} key
    * @return {*}
    */
    getParameter (key) {
        if(this._parameters[key] === undefined){
            return null;
        }
        return this._parameters[key];
    }

    /**
    * @param {String} key
    * @param {*} value
    * @return {RpcStruct}
    */
    setParameter (key, value) {
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
    getObject (tClass, key) {
        return this._formatObject(tClass, this.getParameter(key));
    }

    /**
    * @param {Function} tClass
    * @param {Object} obj
    * @private
    * @return {null|Object}
    */
    _formatObject (tClass, obj) {
        if (obj === null || obj === undefined) {
            return null;
        } else if (obj.constructor === tClass) {
            // if tClass is String and obj is a String, this should execute
            return obj;
        } else if (obj.constructor === String || obj.constructor === Number) { // this covers the Enum case too
            return obj;
        } else if (obj.constructor === Object) {
            if (tClass.prototype instanceof RpcStruct) {
                return new tClass(obj);
            }
            return null;
        } else if (obj.constructor === Array) {
            if (obj.length >= 0) {
                const outArray = [];
                for (const item of obj) {
                    outArray.push(this._formatObject(tClass, item));
                }
                return outArray;
            }
        }
        return null;
    }

    /**
    * @param {Function} tClass
    * @param {Object} obj
    * @param {Boolean} isArray (false)
    */
    validateType (tClass, obj, isArray = false) {
        if (isArray) {
            if (!Array.isArray(obj)) {
                throw new Error(`${obj.name} must be an array containing items of type ${tClass.name}`);
            } else {
                for (const item of obj) {
                    this.validateType(tClass, item, false);
                }
            }
        } else if (
            (tClass.prototype instanceof Enum && tClass.keyForValue(obj) === null)
            || (tClass.prototype instanceof RpcStruct && obj !== null && obj.constructor !== tClass)
        ) {
            throw new Error(`${obj.name} must be of type ${tClass.name}`);
        }
    }
}

export { RpcStruct };