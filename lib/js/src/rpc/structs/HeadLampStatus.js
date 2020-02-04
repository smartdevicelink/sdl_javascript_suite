/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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

import { RpcStruct } from '../RpcStruct.js';
import { AmbientLightStatus } from '../enums/AmbientLightStatus.js';

class HeadLampStatus extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Boolean} on - Status of the low beam lamps. References signal "HeadLampLoActv_B_Stat".
     * @return {HeadLampStatus}
     */
    setLowBeamsOn (on) {
        this.setParameter(HeadLampStatus.KEY_LOW_BEAMS_ON, on);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getLowBeamsOn () {
        return this.getParameter(HeadLampStatus.KEY_LOW_BEAMS_ON);
    }

    /**
     * @param {Boolean} on - Status of the high beam lamps. References signal "HeadLghtHiOn_B_Stat".
     * @return {HeadLampStatus}
     */
    setHighBeamsOn (on) {
        this.setParameter(HeadLampStatus.KEY_HIGH_BEAMS_ON, on);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getHighBeamsOn () {
        return this.getParameter(HeadLampStatus.KEY_HIGH_BEAMS_ON);
    }

    /**
     * @param {AmbientLightStatus} status - Status of the ambient light sensor.
     * @return {HeadLampStatus}
     */
    setAmbientLightSensorStatus (status) {
        this.validateType(AmbientLightStatus, status);
        this.setParameter(HeadLampStatus.KEY_AMBIENT_LIGHT_SENSOR_STATUS, status);
        return this;
    }

    /**
     * @return {AmbientLightStatus}
     */
    getAmbientLightSensorStatus () {
        return this.getObject(AmbientLightStatus, HeadLampStatus.KEY_AMBIENT_LIGHT_SENSOR_STATUS);
    }
}

HeadLampStatus.KEY_LOW_BEAMS_ON = 'lowBeamsOn';
HeadLampStatus.KEY_HIGH_BEAMS_ON = 'highBeamsOn';
HeadLampStatus.KEY_AMBIENT_LIGHT_SENSOR_STATUS = 'ambientLightSensorStatus';

export { HeadLampStatus };