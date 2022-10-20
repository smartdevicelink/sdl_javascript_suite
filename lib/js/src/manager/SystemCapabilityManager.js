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

import { _SubManagerBase } from './_SubManagerBase.js';
import { SystemCapabilityType } from '../rpc/enums/SystemCapabilityType.js';
import { PredefinedWindows } from '../rpc/enums/PredefinedWindows.js';
import { GetSystemCapability } from '../rpc/messages/GetSystemCapability.js';
import { Version } from '../util/Version.js';
import { WindowType } from '../rpc/enums/WindowType.js';
import { WindowTypeCapabilities } from '../rpc/structs/WindowTypeCapabilities.js';
import { DisplayCapability } from '../rpc/structs/DisplayCapability.js';
import { DisplayCapabilities } from '../rpc/structs/DisplayCapabilities.js';
import { ImageType } from '../rpc/enums/ImageType.js';
import { MessageType } from '../rpc/enums/MessageType.js';
import { DisplayType } from '../rpc/enums/DisplayType.js';
import { FunctionID } from '../rpc/enums/FunctionID.js';
import { WindowCapability } from '../rpc/structs/WindowCapability.js';
import { ServiceUpdateReason } from '../rpc/enums/ServiceUpdateReason.js';
import { RpcResponse } from '../rpc/RpcResponse.js';
import { _ManagerUtility } from './_ManagerUtility.js';

class SystemCapabilityManager extends _SubManagerBase {
    /**
     * Initializes an instance of SystemCapabilityManager
     * @class
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     */
    constructor (lifecycleManager = null) {
        super(lifecycleManager);
        this._onSystemCapabilityListeners = {};

        // capabilities in the spec
        this._navigationCapability = null;
        this._phoneCapability = null;
        this._videoStreamingCapability = null;
        this._remoteControlCapability = null;
        // ensure there is a map defined in case a get happens for this capability
        this._appServicesCapabilities = new Map(); // Map<String, AppServiceCapability>
        this._seatLocationCapability = null;
        this._displays = null;
        this._driverDistractionCapability = null;
        this._systemCapabilitiesSubscriptionStatus = new Set(); // Set<SystemCapabilityType>
        this._systemCapabilitiesSubscriptionStatus.add(SystemCapabilityType.DISPLAYS) // subscribe to displays by default

        // capabilities not in the spec
        this._hmiCapabilities = null;
        this._displayCapabilities = null;
        this._prerecordedSpeechCapabilities = null;
        this._audioPassThruCapabilities = null;
        this._pcmStreamCapability = null;
        this._buttonCapabilities = null;
        this._hmiZoneCapabilities = null;
        this._presetBankCapabilities = null;
        this._softButtonCapabilities = null;
        this._speechCapabilities = null;
        this._vrCapability = null;

        this._setupRpcListeners();
    }

    /**
     * Gets the DriverDistraction capabilities
     * @returns {DriverDistractionCapability|null} - A HMICapabilities struct, or null.
     */
    getDriverDistractionCapabilities () {
        return this._driverDistractionCapability;
    }

    /**
     * Gets the HMI capabilities
     * @returns {HMICapabilities|null} - A HMICapabilities struct, or null.
     */
    getHmiCapabilities () {
        return this._hmiCapabilities;
    }

    /**
     * Gets the display capabilities
     * @deprecated since version 1.1
     * @returns {DisplayCapabilities|null} - A DisplayCapabilities struct, or null.
     */
    getDisplayCapabilities () {
        return this._displayCapabilities;
    }

    /**
     * Gets the prerecorded speech capabilities
     * @returns {PrerecordedSpeech[]|null} - An array of PrerecordedSpeech enums, or null.
     */
    getPrerecordedSpeechCapabilities () {
        return this._prerecordedSpeechCapabilities;
    }

    /**
     * Gets the audio pass thru capabilities
     * @returns {AudioPassThruCapabilities[]|null} - An array of AudioPassThruCapabilities structs, or null.
     */
    getAudioPassThruCapabilities () {
        return this._audioPassThruCapabilities;
    }

    /**
     * Gets the PCM stream capabilities
     * @returns {AudioPassThruCapabilities|null} - A AudioPassThruCapabilities struct, or null.
     */
    getPcmStreamCapabilities () {
        return this._pcmStreamCapability;
    }

    /**
     * Gets the HMI zone capabilities
     * @returns {HmiZoneCapabilities[]|null} - An array of HmiZoneCapabilities enums, or null.
     */
    getHmiZoneCapabilities () {
        return this._hmiZoneCapabilities;
    }

