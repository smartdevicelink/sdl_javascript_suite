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

import { Image } from './Image.js';
import { MediaType } from '../enums/MediaType.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * This data is related to what a media service should provide
 */
class MediaServiceData extends RpcStruct {
    /**
     * Initalizes an instance of MediaServiceData.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {MediaType} type - The type of the currently playing or paused track.
     * @return {MediaServiceData}
     */
    setMediaType (type) {
        this.validateType(MediaType, type);
        this.setParameter(MediaServiceData.KEY_MEDIA_TYPE, type);
        return this;
    }

    /**
     * @return {MediaType}
     */
    getMediaType () {
        return this.getObject(MediaType, MediaServiceData.KEY_MEDIA_TYPE);
    }

    /**
     * @param {String} title - Music: The name of the current track Podcast: The name of the current episode Audiobook:
     *                         The name of the current chapter
     * @return {MediaServiceData}
     */
    setMediaTitle (title) {
        this.setParameter(MediaServiceData.KEY_MEDIA_TITLE, title);
        return this;
    }

    /**
     * @return {String}
     */
    getMediaTitle () {
        return this.getParameter(MediaServiceData.KEY_MEDIA_TITLE);
    }

    /**
     * @param {String} artist - Music: The name of the current album artist Podcast: The provider of the podcast (hosts,
     *                          network, company) Audiobook: The book author's name
     * @return {MediaServiceData}
     */
    setMediaArtist (artist) {
        this.setParameter(MediaServiceData.KEY_MEDIA_ARTIST, artist);
        return this;
    }

    /**
     * @return {String}
     */
    getMediaArtist () {
        return this.getParameter(MediaServiceData.KEY_MEDIA_ARTIST);
    }

    /**
     * @param {String} album - Music: The name of the current album Podcast: The name of the current podcast show
     *                         Audiobook: The name of the current book
     * @return {MediaServiceData}
     */
    setMediaAlbum (album) {
        this.setParameter(MediaServiceData.KEY_MEDIA_ALBUM, album);
        return this;
    }

    /**
     * @return {String}
     */
    getMediaAlbum () {
        return this.getParameter(MediaServiceData.KEY_MEDIA_ALBUM);
    }

    /**
     * @param {String} name - Music: The name of the playlist or radio station, if the user is playing from a playlist,
     *                        otherwise, Null Podcast: The name of the playlist, if the user is playing from a playlist,
     *                        otherwise, Null Audiobook: Likely not applicable, possibly a collection or "playlist" of
     *                        books
     * @return {MediaServiceData}
     */
    setPlaylistName (name) {
        this.setParameter(MediaServiceData.KEY_PLAYLIST_NAME, name);
        return this;
    }

    /**
     * @return {String}
     */
    getPlaylistName () {
        return this.getParameter(MediaServiceData.KEY_PLAYLIST_NAME);
    }

    /**
     * @param {Boolean} explicit - Whether or not the content currently playing (e.g. the track, episode, or book)
     *                             contains explicit content
     * @return {MediaServiceData}
     */
    setIsExplicit (explicit) {
        this.setParameter(MediaServiceData.KEY_IS_EXPLICIT, explicit);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getIsExplicit () {
        return this.getParameter(MediaServiceData.KEY_IS_EXPLICIT);
    }

    /**
     * @param {Number} progress - Music: The current progress of the track in seconds Podcast: The current progress of
     *                            the episode in seconds Audiobook: The current progress of the current segment (e.g.
     *                            the chapter) in seconds
     * @return {MediaServiceData}
     */
    setTrackPlaybackProgress (progress) {
        this.setParameter(MediaServiceData.KEY_TRACK_PLAYBACK_PROGRESS, progress);
        return this;
    }

    /**
     * @return {Number}
     */
    getTrackPlaybackProgress () {
        return this.getParameter(MediaServiceData.KEY_TRACK_PLAYBACK_PROGRESS);
    }

    /**
     * @param {Number} duration - Music: The total duration of the track in seconds Podcast: The total duration of the
     *                            episode in seconds Audiobook: The total duration of the current segment (e.g. the
     *                            chapter) in seconds
     * @return {MediaServiceData}
     */
    setTrackPlaybackDuration (duration) {
        this.setParameter(MediaServiceData.KEY_TRACK_PLAYBACK_DURATION, duration);
        return this;
    }

    /**
     * @return {Number}
     */
    getTrackPlaybackDuration () {
        return this.getParameter(MediaServiceData.KEY_TRACK_PLAYBACK_DURATION);
    }

    /**
     * @param {Number} progress - Music: The current progress of the playback queue in seconds Podcast: The current
     *                            progress of the playback queue in seconds Audiobook: The current progress of the
     *                            playback queue (e.g. the book) in seconds
     * @return {MediaServiceData}
     */
    setQueuePlaybackProgress (progress) {
        this.setParameter(MediaServiceData.KEY_QUEUE_PLAYBACK_PROGRESS, progress);
        return this;
    }

    /**
     * @return {Number}
     */
    getQueuePlaybackProgress () {
        return this.getParameter(MediaServiceData.KEY_QUEUE_PLAYBACK_PROGRESS);
    }

    /**
     * @param {Number} duration - Music: The total duration of the playback queue in seconds Podcast: The total duration
     *                            of the playback queue in seconds Audiobook: The total duration of the playback queue
     *                            (e.g. the book) in seconds
     * @return {MediaServiceData}
     */
    setQueuePlaybackDuration (duration) {
        this.setParameter(MediaServiceData.KEY_QUEUE_PLAYBACK_DURATION, duration);
        return this;
    }

    /**
     * @return {Number}
     */
    getQueuePlaybackDuration () {
        return this.getParameter(MediaServiceData.KEY_QUEUE_PLAYBACK_DURATION);
    }

    /**
     * @param {Number} number - Music: The current number (1 based) of the track in the playback queue Podcast: The
     *                          current number (1 based) of the episode in the playback queue Audiobook: The current
     *                          number (1 based) of the episode in the playback queue (e.g. the chapter number in the
     *                          book)
     * @return {MediaServiceData}
     */
    setQueueCurrentTrackNumber (number) {
        this.setParameter(MediaServiceData.KEY_QUEUE_CURRENT_TRACK_NUMBER, number);
        return this;
    }

    /**
     * @return {Number}
     */
    getQueueCurrentTrackNumber () {
        return this.getParameter(MediaServiceData.KEY_QUEUE_CURRENT_TRACK_NUMBER);
    }

    /**
     * @param {Number} count - Music: The total number of tracks in the playback queue Podcast: The total number of
     *                         episodes in the playback queue Audiobook: The total number of sections in the playback
     *                         queue (e.g. the number of chapters in the book)
     * @return {MediaServiceData}
     */
    setQueueTotalTrackCount (count) {
        this.setParameter(MediaServiceData.KEY_QUEUE_TOTAL_TRACK_COUNT, count);
        return this;
    }

    /**
     * @return {Number}
     */
    getQueueTotalTrackCount () {
        return this.getParameter(MediaServiceData.KEY_QUEUE_TOTAL_TRACK_COUNT);
    }

    /**
     * @param {Image} image - Music: The album art of the current track Podcast: The podcast or chapter artwork of the
     *                        current podcast episode Audiobook: The book or chapter artwork of the current audiobook
     * @return {MediaServiceData}
     */
    setMediaImage (image) {
        this.validateType(Image, image);
        this.setParameter(MediaServiceData.KEY_MEDIA_IMAGE, image);
        return this;
    }

    /**
     * @return {Image}
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