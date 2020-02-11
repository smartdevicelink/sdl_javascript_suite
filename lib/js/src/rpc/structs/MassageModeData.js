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

import { MassageMode } from '../enums/MassageMode.js';
import { MassageZone } from '../enums/MassageZone.js';
import { RpcStruct } from '../RpcStruct.js';

/**
 * Specify the mode of a massage zone.
 */
class MassageModeData extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {MassageZone} zone - List possible zones of a multi-contour massage seat.
     * @return {MassageModeData}
     */
    setMassageZone (zone) {
        this.validateType(MassageZone, zone);
        this.setParameter(MassageModeData.KEY_MASSAGE_ZONE, zone);
        return this;
    }

    /**
     * @return {MassageZone}
     */
    getMassageZone () {
        return this.getObject(MassageZone, MassageModeData.KEY_MASSAGE_ZONE);
    }

    /**
     * @param {MassageMode} mode - List possible modes of a massage zone.
     * @return {MassageModeData}
     */
    setMassageMode (mode) {
        this.validateType(MassageMode, mode);
        this.setParameter(MassageModeData.KEY_MASSAGE_MODE, mode);
        return this;
    }

    /**
     * @return {MassageMode}
     */
    getMassageMode () {
        return this.getObject(MassageMode, MassageModeData.KEY_MASSAGE_MODE);
    }
}

MassageModeData.KEY_MASSAGE_ZONE = 'massageZone';
MassageModeData.KEY_MASSAGE_MODE = 'massageMode';

export { MassageModeData };