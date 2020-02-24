/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
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

import { ImageResolution } from './ImageResolution.js';
import { RpcStruct } from '../RpcStruct.js';
import { VideoStreamingFormat } from './VideoStreamingFormat.js';

/**
 * Contains information about this system's video streaming capabilities.
 */
class VideoStreamingCapability extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {ImageResolution} resolution - The preferred resolution of a video stream for decoding and rendering on
     *                                       HMI.
     * @return {VideoStreamingCapability}
     */
    setPreferredResolution (resolution) {
        this.validateType(ImageResolution, resolution);
        this.setParameter(VideoStreamingCapability.KEY_PREFERRED_RESOLUTION, resolution);
        return this;
    }

    /**
     * @return {ImageResolution}
     */
    getPreferredResolution () {
        return this.getObject(ImageResolution, VideoStreamingCapability.KEY_PREFERRED_RESOLUTION);
    }

    /**
     * @param {Number} bitrate - The maximum bitrate of video stream that is supported, in kbps.
     * @return {VideoStreamingCapability}
     */
    setMaxBitrate (bitrate) {
        this.setParameter(VideoStreamingCapability.KEY_MAX_BITRATE, bitrate);
        return this;
    }

    /**
     * @return {Number}
     */
    getMaxBitrate () {
        return this.getParameter(VideoStreamingCapability.KEY_MAX_BITRATE);
    }

    /**
     * @param {VideoStreamingFormat[]} formats - Detailed information on each format supported by this system, in its
     *                                           preferred order (i.e. the first element in the array is most preferable
     *                                           to the system). Each object will contain a VideoStreamingFormat that
     *                                           describes what can be expected.
     * @return {VideoStreamingCapability}
     */
    setSupportedFormats (formats) {
        this.validateType(VideoStreamingFormat, formats, true);
        this.setParameter(VideoStreamingCapability.KEY_SUPPORTED_FORMATS, formats);
        return this;
    }

    /**
     * @return {VideoStreamingFormat[]}
     */
    getSupportedFormats () {
        return this.getObject(VideoStreamingFormat, VideoStreamingCapability.KEY_SUPPORTED_FORMATS);
    }

    /**
     * @param {Boolean} supported - True if the system can utilize the haptic spatial data from the source being
     *                              streamed. If not included, it can be assumed the module doesn't support haptic
     *                              spatial data'.
     * @return {VideoStreamingCapability}
     */
    setHapticSpatialDataSupported (supported) {
        this.setParameter(VideoStreamingCapability.KEY_HAPTIC_SPATIAL_DATA_SUPPORTED, supported);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHapticSpatialDataSupported () {
        return this.getParameter(VideoStreamingCapability.KEY_HAPTIC_SPATIAL_DATA_SUPPORTED);
    }

    /**
     * @param {Number} size - The diagonal screen size in inches.
     * @return {VideoStreamingCapability}
     */
    setDiagonalScreenSize (size) {
        this.setParameter(VideoStreamingCapability.KEY_DIAGONAL_SCREEN_SIZE, size);
        return this;
    }

    /**
     * @return {Number}
     */
    getDiagonalScreenSize () {
        return this.getParameter(VideoStreamingCapability.KEY_DIAGONAL_SCREEN_SIZE);
    }

    /**
     * @param {Number} inch - PPI is the diagonal resolution in pixels divided by the diagonal screen size in inches.
     * @return {VideoStreamingCapability}
     */
    setPixelPerInch (inch) {
        this.setParameter(VideoStreamingCapability.KEY_PIXEL_PER_INCH, inch);
        return this;
    }

    /**
     * @return {Number}
     */
    getPixelPerInch () {
        return this.getParameter(VideoStreamingCapability.KEY_PIXEL_PER_INCH);
    }

    /**
     * @param {Number} scale - The scaling factor the app should use to change the size of the projecting view.
     * @return {VideoStreamingCapability}
     */
    setScale (scale) {
        this.setParameter(VideoStreamingCapability.KEY_SCALE, scale);
        return this;
    }

    /**
     * @return {Number}
     */
    getScale () {
        return this.getParameter(VideoStreamingCapability.KEY_SCALE);
    }
}

VideoStreamingCapability.KEY_PREFERRED_RESOLUTION = 'preferredResolution';
VideoStreamingCapability.KEY_MAX_BITRATE = 'maxBitrate';
VideoStreamingCapability.KEY_SUPPORTED_FORMATS = 'supportedFormats';
VideoStreamingCapability.KEY_HAPTIC_SPATIAL_DATA_SUPPORTED = 'hapticSpatialDataSupported';
VideoStreamingCapability.KEY_DIAGONAL_SCREEN_SIZE = 'diagonalScreenSize';
VideoStreamingCapability.KEY_PIXEL_PER_INCH = 'pixelPerInch';
VideoStreamingCapability.KEY_SCALE = 'scale';

export { VideoStreamingCapability };