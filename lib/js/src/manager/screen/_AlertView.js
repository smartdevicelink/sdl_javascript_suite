class _AlertView {
    constructor () {
        /*
        private static final int TIMEOUT_MIN = 3;
        private static final int TIMEOUT_MAX = 10;
        private String text, secondaryText, tertiaryText;
        private Integer timeout;
        private AlertAudioData audio;
        private boolean showWaitIndicator;
        private List<SoftButtonObject> softButtons;
        private SdlArtwork icon;
        AlertCanceledListener canceledListener;
        */
    }

    getText () {
        return this._text;
    }

    setText (text) {
        this._text = text;
        return this;
    }

    getSecondaryText () {
        return this._secondaryText;
    }

    setSecondaryText (secondaryText) {
        this._secondaryText = secondaryText;
        return this;
    }

    getTertiaryText () {
        return this._tertiaryText;
    }

    setTertiaryText (tertiaryText) {
        this._tertiaryText = tertiaryText;
        return this;
    }

    setTimeout (timeout) {
        this._timeout = timeout;
        return this;
    }

    setShowWaitIndicator (showWaitIndicator) {
        this._showWaitIndicator = showWaitIndicator;
        return this;
    }

    getSoftButtons () {
        return this._softButtons;
    }

    setSoftButtons (softButtons) {
        this._softButtons = softButtons;
        return this;
    }

    getAudio () {
        return this._audio;
    }

    setAudio (audio) {
        this._audio = audio;
        return this;
    }

    getIcon () {
        return this._icon;
    }

    setIcon (icon) {
        this._icon = icon;
        return this;
    }

    getDefaultTimeout () {
        return this._defaultTimeout;
    }

    setDefaultTimeout (defaultTimeout) {
        if (defaultTimeout <= TIMEOUT_MIN) {
            _AlertView._defaultTimeout = TIMEOUT_MIN;
            return;
        } else if (defaultTimeout >= TIMEOUT_MAX) {
            _AlertView._defaultTimeout = TIMEOUT_MAX;
            return;
        }
        _AlertView._defaultTimeout = defaultTimeout;
        return this;
    }

    cancel () {
        this._canceledListener();
    }

    getTimeout () {
        if (this._timeout === null || this._timeout === undefined) {
            this._timeout = this._defaultTimeout;
        } else if (this._timeout === this._defaultTimeout) {
            return this._defaultTimeout;
        } else if (this._timeout < TIMEOUT_MIN) {
            return TIMEOUT_MIN;
        } else if (this._timeout > TIMEOUT_MAX) {
            return TIMEOUT_MAX;
        }
        return this._timeout;
    }
}

_AlertView._defaultTimeout = 5;
const TIMEOUT_MIN = 3;
const TIMEOUT_MAX = 10;

export { _AlertView };