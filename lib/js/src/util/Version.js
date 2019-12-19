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

class Version {
    /**
    * @constructor
    */
    constructor (major, minor, patch) {
        this.setMajor(major);
        this.setMinor(minor);
        this.setPatch(patch);
    }

    /**
    * @param {Number} major
    * @return {Version}
    */
    setMajor (major) {
        this._major = parseInt(major) || 0;

        return this;
    }

    /**
    * @return {Number}
    */
    getMajor () {
        return this._major;
    }

    /**
    * @param {Number} minor
    * @return {Version}
    */
    setMinor (minor) {
        this._minor = parseInt(minor) || 0;

        return this;
    }

    /**
    * @return {Number}
    */
    getMinor () {
        return this._minor;
    }

    /**
    * @param {Number} patch
    * @return {Version}
    */
    setPatch (patch) {
        this._patch = parseInt(patch) || 0;

        return this;
    }

    /**
    * @return {Number}
    */
    getPatch () {
        return this._patch;
    }

    /**
    * @param {String} version - Parse this string to a Version object
    * @return {Version}
    */
    fromString (version) {
        const versions = version.split('.');
        if (versions.length != 3) {
            throw 'Incorrect version string format';
        }
        this.setMajor(versions[0]);
        this.setMinor(versions[1]);
        this.setPatch(versions[2]);

        return this;
    }

    /**
    * @return {String}
    */
    toString () {
        return `${this.getMajor()}.${this.getMinor()}.${this.getPatch()}`;
    }

    /**
    * Method to test if this instance of Version is newer than the supplied one.
    * @param version - the version to check against
    * @return {Number} - 1 if this instance is newer, -1 if supplied version is newer, and 0 if they are equal
    */
    isNewerThan (version) {
        if (this.getMajor() > version.getMajor()) {
            return 1;
        } else if (this.getMajor() == version.getMajor()) {
            if (this.getMinor() > version.getMinor()) {
                return 1;
            } else if (this.getMinor() == version.getMinor()) {
                if (this.getPatch() > version.getPatch()) {
                    return 1;
                } else if (this.getPatch() == version.getPatch()) {
                    return 0;
                }
            }
        }
        return -1;
    }
}

export { Version };