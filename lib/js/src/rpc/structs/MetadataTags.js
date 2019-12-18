/*
* Copyright (c) 2019, Livio, Inc.
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
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
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
    * @param {Array<MetadataType>} mainField1
    * @return {MetadataTags}
    */
    setMainField1 (mainField1) {
        this.setParameter(MetadataTags.KEY_MAIN_FIELD_1, mainField1);
        return this;
    }

    /**
    * @return {Array<MetadataType>}
    */
    getMainField1 () {
        return this.getObject(MetadataType, MetadataTags.KEY_MAIN_FIELD_1);
    }

    /**
    * @param {Array<MetadataType>} mainField2
    * @return {MetadataTags}
    */
    setMainField2 (mainField2) {
        this.setParameter(MetadataTags.KEY_MAIN_FIELD_2, mainField2);
        return this;
    }

    /**
    * @return {Array<MetadataType>}
    */
    getMainField2 () {
        return this.getObject(MetadataType, MetadataTags.KEY_MAIN_FIELD_2);
    }

    /**
    * @param {Array<MetadataType>} mainField3
    * @return {MetadataTags}
    */
    setMainField3 (mainField3) {
        this.setParameter(MetadataTags.KEY_MAIN_FIELD_3, mainField3);
        return this;
    }

    /**
    * @return {Array<MetadataType>}
    */
    getMainField3 () {
        return this.getObject(MetadataType, MetadataTags.KEY_MAIN_FIELD_3);
    }

    /**
    * @param {Array<MetadataType>} mainField4
    * @return {MetadataTags}
    */
    setMainField4 (mainField4) {
        this.setParameter(MetadataTags.KEY_MAIN_FIELD_4, mainField4);
        return this;
    }

    /**
    * @return {Array<MetadataType>}
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
