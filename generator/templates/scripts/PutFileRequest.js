// ------ Not part of the RPC spec itself -----

/**
 * Set the file data.
 * @param {Uint8Array} fileData - A byte array of the file contents.
 * @returns {PutFile} - The class instance to support method chaining.
 */
setFileData (fileData) {
    this.setBulkData(fileData);
    return this;
}
/**
 * Get the file data.
 * @returns {Uint8Array} - A byte array of the file contents.
 */
getFileData () {
    return this.getBulkData();
}

// ----------------- END -----------------------