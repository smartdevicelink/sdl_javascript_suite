// ------ Not part of the RPC spec itself -----

/**
 * Sets a boolean value for OEM Custom VehicleData.
 * @param {String} vehicleDataName
 * @param {Boolean} vehicleDataState
 * @return {SubscribeVehicleData}
 */
setOemCustomVehicleData (vehicleDataName, vehicleDataState) {
    this.setParameter(vehicleDataName, vehicleDataState);
    return this;
}

/**
 * Gets a boolean value for OEM Custom VehicleData.
 * @param {String} vehicleDataName
 * @return {Boolean|null}
 */
getOemCustomVehicleData (vehicleDataName) {
    return this.getParameter(vehicleDataName);
}

// ----------------- END -----------------------