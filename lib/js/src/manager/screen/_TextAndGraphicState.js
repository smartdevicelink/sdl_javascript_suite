class _TextAndGraphicState {
    constructor (textField1, textField2, textField3, textField4, mediaTrackTextField,
        title, primaryGraphic, secondaryGraphic, textAlignment,
        textField1Type, textField2Type, textField3Type, textField4Type) {
        this.textField1 = textField1;
        this.textField2 = textField2;
        this.textField3 = textField3;
        this.textField4 = textField4;
        this.mediaTrackTextField = mediaTrackTextField;
        this.title = title;
        this.primaryGraphic = primaryGraphic;
        this.secondaryGraphic = secondaryGraphic;
        this.textAlignment = textAlignment;
        this.textField1Type = textField1Type;
        this.textField2Type = textField2Type;
        this.textField3Type = textField3Type;
        this.textField4Type = textField4Type;
    }

    getTextField1 () {
        return this._textField1;
    }

    setTextField1 (textField1) {
        this._textField1 = textField1;
    }

    getTextField2 () {
        return this._textField2;
    }

    setTextField2 (textField2) {
        this._textField2 = textField2;
    }

    getTextField3 () {
        return this._textField3;
    }

    setTextField3 (textField3) {
        this._textField3 = textField3;
    }

    getTextField4 () {
        return this._textField4;
    }

    setTextField4 (textField4) {
        this._textField4 = textField4;
    }

    getMediaTrackTextField () {
        return this._mediaTrackTextField;
    }

    setMediaTrackTextField (mediaTrackTextField) {
        this._mediaTrackTextField = mediaTrackTextField;
    }

    getTitle () {
        return this._title;
    }

    setTitle (title) {
        this._title = title;
    }

    getTextField1Type () {
        return this._textField1Type;
    }

    setTextField1Type (textField1Type) {
        this._textField1Type = textField1Type;
    }

    getTextField2Type () {
        return this._textField2Type;
    }

    setTextField2Type (textField2Type) {
        this._textField2Type = textField2Type;
    }

    getTextField3Type () {
        return this._textField3Type;
    }

    setTextField3Type (textField3Type) {
        this._textField3Type = textField3Type;
    }

    getTextField4Type () {
        return this._textField4Type;
    }

    setTextField4Type (textField4Type) {
        this._textField4Type = textField4Type;
    }

    getTextAlignment () {
        return this._textAlignment;
    }

    getPrimaryGraphic () {
        return this._primaryGraphic;
    }

    getSecondaryGraphic () {
        return this._secondaryGraphic;
    }
}

export { _TextAndGraphicState };