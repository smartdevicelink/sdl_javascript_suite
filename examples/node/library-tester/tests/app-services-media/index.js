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
const Producer = require('./Producer.js');
const Consumer = require('./Consumer.js');

module.exports = async function (catalogRpc) {
    const producer = new Producer(catalogRpc);
    await producer.start();
    await producer.setupAppService();
    // wait for just one request from the consumer app
    const appGetServiceDataPromise = rpcListenPromise(producer.sdlManager, SDL.rpc.enums.FunctionID.GetAppServiceData, SDL.rpc.enums.MessageType.request);
    // setup a consumer app and have it send a GetAppServiceData request
    const consumer = new Consumer(catalogRpc);
    await consumer.start();

    const getAppServicePromise = consumer.getAppServiceDataPromise();
    const appServiceDataRequest = await appGetServiceDataPromise; // wait for the listener to receive a GetAppServiceData

    if (appServiceDataRequest.getServiceType() !== SDL.rpc.enums.AppServiceType.MEDIA) {
        throw new Error(`Expecting a MEDIA app service request! Got ${appServiceDataRequest.getServiceType()}`);
    }

    // respond to the media request
    producer.sendMediaServiceResponse(appServiceDataRequest);
    const getAppServiceResponse = await getAppServicePromise; // wait for the response of the request
    consumer.serviceId = getAppServiceResponse.getServiceData().getServiceID();

    // listen to a future update from the producer
    const appOnServiceDataPromise = rpcListenPromise(consumer.sdlManager, SDL.rpc.enums.FunctionID.OnAppServiceData, SDL.rpc.enums.MessageType.notification);

    // have the producer send an update
    producer.sendMediaServiceUpdate();

    const onAppServiceData = await appOnServiceDataPromise; // wait for the RPC

    const performInteractionPromise = consumer.sendPerformInteractionPromise(); // send a PerformAppServiceInteraction to the producer
    // listen for a PerformAppServiceInteraction request on the producer app
    const pasiRequest = await rpcListenPromise(producer.sdlManager, SDL.rpc.enums.FunctionID.PerformAppServiceInteraction, SDL.rpc.enums.MessageType.request);

    producer.sendPasiResponse(pasiRequest);
    await performInteractionPromise; // wait for the response for the consumer app

    // send a button press from consumer to producer
    const buttonPressPromise = consumer.sendButtonPressPromise();
    const buttonRequest = await rpcListenPromise(producer.sdlManager, SDL.rpc.enums.FunctionID.ButtonPress, SDL.rpc.enums.MessageType.request);
    // respond to the button press
    producer.sendButtonResponse(buttonRequest);
    await buttonPressPromise; // wait for the response for the consumer app

    await producer.stop();
    await consumer.stop();
};

function rpcListenPromise (sdlManager, functionId, type) {
    return new Promise((resolve, reject) => {
        const listener = (message) => {
            if (message.getMessageType() === type) {
                sdlManager.removeRpcListener(functionId, listener);
                resolve(message);
            }
        }
        sdlManager.addRpcListener(functionId, listener);
    });
}

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}