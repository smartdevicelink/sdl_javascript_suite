// ------ Not part of the RPC spec itself -----

/**
 * Sets a boolean value for OEM Custom VehicleData.
 * @param {String} vehicleDataName - The key associated with the custom vehicle data.
 * @param {Boolean} vehicleDataState - Whether or not to subscribe to the data.
 * @returns {SubscribeVehicleData} - The class instance to support method chaining.
 */
setOemCustomVehicleData (vehicleDataName, vehicleDataState) {
    this.setParameter(vehicleDataName, vehicleDataState);
    return this;
}

/**
 * Gets a boolean value for OEM Custom VehicleData.
 * @param {String} vehicleDataName - The key associated with the custom vehicle data.
 * @returns {Boolean|null} - Whether or not to subscribe to the data.
 */
getOemCustomVehicleData (vehicleDataName) {
    return this.getParameter(vehicleDataName);
}

// ----------------- END -----------------------