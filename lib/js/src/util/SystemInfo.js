/*
 * Copyright (c) 2021, SmartDeviceLink Consortium, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following
 * disclaimer in the documentation and/or other materials provided with the
 * distribution.
 *
 * Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
 * its contributors may be used to endorse or promote products derived
 * from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

class SystemInfo {
    /**
     * Initializes an instance of SystemInfo.
     * @class
     * @param {VehicleType} vehicleType - the type of vehicle
     * @param {String} systemSoftwareVersion - the software version of the vehicle system
     * @param {String} systemHardwareVersion - the hardware version of the vehicle system
     */
    constructor (
        vehicleType = null,
        systemSoftwareVersion = null,
        systemHardwareVersion = null
    ) {
        this.setVehicleType(vehicleType);
        this.setSystemSoftwareVersion(systemSoftwareVersion);
        this.setSystemHardwareVersion(systemHardwareVersion);
    }

    /**
     * Set the type of vehicle.
     * @param {VehicleType} vehicleType - The type of vehicle.
     * @returns {SystemInfo} - A reference to the class instance for method chaining.
     */
    setVehicleType (vehicleType) {
        this._vehicleType = vehicleType;
        return this;
    }

    /**
     * Get the type of vehicle
     * @returns {VehicleType} - The type of vehicle.
     */
    getVehicleType () {
        return this._vehicleType;
    }

    /**
     * Set the software version of the vehicle system.
     * @param {String} systemSoftwareVersion - The software version of the vehicle system.
     * @returns {SystemInfo} - A reference to the class instance for method chaining.
     */
    setSystemSoftwareVersion (systemSoftwareVersion) {
        this._systemSoftwareVersion = systemSoftwareVersion;
        return this;
    }

    /**
     * Get the software version of the vehicle system
     * @returns {String} - The software version of the vehicle system.
     */
    getSystemSoftwareVersion () {
        return this._systemSoftwareVersion;
    }

    /**
     * Set the hardware version of the vehicle system.
     * @param {String} systemHardwareVersion - The hardware version of the vehicle system.
     * @returns {SystemInfo} - A reference to the class instance for method chaining.
     */
    setSystemHardwareVersion (systemHardwareVersion) {
        this._systemHardwareVersion = systemHardwareVersion;
        return this;
    }

    /**
     * Get the hardware version of the vehicle system
     * @returns {String} - The hardware version of the vehicle system.
     */
    getSystemHardwareVersion () {
        return this._systemHardwareVersion;
    }
}

export { SystemInfo };