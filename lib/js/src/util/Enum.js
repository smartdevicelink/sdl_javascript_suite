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

class Enum {
    /**
    * Initializes an instance of Enum.
    * @constructor
    */
    constructor () {
        // intentionally empty
    }

    /**
    * Returns the key for a given value if the value is found within the key:value map
    * @param value - A primitive value to find in the map
    * @param map {Object} - An map of string properties to primitive values
    * @return {null|String} - Returns null if not found
    */
    static _keyForValue (value, map) {
        for (const key in map) {
            if (map[key] === value) {
                return key;
            }
        }

        return null;
    }

    /**
    * A method for subclasses to implement that does what _keyForValue does
    * @param value - A primitive value to find the matching key for in the map of the subclass
    * @return {*} - Returns a key if found, or null if not found
    */
    keyForValue (value) {
        throw new Error('method must be overridden');
    }

    /**
    * Returns the value for the given key if the key is found within the key:value map
    * @param value - A primitive value to find in the map
    * @param map {Object} - An map of string properties to primitive values
    * @return {*} - Returns a value if found, or null if not found
    */
    static _valueForKey (key, map) {
        return map[key] || null;
    }

    /**
    * A method for subclasses to implement that does what _valueForKey does
    * @param value - A key to find in the map of the subclass
    * @return {*} - Returns a value if found, or null if not found
    */
    valueForKey (key) {
        throw new Error('method must be overridden');
    }
}

export { Enum };