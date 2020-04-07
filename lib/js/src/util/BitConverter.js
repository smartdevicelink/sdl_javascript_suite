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

class BitConverter {
    /**
     * Converts an ArrayBuffer to an Int32 ArrayBuffer.
     * @param {ArrayBuffer} buffer - buffer that will be converted to int
     * @param {Number} offset - int optional, the offset shift
     * @returns {Number} int converted from buffer or -1 if buffer is null
     */
    static arrayBufferToInt32 (buffer, offset = 0) {
        if (!buffer) {
            return -1;
        }
        const view = new DataView(buffer);
        return view.getUint32(offset);
    }

    /**
     * Converts an Int32 ArrayBuffer to an ArrayBuffer.
     * @param {Number} value - the integer to be converted
     * @returns {ArrayBuffer} buffer converted from input value
     */
    static int32ToArrayBuffer (value) {
        const buffer = new ArrayBuffer(4); // Int32 has 4 bytes
        const view = new DataView(buffer);
        view.setUint32(0, value, false);
        return buffer;
    }
}

export { BitConverter };