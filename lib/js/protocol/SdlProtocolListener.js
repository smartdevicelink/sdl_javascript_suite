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

import { RpcMessage } from '../rpc/RpcMessage.js'
import { SdlPacket } from './SdlPacket.js'
import { ServiceType } from './enums/ServiceType.js';


//TODO check how to handle the property/function exposure
/**
 * @typedef {Object} SdlProtocolListener
 * @property {function} setOnRpcMessageReceived
 * @property {function} setOnControlServiceMessageReceived
 * @property {function} onRpcMessageReceived
 * @property {function} onControlServiceMessageReceived
 * @property {function} onStartServiceACKReceived
 * 
 * 
 */
class SdlProtocolListener {

    constructor() {
        this._onRpcMessageReceived = null;
        this._onControlServiceMessageReceived = null;
    }

    /**
     * 
     * @param {function} listener 
     */
    setOnRpcMessageReceivedListener(listener) {
        this._onRpcMessageReceived = listener;
    }

    /**
     * 
     * @param {function} listener 
     */
    setOnControlServiceMessageReceivedListener(listener) {
        this._onControlServiceMessageReceived = listener;
    }

    /**
     * 
     * @param {function} listener 
     */
    setOnDecryptRequestListener(listener) {
        this._onDecryptRequestListener = listener;
    }

    //TODO add the setters for the added functions

    /*
    * Listener methods to be called
    *
    */


    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    onControlServiceMessageReceived(sdlPacket) {
        if (typeof this._onControlServiceMessageReceived === 'function') {
            this._onControlServiceMessageReceived(sdlPacket);
        }
    }

    /**
     * 
     * @param {RpcMessage} rpcMessage 
     */
    onRpcMessageReceived(rpcMessage){
        if (typeof this._onRpcMessageReceived === 'function') {
            this._onRpcMessageReceived(rpcMessage);
        }
    }


    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    onStartServiceACKReceived(sdlPacket){
        if (typeof this._onStartServiceACKReceived === 'function') {
            this._onStartServiceACKReceived(sdlPacket);
        }
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    onStartServiceNAKReceived(sdlPacket){
        if (typeof this._onStartServiceNAKReceived === 'function') {
            this._onStartServiceNAKReceived(sdlPacket);
        }
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    onEndServiceACKReceived(sdlPacket){
        if (typeof this._onEndServiceACKReceived === 'function') {
            this._onEndServiceACKReceived(sdlPacket);
        }
    }

    /**
     * 
     * @param {SdlPacket} sdlPacket 
     */
    onEndServiceNAKReceived(sdlPacket){
        if (typeof this._onEndServiceNAKReceived === 'function') {
            this._onEndServiceNAKReceived(sdlPacket);
        }
    }

    /**
     * 
     * @param {ServiceType} serviceType 
     */
    onServiceEncryptionStarted(serviceType) {
        if (typeof this.onServiceEncryptionStarted === 'function') {
            this.onServiceEncryptionStarted(serviceType);
        }
    }


}

export { SdlProtocolListener };