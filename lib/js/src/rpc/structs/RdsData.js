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
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {String} ps - Program Service Name
     * @return {RdsData}
     */
    setPS (ps) {
        this.setParameter(RdsData.KEY_PS, ps);
        return this;
    }

    /**
     * @return {String}
     */
    getPS () {
        return this.getParameter(RdsData.KEY_PS);
    }

    /**
     * @param {String} rt - Radio Text
     * @return {RdsData}
     */
    setRT (rt) {
        this.setParameter(RdsData.KEY_RT, rt);
        return this;
    }

    /**
     * @return {String}
     */
    getRT () {
        return this.getParameter(RdsData.KEY_RT);
    }

    /**
     * @param {String} ct - The clock text in UTC format as YYYY-MM-DDThh:mm:ss.sTZD
     * @return {RdsData}
     */
    setCT (ct) {
        this.setParameter(RdsData.KEY_CT, ct);
        return this;
    }

    /**
     * @return {String}
     */
    getCT () {
        return this.getParameter(RdsData.KEY_CT);
    }

    /**
     * @param {String} pi - Program Identification - the call sign for the radio station
     * @return {RdsData}
     */
    setPI (pi) {
        this.setParameter(RdsData.KEY_PI, pi);
        return this;
    }

    /**
     * @return {String}
     */
    getPI () {
        return this.getParameter(RdsData.KEY_PI);
    }

    /**
     * @param {Number} pty - The program type - The region should be used to differentiate between EU and North America
     *                       program types
     * @return {RdsData}
     */
    setPTY (pty) {
        this.setParameter(RdsData.KEY_PTY, pty);
        return this;
    }

    /**
     * @return {Number}
     */
    getPTY () {
        return this.getParameter(RdsData.KEY_PTY);
    }

    /**
     * @param {Boolean} tp - Traffic Program Identification - Identifies a station that offers traffic
     * @return {RdsData}
     */
    setTP (tp) {
        this.setParameter(RdsData.KEY_TP, tp);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTP () {
        return this.getParameter(RdsData.KEY_TP);
    }

    /**
     * @param {Boolean} ta - Traffic Announcement Identification - Indicates an ongoing traffic announcement
     * @return {RdsData}
     */
    setTA (ta) {
        this.setParameter(RdsData.KEY_TA, ta);
        return this;
    }

    /**
     * @return {Boolean}
     */
    getTA () {
        return this.getParameter(RdsData.KEY_TA);
    }

    /**
     * @param {String} reg - Region
     * @return {RdsData}
     */
    setREG (reg) {
        this.setParameter(RdsData.KEY_REG, reg);
        return this;
    }

    /**
     * @return {String}
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