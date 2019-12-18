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

import { Enum } from '../../util/Enum.js';

/**
 * @typedef {Enum} VideoStreamingProtocol
 * @property {Object} _MAP
 */
class VideoStreamingProtocol extends Enum {
    /**
    * @constructor
    */
    constructor () {
        super();
    }
    /**
     * @return {String}
     */
    static get RAW () {
        return VideoStreamingProtocol._MAP.RAW;
    }

    /**
     * @return {String}
     */
    static get RTP () {
        return VideoStreamingProtocol._MAP.RTP;
    }

    /**
     * @return {String}
     */
    static get RTSP () {
        return VideoStreamingProtocol._MAP.RTSP;
    }

    /**
     * @return {String}
     */
    static get RTMP () {
        return VideoStreamingProtocol._MAP.RTMP;
    }

    /**
     * @return {String}
     */
    static get WEBM () {
        return VideoStreamingProtocol._MAP.WEBM;
    }

    /**
    * Get the value for the given enum key
    * @param value - A key to find in the map of the subclass
    * @return {*} - Returns a value if found, or null if not found
    */
    static valueForKey (key) {
        return VideoStreamingProtocol._valueForKey(key, VideoStreamingProtocol._MAP);
    }

    /**
    * Get the key for the given enum value
    * @param value - A primitive value to find the matching key for in the map of the subclass
    * @return {*} - Returns a key if found, or null if not found
    */
    static keyForValue (value) {
        return VideoStreamingProtocol._keyForValue(value, VideoStreamingProtocol._MAP);
    }
}

VideoStreamingProtocol._MAP = Object.freeze({
    /**
     * Raw stream bytes that contains no timestamp data and is the lowest supported video streaming
     */
    'RAW': 'RAW',
    /**
     * RTP facilitates the transfer of real-time data. Information provided by this protocol include
     * timestamps (for synchronization), sequence numbers (for packet loss and reordering detection)
     * and the payload format which indicates the encoded format of the data.
     */
    'RTP': 'RTP',
    /**
     * The transmission of streaming data itself is not a task of RTSP. Most RTSP servers use the
     * Real-time Transport Protocol (RTP) in conjunction with Real-time Control Protocol (RTCP) for
     * media stream delivery. However, some vendors implement proprietary transport protocols.
     */
    'RTSP': 'RTSP',
    /**
     * Real-Time Messaging Protocol (RTMP) was initially a proprietary protocol developed by
     * Macromedia for streaming audio, video and data over the Internet, between a Flash player and
     * a server. Macromedia is now owned by Adobe, which has released an incomplete version of the
     * specification of the protocol for public use.
     */
    'RTMP': 'RTMP',
    /**
     * The WebM container is based on a profile of Matroska. WebM initially supported VP8 video and
     * Vorbis audio streams. In 2013 it was updated to accommodate VP9 video and Opus audio.
     */
    'WEBM': 'WEBM',

});

export { VideoStreamingProtocol };