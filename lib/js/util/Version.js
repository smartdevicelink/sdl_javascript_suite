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

    constructor(major, minor, patch) {
            this.major = major;
            this.minor = minor;
            this.patch = patch;
    }

    set major(major) {
        this._major = parseInt(major) || 0;
    }
    get major() {
        return this._major;
    }

    set minor(minor) {
        this._minor = parseInt(minor) || 0;
    }
    get minor() {
        return this._minor;
    }

    set patch(patch) {
        this._patch = parseInt(patch) || 0;
    }
    get patch() {
        return this._patch;
    }

    fromString(version) {
        let versions = version.split(".");
        if(versions.length != 3) throw "Incorrect version string format";

        this.major = versions[0];
        this.minor = versions[1];
        this.patch = versions[2];

        return this;
    }

    toString() {
        return this.major + "." + this.minor + "." + this.patch;
    }

    /**
    * Method to test if this instance of Version is newer than the supplied one.
    * @param version the version to check against
    * @return 1 if this instance is newer, -1 if supplied version is newer, and 0 if they are equal
    */
    isNewerThan(version) {
        if(this.major > version.major){
            return 1;
        }else if(this.major == version.major){
            if(this.minor > version.minor){
                return 1;
            } else if(this.minor == version.minor){
                if(this.patch > version.patch){
                    return 1;
                }else if(this.patch == version.patch){
                    return 0;
                }
            }
        }
        return -1;
    }
}

export { Version };