    /**
     * Gets the preset bank capabilities
     * @deprecated since version 1.1
     * @returns {PresetBankCapabilities|null} - A PresetBankCapabilities struct, or null.
     */
    getPresetBankCapabilities () {
        return this._presetBankCapabilities;
    }

    /**
     * Gets the speech capabilities
     * @returns {SpeechCapabilities[]|null} - An array of SpeechCapabilities enums, or null.
     */
    getSpeechCapabilities () {
        return this._speechCapabilities;
    }

    /**
     * Gets the VR capabilities
     * @returns {VrCapabilities[]|null} - An array of VrCapabilities enums, or null.
     */
    getVrCapabilities () {
        return this._vrCapability;
    }

    /**
     * Gets the window capability given a window id
     * @param {Number} windowId - The numeric window ID.
     * @returns {WindowCapability|null} - A WindowCapability struct, or null.
     */
    getWindowCapability (windowId) {
        const displays = this._displays;
        if (!Array.isArray(displays) || displays.length === 0) {
            return null;
        }

        const display = displays[0];
        const windowCapabilities = display.getWindowCapabilities();

        if (windowCapabilities === null) {
            return null;
        }

        for (let index = 0; index < windowCapabilities.length; index++) {
            const windowCapability = windowCapabilities[index];
            let currentWindowId;
            if (windowCapability.getWindowID() !== null && windowCapability.getWindowID() !== undefined) {
                currentWindowId = windowCapability.getWindowID();
            } else {
                currentWindowId = PredefinedWindows.DEFAULT_WINDOW;
            }
            if (currentWindowId === windowId) {
                // Clone WindowCapability to prevent modification of stored WindowCapability in SystemCapabilityManager
                const windowCapabilityCopy = new WindowCapability(JSON.parse(JSON.stringify(windowCapability.getParameters())));
                // A null windowID is assumed to be the DefaultWindow according to the spec, but that can be hard for developers to check, so set it explicitly.
                windowCapabilityCopy.setWindowID(windowId);
                return windowCapabilityCopy;
            }
        }
        return null;
    }

    /**
     * Returns the default main window capability
     * @returns {WindowCapability|null} - A WindowCapability struct, or null.
     */
    getDefaultMainWindowCapability () {
        return this.getWindowCapability(PredefinedWindows.DEFAULT_WINDOW);
    }

    /**
     * Both RAIR and SDLR RPCs expose the same getter methods for the interested capabilities
     * @private
     * @param {RegisterAppInterfaceResponse|SetDisplayLayoutResponse} rpc - Either a RegisterAppInterfaceResponse or a SetDisplayLayoutResponse.
     * @returns {DisplayCapability[]} - An array containing DisplayCapability structs.
     */
    _createDisplayCapabilityList (rpc) {
        const displayCapabilities = rpc.getDisplayCapabilities();
        const buttonCapabilities = rpc.getButtonCapabilities();
        const softButtonCapabilities = rpc.getSoftButtonCapabilities();

        // Based on deprecated Display capabilities we don't know if widgets are supported,
        // The Default MAIN window is the only window we know is supported
        const windowTypeCapabilities = new WindowTypeCapabilities()
            .setType(WindowType.MAIN)
            .setMaximumNumberOfWindows(1);
        const displayCapability = new DisplayCapability();

        if (displayCapabilities !== null && displayCapabilities !== undefined) {
            if (displayCapabilities.getDisplayName() !== null && displayCapabilities.getDisplayName() !== undefined) {
                displayCapability.setDisplayName(displayCapabilities.getDisplayName());
            } else if (displayCapabilities.getDisplayType() !== null && displayCapabilities.getDisplayType() !== undefined) {
                displayCapability.setDisplayName(displayCapabilities.getDisplayType());
            }
        }
        displayCapability.setWindowTypeSupported([windowTypeCapabilities]);

        // Create a window capability object for the default MAIN window
        const defaultWindowCapability = new WindowCapability();
        defaultWindowCapability.setWindowID(PredefinedWindows.DEFAULT_WINDOW);
        // do null checks against the capabilities
        if (buttonCapabilities !== null) {
            defaultWindowCapability.setButtonCapabilities(buttonCapabilities);
        }
        if (softButtonCapabilities !== null) {
            defaultWindowCapability.setSoftButtonCapabilities(softButtonCapabilities);
        }

        // return if display capabilities don't exist.
        if (displayCapabilities === null || displayCapabilities === undefined) {
            defaultWindowCapability.setTextFields(_ManagerUtility.getAllTextFields());
            defaultWindowCapability.setImageFields(_ManagerUtility.getAllImageFields());
            displayCapability.setWindowCapabilities([defaultWindowCapability]);
            return [displayCapability];
        }
        
        // Ford Sync bug returning incorrect template name for "NON-MEDIA" https://github.com/smartdevicelink/sdl_javascript_suite/issues/450
        const templatesAvailable = displayCapabilities.getTemplatesAvailable() !== null ? displayCapabilities.getTemplatesAvailable() : [];
        for (let index = 0; index < templatesAvailable.length; index++) {
            if (templatesAvailable[index] === 'NON_MEDIA') {
                templatesAvailable[index] = 'NON-MEDIA';
                break;
            }
        }

        // copy all available display capabilities
        defaultWindowCapability.setTemplatesAvailable(displayCapabilities.getTemplatesAvailable())
            .setNumCustomPresetsAvailable(displayCapabilities.getNumCustomPresetsAvailable())
            .setTextFields(displayCapabilities.getTextFields())
            .setImageFields(displayCapabilities.getImageFields());

        const imageTypeSupported = [ImageType.STATIC]; // static images expected to always work on any head unit
        if (displayCapabilities.getGraphicSupported()) {
            imageTypeSupported.push(ImageType.DYNAMIC);
        }
        defaultWindowCapability.setImageTypeSupported(imageTypeSupported);

        displayCapability.setWindowCapabilities([defaultWindowCapability]);
        return [displayCapability];
    }

