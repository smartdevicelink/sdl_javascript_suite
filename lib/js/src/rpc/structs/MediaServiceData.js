/* eslint-disable camelcase */
/*
* Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
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

import { Image } from './Image.js';
import { MediaType } from '../enums/MediaType.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * This data is related to what a media service should provide
 */
class MediaServiceData extends RpcStruct {
    /**
     * Initializes an instance of MediaServiceData.
     * @class
     * @param {object} parameters - An object map of parameters.
     * @since SmartDeviceLink 5.1.0
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the MediaType
     * @param {MediaType} type - The type of the currently playing or paused track. - The desired MediaType.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setMediaType (type) {
        this._validateType(MediaType, type);
        this.setParameter(MediaServiceData.KEY_MEDIA_TYPE, type);
        return this;
    }

    /**
     * Get the MediaType
     * @returns {MediaType} - the KEY_MEDIA_TYPE value
     */
    getMediaType () {
        return this.getObject(MediaType, MediaServiceData.KEY_MEDIA_TYPE);
    }

    /**
     * Set the MediaTitle
     * @param {String} title - Music: The name of the current track Podcast: The name of the current episode Audiobook: The name of the current chapter - The desired MediaTitle.
     * {'string_min_length': 1}
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setMediaTitle (title) {
        this.setParameter(MediaServiceData.KEY_MEDIA_TITLE, title);
        return this;
    }

    /**
     * Get the MediaTitle
     * @returns {String} - the KEY_MEDIA_TITLE value
     */
    getMediaTitle () {
        return this.getParameter(MediaServiceData.KEY_MEDIA_TITLE);
    }

    /**
     * Set the MediaArtist
     * @param {String} artist - Music: The name of the current album artist Podcast: The provider of the podcast (hosts, network, company) Audiobook: The book author's name - The desired MediaArtist.
     * {'string_min_length': 1}
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setMediaArtist (artist) {
        this.setParameter(MediaServiceData.KEY_MEDIA_ARTIST, artist);
        return this;
    }

    /**
     * Get the MediaArtist
     * @returns {String} - the KEY_MEDIA_ARTIST value
     */
    getMediaArtist () {
        return this.getParameter(MediaServiceData.KEY_MEDIA_ARTIST);
    }

    /**
     * Set the MediaAlbum
     * @param {String} album - Music: The name of the current album Podcast: The name of the current podcast show Audiobook: The name of the current book - The desired MediaAlbum.
     * {'string_min_length': 1}
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setMediaAlbum (album) {
        this.setParameter(MediaServiceData.KEY_MEDIA_ALBUM, album);
        return this;
    }

    /**
     * Get the MediaAlbum
     * @returns {String} - the KEY_MEDIA_ALBUM value
     */
    getMediaAlbum () {
        return this.getParameter(MediaServiceData.KEY_MEDIA_ALBUM);
    }

    /**
     * Set the PlaylistName
     * @param {String} name - Music: The name of the playlist or radio station, if the user is playing from a playlist, otherwise, Null Podcast: The name of the playlist, if the user is playing from a playlist, otherwise, Null Audiobook: Likely not applicable, possibly a collection or "playlist" of books - The desired PlaylistName.
     * {'string_min_length': 1}
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setPlaylistName (name) {
        this.setParameter(MediaServiceData.KEY_PLAYLIST_NAME, name);
        return this;
    }

    /**
     * Get the PlaylistName
     * @returns {String} - the KEY_PLAYLIST_NAME value
     */
    getPlaylistName () {
        return this.getParameter(MediaServiceData.KEY_PLAYLIST_NAME);
    }

    /**
     * Set the IsExplicit
     * @param {Boolean} explicit - Whether or not the content currently playing (e.g. the track, episode, or book) contains explicit content - The desired IsExplicit.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setIsExplicit (explicit) {
        this.setParameter(MediaServiceData.KEY_IS_EXPLICIT, explicit);
        return this;
    }

    /**
     * Get the IsExplicit
     * @returns {Boolean} - the KEY_IS_EXPLICIT value
     */
    getIsExplicit () {
        return this.getParameter(MediaServiceData.KEY_IS_EXPLICIT);
    }

    /**
     * Set the TrackPlaybackProgress
     * @param {Number} progress - Music: The current progress of the track in seconds Podcast: The current progress of the episode in seconds Audiobook: The current progress of the current segment (e.g. the chapter) in seconds - The desired TrackPlaybackProgress.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setTrackPlaybackProgress (progress) {
        this.setParameter(MediaServiceData.KEY_TRACK_PLAYBACK_PROGRESS, progress);
        return this;
    }

    /**
     * Get the TrackPlaybackProgress
     * @returns {Number} - the KEY_TRACK_PLAYBACK_PROGRESS value
     */
    getTrackPlaybackProgress () {
        return this.getParameter(MediaServiceData.KEY_TRACK_PLAYBACK_PROGRESS);
    }

    /**
     * Set the TrackPlaybackDuration
     * @param {Number} duration - Music: The total duration of the track in seconds Podcast: The total duration of the episode in seconds Audiobook: The total duration of the current segment (e.g. the chapter) in seconds - The desired TrackPlaybackDuration.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setTrackPlaybackDuration (duration) {
        this.setParameter(MediaServiceData.KEY_TRACK_PLAYBACK_DURATION, duration);
        return this;
    }

    /**
     * Get the TrackPlaybackDuration
     * @returns {Number} - the KEY_TRACK_PLAYBACK_DURATION value
     */
    getTrackPlaybackDuration () {
        return this.getParameter(MediaServiceData.KEY_TRACK_PLAYBACK_DURATION);
    }

