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
    const appId = 'video-streaming-options';

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

    // set video options test
    const appUpdated = new SDL.rpc.messages.OnAppCapabilityUpdated()
        .setAppCapability(new SDL.rpc.structs.AppCapability()
            .setAppCapabilityType(SDL.rpc.enums.AppCapabilityType.VIDEO_STREAMING)
            .setVideoStreamingCapability(new SDL.rpc.structs.VideoStreamingCapability({
                preferredResolution: {
                    resolutionWidth: 800,
                    resolutionHeight: 380
                },
                maxBitrate: 400000,
                supportedFormats: [
                    {
                        protocol:  "RAW",
                        codec: "H264"
                    },
                    {
                        protocol:  "RTP",
                        codec: "H264"
                    }
                ],
                hapticSpatialDataSupported: true,
                diagonalScreenSize: 8,
                pixelPerInch: 96,
                scale: 1,
                preferredFPS: 20,
                additionalVideoStreamingCapabilities: [
                    {
                        preferredResolution:
                        {
                            resolutionWidth: 800,
                            resolutionHeight: 380
                        },
                        hapticSpatialDataSupported: true,
                        scale: 1.5,
                        diagonalScreenSize: 5
                    },
                    {
                        preferredResolution:
                        {
                            resolutionWidth: 800,
                            resolutionHeight: 380
                        },
                        hapticSpatialDataSupported: false,
                        scale: 2.0,
                        diagonalScreenSize: 4
                    },
                    {
                        preferredResolution:
                        {
                            resolutionWidth: 800,
                            resolutionHeight: 800
                        },
                        hapticSpatialDataSupported: true,
                        diagonalScreenSize: 10
                    },
                    {
                        preferredResolution:
                        {
                            resolutionWidth: 200,
                            resolutionHeight: 800
                        },
                        hapticSpatialDataSupported: true,
                        diagonalScreenSize: 9
                    },
                    {
                        preferredResolution:
                        {
                            resolutionWidth: 200,
                            resolutionHeight: 800
                        },
                        hapticSpatialDataSupported: true,
                        scale: 2.0,
                        diagonalScreenSize: 9
                    },
                    {
                        preferredResolution:
                        {
                            resolutionWidth: 400,
                            resolutionHeight: 100
                        },
                        hapticSpatialDataSupported: true,
                        scale: 1.0,
                        diagonalScreenSize: 5
                    }
                ]
            })));

    await sdlManager.sendRpcResolve(appUpdated);

    sdlManager.getScreenManager()
        .setTextField1('Check the video resolution options for 4 valid ones out of 6')
        .setTextField2('Find and click on the voice command to continue!');

    await new Promise((resolve, reject) => {
        sdlManager.getScreenManager().setVoiceCommands([
            new SDL.manager.screen.utils.VoiceCommand(['Click on me.. again!'], () => {
                resolve();
            }),
        ]);
    });

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();
};

function sleep (timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}