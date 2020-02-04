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
import { MetadataType } from '../enums/MetadataType.js';

class MetadataTags extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {MetadataType[]} field1 - The type of data contained in the "mainField1" text field.
     * @return {MetadataTags}
     */
    setMainField1 (field1) {
        this.validateType(MetadataType, field1, true);
        this.setParameter(MetadataTags.KEY_MAIN_FIELD_1, field1);
        return this;
    }

    /**
     * @return {MetadataType[]}
     */
    getMainField1 () {
        return this.getObject(MetadataType, MetadataTags.KEY_MAIN_FIELD_1);
    }

    /**
     * @param {MetadataType[]} field2 - The type of data contained in the "mainField2" text field.
     * @return {MetadataTags}
     */
    setMainField2 (field2) {
        this.validateType(MetadataType, field2, true);
        this.setParameter(MetadataTags.KEY_MAIN_FIELD_2, field2);
        return this;
    }

    /**
     * @return {MetadataType[]}
     */
    getMainField2 () {
        return this.getObject(MetadataType, MetadataTags.KEY_MAIN_FIELD_2);
    }

    /**
     * @param {MetadataType[]} field3 - The type of data contained in the "mainField3" text field.
     * @return {MetadataTags}
     */
    setMainField3 (field3) {
        this.validateType(MetadataType, field3, true);
        this.setParameter(MetadataTags.KEY_MAIN_FIELD_3, field3);
        return this;
    }

    /**
     * @return {MetadataType[]}
     */
    getMainField3 () {
        return this.getObject(MetadataType, MetadataTags.KEY_MAIN_FIELD_3);
    }

    /**
     * @param {MetadataType[]} field4 - The type of data contained in the "mainField4" text field.
     * @return {MetadataTags}
     */
    setMainField4 (field4) {
        this.validateType(MetadataType, field4, true);
        this.setParameter(MetadataTags.KEY_MAIN_FIELD_4, field4);
        return this;
    }

    /**
     * @return {MetadataType[]}
     */
    getMainField4 () {
        return this.getObject(MetadataType, MetadataTags.KEY_MAIN_FIELD_4);
    }
}

MetadataTags.KEY_MAIN_FIELD_1 = 'mainField1';
MetadataTags.KEY_MAIN_FIELD_2 = 'mainField2';
MetadataTags.KEY_MAIN_FIELD_3 = 'mainField3';
MetadataTags.KEY_MAIN_FIELD_4 = 'mainField4';

export { MetadataTags };