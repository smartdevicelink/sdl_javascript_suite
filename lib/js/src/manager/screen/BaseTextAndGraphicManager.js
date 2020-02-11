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

import { BaseSubManager } from '../BaseSubManager.js';

class BaseTextAndGraphicManager extends BaseSubManager {
    /**
     * @param {LifecycleManager} lifecycleManager
     * @param {FileManager} fileManager
     * @param {SoftButtonManager} softButtonManager
    */
    constructor (lifecycleManager, fileManager, softButtonManager) {
        super(lifecycleManager, fileManager, softButtonManager);
    }

    /**
     * @return {Promise}
    */
    async start () {

    }

    dispose () {

    }

    _addListeners () {

    }

    /**
     * @return {Promise}
    */
    async _update () {

    }

    /**
     * @return {Promise}
    */
    async _sdlUpdate () {

    }

    _sendShow () {

    }

    /**
     * @return {Promise}
    */
    async _uploadImages () {

    }

    /**
     * @param {Show} show
     * @return {Show}
    */
    _assembleShowImages (show) {

    }

    /**
     * @param {Show} show
     * @return {Show}
    */
    _assembleShowText (show) {

    }

    /**
     * @param {Show} show
     * @param {String[]} showFields
     * @return {Show}
    */
    _assembleOneLineShowText (show, showFields) {

    }

    /**
     * @param {Show} show
     * @return {Show}
    */
    _assembleTwoLineShowText (show) {

    }

    /**
     * @param {Show} show
     * @return {Show}
    */
    _assembleThreeLineShowText (show) {

    }

    /**
     * @param {Show} show
     * @return {Show}
    */
    _assembleFourLineShowText (show) {

    }

    /**
     * @param {Show} show
     * @return {Show}
    */
    _extractTextFromShow (show) {

    }

    /**
     * @param {Show} show
     * @return {Show}
    */
    _setBlankTextFields (newShow) {

    }

    /**
     * @param {Show} show
    */
    _updateCurrentScreenDataState (show) {

    }

    /**
     * @return {String[]}
    */
    _findValidMainTextFields () {

    }

    /**
     * @return {MetadataType[]}
    */
    _findNonNullMetadataFields () {

    }

    /**
     * @return {SdlArtwork}
    */
    _getBlankArtwork () {
        throw new Error('_getBlankArtwork method must be overridden');
    }

    /**
     * @param {SdlArtwork} artwork
     * @return {Boolean}
    */
    _sdlArtworkNeedsUpload (artwork) {

    }

    /**
     * @return {Boolean}
    */
    _shouldUpdatePrimaryImage () {

    }

    /**
     * @return {Boolean}
    */
    _shouldUpdateSecondaryImage () {

    }

    /**
     * @return {Number}
    */
    _getNumberOfLines () {

    }

    /**
     * @param {TextAlignment} textAlignment
    */
    setTextAlignment (textAlignment) {

    }

    /**
     * @return {TextAlignment}
    */
    getTextAlignment () {

    }

    /**
     * @param {String} mediaTrackTextField
    */
    setMediaTrackTextField (mediaTrackTextField) {

    }

    /**
     * @return {String}
    */
    getMediaTrackTextField () {

    }

    /**
     * @param {String} textField1
    */
    setTextField1 (textField1) {

    }

    /**
     * @return {String}
    */
    getTextField1 () {

    }

    /**
     * @param {String} textField2
    */
    setTextField2 (textField2) {

    }

    /**
     * @return {String}
    */
    getTextField2 () {

    }

    /**
     * @param {String} textField3
    */
    setTextField3 (textField3) {

    }

    /**
     * @return {String}
    */
    getTextField3 () {

    }

    /**
     * @param {String} textField4
    */
    setTextField4 (textField4) {

    }

    /**
     * @return {String}
    */
    getTextField4 () {

    }

    /**
     * @param {MetadataType} textField1Type
    */
    setTextField1Type (textField1Type) {

    }

    /**
     * @return {MetadataType}
    */
    getTextField1Type () {

    }

    /**
     * @param {MetadataType} textField2Type
    */
    setTextField2Type (textField2Type) {

    }

    /**
     * @return {MetadataType}
    */
    getTextField2Type () {

    }

    /**
     * @param {MetadataType} textField3Type
    */
    setTextField3Type (textField3Type) {

    }

    /**
     * @return {MetadataType}
    */
    getTextField3Type () {

    }

    /**
     * @param {MetadataType} textField4Type
    */
    setTextField4Type (textField4Type) {

    }

    /**
     * @return {MetadataType}
    */
    getTextField4Type () {

    }

    /**
     * @param {String} title
    */
    setTitle (title) {

    }

    /**
     * @return {String}
    */
    getTitle () {

    }

    /**
     * @param {SdlArtwork} primaryGraphic
    */
    setPrimaryGraphic (primaryGraphic) {

    }

    /**
     * @return {SdlArtwork}
    */
    getPrimaryGraphic () {

    }

    /**
     * @param {SdlArtwork} secondaryGraphic
    */
    setSecondaryGraphic (secondaryGraphic) {

    }

    /**
     * @return {SdlArtwork}
    */
    getSecondaryGraphic () {

    }

    /**
     * @param {Boolean} batching
    */
    setBatchUpdates (batching) {

    }
}

export { BaseTextAndGraphicManager };
