/**
 * @param {String} fullAppId
 * @return {RegisterAppInterface}
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
 * @return {String} the app id
 */
getFullAppId () {
    return this.getParameter(RegisterAppInterface.KEY_FULL_APP_ID);
}

/**
 * @param {String} appId - This method should not be accessed directly by developers. Only set the full ID and this
 *                         param will be set.
 * @return {RegisterAppInterface}
 */
_setAppId (appId) {
    this.validateType(String, appId);

    this.setParameter(RegisterAppInterface.KEY_APP_ID, appId);
    return this;
}

/**
 * @return {String} the app id
 */
getAppId () {
    return this.getParameter(RegisterAppInterface.KEY_APP_ID);
}