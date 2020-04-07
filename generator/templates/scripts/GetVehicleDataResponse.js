// ------ Not part of the RPC spec itself -----

/**
 * Sets a value for OEM Custom VehicleData.
 * @param {String} vehicleDataName - The key associated with the custom vehicle data.
 * @param {Object} vehicleDataState - The value associated with the custom vehicle data.
 * @returns {GetVehicleDataResponse} - The class instance to support method chaining.
 */
setOemCustomVehicleData (vehicleDataName, vehicleDataState) {
    this.setParameter(vehicleDataName, vehicleDataState);
    return this;
}

/**
 * Gets a VehicleData value for the vehicle data item.
 * @param {String} vehicleDataName - The key associated with the custom vehicle data.
 * @returns {Object} - The value associated with the custom vehicle data.
 */
getOEMCustomVehicleData (vehicleDataName) {
    return this.getParameter(vehicleDataName);
}

// ----------------- END -----------------------