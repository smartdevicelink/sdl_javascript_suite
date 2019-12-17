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

import { RpcStruct } from '../RpcStruct.js';
import { VideoStreamingProtocol } from '../enums/VideoStreamingProtocol.js';
import { VideoStreamingCodec } from '../enums/VideoStreamingCodec.js';

class VideoStreamingFormat extends RpcStruct {
    /**
    * @constructor
    */
    constructor () {
        super();
    }
    /**
    * @param {VideoStreamingProtocol} val
    * @return {VideoStreamingFormat}
    */
    setProtocol (val) {
        this.validateType(VideoStreamingProtocol, val);
        this.setParameter(VideoStreamingFormat.KEY_PROTOCOL, VideoStreamingProtocol.valueForString(val));
        return this;
    }

    /**
    * @return {VideoStreamingProtocol}
    */
    getProtocol () {
        return this.getParameter(VideoStreamingFormat.KEY_PROTOCOL);
    }

    /**
    * @param {VideoStreamingCodec} val
    * @return {VideoStreamingFormat}
    */
    setCodec (val) {
        this.validateType(VideoStreamingCodec, val);
        this.setParameter(VideoStreamingFormat.KEY_CODEC, VideoStreamingCodec.valueForString(val));
        return this;
    }

    /**
    * @return {VideoStreamingCodec}
    */
    getCodec () {
        return this.getParameter(VideoStreamingFormat.KEY_CODEC);
    }
}

VideoStreamingFormat.KEY_PROTOCOL = 'protocol';
VideoStreamingFormat.KEY_CODEC = 'codec';

export { VideoStreamingFormat };
