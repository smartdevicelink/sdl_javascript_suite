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
     * Initializes an instance of VideoStreamingParameters.
     * @class
     * @param {Number} displayDensity - Numeric display density. Default 240.
     * @param {Number} frameRate - Frame rate. Default 30.
     * @param {Number} bitrate - Bit-rate. Default 512000.
     * @param {Number} interval - Interval. Default 5.
     * @param {ImageResolution} resolution - An instance of ImageResolution. Defaults to 1024 width by 576 height.
     * @param {VideoStreamingFormat} format - An instance of VideoStreamingFormat.
     */
    constructor (displayDensity = null, frameRate = null, bitrate = null, interval = null, resolution = null, format = null) {
        this._displayDensity = displayDensity || DEFAULT_DENSITY;
        this._frameRate = frameRate || DEFAULT_FRAMERATE;
        this._bitrate = bitrate || DEFAULT_BITRATE;
        this._interval = interval || DEFAULT_INTERVAL;

        if (!(resolution instanceof ImageResolution)) {
            resolution = new ImageResolution();
            resolution.setResolutionWidth(DEFAULT_WIDTH);
            resolution.setResolutionHeight(DEFAULT_HEIGHT);
        }
        this._resolution = resolution;

        if (!(format instanceof VideoStreamingFormat)) {
            format = new VideoStreamingFormat();
            format.setProtocolParam(DEFAULT_PROTOCOL);
            format.setCodec(DEFAULT_CODEC);
        }

        this._format = format;
    }

    /**
     * Update the values contained in the capability that should have been returned through the SystemCapabilityManager.
     * This update will use the most preferred streaming format from the module.
     * @param {VideoStreamingCapability} capability - The video streaming capability returned from the SystemCapabilityManager
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
     * Set the display density.
     * @param {Number} displayDensity - The display density.
     * @returns {VideoStreamingParameters} - The class instance to allow method chaining.
     */
    setDisplayDensity (displayDensity) {
        this._displayDensity = displayDensity;
        return this;
    }

    /**
     * Get the display density.
     * @returns {Number} - The display density.
     */
    getDisplayDensity () {
        return this._displayDensity;
    }

    /**
     * Set the frame rate.
     * @param {Number} frameRate - The frame rate.
     * @returns {VideoStreamingParameters} - The class instance to allow method chaining.
     */
    setFrameRate (frameRate) {
        this._frameRate = frameRate;
        return this;
    }

    /**
     * Get the frame rate.
     * @returns {Number} - The frame rate.
     */
    getFrameRate () {
        return this._frameRate;
    }

    /**
     * Set the bit-rate.
     * @param {Number} bitrate - The bit-rate.
     * @returns {VideoStreamingParameters} - The class instance to allow method chaining.
     */
    setBitrate (bitrate) {
        this._bitrate = bitrate;
        return this;
    }
    /**
     * Get the bit-rate.
     * @returns {Number} - The bit-rate.
     */
    getBitrate () {
        return this._bitrate;
    }

    /**
     * Set the interval.
     * @param {Number} interval - The interval.
     * @returns {VideoStreamingParameters} - The class instance to allow method chaining.
     */
    setInterval (interval) {
        this._interval = interval;
        return this;
    }

    /**
     * Get the interval.
     * @returns {Number} - The interval.
     */
    getInterval () {
        return this._interval;
    }

    /**
     * Set the VideoStreamingFormat.
     * @param {VideoStreamingFormat} format - The format as a VideoStreamingFormat struct.
     * @returns {VideoStreamingParameters} - The class instance to allow method chaining.
     */
    setFormat (format) {
        this._format = format;
        return this;
    }

    /**
     * Get the format.
     * @returns {VideoStreamingFormat} - The format in the form of a VideoStreamingFormat struct.
     */
    getFormat () {
        return this._format;
    }

    /**
     * Set the resolution.
     * @param {ImageResolution} resolution - The resolution as an instance of the ImageResolution struct.
     * @returns {VideoStreamingParameters} - The class instance to allow method chaining.
     */
    setResolution (resolution) {
        this._resolution = resolution;
        return this;
    }

    /**
     * Get the resolution.
     * @returns {ImageResolution} - The resolution in the form of a ImageResolution struct.
     */
    getResolution () {
        return this._resolution;
    }
}

export { VideoStreamingParameters };