    /**
     * Takes in an RAIR and stores its information.
     * @protected
     * @param {RegisterAppInterfaceResponse} response - A RegisterAppInterfaceResponse.
     */
    _parseRaiResponse (response) {
        if (response !== null && response !== undefined && response.getSuccess()) {
            this._shouldConvertDeprecatedDisplayCapabilities = true; // reset the flag
            this._setCapability(SystemCapabilityType.DISPLAYS, this._createDisplayCapabilityList(response)); // the only SCT that's public
            this._hmiCapabilities = response.getHmiCapabilities();
            this._displayCapabilities = response.getDisplayCapabilities();
            this._audioPassThruCapabilities = response.getAudioPassThruCapabilities();
            this._pcmStreamCapability = response.getPcmStreamCapabilities();
            this._buttonCapabilities = response.getButtonCapabilities();
            this._hmiZoneCapabilities = response.getHmiZoneCapabilities();
            this._presetBankCapabilities = response.getPresetBankCapabilities();
            this._softButtonCapabilities = response.getSoftButtonCapabilities();
            this._speechCapabilities = response.getSpeechCapabilities();
            this._vrCapability = response.getVrCapabilities();
            this._prerecordedSpeechCapabilities = response.getPrerecordedSpeech();
        }
    }

    /**
     * Set a capability.
     * @private
     * @param {SystemCapabilityType} systemCapabilityType - A SystemCapabilityType enum value.
     * @param {*} capability - A capability struct. e.g. an instance of AppServicesCapabilities
     */
    _setCapability (systemCapabilityType, capability) {
        if (systemCapabilityType === null || systemCapabilityType === undefined
            || capability === null || capability === undefined) {
            return;
        }
        if (systemCapabilityType === SystemCapabilityType.NAVIGATION) {
            this._navigationCapability = capability;
        } else if (systemCapabilityType === SystemCapabilityType.PHONE_CALL) {
            this._phoneCapability = capability;
        } else if (systemCapabilityType === SystemCapabilityType.VIDEO_STREAMING) {
            this._videoStreamingCapability = capability;
        } else if (systemCapabilityType === SystemCapabilityType.REMOTE_CONTROL) {
            this._remoteControlCapability = capability;
        } else if (systemCapabilityType === SystemCapabilityType.APP_SERVICES) {
            // see iOS implementation (sdl_saveAppServicesCapabilitiesUpdate)
            for (let index = 0; index < capability.getAppServices().length; index++) {
                const appServiceCapability = capability.getAppServices()[index];
                const serviceRecord = appServiceCapability.getUpdatedAppServiceRecord();
                if (serviceRecord === null || serviceRecord === undefined) {
                    continue;
                }
                const serviceId = serviceRecord.getServiceID();
                if (serviceId === null || serviceId === undefined) {
                    continue;
                }

                if (appServiceCapability.getUpdateReason() === null || appServiceCapability.getUpdateReason() === undefined) {
                    this._appServicesCapabilities.set(serviceId, appServiceCapability); // update
                } else if (appServiceCapability.getUpdateReason() === ServiceUpdateReason.REMOVED) {
                    this._appServicesCapabilities.delete(serviceId); // remove
                } else {
                    this._appServicesCapabilities.set(serviceId, appServiceCapability); // update
                }
            }
        } else if (systemCapabilityType === SystemCapabilityType.SEAT_LOCATION) {
            this._seatLocationCapability = capability;
        } else if (systemCapabilityType === SystemCapabilityType.DISPLAYS) {
            this._displays = capability;
        } else if (systemCapabilityType === SystemCapabilityType.DRIVER_DISTRACTION) {
            this._driverDistractionCapability = capability;
        } else {
            console.warn(`Received response for unknown System Capability Type: ${systemCapabilityType}`);
            return; // the systemCapabilityType passed in is invalid
        }

        // by this point the capability has been set correctly and listeners can be notified
        this._notifyListeners(systemCapabilityType, capability);
    }

