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

class _TransportRecord {
    /**
     * Initializes an instance of _TransportRecord.
     * @class
     * @param {TransportType} transportType - The type of the transport.
     * @param {String} address - The address of the transport.
     */
    constructor (transportType, address) {
        this._type = transportType;
        this._address = address;
    }

    /**
     * Get the type of the _TransportRecord.
     * @protected
     * @returns {TransportType} - The _TransportRecord's type.
     */
    getType () {
        return this._type;
    }

    /**
     * Get the address of the _TransportRecord.
     * @protected
     * @returns {String} - The _TransportRecord's address.
     */
    getAddress () {
        return this._address;
    }

    /**
     * Determine if this instance of _TransportRecord matches another instance.
     * @protected
     * @param {_TransportRecord} obj - Another _TransportRecord to compare to.
     * @returns {Boolean} - Whether or not the _TransportRecords match.
     */
    equals (obj) {
        return (
            obj instanceof _TransportRecord
            && obj.getType !== null
            && obj.getType() === this.getType()
            && obj.getAddress() === this.getAddress()
        );
    }

    /**
     * Get a string description of the _TransportRecord.
     * @protected
     * @returns {String} - A string description of the _TransportRecord's properties.
     */
    toString () {
        return `Transport Type: ${this._type.name()} \n Address: ${this._address}`;
    }
}

export { _TransportRecord };