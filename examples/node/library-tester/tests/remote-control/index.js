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

const SDL = require('../../SDL.min.js');
const AppHelper = require('../../AppHelper.js');

module.exports = async function (catalogRpc) {
    const appId = 'remote-control';

    const lifecycleConfig = new SDL.manager.LifecycleConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT));

    const app = new AppHelper(catalogRpc)
        .setLifecycleConfig(lifecycleConfig);

    await app.start(); // after this point, we are in HMI FULL and managers are ready
    const sdlManager = app.getManager();

    // get capabilities to see what can be done
    const remoteControlCapabilities = await capabilityListenPromise(sdlManager, SDL.rpc.enums.SystemCapabilityType.REMOTE_CONTROL);
    // use the button capabilities to create a bunch of button presses to test and send

    // BUTTON TESTS

    // there's no way to programmatically figure out which button belongs to which remote module....
    const buttonsToModules = {
        AC_MAX: SDL.rpc.enums.ModuleType.CLIMATE,
        AC: SDL.rpc.enums.ModuleType.CLIMATE,
        RECIRCULATE: SDL.rpc.enums.ModuleType.CLIMATE,
        FAN_UP: SDL.rpc.enums.ModuleType.CLIMATE,
        FAN_DOWN: SDL.rpc.enums.ModuleType.CLIMATE,
        TEMP_UP: SDL.rpc.enums.ModuleType.CLIMATE,
        TEMP_DOWN: SDL.rpc.enums.ModuleType.CLIMATE,
        DEFROST_MAX: SDL.rpc.enums.ModuleType.CLIMATE,
        DEFROST: SDL.rpc.enums.ModuleType.CLIMATE,
        DEFROST_REAR: SDL.rpc.enums.ModuleType.CLIMATE,
        UPPER_VENT: SDL.rpc.enums.ModuleType.CLIMATE,
        LOWER_VENT: SDL.rpc.enums.ModuleType.CLIMATE,
        VOLUME_UP: SDL.rpc.enums.ModuleType.RADIO,
        VOLUME_DOWN: SDL.rpc.enums.ModuleType.RADIO,
        EJECT: SDL.rpc.enums.ModuleType.RADIO,
        SOURCE: SDL.rpc.enums.ModuleType.RADIO,
        SHUFFLE: SDL.rpc.enums.ModuleType.RADIO,
        REPEAT: SDL.rpc.enums.ModuleType.RADIO,
    };

    // assume the HMI's default module id supports all the button capabilities
    for (const index in remoteControlCapabilities.getButtonCapabilities()) {
        const buttonCapability = remoteControlCapabilities.getButtonCapabilities()[index];
        let pressMode;
        if (buttonCapability.getShortPressAvailable()) {
            pressMode = SDL.rpc.enums.ButtonPressMode.SHORT;
        } else if (buttonCapability.getLongPressAvailable()) {
            pressMode = SDL.rpc.enums.ButtonPressMode.LONG;
        } else {
            console.error(`Button ${buttonCapability.getModuleInfo().getModuleId()} has no SHORT or LONG press mode!`);
            continue;
        }

        const bpr = new SDL.rpc.messages.ButtonPress()
            .setButtonName(buttonCapability.getNameParam())
            .setButtonPressMode(pressMode)
            .setModuleType(buttonsToModules[buttonCapability.getNameParam()]);

        await sdlManager.sendRpcResolve(bpr);
    }

    // RC DATA TESTS
    // set audio
    const audioData = new SDL.rpc.messages.SetInteriorVehicleData()
        .setModuleData(new SDL.rpc.structs.ModuleData({
            moduleType: SDL.rpc.enums.ModuleType.AUDIO,
            audioControlData: {
                keepContext: true,
                volume: 50,
                equalizerSettings: [{
                    channelId: 5,
                    channelSetting: 40,
                }],
            },
        }));
    await sdlManager.sendRpcResolve(audioData);

    // set climate
    const climateData = new SDL.rpc.messages.SetInteriorVehicleData()
        .setModuleData(new SDL.rpc.structs.ModuleData({
            moduleType: SDL.rpc.enums.ModuleType.CLIMATE,
            climateControlData: {
                fanSpeed: 7,
                desiredTemperature: {
                    unit: SDL.rpc.enums.TemperatureUnit.CELSIUS,
                    value: 20,
                },
                acEnable: true,
                circulateAirEnable: true,
                autoModeEnable: true,
                defrostZone: SDL.rpc.enums.DefrostZone.REAR,
                dualModeEnable: true,
                acMaxEnable: true,
                ventilationMode: SDL.rpc.enums.VentilationMode.LOWER,
                heatedSteeringWheelEnable: true,
                heatedWindshieldEnable: true,
                heatedRearWindowEnable: true,
                heatedMirrorsEnable: true,
                climateEnable: true,
            },
        }));
    await sdlManager.sendRpcResolve(climateData);

    // set hmi settings
    const hmiSettingsData = new SDL.rpc.messages.SetInteriorVehicleData()
        .setModuleData(new SDL.rpc.structs.ModuleData({
            moduleType: SDL.rpc.enums.ModuleType.HMI_SETTINGS,
            hmiSettingsControlData: {
                displayMode: SDL.rpc.enums.DisplayMode.AUTO,
                temperatureUnit: SDL.rpc.enums.TemperatureUnit.FAHRENHEIT,
                distanceUnit: SDL.rpc.enums.DistanceUnit.MILES,
            },
        }));
    await sdlManager.sendRpcResolve(hmiSettingsData);

    // set light
    const lightData = new SDL.rpc.messages.SetInteriorVehicleData()
        .setModuleData(new SDL.rpc.structs.ModuleData({
            moduleType: SDL.rpc.enums.ModuleType.LIGHT,
            lightControlData: {
                lightState: [{
                    id: SDL.rpc.enums.LightName.FRONT_RIGHT_TURN_LIGHT,
                    status: SDL.rpc.enums.LightStatus.ON,
                    density: .12,
                    color: {
                        red: 50,
                        green: 50,
                        blue: 50,
                    },
                }],
            },
        }));
    await sdlManager.sendRpcResolve(lightData);

    // set radio
    const radioData = new SDL.rpc.messages.SetInteriorVehicleData()
        .setModuleData(new SDL.rpc.structs.ModuleData({
            moduleType: SDL.rpc.enums.ModuleType.RADIO,
            radioControlData: {
                frequencyInteger: 75,
                frequencyFraction: 3,
                band: SDL.rpc.enums.RadioBand.FM,
                hdRadioEnable: true,
                radioEnable: true,
            },
        }));
    await sdlManager.sendRpcResolve(radioData);

    // set seat
    const seatData = new SDL.rpc.messages.SetInteriorVehicleData()
        .setModuleData(new SDL.rpc.structs.ModuleData({
            moduleType: SDL.rpc.enums.ModuleType.SEAT,
            seatControlData: {
                id: SDL.rpc.enums.SupportedSeat.DRIVER,
                heatingEnabled: true,
                coolingEnabled: true,
                heatingLevel: 20,
                coolingLevel: 20,
                horizontalPosition: 40,
                verticalPosition: 40,
                frontVerticalPosition: 40,
                backVerticalPosition: 40,
                backTiltAngle: 35,
                headSupportHorizontalPosition: 40,
                headSupportVerticalPosition: 40,
                massageEnabled: true,
                massageMode: [{
                    massageZone: SDL.rpc.enums.MassageZone.LUMBAR,
                    massageMode: SDL.rpc.enums.MassageMode.HIGH,
                }],
                massageCushionFirmness: [{
                    cushion: SDL.rpc.enums.MassageCushion.BACK_BOLSTERS,
                    firmness: 10,
                }],
                memory: {
                    id: 7,
                    label: 'Hi',
                    action: SDL.rpc.enums.SeatMemoryActionType.NONE,
                },
            },
        }));
    await sdlManager.sendRpcResolve(seatData);

    // get tests. check for property coverage at the top level at the least
    let getDataResponse = await sdlManager.sendRpcResolve(new SDL.rpc.messages.GetInteriorVehicleData()
        .setModuleType(SDL.rpc.enums.ModuleType.RADIO));
    let responseParams = getDataResponse.getModuleData().getRadioControlData().getParameters();
    rcPropCoverageTest(responseParams, 'RadioControlData');

    getDataResponse = await sdlManager.sendRpcResolve(new SDL.rpc.messages.GetInteriorVehicleData()
        .setModuleType(SDL.rpc.enums.ModuleType.CLIMATE));
    responseParams = getDataResponse.getModuleData().getClimateControlData().getParameters();
    rcPropCoverageTest(responseParams, 'ClimateControlData');

    getDataResponse = await sdlManager.sendRpcResolve(new SDL.rpc.messages.GetInteriorVehicleData()
        .setModuleType(SDL.rpc.enums.ModuleType.SEAT));
    responseParams = getDataResponse.getModuleData().getSeatControlData().getParameters();
    rcPropCoverageTest(responseParams, 'SeatControlData');

    getDataResponse = await sdlManager.sendRpcResolve(new SDL.rpc.messages.GetInteriorVehicleData()
        .setModuleType(SDL.rpc.enums.ModuleType.AUDIO));
    responseParams = getDataResponse.getModuleData().getAudioControlData().getParameters();
    rcPropCoverageTest(responseParams, 'AudioControlData');

    getDataResponse = await sdlManager.sendRpcResolve(new SDL.rpc.messages.GetInteriorVehicleData()
        .setModuleType(SDL.rpc.enums.ModuleType.LIGHT));
    responseParams = getDataResponse.getModuleData().getLightControlData().getParameters();
    rcPropCoverageTest(responseParams, 'LightControlData');

    getDataResponse = await sdlManager.sendRpcResolve(new SDL.rpc.messages.GetInteriorVehicleData()
        .setModuleType(SDL.rpc.enums.ModuleType.HMI_SETTINGS));
    responseParams = getDataResponse.getModuleData().getHmiSettingsControlData().getParameters();
    rcPropCoverageTest(responseParams, 'HmiSettingsControlData');

    // multiple modules test. find RCs with multiple modules and test them

    // climate
    if (remoteControlCapabilities.getClimateControlCapabilities().length > 1) {
        for (const capability of remoteControlCapabilities.getClimateControlCapabilities()) {
            if (!capability.getAcEnableAvailable()) { // not available, so skip this module
                console.warn(`AC Enable not available in the ${capability.getModuleInfo().getModuleId()} module. Skipping test`);
            }
            const moduleData = new SDL.rpc.structs.ModuleData({
                moduleType: SDL.rpc.enums.ModuleType.CLIMATE,
                climateControlData: {
                    acEnable: false
                },
                moduleId: capability.getModuleInfo().getModuleId(),
            });

            const climateData = new SDL.rpc.messages.SetInteriorVehicleData()
                .setModuleData(moduleData);
            await sdlManager.sendRpcResolve(climateData);
            await sleep(500); // show a brief moment of the HMI's changing module statuses
            // now release the module from this app's control
            await sdlManager.sendRpcResolve(new SDL.rpc.messages.ReleaseInteriorVehicleDataModule()
                .setModuleType(SDL.rpc.enums.ModuleType.CLIMATE)
                .setModuleId(capability.getModuleInfo().getModuleId()));
        }
    } else {
        console.warn('No multiple climate modules found');
    }

    // radio
    if (remoteControlCapabilities.getRadioControlCapabilities().length > 1) {
        for (const capability of remoteControlCapabilities.getRadioControlCapabilities()) {
            if (!capability.getRadioBandAvailable()) { // not available, so skip this module
                console.warn(`Band not available in the ${capability.getModuleInfo().getModuleId()} module. Skipping test`);
            }
            const moduleData = new SDL.rpc.structs.ModuleData({
                moduleType: SDL.rpc.enums.ModuleType.RADIO,
                radioControlData: {
                    band: SDL.rpc.enums.RadioBand.AM
                },
                moduleId: capability.getModuleInfo().getModuleId(),
            });

            const radioData = new SDL.rpc.messages.SetInteriorVehicleData()
                .setModuleData(moduleData);
            await sdlManager.sendRpcResolve(radioData);
            await sleep(500); // show a brief moment of the HMI's changing module statuses
            // now release the module from this app's control
            await sdlManager.sendRpcResolve(new SDL.rpc.messages.ReleaseInteriorVehicleDataModule()
                .setModuleType(SDL.rpc.enums.ModuleType.RADIO)
                .setModuleId(capability.getModuleInfo().getModuleId()));
        }
    } else {
        console.warn('No multiple radio modules found');
    }

    // audio
    if (remoteControlCapabilities.getAudioControlCapabilities().length > 1) {
        for (const capability of remoteControlCapabilities.getAudioControlCapabilities()) {
            if (!capability.getVolumeAvailable()) { // not available, so skip this module
                console.warn(`Volume not available in the ${capability.getModuleInfo().getModuleId()} module. Skipping test`);
            }
            const moduleData = new SDL.rpc.structs.ModuleData({
                moduleType: SDL.rpc.enums.ModuleType.AUDIO,
                audioControlData: {
                    volume: 98,
                },
                moduleId: capability.getModuleInfo().getModuleId(),
            });

            const audioData = new SDL.rpc.messages.SetInteriorVehicleData()
                .setModuleData(moduleData);
            await sdlManager.sendRpcResolve(audioData);
            await sleep(500); // show a brief moment of the HMI's changing module statuses
            // now release the module from this app's control
            await sdlManager.sendRpcResolve(new SDL.rpc.messages.ReleaseInteriorVehicleDataModule()
                .setModuleType(SDL.rpc.enums.ModuleType.AUDIO)
                .setModuleId(capability.getModuleInfo().getModuleId()));
        }
    } else {
        console.warn('No multiple audio modules found');
    }

    // seat
    if (remoteControlCapabilities.getSeatControlCapabilities().length > 1) {
        for (const capability of remoteControlCapabilities.getSeatControlCapabilities()) {
            // set the user's location in the seat
            const globalProperties = new SDL.rpc.messages.SetGlobalProperties()
                .setUserLocation(new SDL.rpc.structs.SeatLocation({
                    grid: capability.getModuleInfo().getLocation()
                }));
            await sdlManager.sendRpcResolve(globalProperties);

            if (!capability.getCoolingEnabledAvailable()) { // not available, so skip this module
                console.warn(`Cooling not available in the ${capability.getModuleInfo().getModuleId()} module. Skipping test`);
            }
            const moduleData = new SDL.rpc.structs.ModuleData({
                moduleType: SDL.rpc.enums.ModuleType.SEAT,
                seatControlData: {
                    id: SDL.rpc.enums.SupportedSeat.DRIVER,
                    coolingEnabled: false,
                },
                moduleId: capability.getModuleInfo().getModuleId(),
            });

            const seatData = new SDL.rpc.messages.SetInteriorVehicleData()
                .setModuleData(moduleData);
            await sdlManager.sendRpcResolve(seatData);
            await sleep(500); // show a brief moment of the HMI's changing module statuses
            // now release the module from this app's control
            await sdlManager.sendRpcResolve(new SDL.rpc.messages.ReleaseInteriorVehicleDataModule()
                .setModuleType(SDL.rpc.enums.ModuleType.SEAT)
                .setModuleId(capability.getModuleInfo().getModuleId()));
        }
    } else {
        console.warn('No multiple seat modules found');
    }

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

// takes RC data from the HMI and checks if every top level property is at least defined
function rcPropCoverageTest (sourceData, targetClass) {
    const targetData = SDL.rpc.structs[targetClass];
    for (const propKey in targetData) {
        const property = targetData[propKey];
        if (sourceData[property] === undefined) {
            // ignore the very specific case of AudioControlData's keepContext property. it does not get returned by design
            if (targetClass === 'AudioControlData' && property === 'keepContext') {
                continue;
            }
            console.error(`HMI missing property '${property}' in RC data for class '${targetClass}'`);
        }
    }
}

function capabilityListenPromise (sdlManager, systemCapabilityType) {
    return new Promise((resolve, reject) => {
        const listener = (message) => {
            sdlManager.getSystemCapabilityManager().removeOnSystemCapabilityListener(systemCapabilityType, listener);
            resolve(message);
        };
        sdlManager.getSystemCapabilityManager().addOnSystemCapabilityListener(systemCapabilityType, listener);
    });
}

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}