    /**
     * Notify listeners in the list about the new retrieved capability
     * @private
     * @param {SystemCapabilityType} systemCapabilityType - the system capability type that was retrieved
     * @param {Object} capability - the system capability value that was retrieved
     */
    _notifyListeners (systemCapabilityType, capability) {
        const listenerArray = this._onSystemCapabilityListeners[systemCapabilityType];
        if (!Array.isArray(listenerArray)) {
            return;
        }
        listenerArray.forEach(listener => {
            listener(capability);
        });
    }

    /**
     * Finds the right method name in the system capability given a type
     * @private
     * @param {SystemCapabilityType} type - A SystemCapabilityType enum value.
     * @returns {String|null} - The method to invoke for a SystemCapability instance to get the correct capability
     */
    _getCapabilityMethodForType (type) {
        // this method can be used to determine whether a capability is queryable. It is not if null is returned.
        if (type === SystemCapabilityType.NAVIGATION) {
            return 'getNavigationCapability';
        } else if (type === SystemCapabilityType.PHONE_CALL) {
            return 'getPhoneCapability';
        } else if (type === SystemCapabilityType.VIDEO_STREAMING) {
            return 'getVideoStreamingCapability';
        } else if (type === SystemCapabilityType.REMOTE_CONTROL) {
            return 'getRemoteControlCapability';
        } else if (type === SystemCapabilityType.APP_SERVICES) {
            return 'getAppServicesCapabilities';
        } else if (type === SystemCapabilityType.SEAT_LOCATION) {
            return 'getSeatLocationCapability';
        } else if (type === SystemCapabilityType.DISPLAYS) {
            return 'getDisplayCapabilities';
        } else if (type === SystemCapabilityType.DRIVER_DISTRACTION) {
            return 'getDriverDistractionCapability';
        } else {
            return null;
        }
    }

    /**
     * Ability to see if the connected module supports the given capability. Useful to check before
     * attempting to query for capabilities that require asynchronous calls to initialize.
     * @param {SystemCapabilityType} type - the SystemCapabilityType that is to be checked
     * @returns {Boolean} - if that capability is supported with the current, connected module
     */
    isCapabilitySupported (type) {
        const typeCapability = this.getCapability(type);
        if (typeCapability !== null && typeCapability !== undefined) {
            // The capability exists in the map and is not null
            return true;
        } else if (this._hmiCapabilities !== null) {
            const hmiCapabilities = this._hmiCapabilities;
            let rpcVersion = null;
            if (this._lifecycleManager !== null) {
                const version = this._lifecycleManager.getSdlMsgVersion();
                if (version !== null) {
                    rpcVersion = new Version(version.getMajorVersion(), version.getMinorVersion(), version.getPatchVersion());
                }
            }
            if (hmiCapabilities !== null && hmiCapabilities !== undefined) {
                switch (type) {
                    case SystemCapabilityType.NAVIGATION:
                        return hmiCapabilities.getNavigation();
                    case SystemCapabilityType.PHONE_CALL:
                        return hmiCapabilities.getPhoneCall();
                    case SystemCapabilityType.VIDEO_STREAMING:
                        if (rpcVersion !== null) {
                            if (rpcVersion.isBetween(new Version(3, 0, 0), new Version(4, 4, 0)) >= 0) {
                                // This was before the system capability feature was added so check if
                                // graphics are supported instead
                                const displayCapabilities = this._displayCapabilities;
                                if (displayCapabilities !== null) {
                                    return displayCapabilities.getGraphicSupported() === true;
                                }
                            }
                        }
                        return hmiCapabilities.getVideoStreaming();
                    case SystemCapabilityType.REMOTE_CONTROL:
                        return hmiCapabilities.getRemoteControl();
                    case SystemCapabilityType.APP_SERVICES:
                        if (rpcVersion !== null) {
                            if (rpcVersion.getMajor() === 5 && rpcVersion.getMinor() === 1) {
                                // This is a corner case that the param was not available in 5.1.0, but
                                // the app services feature was available.
                                return true;
                            }
                        }
                        return hmiCapabilities.getAppServices();
                    case SystemCapabilityType.DISPLAYS:
                        return hmiCapabilities.getDisplays();
                    case SystemCapabilityType.SEAT_LOCATION:
                        return hmiCapabilities.getSeatLocation();
                    case SystemCapabilityType.DRIVER_DISTRACTION:
                        return hmiCapabilities.getDriverDistraction();
                    default:
                        return false;
                }
            }
        }

        return false;
    }

