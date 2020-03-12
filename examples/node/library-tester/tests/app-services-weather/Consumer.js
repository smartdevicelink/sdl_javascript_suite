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
module.exports = class Consumer {
    constructor (catalogRpc) {
        this._catalogRpc = catalogRpc;
        this._app = null;
        this.sdlManager = null;
        this.serviceId = null;
        this.appId = 'node-consumer';
    }

    async start () {
        const appConfig = new SDL.manager.AppConfig()
            .setAppId(this.appId)
            .setAppName(this.appId)
            .setIsMediaApp(false)
            .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
            .setHmiDisplayLanguageDesired(SDL.rpc.enums.Language.EN_US)
            .setAppTypes([
                SDL.rpc.enums.AppHMIType.MEDIA,
                SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
            ])
            .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT));

        this._app = new AppHelper(this._catalogRpc)
            .setAppConfig(appConfig);

        await this._app.start(); // after this point, we are in HMI FULL and managers are ready
        this.sdlManager = this._app.getManager();
    }

    async getAppServiceDataPromise () {
        const gap = new SDL.rpc.messages.GetAppServiceData()
            .setServiceType(SDL.rpc.enums.AppServiceType.WEATHER)
            .setSubscribe(true); // future updates to app services will now be sent

        return this.sdlManager.sendRpc(gap); // don't wait for the response!
    }

    async sendPerformInteractionPromise (serviceId) {
        const pasi = new SDL.rpc.messages.PerformAppServiceInteraction()
            .setServiceID(serviceId)
            .setServiceUri('hello')
            .setOriginApp(this.appId)
            .setRequestServiceActive(true);

        return this.sdlManager.sendRpc(pasi);
    }

    async getAndShowImage (image, serviceId) {
        const getFile = new SDL.rpc.messages.GetFile()
            .setFileName(image.getValue())
            .setAppServiceId(serviceId);

        await this.sdlManager.sendRpc(getFile);

        // just show that getting an image that was uploaded from a producer app is possible
        // don't utilize the blob returned from the GetFile and have the consumer upload its own instead

        const fileManager = this.sdlManager.getFileManager();

        const weatherFile = new SDL.manager.file.filetypes.SdlFile()
            .setName(image.getValue())
            .setFilePath('./tests/app-services-weather/weather-icon.png')
            .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG);

        const putFile = await fileManager.createPutFile(weatherFile);
        await this.sdlManager.sendRpc(putFile);

        const show = new SDL.rpc.messages.Show()
            .setMainField1('An image of the sun from the weather app service should be shown!')
            .setGraphic(new SDL.rpc.structs.Image({
                value: image.getValue(),
                imageType: SDL.rpc.enums.ImageType.DYNAMIC,
            }));

        await this.sdlManager.sendRpc(show);
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