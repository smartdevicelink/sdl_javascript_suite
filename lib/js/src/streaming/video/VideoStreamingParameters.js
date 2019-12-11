import { VideoStreamingFormat } from '../../rpc/structs/VideoStreamingFormat';
import { VideoStreamingCodec } from '../../rpc/enums/VideoStreamingCodec';
import { VideoStreamingProtocol } from '../../rpc/enums/VideoStreamingProtocol';
import { ImageResolution } from '../../rpc/structs/ImageResolution';

/*
 * Copyright (c) 2019 Livio, Inc.
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

const DEFAULT_PROTOCOL = VideoStreamingProtocol.RAW;
const DEFAULT_CODEC = VideoStreamingCodec.H264;
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 576;
const DEFAULT_DENSITY = 240;
const DEFAULT_FRAMERATE = 30;
const DEFAULT_BITRATE = 512000;
const DEFAULT_INTERVAL = 5;
const DEFAULT_SCALE = 1.0;

class VideoStreamingParameters {
    /**
     * 
     * @param {number} displayDensity 
     * @param {number} frameRate 
     * @param {number} bitrate 
     * @param {number} interval 
     * @param {ImageResolution} resolution 
     * @param {VideoStreamingFormat} format 
     */
    constructor (displayDensity = null, frameRate = null, bitrate = null, interval = null, resolution = null, format = null) {
        this._displayDensity = displayDensity || DEFAULT_DENSITY;
        this._frameRate = frameRate || DEFAULT_FRAMERATE;
        this._bitrate = bitrate || DEFAULT_BITRATE;
        this._interval = interval || DEFAULT_INTERVAL;

        if (resolution === null) {
            resolution = new ImageResolution();
            resolution.setResolutionWidth(DEFAULT_WIDTH);
            resolution.setResolutionHeight(DEFAULT_HEIGHT);
        }
        this._resolution = resolution;

        if (format === null) {
            this._format = new VideoStreamingFormat();
            this._format.setProtocol(DEFAULT_PROTOCOL);
            this._format.setCodec(DEFAULT_CODEC);
        }

        this._format = format;
    }

    /**
     * Update the values contained in the capability that should have been returned through the SystemCapabilityManager.
     * This update will use the most preferred streaming format from the module.
     * @param {VideoStreamingCapability} capability the video streaming capability returned from the SystemCapabilityManager
     */
    update (capability) {
        if (capability.getMaxBitrate() !== null) { 
            this._bitrate = capability.getMaxBitrate() * 1000; // NOTE: the unit of maxBitrate in getSystemCapability is kbps.
        } 
        let scale = DEFAULT_SCALE;
        if (capability.getScale() !== null) { 
            scale = capability.getScale(); 
        }
        const resolution = capability.getPreferredResolution();
        if (resolution !== null) {
            if (resolution.getResolutionHeight() !== null && resolution.getResolutionHeight() > 0) { 
                this._resolution.setResolutionHeight(Math.floor((resolution.getResolutionHeight() / scale)));
            }
            if (resolution.getResolutionWidth() !== null && resolution.getResolutionWidth() > 0) { 
                this._resolution.setResolutionWidth(Math.floor((resolution.getResolutionWidth() / scale))); 
            }
        }
        const formats = capability.getSupportedFormats();
        if (formats !== null && formats.length > 0) {
            this._format = formats[0];
        }
    }

    /**
     * 
     * @param {number} displayDensity 
     * @return {VideoStreamingParameters}
     */
    setDisplayDensity (displayDensity) {
        this._displayDensity = displayDensity;
        return this;
    }

    /**
     * @return {number}
     */
    getDisplayDensity () {
        return this._displayDensity;
    }

    /**
     * @param {number} frameRate
     * @return {VideoStreamingParameters}
     */
    setFrameRate (frameRate) {
        this._frameRate = frameRate;
    }

    /**
     * @return {number}
     */
    getFrameRate () {
        return this._frameRate;
    }

    /**
     * @param {number} bitrate
     * @return {VideoStreamingParameters}
     */
    setBitrate (bitrate) {
        this._bitrate = bitrate;
        return this;
    }
    /**
     * @return {number}
     */
    getBitrate () {
        return this._bitrate;
    }

    /**
     * @param {number} interval
     * @return {VideoStreamingParameters}
     */
    setInterval (interval) {
        this._interval = interval;
        return this;
    }

    /**
     * @return {number}
     */
    getInterval () {
        return this._interval;
    }

    /**
     * @param {VideoStreamingFormat} format
     * @return {VideoStreamingParameters}
     */
    setFormat (format) {
        this._format = format;
        return this;
    }

    /**
     * @return {VideoStreamingFormat}
     */
    getFormat () {
        return this._format;
    }

    /**
     * @param {number} resolution
     * @return {VideoStreamingParameters}
     */
    setResolution (resolution) {
        this._resolution = resolution;
        return this;
    }

    /**
     * @return {number}
     */
    getResolution () {
        return this._resolution;
    }
}

export { VideoStreamingParameters };