    /**
     * Tries to find a capability in the cache
     * @param {SystemCapabilityType} systemCapabilityType - A SystemCapabilityType enum value.
     * @returns {Object|null} - returns null if a capability can't be returned
     */
    getCapability (systemCapabilityType) {
        let result = null;

        if (systemCapabilityType === SystemCapabilityType.NAVIGATION) {
            result = this._navigationCapability;
        } else if (systemCapabilityType === SystemCapabilityType.PHONE_CALL) {
            result = this._phoneCapability;
        } else if (systemCapabilityType === SystemCapabilityType.VIDEO_STREAMING) {
            result = this._videoStreamingCapability;
        } else if (systemCapabilityType === SystemCapabilityType.REMOTE_CONTROL) {
            result = this._remoteControlCapability;
        } else if (systemCapabilityType === SystemCapabilityType.APP_SERVICES) {
            if (this._appServicesCapabilities) {
                result = Array.from(this._appServicesCapabilities.values()); // return an array of elements that are AppServiceCapability
            }
        } else if (systemCapabilityType === SystemCapabilityType.SEAT_LOCATION) {
            result = this._seatLocationCapability;
        } else if (systemCapabilityType === SystemCapabilityType.DISPLAYS) {
            result = this._displays;
        } else if (systemCapabilityType === SystemCapabilityType.DRIVER_DISTRACTION) {
            result = this._driverDistractionCapability;
        }

        return result;
    }

    /**
     * Sends a request to core for the capability, instead of checking cached capabilities
     * @param {SystemCapabilityType} systemCapabilityType - A SystemCapabilityType enum value.
     * @returns {Promise} - Promise returning either the capability Object or null if not found
     */
    async updateCapability (systemCapabilityType) {
        return await this._updateCapabilityPrivate(systemCapabilityType, null, true);
    }

    /**
     * Checks if the supplied capability type is currently subscribed for or not
     * @param {SystemCapabilityType} systemCapabilityType - type of capability desired
     * @returns {Boolean} - true if subscribed and false if not
     */
    _isSubscribedToSystemCapability(systemCapabilityType) {
        return this._systemCapabilitiesSubscriptionStatus.has(systemCapabilityType);
    }

