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

// this acts as the producer app
module.exports = class Producer1 {
    constructor (catalogRpc) {
        this._catalogRpc = catalogRpc;
        this._app = null;
        this.sdlManager = null;
        this._serviceId = null;
    }

    async start () {
        const appId = 'node-testing';

        const fileName = 'test_icon_1';
        const file = new SDL.manager.file.filetypes.SdlFile()
            .setName(fileName)
            .setFilePath('./tests/app-services-weather/test_icon_1.png')
            .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setPersistent(true);

        const appConfig = new SDL.manager.AppConfig()
            .setAppId(appId)
            .setAppName(appId)
            .setIsMediaApp(false)
            .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
            .setHmiDisplayLanguageDesired(SDL.rpc.enums.Language.EN_US)
            .setAppTypes([
                SDL.rpc.enums.AppHMIType.MEDIA,
                SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
            ])
            .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT))
            .setAppIcon(file);

        this._app = new AppHelper(this._catalogRpc)
            .setAppConfig(appConfig);

        await this._app.start(); // after this point, we are in HMI FULL and managers are ready
        this.sdlManager = this._app.getManager();

        // inform the user that a new app should be activated now
        const show = new SDL.rpc.messages.Show()
            .setMainField1('An additional producer app has been started')
            .setMainField2('Check the app list and activate the producer app');

        await this.sdlManager.sendRpc(show);

        // upload a weather icon ahead of time for attaching to weather service data
        const fileManager = this.sdlManager.getFileManager();

        const weatherFile = new SDL.manager.file.filetypes.SdlFile()
            .setName('weather-icon')
            .setFilePath('./tests/app-services-weather/weather-icon.png')
            .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG);

        const putFile = await fileManager.createPutFile(weatherFile);
        await this.sdlManager.sendRpc(putFile);

        this.respondToAppServiceRequests();
        this.respondToPerformAppServiceInteractions();
    }

    async setupAppService (allowAppConsumers) {
        const pasr = new SDL.rpc.messages.PublishAppService()
            .setAppServiceManifest(new SDL.rpc.structs.AppServiceManifest({
                serviceName: 'weather-service-1',
                serviceType: SDL.rpc.enums.AppServiceType.WEATHER,
                serviceIcon: {
                    value: 'weather-icon',
                    imageType: SDL.rpc.enums.ImageType.DYNAMIC,
                    isTemplate: false,
                },
                allowAppConsumers,
                weatherServiceManifest: {
                    currentForecastSupported: true,
                    maxMultidayForecastAmount: 7,
                    maxHourlyForecastAmount: 24,
                    maxMinutelyForecastAmount: 60,
                },
            }));

        const pasrResponse = await this.sdlManager.sendRpc(pasr);
        this._serviceId = pasrResponse.getAppServiceRecord()
            .getServiceID();
        // app published!
    }

    async unpublishAppService () {
        return this.sdlManager.sendRpc(new SDL.rpc.messages.UnpublishAppService().setServiceID(this._serviceId));
    }

    respondToPerformAppServiceInteractions () {
        this.sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.PerformAppServiceInteraction, (message) => {
            if (message.getRPCType() === SDL.rpc.enums.RpcType.REQUEST) {
                const pasiResponse = new SDL.rpc.messages.PerformAppServiceInteractionResponse()
                    .setSuccess(true)
                    .setResultCode(SDL.rpc.enums.Result.SUCCESS)
                    .setCorrelationId(message.getCorrelationId());

                this.sdlManager.sendRpc(pasiResponse); // nothing to wait for
            }
        });
    }

    respondToAppServiceRequests () {
        this.sdlManager.addRpcListener(SDL.rpc.enums.FunctionID.GetAppServiceData, (message) => {
            if (message.getRPCType() === SDL.rpc.enums.RpcType.REQUEST) {
                const weatherSampleData = {
                    currentTemperature: {
                        unit: SDL.rpc.enums.TemperatureUnit.FAHRENHEIT,
                        value: 50,
                    },
                    temperatureHigh: {
                        unit: SDL.rpc.enums.TemperatureUnit.FAHRENHEIT,
                        value: 60,
                    },
                    temperatureLow: {
                        unit: SDL.rpc.enums.TemperatureUnit.FAHRENHEIT,
                        value: 40,
                    },
                    apparentTemperature: {
                        unit: SDL.rpc.enums.TemperatureUnit.FAHRENHEIT,
                        value: 50,
                    },
                    apparentTemperatureHigh: {
                        unit: SDL.rpc.enums.TemperatureUnit.FAHRENHEIT,
                        value: 60,
                    },
                    apparentTemperatureLow: {
                        unit: SDL.rpc.enums.TemperatureUnit.FAHRENHEIT,
                        value: 40,
                    },
                    weatherSummary: 'It is okay, I guess',
                    humidity: .5,
                    cloudCover: .5,
                    moonPhase: .5,
                    windBearing: 30,
                    windGust: 25,
                    windSpeed: 26,
                    nearestStormBearing: 180,
                    nearestStormDistance: 1200,
                    precipAccumulation: 12,
                    precipIntensity: 4,
                    precipProbability: .3,
                    precipType: 'rain',
                    visibility: .9,
                    weatherIcon: {
                        value: 'weather-icon',
                        imageType: SDL.rpc.enums.ImageType.DYNAMIC,
                        isTemplate: false,
                    }
                };

                const gasResponse = new SDL.rpc.messages.GetAppServiceDataResponse()
                    .setServiceData(new SDL.rpc.structs.AppServiceData({
                        serviceType: SDL.rpc.enums.AppServiceType.WEATHER,
                        serviceID: this._serviceId,
                        weatherServiceData: {
                            location: {
                                coordinate: {
                                    latitudeDegrees: 42.48293,
                                    longitudeDegrees: -83.14044,
                                },
                                locationName: 'Livio',
                                addressLines: [
                                    '332 E Lincoln Ave',
                                ],
                                locationDescription: 'Project maintainer of SmartDeviceLink and a subsidiary of Ford',
                                phoneNumber: '1 248-591-0333',
                                searchAddress: {
                                    countryName: 'United States of America',
                                    countryCode: 'US',
                                    postalCode: '48067',
                                    administrativeArea: 'MI',
                                    locality: 'Royal Oak',
                                    thoroughfare: 'E Lincoln Ave',
                                    subThoroughfare: '332',
                                },
                            },
                            currentForecast: weatherSampleData,
                            minuteForecast: Array(15).fill(weatherSampleData), // ...
                            hourlyForecast: [weatherSampleData],
                            multidayForecast: [weatherSampleData],
                        },
                    }))
                    .setSuccess(true)
                    .setResultCode(SDL.rpc.enums.Result.SUCCESS)
                    .setCorrelationId(message.getCorrelationId());

                this.sdlManager.sendRpc(gasResponse); // nothing to wait for
            }
        });
    }

    sendLocationResponse (request) {
        const slResponse = new SDL.rpc.messages.SendLocationResponse()
            .setSuccess(true)
            .setResultCode(SDL.rpc.enums.Result.SUCCESS)
            .setCorrelationId(request.getCorrelationId());

        this.sdlManager.sendRpc(slResponse); // nothing to wait for
    }

    async stop () {
        // tear down the app
        await this.sdlManager.sendRpc(new SDL.rpc.messages.UnregisterAppInterface());
        this.sdlManager.dispose();
    }
};

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}