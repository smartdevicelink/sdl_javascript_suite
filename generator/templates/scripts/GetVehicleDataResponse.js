// ------ Not part of the RPC spec itself -----

/**
 * Sets a value for OEM Custom VehicleData.
 * @param {String} vehicleDataName
 * @param {Object} vehicleDataState
 * @return {GetVehicleDataResponse}
 */
setOemCustomVehicleData (vehicleDataName, vehicleDataState) {
    this.setParameter(vehicleDataName, vehicleDataState);
    return this;
}

/**
 * Gets a VehicleData value for the vehicle data item.
 * @param {String} vehicleDataName
 * @return {Object} a Object related to the vehicle data
 */
getOEMCustomVehicleData (vehicleDataName) {
    return this.getParameter(vehicleDataName);
}

// ----------------- END -----------------------