    /**
     * Sends a request to core for the capability, instead of checking cached capabilities
     * @param {SystemCapabilityType} systemCapabilityType - A SystemCapabilityType enum value.
     * @param {Boolean} subscribe - Whether to attempt to subscribe to a capability. Null means no change to the subscription status. Defaults to null
     * @param {Boolean} forceUpdate - Whether to force a query to the head unit to retrieve a capability anyway
     * @param {Function} listener - A newly subscribed listener that may want to receive the updated capability object. Defaults to null
     * @returns {Promise} - Promise returning either the capability Object or null if not found
     */
    async _updateCapabilityPrivate (systemCapabilityType, subscribe = null, forceUpdate, listener = null) {
        const cachedCapability = this.getCapability(systemCapabilityType);

        // NOTE: subscription has always been supported within the lifespan of this library (5.2.0+)
        const shouldForceUpdate = forceUpdate && !this._isSubscribedToSystemCapability(systemCapabilityType);
        const shouldUpdateSystemCapabilitySubscription = (subscribe !== null) && (subscribe !== this._isSubscribedToSystemCapability(systemCapabilityType));
        const shouldSendGetCapabilityRequest = shouldForceUpdate || (cachedCapability === null) || shouldUpdateSystemCapabilitySubscription;
        const shouldCallListenerWithCachedValue = (cachedCapability !== null) && (listener !== null) && !shouldSendGetCapabilityRequest;

        if (shouldCallListenerWithCachedValue) {
            listener(cachedCapability);
        }

        if (!shouldSendGetCapabilityRequest) {
            return cachedCapability;
        }

        // non-cached capability get

        // don't bother getting a capability if it isn't queryable
        const getCapabilityMethodName = this._getCapabilityMethodForType(systemCapabilityType);
        if (getCapabilityMethodName === null) {
            console.error(`The systemCapabilityType ${systemCapabilityType} cannot be queried for`);
            return null;
        }

        /*
            The subscription flag in the request should be set based on multiple variables:
            - if subscribe is null (no change), willSubscribe = current subscription status, or false if the HU does not support subscriptions
            - if subscribe is false, then willSubscribe = false
            - if subscribe is true and the HU supports subscriptions, then willSubscribe = true
            NOTE: subscription has always been supported within the lifespan of this library (5.2.0+)
        */
        const shouldSubscribe = (subscribe !== null) ? subscribe : this._isSubscribedToSystemCapability(systemCapabilityType);

        const request = new GetSystemCapability()
            .setSystemCapabilityType(systemCapabilityType);
        if (subscribe !== null) {
            request.setSubscribe(shouldSubscribe);
        }

        if (this._lifecycleManager === null) {
            return null;
        }

        const response = await this._lifecycleManager.sendRpcMessage(request)
            .catch(err => {
                if (err instanceof RpcResponse) {
                    console.error(`GetSystemCapability for type ${systemCapabilityType} returned with response code ${err.getResultCode()}`);
                } else {
                    console.error(new Error(err));
                }
                return null;
            });

        if (response === null) {
            return null;
        }

        // RPC get succeeded
        if (shouldSubscribe) {
            this._systemCapabilitiesSubscriptionStatus.add(systemCapabilityType);
        } else {
            this._systemCapabilitiesSubscriptionStatus.delete(systemCapabilityType);
        }

        // invoke the correct get capability method
        const retrievedCapability = response.getSystemCapability()[getCapabilityMethodName]();
        this._setCapability(systemCapabilityType, retrievedCapability);
        // get the capability back through this method, because it may have changed the output
        return this.getCapability(systemCapabilityType);
    }

    /**
     * Add an OnSystemCapabilityListener function.
     * @param {SystemCapabilityType} systemCapabilityType - A SystemCapabilityType enum value.
     * @param {function} listener - The function to invoke when the event is triggered.
     */
    addOnSystemCapabilityListener (systemCapabilityType, listener) {
        if (systemCapabilityType === null || systemCapabilityType === undefined
            || typeof listener !== 'function') {
            return;
        }
        if (!Array.isArray(this._onSystemCapabilityListeners[systemCapabilityType])) {
            this._onSystemCapabilityListeners[systemCapabilityType] = [];
        }
        this._onSystemCapabilityListeners[systemCapabilityType].push(listener);
        this._updateCapabilityPrivate(systemCapabilityType, true, false, listener); // send out a query, since the caller wants an update for this capability
    }

    /**
     * Remove an OnSystemCapabilityListener function.
     * @param {SystemCapabilityType} systemCapabilityType - A SystemCapabilityType enum value.
     * @param {function} listener - The function to invoke when the event is triggered.
     * @returns {Boolean} - Whether or not the listener was removed.
     */
    removeOnSystemCapabilityListener (systemCapabilityType, listener) {
        if (systemCapabilityType === null || systemCapabilityType === undefined
            || typeof listener !== 'function') {
            return false;
        }
        const listenerArray = this._onSystemCapabilityListeners[systemCapabilityType];
        if (!Array.isArray(listenerArray)) {
            return false;
        }
        let removed = false;
        // remove matching references to the passed in service listener
        this._onSystemCapabilityListeners[systemCapabilityType] = listenerArray.filter(listenerCheck => {
            if (listener === listenerCheck) {
                removed = true;
            }
            return listener !== listenerCheck;
        });
        // If the last listener for the supplied capability type is removed, unsubscribe from the capability type
        // always stay subscribied to DISPLAYS
        if (removed && this._onSystemCapabilityListeners[systemCapabilityType].length === 0 && this._isSubscribedToSystemCapability(systemCapabilityType) && systemCapabilityType !== SystemCapabilityType.DISPLAYS) {
            this._updateCapabilityPrivate(systemCapabilityType, false, false);
        }
        return removed;
    }