    /**
     * Set the QueuePlaybackProgress
     * @param {Number} progress - Music: The current progress of the playback queue in seconds Podcast: The current progress of the playback queue in seconds Audiobook: The current progress of the playback queue (e.g. the book) in seconds - The desired QueuePlaybackProgress.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setQueuePlaybackProgress (progress) {
        this.setParameter(MediaServiceData.KEY_QUEUE_PLAYBACK_PROGRESS, progress);
        return this;
    }

    /**
     * Get the QueuePlaybackProgress
     * @returns {Number} - the KEY_QUEUE_PLAYBACK_PROGRESS value
     */
    getQueuePlaybackProgress () {
        return this.getParameter(MediaServiceData.KEY_QUEUE_PLAYBACK_PROGRESS);
    }

    /**
     * Set the QueuePlaybackDuration
     * @param {Number} duration - Music: The total duration of the playback queue in seconds Podcast: The total duration of the playback queue in seconds Audiobook: The total duration of the playback queue (e.g. the book) in seconds - The desired QueuePlaybackDuration.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setQueuePlaybackDuration (duration) {
        this.setParameter(MediaServiceData.KEY_QUEUE_PLAYBACK_DURATION, duration);
        return this;
    }

    /**
     * Get the QueuePlaybackDuration
     * @returns {Number} - the KEY_QUEUE_PLAYBACK_DURATION value
     */
    getQueuePlaybackDuration () {
        return this.getParameter(MediaServiceData.KEY_QUEUE_PLAYBACK_DURATION);
    }

    /**
     * Set the QueueCurrentTrackNumber
     * @param {Number} number - Music: The current number (1 based) of the track in the playback queue Podcast: The current number (1 based) of the episode in the playback queue Audiobook: The current number (1 based) of the episode in the playback queue (e.g. the chapter number in the book) - The desired QueueCurrentTrackNumber.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setQueueCurrentTrackNumber (number) {
        this.setParameter(MediaServiceData.KEY_QUEUE_CURRENT_TRACK_NUMBER, number);
        return this;
    }

    /**
     * Get the QueueCurrentTrackNumber
     * @returns {Number} - the KEY_QUEUE_CURRENT_TRACK_NUMBER value
     */
    getQueueCurrentTrackNumber () {
        return this.getParameter(MediaServiceData.KEY_QUEUE_CURRENT_TRACK_NUMBER);
    }

    /**
     * Set the QueueTotalTrackCount
     * @param {Number} count - Music: The total number of tracks in the playback queue Podcast: The total number of episodes in the playback queue Audiobook: The total number of sections in the playback queue (e.g. the number of chapters in the book) - The desired QueueTotalTrackCount.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setQueueTotalTrackCount (count) {
        this.setParameter(MediaServiceData.KEY_QUEUE_TOTAL_TRACK_COUNT, count);
        return this;
    }

    /**
     * Get the QueueTotalTrackCount
     * @returns {Number} - the KEY_QUEUE_TOTAL_TRACK_COUNT value
     */
    getQueueTotalTrackCount () {
        return this.getParameter(MediaServiceData.KEY_QUEUE_TOTAL_TRACK_COUNT);
    }

    /**
     * Set the MediaImage
     * @since SmartDeviceLink 6.0.0
     * @param {Image} image - Music: The album art of the current track Podcast: The podcast or chapter artwork of the current podcast episode Audiobook: The book or chapter artwork of the current audiobook - The desired MediaImage.
     * @returns {MediaServiceData} - The class instance for method chaining.
     */
    setMediaImage (image) {
        this._validateType(Image, image);
        this.setParameter(MediaServiceData.KEY_MEDIA_IMAGE, image);
        return this;
    }

    /**
     * Get the MediaImage
     * @returns {Image} - the KEY_MEDIA_IMAGE value
     */
    getMediaImage () {
        return this.getObject(Image, MediaServiceData.KEY_MEDIA_IMAGE);
    }
}

MediaServiceData.KEY_MEDIA_TYPE = 'mediaType';
MediaServiceData.KEY_MEDIA_TITLE = 'mediaTitle';
MediaServiceData.KEY_MEDIA_ARTIST = 'mediaArtist';
MediaServiceData.KEY_MEDIA_ALBUM = 'mediaAlbum';
MediaServiceData.KEY_PLAYLIST_NAME = 'playlistName';
MediaServiceData.KEY_IS_EXPLICIT = 'isExplicit';
MediaServiceData.KEY_TRACK_PLAYBACK_PROGRESS = 'trackPlaybackProgress';
MediaServiceData.KEY_TRACK_PLAYBACK_DURATION = 'trackPlaybackDuration';
MediaServiceData.KEY_QUEUE_PLAYBACK_PROGRESS = 'queuePlaybackProgress';
MediaServiceData.KEY_QUEUE_PLAYBACK_DURATION = 'queuePlaybackDuration';
MediaServiceData.KEY_QUEUE_CURRENT_TRACK_NUMBER = 'queueCurrentTrackNumber';
MediaServiceData.KEY_QUEUE_TOTAL_TRACK_COUNT = 'queueTotalTrackCount';
MediaServiceData.KEY_MEDIA_IMAGE = 'mediaImage';

export { MediaServiceData };