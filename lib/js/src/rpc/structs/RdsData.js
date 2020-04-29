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

class RdsData extends RpcStruct {
    /**
     * Initalizes an instance of RdsData.
     * @class
     * @param {object} parameters - An object map of parameters.
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * Set the PS
     * @param {String} ps - Program Service Name - The desired PS.
     * @returns {RdsData} - The class instance for method chaining.
     */
    setPS (ps) {
        this.setParameter(RdsData.KEY_PS, ps);
        return this;
    }

    /**
     * Get the PS
     * @returns {String} - the KEY_PS value
     */
    getPS () {
        return this.getParameter(RdsData.KEY_PS);
    }

    /**
     * Set the RT
     * @param {String} rt - Radio Text - The desired RT.
     * @returns {RdsData} - The class instance for method chaining.
     */
    setRT (rt) {
        this.setParameter(RdsData.KEY_RT, rt);
        return this;
    }

    /**
     * Get the RT
     * @returns {String} - the KEY_RT value
     */
    getRT () {
        return this.getParameter(RdsData.KEY_RT);
    }

    /**
     * Set the CT
     * @param {String} ct - The clock text in UTC format as YYYY-MM-DDThh:mm:ss.sTZD - The desired CT.
     * @returns {RdsData} - The class instance for method chaining.
     */
    setCT (ct) {
        this.setParameter(RdsData.KEY_CT, ct);
        return this;
    }

    /**
     * Get the CT
     * @returns {String} - the KEY_CT value
     */
    getCT () {
        return this.getParameter(RdsData.KEY_CT);
    }

    /**
     * Set the PI
     * @param {String} pi - Program Identification - the call sign for the radio station - The desired PI.
     * @returns {RdsData} - The class instance for method chaining.
     */
    setPI (pi) {
        this.setParameter(RdsData.KEY_PI, pi);
        return this;
    }

    /**
     * Get the PI
     * @returns {String} - the KEY_PI value
     */
    getPI () {
        return this.getParameter(RdsData.KEY_PI);
    }

    /**
     * Set the PTY
     * @param {Number} pty - The program type - The region should be used to differentiate between EU and North America - The desired PTY.
     * program types
     * @returns {RdsData} - The class instance for method chaining.
     */
    setPTY (pty) {
        this.setParameter(RdsData.KEY_PTY, pty);
        return this;
    }

    /**
     * Get the PTY
     * @returns {Number} - the KEY_PTY value
     */
    getPTY () {
        return this.getParameter(RdsData.KEY_PTY);
    }

    /**
     * Set the TP
     * @param {Boolean} tp - Traffic Program Identification - Identifies a station that offers traffic - The desired TP.
     * @returns {RdsData} - The class instance for method chaining.
     */
    setTP (tp) {
        this.setParameter(RdsData.KEY_TP, tp);
        return this;
    }

    /**
     * Get the TP
     * @returns {Boolean} - the KEY_TP value
     */
    getTP () {
        return this.getParameter(RdsData.KEY_TP);
    }

    /**
     * Set the TA
     * @param {Boolean} ta - Traffic Announcement Identification - Indicates an ongoing traffic announcement - The desired TA.
     * @returns {RdsData} - The class instance for method chaining.
     */
    setTA (ta) {
        this.setParameter(RdsData.KEY_TA, ta);
        return this;
    }

    /**
     * Get the TA
     * @returns {Boolean} - the KEY_TA value
     */
    getTA () {
        return this.getParameter(RdsData.KEY_TA);
    }

    /**
     * Set the REG
     * @param {String} reg - Region - The desired REG.
     * @returns {RdsData} - The class instance for method chaining.
     */
    setREG (reg) {
        this.setParameter(RdsData.KEY_REG, reg);
        return this;
    }

    /**
     * Get the REG
     * @returns {String} - the KEY_REG value
     */
    getREG () {
        return this.getParameter(RdsData.KEY_REG);
    }
}

RdsData.KEY_PS = 'PS';
RdsData.KEY_RT = 'RT';
RdsData.KEY_CT = 'CT';
RdsData.KEY_PI = 'PI';
RdsData.KEY_PTY = 'PTY';
RdsData.KEY_TP = 'TP';
RdsData.KEY_TA = 'TA';
RdsData.KEY_REG = 'REG';

export { RdsData };