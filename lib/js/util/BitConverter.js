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

class BitConverter {

    /**
	 * @param bytes byte array that will be converted to hex
	 * @param offset int optional, representing the offset to begin conversion at
	 * @param length int optional, representing number of bytes in array to convert
	 * @return the String containing converted hex values or null if byte array is null
	 */
    arrayBufferToHex(bytes, offset = 0, length) {
        // TODO
        if
    }

    /**
	 * @param hexString the String containing converted hex values
	 * @return byte array converted from input String or null if String is null
	 */
    hexToArrayBuffer(hexString) {
        // TODO
    }

    /**
	 * @param buffer buffer that will be converted to int
     * @param offset int optional, the offset shift
	 * @return int converted from buffer or -1 if buffer is null
	 */
    arrayBufferToInt32(buffer, offset = 0) {
        // TODO
        if(!buffer) return -1;
        let view = new DataView(buffer);
        return view.getUint32(offset);
    }

    /**
	 * @param value the integer to be converted
	 * @return buffer converted from input value
	 */
    int32ToArrayBuffer(value) {
        let buffer = new ArrayBuffer(4); // Int32 has 4 bytes
        let view = new DataView(buffer);
        view.setUint32(0, value, false);
        return buffer;
    }

}

export { BitConverter };