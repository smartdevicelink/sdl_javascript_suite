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
const Producer1 = require('./Producer1.js');
const Producer2 = require('./Producer2.js');
const Consumer = require('./Consumer.js');

module.exports = async function (catalogRpc) {
    const producer1 = new Producer1(catalogRpc);
    await producer1.start();

    const producer2 = new Producer2(catalogRpc);
    await producer2.start();

    const consumer = new Consumer(catalogRpc);
    await consumer.start();

    // get the initial number of app services connected before continuing
    const prePublishAppServices = await consumer.sdlManager.getSystemCapabilityManager().queryCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
    const BASE_SERVICES_CONNECTED = prePublishAppServices.length;

    // publish the app services and have the consumer listen for when it happens
    await producer1.setupAppService(true);
    await expectAppServiceCount(consumer.sdlManager, BASE_SERVICES_CONNECTED + 1);
    await producer2.setupAppService(true);
    await expectAppServiceCount(consumer.sdlManager, BASE_SERVICES_CONNECTED + 2);

    const appServiceCapabilities = await consumer.sdlManager.getSystemCapabilityManager().queryCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);

    // locate the weather app services from the capability response and use the service ids to activate one of them
    const foundCapability = appServiceCapabilities.find((capability) => {
        return 'weather-service-1' === capability.getUpdatedAppServiceRecord()
            .getServiceManifest()
            .getServiceName();
    });
    const weatherId = foundCapability.getUpdatedAppServiceRecord().getServiceID();
    await consumer.sendPerformInteractionPromise(weatherId);

    // get the active weather service
    const appDataResponse = await consumer.getAppServiceDataPromise();

    if (weatherId !== appDataResponse.getServiceData().getServiceID()) {
        throw new Error(`Expected app service response with id ${weatherId}, but got ${appDataResponse.getServiceData().getServiceID()}`);
    }

    // extract the image of the weather icon used and display it on the screen
    const weatherImage = appDataResponse.getServiceData().getWeatherServiceData().getCurrentForecast().getWeatherIcon();

    await consumer.getAndShowImage(weatherImage, weatherId);

    // now update the producer1 app service to not allow consumers to read it
    await producer1.setupAppService(false);

    // now unpublish both services
    await producer1.unpublishAppService();
    await expectAppServiceCount(consumer.sdlManager, BASE_SERVICES_CONNECTED + 1);
    await producer2.unpublishAppService();
    await expectAppServiceCount(consumer.sdlManager, BASE_SERVICES_CONNECTED);

    await sleep(4000);

    await producer1.stop();
    await producer2.stop();
    await consumer.stop();
};

function expectAppServiceCount (sdlManager, number) {
    return new Promise((resolve, reject) => {
        const listener = (appServiceCapabilities) => {
            if (appServiceCapabilities.getAppServices().length === number) {
                resolve();
            } else {
                reject(`Expected app service count to be ${number}: got ${appServiceCapabilities.getAppServices().length}`);
            }
            // stop the listener
            sdlManager.getSystemCapabilityManager()
                .removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, listener);
        };

        sdlManager.getSystemCapabilityManager()
            .addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, listener);
    });
}

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}