    /**
     * Sets up listeners to pass events to the _LifecycleManager.
     * @private
     */
    _setupRpcListeners () {
        const listener = (message) => {
            if (message !== null) {
                if (message.getMessageType() === MessageType.response) {
                    switch (FunctionID.valueForKey(message.getFunctionId())) {
                        case FunctionID.SetDisplayLayout:
                            // If a setDisplayLayout fails, Capabilities did not change
                            if (!message.getSuccess()) {
                                return;
                            }
                            this._displayCapabilities = message.getDisplayCapabilities();
                            this._buttonCapabilities = message.getButtonCapabilities();
                            this._presetBankCapabilities = message.getPresetBankCapabilities();
                            this._softButtonCapabilities = message.getSoftButtonCapabilities();
                            if (this._shouldConvertDeprecatedDisplayCapabilities) {
                                this._setCapability(SystemCapabilityType.DISPLAYS, this._createDisplayCapabilityList(message));
                            }
                            break;
                        case FunctionID.GetSystemCapability:
                            if (message.getSuccess() && message.getSystemCapability().getSystemCapabilityType() === SystemCapabilityType.DISPLAYS) {
                                this._shouldConvertDeprecatedDisplayCapabilities = false; // Successfully got DISPLAYS data. No conversion needed anymore
                                const getCapabilityMethodName = this._getCapabilityMethodForType(SystemCapabilityType.DISPLAYS);
                                const newCapabilities = message.getSystemCapability()[getCapabilityMethodName]();
                                this._updateCachedDisplayCapabilityList(newCapabilities);
                            }
                    }
                } else if (message.getMessageType() === MessageType.notification) {
                    switch (FunctionID.valueForKey(message.getFunctionId())) {
                        case FunctionID.OnSystemCapabilityUpdated:
                            if (message.getSystemCapability() !== null) {
                                const systemCapability = message.getSystemCapability();
                                const systemCapabilityType = systemCapability.getSystemCapabilityType();
                                const getCapabilityMethodName = this._getCapabilityMethodForType(systemCapabilityType);
                                const capability = systemCapability[getCapabilityMethodName]();

                                if (this.getCapability(systemCapabilityType) !== null) { // The capability already exists
                                    switch (systemCapabilityType) {
                                        case SystemCapabilityType.APP_SERVICES: {
                                            // setCapability handles updating the local app service state
                                            break;
                                        }
                                        case SystemCapabilityType.DISPLAYS: {
                                            this._shouldConvertDeprecatedDisplayCapabilities = false; // Successfully got DISPLAYS data. No conversion needed anymore
                                            // this notification can return only affected windows (hence not all windows)
                                            this._updateCachedDisplayCapabilityList(capability);
                                        }
                                    }
                                }
                                if (capability !== null && capability !== undefined) {
                                    this._setCapability(systemCapabilityType, capability);
                                }
                            }
                    }
                }
            }
        };

        if (this._lifecycleManager !== null) {
            this._lifecycleManager.addRpcListener(FunctionID.GetSystemCapability, listener);
            this._lifecycleManager.addRpcListener(FunctionID.SetDisplayLayout, listener);
            this._lifecycleManager.addRpcListener(FunctionID.OnSystemCapabilityUpdated, listener);
        }
    }

