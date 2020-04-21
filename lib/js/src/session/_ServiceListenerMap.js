/*
* Copyright (c) 2020, Livio, Inc.
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

/**
 * @typedef {Object} _ServiceListenerMap
 * @private
 */
class _ServiceListenerMap {
    /**
     * Initializes an instance of _ServiceListenerMap.
     * @class
     * @private
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
     * Add a service listener for a given service type.
     * @param {ServiceType} serviceType - The service type to listen for.
     * @param {_SdlServiceListener} serviceListener - The _SdlServiceListener to invoke.
     * @returns {_ServiceListenerMap} - A reference to this instance for method chaining.
     */
    addListener (serviceType = null, serviceListener) {
        if (serviceType === null) {
            return;
        }
        this._listeners[serviceType].push(serviceListener);
        return this;
    }

    /**
     * Remove a service listener matching the given type and listener.
     * @param {ServiceType} serviceType - The service type to match.
     * @param {_SdlServiceListener} serviceListener - The listener to match.
     * @returns {Boolean} - whether the service got removed
     */
    removeListener (serviceType = null, serviceListener) {
        if (serviceType === null) {
            return false;
        }
        const listenerArray = this._listeners[serviceType];
        let removed = false;
        // remove matching references to the passed in service listener
        this._listeners[serviceType] = listenerArray.filter(listener => {
            const different = listener !== serviceListener;
            if (!different) {
                removed = true;
            }
            return different;
        });
        return removed;
    }

    /**
     * Sends this event to all listeners belonging to a specific service type
     * @param {_SdlSession} session - An _SdlSession.
     * @param {ServiceType} serviceType - A ServiceType.
     * @param {Boolean} isEncrypted - Whether or not it is encrypted.
     */
    sendEventServiceStarted (session, serviceType, isEncrypted) {
        const listenerArray = this._listeners[serviceType];
        for (const index in listenerArray) {
            listenerArray[index].onServiceStarted(session, serviceType, isEncrypted);
        }
    }

    /**
     * Sends this event to all listeners belonging to a specific service type
     * @param {_SdlSession} session - An _SdlSession.
     * @param {ServiceType} serviceType - A ServiceType.
     */
    sendEventServiceEnded (session, serviceType) {
        const listenerArray = this._listeners[serviceType];
        for (const index in listenerArray) {
            listenerArray[index].onServiceEnded(session, serviceType);
        }
    }

    /**
     * Sends this event to all listeners belonging to a specific service type
     * @param {_SdlSession} session - An _SdlSession.
     * @param {ServiceType} serviceType - A ServiceType.
     * @param {String} reason - The error as a string.
     */
    sendEventServiceError (session, serviceType, reason) {
        const listenerArray = this._listeners[serviceType];
        for (const index in listenerArray) {
            listenerArray[index].onServiceError(session, serviceType, reason);
        }
    }
}

export { _ServiceListenerMap };
