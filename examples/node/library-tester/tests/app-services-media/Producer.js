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
module.exports = class Producer {
    constructor (catalogRpc) {
        this._catalogRpc = catalogRpc;
        this._app = null;
        this.sdlManager = null;
        this._serviceId = null;
    }

    async start () {
        const appId = 'media-service-prod';

        const fileName = 'test_icon_1';
        const file = new SDL.manager.file.filetypes.SdlFile()
            .setName(fileName)
            .setFilePath('./tests/app-services-media/test_icon_1.png')
            .setType(SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setPersistent(true);

        const lifecycleConfig = new SDL.manager.LifecycleConfig()
            .setAppId(appId)
            .setAppName(appId)
            .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
            .setAppTypes([
                SDL.rpc.enums.AppHMIType.MEDIA,
                SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
            ])
            .setTransportConfig(new SDL.transport.TcpClientConfig(process.env.HOST, process.env.PORT))
            .setAppIcon(file);

        this._app = new AppHelper(this._catalogRpc)
            .setLifecycleConfig(lifecycleConfig);

        await this._app.start(); // after this point, we are in HMI FULL and managers are ready
        this.sdlManager = this._app.getManager();
    }

    async setupAppService () {
        const pasr = new SDL.rpc.messages.PublishAppService()
            .setAppServiceManifest(new SDL.rpc.structs.AppServiceManifest({
                serviceName: 'node-tester-media',
                serviceType: SDL.rpc.enums.AppServiceType.MEDIA,
                serviceIcon: {
                    value: 'test_icon_1',
                    imageType: SDL.rpc.enums.ImageType.DYNAMIC,
                    isTemplate: false,
                },
                allowAppConsumers: true,
                mediaServiceManifest: {},
                handledRPCs: [
                    SDL.rpc.enums.FunctionID.ButtonPress, // this app can intercept ButtonPress
                ]
            }));

        const pasrResponse = await this.sdlManager.sendRpcResolve(pasr);
        this._serviceId = pasrResponse.getAppServiceRecord()
            .getServiceID();
        // app published!

        // inform the user that a new app should be activated now
        const show = new SDL.rpc.messages.Show()
            .setMainField1('An additional consumer app has been started')
            .setMainField2('Check the app list and activate the consumer app');

        await this.sdlManager.sendRpcResolve(show);
    }

    sendMediaServiceResponse (request) {
        const gasResponse = new SDL.rpc.messages.GetAppServiceDataResponse()
            .setServiceData(new SDL.rpc.structs.AppServiceData({
                serviceType: SDL.rpc.enums.AppServiceType.MEDIA,
                serviceID: this._serviceId,
                mediaServiceData: {
                    mediaType: SDL.rpc.enums.MediaType.MUSIC,
                    mediaTitle: 'New Rock',
                    mediaArtist: 'Bandana Boys',
                    mediaAlbum: 'Just Things',
                    playlistName: 'Songs I Like',
                    isExplicit: false,
                    trackPlaybackProgress: 0,
                    trackPlaybackDuration: 300,
                    queuePlaybackProgress: 0,
                    queuePlaybackDuration: 300,
                    queueCurrentTrackNumber: 1,
                    queueTotalTrackCount: 1,
                },
            }))
            .setSuccess(true)
            .setResultCode(SDL.rpc.enums.Result.SUCCESS)
            .setCorrelationId(request.getCorrelationId());

        this.sdlManager.sendRpcResolve(gasResponse); // nothing to wait for
    }

    sendMediaServiceUpdate () {
        const gasResponse = new SDL.rpc.messages.OnAppServiceData()
            .setServiceData(new SDL.rpc.structs.AppServiceData({
                serviceType: SDL.rpc.enums.AppServiceType.MEDIA,
                serviceID: this._serviceId,
                mediaServiceData: {
                    mediaType: SDL.rpc.enums.MediaType.MUSIC,
                    mediaTitle: 'I Hunger',
                    mediaArtist: 'Bandana Boys',
                    mediaAlbum: 'Just Things',
                    playlistName: 'Songs I Like',
                    isExplicit: false,
                    trackPlaybackProgress: 60,
                    trackPlaybackDuration: 300,
                    queuePlaybackProgress: 60,
                    queuePlaybackDuration: 300,
                    queueCurrentTrackNumber: 1,
                    queueTotalTrackCount: 1,
                },
            }));

        this.sdlManager.sendRpcResolve(gasResponse); // nothing to wait for
    }

    sendPasiResponse (request) {
        if (!request.getServiceUri() === 'hello') {
            throw Error(`Expected 'hello' in service uri. Got '${request.getServiceUri()}'`);
        }
        const pasiResponse = new SDL.rpc.messages.PerformAppServiceInteractionResponse()
            .setServiceSpecificResult('hi!')
            .setSuccess(true)
            .setResultCode(SDL.rpc.enums.Result.SUCCESS)
            .setCorrelationId(request.getCorrelationId());

        this.sdlManager.sendRpcResolve(pasiResponse); // nothing to wait for
    }

    sendButtonResponse (request) {
        const pasiResponse = new SDL.rpc.messages.ButtonPressResponse()
            .setSuccess(true)
            .setResultCode(SDL.rpc.enums.Result.SUCCESS)
            .setCorrelationId(request.getCorrelationId());

        this.sdlManager.sendRpcResolve(pasiResponse); // nothing to wait for
    }

    async stop () {
        // tear down the app
        await this.sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
        this.sdlManager.dispose();
    }
};

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}