    /**
     * Update the cached DisplayCapability list.
     * @private
     * @param {DisplayCapability[]} newCapabilities - An array of DisplayCapability structs.
     */
    _updateCachedDisplayCapabilityList (newCapabilities = null) {
        if (!Array.isArray(newCapabilities) || newCapabilities.length === 0) {
            console.warn('Received invalid display capability list');
            return;
        }

        const oldCapabilities = this.getCapability(SystemCapabilityType.DISPLAYS);

        if (!Array.isArray(oldCapabilities) || oldCapabilities.length === 0) {
            this._setCapability(SystemCapabilityType.DISPLAYS, newCapabilities);
            this._updateDeprecatedDisplayCapabilities();
            return;
        }

        const oldDefaultDisplayCapabilities = oldCapabilities[0];
        const copyWindowCapabilities = oldDefaultDisplayCapabilities.getWindowCapabilities();

        const newDefaultDisplayCapabilities = newCapabilities[0];
        const newWindowCapabilities = newDefaultDisplayCapabilities.getWindowCapabilities();

        if (newWindowCapabilities !== null && newWindowCapabilities !== undefined) {
            for (let index = 0; index < newWindowCapabilities.length; index++) {
                let oldFound = false;
                const newWindow = newWindowCapabilities[index];

                for (let subIndex = 0; subIndex < copyWindowCapabilities.length; subIndex++) {
                    const oldWindow = copyWindowCapabilities[subIndex];

                    const newWindowId = (newWindow.getWindowID() !== null && newWindow.getWindowID() !== undefined)
                        ? newWindow.getWindowID() : PredefinedWindows.DEFAULT_WINDOW;
                    const oldWindowId = (oldWindow.getWindowID() !== null && oldWindow.getWindowID() !== undefined)
                        ? oldWindow.getWindowID() : PredefinedWindows.DEFAULT_WINDOW;

                    if (newWindowId === oldWindowId) {
                        copyWindowCapabilities[subIndex] = newWindow; // replace the old window caps with new ones
                        oldFound = true;
                        break;
                    }
                }

                if (!oldFound) {
                    copyWindowCapabilities.push(newWindow); // this is a new unknown window
                }
            }
        }

        // replace the window capabilities array with the merged one.
        newDefaultDisplayCapabilities.setWindowCapabilities(copyWindowCapabilities);
        this._setCapability(SystemCapabilityType.DISPLAYS, [newDefaultDisplayCapabilities]);
        this._updateDeprecatedDisplayCapabilities();
    }

    /**
     * Update the deprecated DisplayCapabilities.
     * @private
     */
    _updateDeprecatedDisplayCapabilities () {
        const defaultMainWindowCapabilities = this.getDefaultMainWindowCapability();
        const displayCapabilityList = this.getCapability(SystemCapabilityType.DISPLAYS);

        if (defaultMainWindowCapabilities === null || displayCapabilityList === null || displayCapabilityList.length === 0) {
            return;
        }

        // cover the deprecated capabilities for backward compatibility

        this._displayCapabilities = this._createDeprecatedDisplayCapabilities(displayCapabilityList[0].getDisplayName(), defaultMainWindowCapabilities);
        this._buttonCapabilities = defaultMainWindowCapabilities.getButtonCapabilities();
        this._softButtonCapabilities = defaultMainWindowCapabilities.getSoftButtonCapabilities();
    }


    /**
     * Create the deprecated DisplayCapabilities
     * @private
     * @param {String} displayName - The display name.
     * @param {WindowCapability} defaultMainWindow - A WindowCapability struct.
     * @returns {DisplayCapabilities} - An instance of DisplayCapabilities.
     */
    _createDeprecatedDisplayCapabilities (displayName, defaultMainWindow) {
        const convertedCapabilities = new DisplayCapabilities();
        convertedCapabilities.setDisplayType(DisplayType.SDL_GENERIC); // deprecated but it is mandatory...
        convertedCapabilities.setDisplayName(displayName);
        if (defaultMainWindow.getTextFields() !== null && defaultMainWindow.getTextFields() !== undefined) {
            convertedCapabilities.setTextFields(defaultMainWindow.getTextFields());
        }
        if (defaultMainWindow.getImageFields() !== null && defaultMainWindow.getImageFields() !== undefined) {
            convertedCapabilities.setImageFields(defaultMainWindow.getImageFields());
        }

        convertedCapabilities.setTemplatesAvailable(defaultMainWindow.getTemplatesAvailable());
        convertedCapabilities.setNumCustomPresetsAvailable(defaultMainWindow.getNumCustomPresetsAvailable());
        convertedCapabilities.setMediaClockFormats([]); // mandatory field but allows empty array
        // if there are imageTypes in the response, we must assume graphics are supported
        convertedCapabilities.setGraphicSupported(defaultMainWindow.getImageTypeSupported() !== null
            && defaultMainWindow.getImageTypeSupported() !== undefined
            && defaultMainWindow.getImageTypeSupported().length > 0);

        const displayCapabilitiesOld = this.getDisplayCapabilities();

        if (displayCapabilitiesOld !== null && displayCapabilitiesOld !== undefined) { // The capability exists
            // Copied from the RAI response, since this parameter is not present in WindowCapability
            convertedCapabilities.setScreenParams(displayCapabilitiesOld.getScreenParams());
            if (displayCapabilitiesOld.getMediaClockFormats() !== null) {
                convertedCapabilities.setMediaClockFormats(displayCapabilitiesOld.getMediaClockFormats());
            }
        }

        return convertedCapabilities;
    }
}

export { SystemCapabilityManager };
