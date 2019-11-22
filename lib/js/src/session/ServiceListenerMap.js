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

import { ServiceType } from '../protocol/enums/ServiceType.js';

class ServiceListenerMap {
    /**
    * @constructor
    */
    constructor () {
        this._listeners = {};

        // initialize an array of listeners for each service type
        this._listeners[ServiceType.CONTROL] = [];
        this._listeners[ServiceType.RPC] = [];
        this._listeners[ServiceType.AUDIO] = [];
        this._listeners[ServiceType.VIDEO] = [];
        this._listeners[ServiceType.HYBRID] = [];
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {SdlServiceListener} serviceListener 
     */
    addListener (serviceType, serviceListener) {
        if (!serviceType) {
            return;
        }
        this._listeners[serviceType].push(serviceListener);
    }

    /**
     * @param {ServiceType} serviceType 
     * @param {SdlServiceListener} serviceListener 
     * @return {Boolean} - whether the service got removed 
     */
    removeListener (serviceType, serviceListener) {
        if (!serviceType) {
            return;
        }
        const listenerArray = this._listeners[serviceType];
        let removed = false;
        // remove matching references to the passed in service listener
        this._listeners[serviceType] = listenerArray.filter(listener => {
            removed = true;
            return listener !== serviceListener;
        });
        return removed;
    }

    /**
     * Sends this event to all listeners belonging to a specific service type
     * @param {SdlSession} session 
     * @param {ServiceType} serviceType 
     * @param {Boolean} isEncrypted 
     */
    sendEventServiceStarted (session, serviceType, isEncrypted) {
        const listenerArray = this._listeners[serviceType];
        for (const index in listenerArray) {
            listenerArray[index].onServiceStarted(session, serviceType, isEncrypted);
        }
    }

    /**
     * Sends this event to all listeners belonging to a specific service type
     * @param {SdlSession} session 
     * @param {ServiceType} serviceType 
     */
    sendEventServiceEnded (session, serviceType) {
        const listenerArray = this._listeners[serviceType];
        for (const index in listenerArray) {
            listenerArray[index].onServiceEnded(session, serviceType);
        }
    }

    /**
     * Sends this event to all listeners belonging to a specific service type
     * @param {SdlSession} session 
     * @param {ServiceType} serviceType 
     * @param {String} reason 
     */
    sendEventServiceError (session, serviceType, reason) {
        const listenerArray = this._listeners[serviceType];
        for (const index in listenerArray) {
            listenerArray[index].onServiceError(session, serviceType, reason);
        }
    }
}

export { ServiceListenerMap };
