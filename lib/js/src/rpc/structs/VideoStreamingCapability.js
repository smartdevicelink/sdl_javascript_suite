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
     * Initalizes an instance of VideoStreamingCapability.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the PreferredResolution
     * @param {ImageResolution} resolution - The preferred resolution of a video stream for decoding and rendering on - The desired PreferredResolution.
     * HMI.
     * @returns {VideoStreamingCapability} - The class instance for method chaining.
     */
    setPreferredResolution (resolution) {
        this._validateType(ImageResolution, resolution);
        this.setParameter(VideoStreamingCapability.KEY_PREFERRED_RESOLUTION, resolution);
        return this;
    }

    /**
     * Get the PreferredResolution
     * @returns {ImageResolution} - the KEY_PREFERRED_RESOLUTION value
     */
    getPreferredResolution () {
        return this.getObject(ImageResolution, VideoStreamingCapability.KEY_PREFERRED_RESOLUTION);
    }

    /**
     * Set the MaxBitrate
     * @param {Number} bitrate - The maximum bitrate of video stream that is supported, in kbps. - The desired MaxBitrate.
     * {'num_min_value': 0, 'num_max_value': 2147483647}
     * @returns {VideoStreamingCapability} - The class instance for method chaining.
     */
    setMaxBitrate (bitrate) {
        this.setParameter(VideoStreamingCapability.KEY_MAX_BITRATE, bitrate);
        return this;
    }

    /**
     * Get the MaxBitrate
     * @returns {Number} - the KEY_MAX_BITRATE value
     */
    getMaxBitrate () {
        return this.getParameter(VideoStreamingCapability.KEY_MAX_BITRATE);
    }

    /**
     * Set the SupportedFormats
     * @param {VideoStreamingFormat[]} formats - Detailed information on each format supported by this system, in its - The desired SupportedFormats.
     * preferred order (i.e. the first element in the array is most preferable
     * to the system). Each object will contain a VideoStreamingFormat that
     * describes what can be expected.
     * @returns {VideoStreamingCapability} - The class instance for method chaining.
     */
    setSupportedFormats (formats) {
        this._validateType(VideoStreamingFormat, formats, true);
        this.setParameter(VideoStreamingCapability.KEY_SUPPORTED_FORMATS, formats);
        return this;
    }

    /**
     * Get the SupportedFormats
     * @returns {VideoStreamingFormat[]} - the KEY_SUPPORTED_FORMATS value
     */
    getSupportedFormats () {
        return this.getObject(VideoStreamingFormat, VideoStreamingCapability.KEY_SUPPORTED_FORMATS);
    }

    /**
     * Set the HapticSpatialDataSupported
     * @param {Boolean} supported - True if the system can utilize the haptic spatial data from the source being - The desired HapticSpatialDataSupported.
     * streamed. If not included, it can be assumed the module doesn't support haptic
     * spatial data'.
     * @returns {VideoStreamingCapability} - The class instance for method chaining.
     */
    setHapticSpatialDataSupported (supported) {
        this.setParameter(VideoStreamingCapability.KEY_HAPTIC_SPATIAL_DATA_SUPPORTED, supported);
        return this;
    }

    /**
     * Get the HapticSpatialDataSupported
     * @returns {Boolean} - the KEY_HAPTIC_SPATIAL_DATA_SUPPORTED value
     */
    getHapticSpatialDataSupported () {
        return this.getParameter(VideoStreamingCapability.KEY_HAPTIC_SPATIAL_DATA_SUPPORTED);
    }

    /**
     * Set the DiagonalScreenSize
     * @param {Number} size - The diagonal screen size in inches. - The desired DiagonalScreenSize.
     * {'num_min_value': 0.0}
     * @returns {VideoStreamingCapability} - The class instance for method chaining.
     */
    setDiagonalScreenSize (size) {
        this.setParameter(VideoStreamingCapability.KEY_DIAGONAL_SCREEN_SIZE, size);
        return this;
    }

    /**
     * Get the DiagonalScreenSize
     * @returns {Number} - the KEY_DIAGONAL_SCREEN_SIZE value
     */
    getDiagonalScreenSize () {
        return this.getParameter(VideoStreamingCapability.KEY_DIAGONAL_SCREEN_SIZE);
    }

    /**
     * Set the PixelPerInch
     * @param {Number} inch - PPI is the diagonal resolution in pixels divided by the diagonal screen size in inches. - The desired PixelPerInch.
     * {'num_min_value': 0.0}
     * @returns {VideoStreamingCapability} - The class instance for method chaining.
     */
    setPixelPerInch (inch) {
        this.setParameter(VideoStreamingCapability.KEY_PIXEL_PER_INCH, inch);
        return this;
    }

    /**
     * Get the PixelPerInch
     * @returns {Number} - the KEY_PIXEL_PER_INCH value
     */
    getPixelPerInch () {
        return this.getParameter(VideoStreamingCapability.KEY_PIXEL_PER_INCH);
    }

    /**
     * Set the Scale
     * @param {Number} scale - The scaling factor the app should use to change the size of the projecting view. - The desired Scale.
     * {'num_min_value': 1.0, 'num_max_value': 10.0}
     * @returns {VideoStreamingCapability} - The class instance for method chaining.
     */
    setScale (scale) {
        this.setParameter(VideoStreamingCapability.KEY_SCALE, scale);
        return this;
    }

    /**
     * Get the Scale
     * @returns {Number} - the KEY_SCALE value
     */
    getScale () {
        return this.getParameter(VideoStreamingCapability.KEY_SCALE);
    }

    /**
     * Set the AdditionalVideoStreamingCapabilities
     * @param {VideoStreamingCapability[]} capabilities - Contains information about this system's video streaming - The desired AdditionalVideoStreamingCapabilities.
     * capabilities.
     * @returns {VideoStreamingCapability} - The class instance for method chaining.
     */
    setAdditionalVideoStreamingCapabilities (capabilities) {
        this._validateType(VideoStreamingCapability, capabilities, true);
        this.setParameter(VideoStreamingCapability.KEY_ADDITIONAL_VIDEO_STREAMING_CAPABILITIES, capabilities);
        return this;
    }

    /**
     * Get the AdditionalVideoStreamingCapabilities
     * @returns {VideoStreamingCapability[]} - the KEY_ADDITIONAL_VIDEO_STREAMING_CAPABILITIES value
     */
    getAdditionalVideoStreamingCapabilities () {
        return this.getObject(VideoStreamingCapability, VideoStreamingCapability.KEY_ADDITIONAL_VIDEO_STREAMING_CAPABILITIES);
    }
}

VideoStreamingCapability.KEY_PREFERRED_RESOLUTION = 'preferredResolution';
VideoStreamingCapability.KEY_MAX_BITRATE = 'maxBitrate';
VideoStreamingCapability.KEY_SUPPORTED_FORMATS = 'supportedFormats';
VideoStreamingCapability.KEY_HAPTIC_SPATIAL_DATA_SUPPORTED = 'hapticSpatialDataSupported';
VideoStreamingCapability.KEY_DIAGONAL_SCREEN_SIZE = 'diagonalScreenSize';
VideoStreamingCapability.KEY_PIXEL_PER_INCH = 'pixelPerInch';
VideoStreamingCapability.KEY_SCALE = 'scale';
VideoStreamingCapability.KEY_ADDITIONAL_VIDEO_STREAMING_CAPABILITIES = 'additionalVideoStreamingCapabilities';

export { VideoStreamingCapability };