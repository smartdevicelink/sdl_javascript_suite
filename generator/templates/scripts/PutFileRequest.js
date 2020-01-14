// ------ Not part of the RPC spec itself -----

/**
 * @param {Uint8Array} fileData
 * @return {PutFile}
 */
setFileData(fileData) {
    this.setBulkData(fileData);
    return this;
}
/**
 * @return {Uint8Array}
 */
getFileData() {
    return this.getBulkData();
}

//----------------- END -----------------------