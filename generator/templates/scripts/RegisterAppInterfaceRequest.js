/**
 * Set the full app ID. Also sets the shortened app ID automatically.
 * @param {String} fullAppId - A full App ID.
 * @returns {RegisterAppInterface} - The class instance to support method chaining.
 */
setFullAppId (fullAppId) {
    this.validateType(String, fullAppId);

    if (fullAppId !== null) {
        fullAppId = fullAppId.toLowerCase();
        this.setParameter(RegisterAppInterface.KEY_FULL_APP_ID, fullAppId);
        let appID;
        if (fullAppId.length <= RegisterAppInterface.APP_ID_MAX_LENGTH) {
            appID = fullAppId;
        } else {
            appID = fullAppId.replace('-', '').substring(0, RegisterAppInterface.APP_ID_MAX_LENGTH);
        }
        this._setAppId(appID);
    } else {
        this.setParameter(RegisterAppInterface.KEY_FULL_APP_ID, null);
    }

    return this;
}

/**
 * Get the full App ID.
 * @returns {String} - The full app ID.
 */
getFullAppId () {
    return this.getParameter(RegisterAppInterface.KEY_FULL_APP_ID);
}

/**
 * Sets the shortened app ID.
 * @param {String} appId - A shortened app ID.
 * @returns {RegisterAppInterface} - The class instance to support method chaining.
 */
_setAppId (appId) {
    this.validateType(String, appId);

    this.setParameter(RegisterAppInterface.KEY_APP_ID, appId);
    return this;
}

/**
 * Get the shortened app ID.
 * @returns {String} - The shortened app ID.
 */
getAppId () {
    return this.getParameter(RegisterAppInterface.KEY_APP_ID);
}