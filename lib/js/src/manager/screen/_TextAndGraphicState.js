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

class _TextAndGraphicState {
    /**
     * Initializes an instance of _TextAndGraphicState
     * @param {String} textField1 - The field's contents
     * @param {String} textField2 - The field's contents
     * @param {String} textField3 - The field's contents
     * @param {String} textField4 - The field's contents
     * @param {String} mediaTrackTextField - The field's contents
     * @param {String} title - The title's contents
     * @param {SdlArtwork} primaryGraphic - An instance of SdlArtwork
     * @param {SdlArtwork} secondaryGraphic - An instance of SdlArtwork
     * @param {TextAlignment} textAlignment - A TextAlignment enum value
     * @param {MetadataType} textField1Type - The field type
     * @param {MetadataType} textField2Type - The field type
     * @param {MetadataType} textField3Type - The field type
     * @param {MetadataType} textField4Type - The field type
     */
    constructor (textField1, textField2, textField3, textField4, mediaTrackTextField,
        title, primaryGraphic, secondaryGraphic, textAlignment,
        textField1Type, textField2Type, textField3Type, textField4Type) {
        this._textField1 = textField1;
        this._textField2 = textField2;
        this._textField3 = textField3;
        this._textField4 = textField4;
        this._mediaTrackTextField = mediaTrackTextField;
        this._title = title;
        this._primaryGraphic = primaryGraphic;
        this._secondaryGraphic = secondaryGraphic;
        this._textAlignment = textAlignment;
        this._textField1Type = textField1Type;
        this._textField2Type = textField2Type;
        this._textField3Type = textField3Type;
        this._textField4Type = textField4Type;
    }

    /**
     * Get textField1
     */
    getTextField1 () {
        return this._textField1;
    }

    /**
     * Set textField1
     * @param {String} textField1 - The field's contents
     */
    setTextField1 (textField1) {
        this._textField1 = textField1;
    }

    /**
     * Get textField2
     */
    getTextField2 () {
        return this._textField2;
    }

    /**
     * Set textField2
     * @param {String} textField2 - The field's contents
     */
    setTextField2 (textField2) {
        this._textField2 = textField2;
    }

    /**
     * Get textField3
     */
    getTextField3 () {
        return this._textField3;
    }

    /**
     * Set textField3
     * @param {String} textField3 - The field's contents
     */
    setTextField3 (textField3) {
        this._textField3 = textField3;
    }

    /**
     * Get textField4
     */
    getTextField4 () {
        return this._textField4;
    }

    /**
     * Set textField4
     * @param {String} textField4 - The field's contents
     */
    setTextField4 (textField4) {
        this._textField4 = textField4;
    }

    /**
     * Get mediaTrackTextField
     */
    getMediaTrackTextField () {
        return this._mediaTrackTextField;
    }

    /**
     * Set mediaTrackTextField
     * @param {String} mediaTrackTextField - A string of the field's text
     */
    setMediaTrackTextField (mediaTrackTextField) {
        this._mediaTrackTextField = mediaTrackTextField;
    }

    /**
     * Get Title
     */
    getTitle () {
        return this._title;
    }

    /**
     * Set title
     * @param {String} title - The title
     */
    setTitle (title) {
        this._title = title;
    }

    /**
     * Get textField1Type
     */
    getTextField1Type () {
        return this._textField1Type;
    }

    /**
     * Set textField1Type
     * @param {MetadataType} textField1Type - The field type
     */
    setTextField1Type (textField1Type) {
        this._textField1Type = textField1Type;
    }

    /**
     * Get textField2Type
     */
    getTextField2Type () {
        return this._textField2Type;
    }

    /**
     * Set textField2Type
     * @param {MetadataType} textField2Type - The field type
     */
    setTextField2Type (textField2Type) {
        this._textField2Type = textField2Type;
    }

    /**
     * Get textField3Type
     */
    getTextField3Type () {
        return this._textField3Type;
    }

    /**
     * Set textField3Type
     * @param {MetadataType} textField3Type - The field type
     */
    setTextField3Type (textField3Type) {
        this._textField3Type = textField3Type;
    }

    /**
     * Get textField4Type
     */
    getTextField4Type () {
        return this._textField4Type;
    }

    /**
     * Set textField4Type
     * @param {MetadataType} textField4Type - The field type
     */
    setTextField4Type (textField4Type) {
        this._textField4Type = textField4Type;
    }

    /**
     * Get textAlignment
     */
    getTextAlignment () {
        return this._textAlignment;
    }

    /**
     * Get primaryGraphic
     */
    getPrimaryGraphic () {
        return this._primaryGraphic;
    }

    /**
     * Get secondaryGraphic
     */
    getSecondaryGraphic () {
        return this._secondaryGraphic;
    }
}

export { _TextAndGraphicState };