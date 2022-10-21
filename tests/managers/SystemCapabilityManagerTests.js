const expect = require('chai').expect;
const SDL = require('../config.js').node;

// Mocking framework used so that some RPCs are not actually sent to Core, but the response mimicked
const sinon = require('sinon');
const Test = require('../Test.js');
const Validator = require('../Validator');

module.exports = function (appClient) {
    describe('SystemCapabilityManagerTests', function () {
        const sdlManager = appClient._sdlManager;
        const systemCapability = new SDL.rpc.structs.SystemCapability()
            .setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);

        const videoStreamingCapability = new SDL.rpc.structs.VideoStreamingCapability()
            .setMaxBitrate(Test.GENERAL_INT)
            .setPreferredResolution(Test.GENERAL_IMAGERESOLUTION)
            .setSupportedFormats(Test.GENERAL_VIDEOSTREAMINGFORMAT_LIST)
            .setPreferredFPS(Test.GENERAL_INTEGER)
            .setAdditionalVideoStreamingCapabilities(Test.GENERAL_ADDITIONAL_CAPABILITY_LIST);

        systemCapability.setVideoStreamingCapability(videoStreamingCapability);

        /**
         * Returns an instantiated SystemCapabilityManager
         * @param {_LifecycleManager} lcm - The lifecycle manager
         * @returns {SystemCapabilityManager} - The SystemCapabilityManager
         */
        function createSampleManager (lcm) {
            const systemCapabilityManager = new SDL.manager.SystemCapabilityManager(lcm);

            const raiResponse = new SDL.rpc.messages.RegisterAppInterfaceResponse()
                .setHmiCapabilities(Test.GENERAL_HMICAPABILITIES)
                .setDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES)
                .setAudioPassThruCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST)
                .setButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST)
                .setHmiZoneCapabilities(Test.GENERAL_HMIZONECAPABILITIES_LIST)
                .setPresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES)
                .setSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST)
                .setSpeechCapabilities(Test.GENERAL_SPEECHCAPABILITIES_LIST)
                .setPrerecordedSpeech(Test.GENERAL_PRERECORDEDSPEECH_LIST)
                .setSuccess(true);

            systemCapabilityManager._parseRaiResponse(raiResponse);
            return systemCapabilityManager;
        }

        function createDisplayCapabilityList (display = null, button, softButton) {
            const windowTypeCapabilities = new SDL.rpc.structs.WindowTypeCapabilities()
                .setType(SDL.rpc.enums.WindowType.MAIN)
                .setMaximumNumberOfWindows(1);

            const displayCapability = new SDL.rpc.structs.DisplayCapability();
            displayCapability.setDisplayName(display !== null ? display.getDisplayName() : null);
            displayCapability.setWindowTypeSupported([windowTypeCapabilities]);

            const defaultWindowCapability = new SDL.rpc.structs.WindowCapability();
            defaultWindowCapability.setWindowID(SDL.rpc.enums.PredefinedWindows.DEFAULT_WINDOW);
            defaultWindowCapability.setButtonCapabilities(button);
            defaultWindowCapability.setSoftButtonCapabilities(softButton);

            if (display === null) {
                defaultWindowCapability.setTextFields(SDL.manager._ManagerUtility.getAllTextFields());
                defaultWindowCapability.setImageFields(SDL.manager._ManagerUtility.getAllImageFields());
                displayCapability.setWindowCapabilities([defaultWindowCapability]);
                return [displayCapability];
            }

            defaultWindowCapability.setTemplatesAvailable(display.getTemplatesAvailable());
            defaultWindowCapability.setNumCustomPresetsAvailable(display.getNumCustomPresetsAvailable());
            defaultWindowCapability.setTextFields(display.getTextFields());
            defaultWindowCapability.setImageFields(display.getImageFields());
            const imageTypeSupported = [];
            imageTypeSupported.push(SDL.rpc.enums.ImageType.STATIC);
            if (display.getGraphicSupported()) {
                imageTypeSupported.push(SDL.rpc.enums.ImageType.DYNAMIC);
            }
            defaultWindowCapability.setImageTypeSupported(imageTypeSupported);

            displayCapability.setWindowCapabilities([defaultWindowCapability]);
            return [displayCapability];
        }

        function createDisplayCapabilities (displayName, defaultMainWindow) {
            const convertedCapabilities = new SDL.rpc.structs.DisplayCapabilities();
            convertedCapabilities.setDisplayType(SDL.rpc.enums.DisplayType.SDL_GENERIC); // deprecated but it is mandatory...
            convertedCapabilities.setDisplayName(displayName);
            convertedCapabilities.setTextFields(defaultMainWindow.getTextFields());
            convertedCapabilities.setImageFields(defaultMainWindow.getImageFields());
            convertedCapabilities.setTemplatesAvailable(defaultMainWindow.getTemplatesAvailable());
            convertedCapabilities.setNumCustomPresetsAvailable(defaultMainWindow.getNumCustomPresetsAvailable());
            convertedCapabilities.setMediaClockFormats([]); // mandatory field but can be empty
            convertedCapabilities.setGraphicSupported(defaultMainWindow.getImageTypeSupported().contains(SDL.rpc.enums.ImageType.DYNAMIC));

            return convertedCapabilities;
        }

        function createAppServiceCapability (type, serviceName, serviceID, isActive, updateReason) {
            const appServiceCapbility = new SDL.rpc.structs.AppServiceCapability()
                .setUpdatedAppServiceRecord(
                    createAppServiceRecord(type, serviceName, serviceID, isActive)
                )
                .setUpdateReason(updateReason);
            return appServiceCapbility;
        }

        function createAppServiceRecord (type, serviceName, serviceID, isActive) {
            const appServiceRecord = new SDL.rpc.structs.AppServiceRecord()
                .setServiceManifest(
                    createAppServiceManifest(type, serviceName)
                )
                .setServiceID(serviceID)
                .setServiceActive(isActive)
                .setServicePublished(true);
            return appServiceRecord;
        }

        function createAppServiceManifest (type, serviceName) {
            const manifest = new SDL.rpc.structs.AppServiceManifest()
                .setServiceName(serviceName)
                .setRpcSpecVersion(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(SDL.manager.lifecycle._LifecycleManager.MAX_RPC_VERSION.getMajor())
                    .setMinorVersion(SDL.manager.lifecycle._LifecycleManager.MAX_RPC_VERSION.getMinor())
                    .setPatchVersion(SDL.manager.lifecycle._LifecycleManager.MAX_RPC_VERSION.getPatch()))
                .setAllowAppConsumers(true);
            const handledRPCs = [];
            const AppServiceType = SDL.rpc.enums.AppServiceType;

            switch (type) {
                case AppServiceType.MEDIA: {
                    handledRPCs.push(SDL.rpc.enums.FunctionID.ButtonPress);
                    manifest.setMediaServiceManifest(new SDL.rpc.structs.MediaServiceManifest());
                    break;
                }
                case AppServiceType.WEATHER: {
                    const weatherServiceManifest = new SDL.rpc.structs.WeatherServiceManifest()
                        .setCurrentForecastSupported(true)
                        .setMaxHourlyForecastAmount(6)
                        .setMaxMinutelyForecastAmount(30)
                        .setMaxMultidayForecastAmount(5)
                        .setWeatherForLocationSupported(true);
                    manifest.setWeatherServiceManifest(weatherServiceManifest);
                    break;
                }
                case AppServiceType.NAVIGATION: {
                    handledRPCs.push(SDL.rpc.enums.FunctionID.SendLocation);
                    handledRPCs.push(SDL.rpc.enums.FunctionID.GetWayPoints);
                    handledRPCs.push(SDL.rpc.enums.FunctionID.SubscribeVehicleData);
                    handledRPCs.push(SDL.rpc.enums.FunctionID.UnsubscribeVehicleData);

                    const navigationServiceManifest = new SDL.rpc.structs.NavigationServiceManifest()
                        .setAcceptsWayPoints(true);
                    manifest.setNavigationServiceManifest(navigationServiceManifest);
                    break;
                }
            }

            manifest.setHandledRPCs(handledRPCs);
            return manifest;
        }

        /**
         * Fires a GetSystemCapabilityResponse
         * @param {Boolean} success - Whether the request succeeds
         * @param {Boolean} subscribe - Whether subscription is enabled
         * @param {SystemCapabilityManager} scm - The SystemCapabilityManager
         * @returns {Function} - The RPC to send out as a response when invoked
         */
        function createOnSendGetSystemCapabilityAnswer (success, subscribe = null, scm) {
            return async (req) => {
                if (subscribe !== null) {
                    Validator.assertEquals(req.getSubscribe(), subscribe);
                }

                // simulate what SCM would do after sending GetSystemCapability req
                scm._setCapability(req.getSystemCapabilityType(), systemCapability);

                const response = new SDL.rpc.messages.GetSystemCapabilityResponse({
                    functionName: SDL.rpc.enums.FunctionID.GetSystemCapability,
                })
                    .setSuccess(success)
                    .setSystemCapability(systemCapability);
                return response;
            };
        }

        /**
         * Pauses execution
         * @param {Number} timeout - How long in milliseconds to pause
         * @returns {Promise} - Does not resolve to any value
         */
        function sleep (timeout = 1000) {
            return new Promise(resolve => setTimeout(resolve, timeout));
        }

        it('testParseRAI', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const displayCapabilityList = createDisplayCapabilityList(Test.GENERAL_DISPLAYCAPABILITIES, Test.GENERAL_BUTTONCAPABILITIES_LIST, Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST);

            Validator.assertTrue(
                Validator.validateDisplayCapabilityList(displayCapabilityList,scm.getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAYS)));
            Validator.assertTrue(
                Validator.validateHMICapabilities(Test.GENERAL_HMICAPABILITIES,scm.getHmiCapabilities()));
            Validator.assertTrue(
                Validator.validateDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES,scm.getDisplayCapabilities()));
            Validator.assertTrue(
                Validator.validateAudioPassThruCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST, scm.getAudioPassThruCapabilities()));
            Validator.assertTrue(
                Validator.validateButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST, scm._buttonCapabilities));
            Validator.assertTrue(
                Validator.validateHMIZoneCapabilities(Test.GENERAL_HMIZONECAPABILITIES_LIST, scm.getHmiZoneCapabilities()));
            Validator.assertTrue(
                Validator.validatePresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES,scm.getPresetBankCapabilities()));
            Validator.assertTrue(
                Validator.validateSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST, scm._softButtonCapabilities));
            Validator.assertTrue(
                Validator.validateSpeechCapabilities(Test.GENERAL_SPEECHCAPABILITIES_LIST, scm.getSpeechCapabilities()));
            Validator.assertTrue(
                Validator.validatePreRecordedSpeechCapabilities(Test.GENERAL_PRERECORDEDSPEECH_LIST,scm.getPrerecordedSpeechCapabilities()));
            done();
        });

        it('testNullDisplayCapabilitiesEnablesAllTextAndImageFields', function (done) {
            const displayCapabilityList = createDisplayCapabilityList(null, Test.GENERAL_BUTTONCAPABILITIES_LIST, Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST);
            Validator.assertEquals(displayCapabilityList[0].getWindowCapabilities()[0].getTextFields().length, 38);
            Validator.assertEquals(displayCapabilityList[0].getWindowCapabilities()[0].getImageFields().length, 18);
            done();
        });

        it('testGetVSCapability', async function () {
            const vsCapability = new SDL.rpc.structs.VideoStreamingCapability();
            vsCapability.setMaxBitrate(Test.GENERAL_INT);
            vsCapability.setPreferredResolution(Test.GENERAL_IMAGERESOLUTION);
            vsCapability.setAdditionalVideoStreamingCapabilities(Test.GENERAL_ADDITIONAL_CAPABILITY_LIST);
            vsCapability.setSupportedFormats(Test.GENERAL_VIDEOSTREAMINGFORMAT_LIST);
            vsCapability.setPreferredFPS(Test.GENERAL_INTEGER);

            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);

            const cap = new SDL.rpc.structs.SystemCapability();
            cap.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            cap.setVideoStreamingCapability(vsCapability);

            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(async (req) => {
                // simulate what SCM would do after sending GetSystemCapability req
                scm._setCapability(req.getSystemCapabilityType(), cap);

                const response = new SDL.rpc.messages.GetSystemCapabilityResponse({
                    functionName: SDL.rpc.enums.FunctionID.GetSystemCapability,
                })
                    .setSuccess(true)
                    .setSystemCapability(systemCapability);
                return response;
            });

            const videoCap = await scm.updateCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            Validator.assertTrue(Validator.validateVideoStreamingCapability(cap.getVideoStreamingCapability(), videoCap));

            stub.restore();
        });

        it('testGetCapability', async function () {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;

            const stub = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function (functionId, callback) {
                    if (functionId === SDL.rpc.enums.FunctionID.OnHMIStatus) 
                    {
                        const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                            functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                        })
                        //Raed: this is should be HMI_FULL
                            .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_NONE);
                        //lifecycleManager._handleRpc(responseSuccess);

                     //return new Promise((resolve, reject) => {
                       // resolve(responseSuccess);
                    //});
                 }
                });

            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);
            const rpcStub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(function () {
                    const systemCapability = new SDL.rpc.structs.SystemCapability()
                        .setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING)
                        .setVideoStreamingCapability(new SDL.rpc.structs.VideoStreamingCapability());
                    const responseSuccess = new SDL.rpc.messages.GetSystemCapabilityResponse({
                        functionName: SDL.rpc.enums.FunctionID.GetSystemCapabilityResponse,
                    })
                        .setSystemCapability(systemCapability)
                        .setResultCode('SUCCESS')
                        .setCorrelationId(1000000)
                        .setSuccess(true);
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });
            scm._videoStreamingCapability = null;
            const retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            await scm.updateCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            Validator.assertNull(retrievedCapability);
            Validator.assertTrue(rpcStub.calledOnce); 
            rpcStub.restore();
            stub.restore();

            // Test case 2 (capability cached, listener not null, forceUpdate true)
            /*lifecycleManager = sdlManager._lifecycleManager;
            const HMIStatusAnswer = sinon.stub(internalInterface,'addOnRPCListener')
                .callsFake(createOnHMIStatusAnswer(HMILevel.HMI_FULL));    
            scm = new reateSampleManager(lifecycleManager);
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
               .callsFake(createOnSendGetSystemCapabilityAnswer(true, null, scm)); 
            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);
            retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener, true);
            Validator.assertTrue(Validator.validateVideoStreamingCapability(systemCapability.getCapabilityForType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING), retrievedCapability));
            verify(internalInterface, times(1)).sendRPC(any(GetSystemCapability.class));
            verify(scm, times(1)).onCapabilityRetrieved(any(Object.class));*/

            /*const stub2 = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                    //Raed: this is should be HMI_FULL
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_NONE);
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });

            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);
            const rpcStub2 = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(function () {
                    const systemCapability = new SDL.rpc.structs.SystemCapability()
                        .setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING)
                        .setVideoStreamingCapability(new SDL.rpc.structs.VideoStreamingCapability());
                    const responseSuccess = new SDL.rpc.messages.GetSystemCapabilityResponse({
                        functionName: SDL.rpc.enums.FunctionID.GetSystemCapabilityResponse,
                    })
                        .setSystemCapability(systemCapability)
                        .setResultCode('SUCCESS')
                        .setCorrelationId(1000000)
                        .setSuccess(true);
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });
            scm._videoStreamingCapability = null;

            const retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            await scm.updateCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            Validator.assertNull(retrievedCapability);
            Validator.assertTrue(rpcStub.calledOnce); 
            rpcStub.restore();
            stub.restore();

            // Test case 3 (capability cached, listener null, forceUpdate true)
            /*lifecycleManager = sdlManager._lifecycleManager;
            HMIStatusAnswer = sinon.stub(lifecycleManager,'addOnRPCListener')
                .callsFake(createOnHMIStatusAnswer(HMILevel.HMI_FULL));    
            scm = new reateSampleManager(lifecycleManager);
            scm = null;
            SystemCapabilityAnswer = sinon.stub(lifecycleManager,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, null, scm)); 
            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);
            retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener, true);
            Validator.assertTrue(TestValues.TRUE, Validator.validateVideoStreamingCapability(systemCapability.getCapabilityForType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING), retrievedCapability));
            verify(lifecycleManager, times(1)).sendRPC(any(GetSystemCapability.class));*/

             /*           const stub2 = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                    //Raed: this is should be HMI_FULL
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_NONE);
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });

            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);
            const rpcStub2 = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(function () {
                    const systemCapability = new SDL.rpc.structs.SystemCapability()
                        .setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING)
                        .setVideoStreamingCapability(new SDL.rpc.structs.VideoStreamingCapability());
                    const responseSuccess = new SDL.rpc.messages.GetSystemCapabilityResponse({
                        functionName: SDL.rpc.enums.FunctionID.GetSystemCapabilityResponse,
                    })
                        .setSystemCapability(systemCapability)
                        .setResultCode('SUCCESS')
                        .setCorrelationId(1000000)
                        .setSuccess(true);
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });
            scm._videoStreamingCapability = null;

            const retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            await scm.updateCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            Validator.assertNull(retrievedCapability);
            Validator.assertTrue(rpcStub.calledOnce); 
            rpcStub.restore();
            stub.restore();


            // Test case 4 (capability cached, listener null, forceUpdate false)
            /*lifecycleManager = sdlManager._lifecycleManager;
            HMIStatusAnswer = sinon.stub(lifecycleManager,'addOnRPCListener')
                .callsFake(createOnHMIStatusAnswer(HMILevel.HMI_FULL)); 
            scm = createSampleManager(lifecycleManager);
            scm = null;
            SystemCapabilityAnswer = sinon.stub(lifecycleManager,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, null, scm));
            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);
            retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener, false);
            Validator.assertTrue(TestValues.TRUE, Validator.validateVideoStreamingCapability(systemCapability.getCapabilityForType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING), retrievedCapability));
            verify(lifecycleManager, times(0)).sendRPC(any(GetSystemCapability.class));*/

          /*  const stub2 = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                    //Raed: this is should be HMI_FULL
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_NONE);
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });

            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);
            const rpcStub2 = sinon.stub(lifecycleManager, 'sendRpcMessage')
                .callsFake(function () {
                    const systemCapability = new SDL.rpc.structs.SystemCapability()
                        .setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING)
                        .setVideoStreamingCapability(new SDL.rpc.structs.VideoStreamingCapability());
                    const responseSuccess = new SDL.rpc.messages.GetSystemCapabilityResponse({
                        functionName: SDL.rpc.enums.FunctionID.GetSystemCapabilityResponse,
                    })
                        .setSystemCapability(systemCapability)
                        .setResultCode('SUCCESS')
                        .setCorrelationId(1000000)
                        .setSuccess(true);
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });
            scm._videoStreamingCapability = null;

            const retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            await scm.updateCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            Validator.assertNull(retrievedCapability);
            Validator.assertTrue(rpcStub.calledOnce); 
            rpcStub.restore();
            stub.restore();*/

        });

        it('testGetCapabilityHmiNone', async function () {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;

            const stub = sinon.stub(lifecycleManager, 'addRpcListener')
                // .withArgs(sinon.match.same(SDL.rpc.enums.FunctionID.OnHMIStatus), sinon.match.func)
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_NONE);
                    // _handleRpc triggers the listener
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });

            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);
            // when the manager tries to send an RPC, we respond with out own success
            const rpcStub = sinon.stub(lifecycleManager, 'sendRpcMessage')
                // .withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability))
                .callsFake(function () {
                    const systemCapability = new SDL.rpc.structs.SystemCapability()
                        .setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING)
                        .setVideoStreamingCapability(new SDL.rpc.structs.VideoStreamingCapability());
                    const responseSuccess = new SDL.rpc.messages.GetSystemCapabilityResponse({
                        functionName: SDL.rpc.enums.FunctionID.GetSystemCapabilityResponse,
                    })
                        .setSystemCapability(systemCapability)
                        .setResultCode('SUCCESS')
                        .setCorrelationId(1000000)
                        .setSuccess(true);
                    // _handleRpc triggers the listener
                    lifecycleManager._handleRpc(responseSuccess);

                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });
            scm._videoStreamingCapability = null;
            const retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            // This line attempts to update the capability, and calls our rpcStub
            await scm.updateCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            Validator.assertNull(retrievedCapability);
            Validator.assertTrue(rpcStub.calledOnce);
            rpcStub.restore();
            stub.restore();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsSupportedAndCapabilityCached', async function () {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);
            
            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(6)
                .setMinorVersion(0)
                .setPatchVersion(0);

            const hmiStatusAnswer = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL);
                });
            
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });

            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);

            // Add listener1
            const onSystemCapabilityListener1 = sinon.fake(() => {});
            // When the first listener is added, GetSystemCapability request should go out with subscribe=true
            // SCM uses sendRpcMessage and not sendRpcResolve
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, true, scm));

            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertTrue(onSystemCapabilityListener1.calledOnce);
            stub.restore();

            // Add listener2
            const onSystemCapabilityListener2 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            await sleep(200);
            Validator.assertTrue(onSystemCapabilityListener2.calledOnce);

            // Add listener3
            const onSystemCapabilityListener3 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(onSystemCapabilityListener3.calledOnce);

            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);

            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);

            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should go out with subscribe=false
            const stub2 = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub2.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, false, scm));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(stub.called); 
            hmiStatusAnswer.restore();
            versionStub.restore();
            stub.restore();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsSupportedAndCapabilityNotCached', async function () {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);
            
            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(6)
                .setMinorVersion(0)
                .setPatchVersion(0);

            const hmiStatusAnswer = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL);
                });
            
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });

            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, null);

            // Add listener1
            const onSystemCapabilityListener1 = sinon.fake(() => {});
            // When the first listener is added, GetSystemCapability request should go out with subscribe=true
            // SCM uses sendRpcMessage and not sendRpcResolve
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, true, scm));

            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertTrue(onSystemCapabilityListener1.calledOnce);
            stub.restore();

            // Add listener2
            const onSystemCapabilityListener2 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            await sleep(200);
            Validator.assertTrue(onSystemCapabilityListener2.calledOnce);

            // Add listener3
            const onSystemCapabilityListener3 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(onSystemCapabilityListener3.calledOnce);

            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);

            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);

            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should go out with subscribe=false
            const stub2 = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub2.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, false, scm));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(stub.called); 
            hmiStatusAnswer.restore();
            versionStub.restore();
            stub.restore();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsNotSupportedAndCapabilityCached', async function () {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);
            
            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(5) // This version doesn't support capability subscriptions
                .setMinorVersion(0)
                .setPatchVersion(0);

            const hmiStatusAnswer = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL);
                });
            
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(5)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });

            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);

            // Add listener1
            const onSystemCapabilityListener1 = sinon.fake(() => {});
            // When the first listener is added, GetSystemCapability request should not go out because subscription is not supported and the capability is cached
            // SCM uses sendRpcMessage and not sendRpcResolve
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, true, scm));

            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertTrue(onSystemCapabilityListener1.calledOnce);
            stub.restore();

            // Add listener2
            const onSystemCapabilityListener2 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            await sleep(200);
            Validator.assertTrue(onSystemCapabilityListener2.calledOnce);

            // Add listener3
            const onSystemCapabilityListener3 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(onSystemCapabilityListener3.calledOnce);

            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);

            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);

            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should not go out because subscription is not supported
            const stub2 = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub2.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, false, scm));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(stub.called); 
            hmiStatusAnswer.restore();
            versionStub.restore();
            stub.restore();
        });

it('testAddOnSystemCapabilityListenerWithSubscriptionsNotSupportedAndCapabilityNotCached', async function ()  {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);
            
            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(5) // This version doesn't support capability subscriptions
                .setMinorVersion(0)
                .setPatchVersion(0);

            const hmiStatusAnswer = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL);
                });
            
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(5)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });

            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);

            // Add listener1
            const onSystemCapabilityListener1 = sinon.fake(() => {});
            // When the first listener is added, GetSystemCapability request should go out with subscribe=false
            // SCM uses sendRpcMessage and not sendRpcResolve
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, false, scm));

            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertNotNull(onSystemCapabilityListener1.calledOnce);
            stub.restore();

            // Add listener2
            const onSystemCapabilityListener2 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            await sleep(200);
            Validator.assertNotNull(onSystemCapabilityListener2.calledOnce);

            // Add listener3
            const onSystemCapabilityListener3 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertNotNull(onSystemCapabilityListener3.calledOnce);

            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);

            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);

            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should not go out because subscription is not supported
            const stub2 = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub2.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, false, scm));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(stub.called); 
            hmiStatusAnswer.restore();
            versionStub.restore();
            stub.restore();
        });

        it('testAddOnSystemCapabilityListenerThenGetCapabilityWhenSubscriptionsAreNotSupported', async function (){
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);
            
            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(5) // This version doesn't support capability subscriptions
                .setMinorVersion(0)
                .setPatchVersion(0);

            const hmiStatusAnswer = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL);
                });
            
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(5)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });

            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);

            // Add listener1
            const onSystemCapabilityListener1 = sinon.fake(() => {});
            // When the first listener is added, GetSystemCapability request should go out with subscribe=false
            // SCM uses sendRpcMessage and not sendRpcResolve
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, false, scm));

            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertNotNull(onSystemCapabilityListener1.calledOnce);
            stub.restore();

            // Add listener2
            const onSystemCapabilityListener2 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            await sleep(200);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertNotNull(onSystemCapabilityListener1.calledOnce);
            Validator.assertNotNull(onSystemCapabilityListener2.calledOnce);

            // Add listener3
            const onSystemCapabilityListener3 = sinon.fake(() => {});
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertNotNull(onSystemCapabilityListener1.calledOnce);
            Validator.assertNotNull(onSystemCapabilityListener2.calledOnce);
            Validator.assertNotNull(onSystemCapabilityListener3.calledOnce);

            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            await sleep(200);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertNotNull(onSystemCapabilityListener1.calledOnce);
            Validator.assertNotNull(onSystemCapabilityListener2.calledOnce);
            Validator.assertNotNull(onSystemCapabilityListener3.calledOnce);

            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            await sleep(200);
            Validator.assertTrue(stub.calledOnce); 
            Validator.assertNotNull(onSystemCapabilityListener1.calledOnce);
            Validator.assertNotNull(onSystemCapabilityListener2.calledOnce);
            Validator.assertNotNull(onSystemCapabilityListener3.calledOnce);


            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should not go out because subscription is not supported
            const stub2 = sinon.stub(sdlManager._lifecycleManager, 'sendRpcMessage')
            stub2.withArgs(sinon.match.instanceOf(SDL.rpc.messages.GetSystemCapability)).callsFake(createOnSendGetSystemCapabilityAnswer(true, false, scm));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            await sleep(200);
            Validator.assertTrue(stub.called); 

            hmiStatusAnswer.restore();
            versionStub.restore();
            stub.restore();       
         });

        it('testGetAndAddListenerForDisplaysCapability', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);

            let onSystemCapabilityListener;
            let retrievedCapability;


            // Test case 1 (capability cached, listener not null, forceUpdate true)
            const HMIStatusAnswer = sinon.stub(lifecycleManager,'addOnRPCListener')
                .callsFake(createOnHMIStatusAnswer(HMILevel.HMI_FULL)); 
            scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);
            onSystemCapabilityListener = mock(OnSystemCapabilityListener.class);
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, null, scm));
            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAYS, new DisplayCapabilities());
            retrievedCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAYS, onSystemCapabilityListener, true);
            Validator.assertNotNull(retrievedCapability);
            verify(internalInterface, times(0)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener, times(1)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener, times(0)).onError(any(String.class));


            // Test case 2 (Add listener)
            // When the first DISPLAYS listener is added, GetSystemCapability request should not go out
            let onSystemCapabilityListener1 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.DISPLAYS, onSystemCapabilityListener1);
            verify(internalInterface, times(0)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(1)).onCapabilityRetrieved(any(Object.class));


            // Test case 3 (Remove listener)
            // When the last DISPLAYS listener is removed, GetSystemCapability request should not go out
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.DISPLAYS, onSystemCapabilityListener1);
            verify(internalInterface, times(0)).sendRPC(any(GetSystemCapability.class));
            done();
        });

        it('testMediaFieldConversion', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);

            const raiResponse = new SDL.rpc.messages.RegisterAppInterfaceResponse();
            const displayCapabilities = new SDL.rpc.structs.DisplayCapabilities();
            displayCapabilities.setGraphicSupported(false);
            
            const textField = new SDL.rpc.structs.TextField();
            textField.setNameParam(SDL.rpc.enums.TextFieldName.mainField1);
            displayCapabilities.setTextFields([textField]);
            raiResponse.setDisplayCapabilities(displayCapabilities);
            raiResponse.setSuccess(true);
            scm._parseRaiResponse(raiResponse);

            let windowCapability = scm.getDefaultMainWindowCapability();
            Validator.assertNull(windowCapability.getTemplatesAvailable());

            const templates = [];
            templates.push("NON_MEDIA");
            displayCapabilities.setTemplatesAvailable(templates);
            scm._parseRaiResponse(raiResponse);
            windowCapability = scm.getDefaultMainWindowCapability();
            Validator.assertTrue(windowCapability.getTemplatesAvailable().includes("NON-MEDIA"));
            done();
        });

        it('testFalsePositive', function (done) {
            const scm = new SDL.manager.SystemCapabilityManager();
            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.AUDIO_PASSTHROUGH, null);
            Validator.assertEquals(scm.isCapabilitySupported(SDL.rpc.enums.SystemCapabilityType.AUDIO_PASSTHROUGH),false);
            done();
        });

        it('testOnSystemCapabilityUpdateWithNoExistingCap', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const scmRpcListener = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.OnSystemCapabilityUpdated)[0];
            Validator.assertNotNull(scmRpcListener);

            Validator.assertEquals(scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES).length, 0);

            /* PERFORM A NOTIFICATION SEND THROUGH THE SCM */
            const addServiceID = createAppServiceCapability(SDL.rpc.enums.AppServiceType.NAVIGATION, 'test', '3453', true, null);
            const serviceIdASC = new SDL.rpc.structs.AppServicesCapabilities();
            serviceIdASC.setAppServices([addServiceID]);

            const systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, serviceIdASC);

            const onSystemCapabilityUpdated = new SDL.rpc.messages.OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener(onSystemCapabilityUpdated);

            Validator.assertNotEquals(scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES).length, 0);
            done();
        });

        it('testOnSystemCapabilityUpdatedForDISPLAYS', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const scmRpcListener = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.OnSystemCapabilityUpdated)[0];
            Validator.assertNotNull(scmRpcListener);

            Validator.assertNotNull(scm.getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAYS));
            Validator.assertNotNull(scm.getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAY));

            const newCaps = createDisplayCapabilityList(Test.GENERAL_DISPLAYCAPABILITIES, Test.GENERAL_BUTTONCAPABILITIES_LIST, Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST);

            const systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.DISPLAYS);
            systemCapability.setDisplayCapabilities(newCaps);

            const onSystemCapabilityUpdated = new SDL.rpc.messages.OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener(onSystemCapabilityUpdated);

            const appliedCaps = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAYS);
            Validator.assertNotNull(appliedCaps);
            Validator.assertTrue(Validator.validateDisplayCapabilityList(newCaps, appliedCaps));

            const appliedConvertedCaps = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAY);
            Validator.assertNotNull(appliedConvertedCaps);
            const testConvertedCaps = createDisplayCapabilities(newCaps[0].getDisplayName(), newCaps[0].getWindowCapabilities()[0]);
            Validator.assertTrue(Validator.validateDisplayCapabilities(appliedConvertedCaps, testConvertedCaps));
            done();
        });

        it('testOnSystemCapabilityUpdated', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const baseName = 'NavTest';
            const baseID = '37F98053AE';

            const capability1 = new SDL.rpc.structs.AppServiceCapability()
                .setUpdateReason(SDL.rpc.enums.AppServiceType.NAVIGATION)
                .setUpdatedAppServiceRecord(baseName);

            const appServicesCapabilities = new SDL.rpc.struct.AppServicesCapabilities();
            appServicesCapabilities.setAppServices([capability1]);

            Validator.assertNotNull(lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.OnSystemCapabilityUpdated));
            const scmRpcListener = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.OnSystemCapabilityUpdated)[0];
            Validator.assertNotNull(scmRpcListener);

            let cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            Validator.assertNull(cachedCap);

            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, appServicesCapabilities);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            Validator.assertNotNull(cachedCap);

            Validator.assertEquals(cachedCap, appServicesCapabilities);
            Validator.assertNull(cachedCap.getAppServices()[0].getUpdatedAppServiceRecord().getServiceID());

            const addServiceID = createAppServiceCapability(SDL.rpc.enums.AppServiceType.NAVIGATION, baseName, baseID);
            const serviceIdASC = new SDL.rpc.structs.AppServicesCapabilities();
            serviceIdASC.setAppServices([addServiceID]);

            let systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, serviceIdASC);

            let onSystemCapabilityUpdated = new SDL.rpc.messages.OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            Validator.assertNotNull(cachedCap);

            Validator.assertEquals(cachedCap.getAppServices()[0].getUpdatedAppServiceRecord().getServiceID(), baseID);

            appServicesCapabilities.updateAppServices([addServiceID]);
            Validator.assertEquals(serviceIdASC.getAppServices()[0].getUpdatedAppServiceRecord().getServiceID(), appServicesCapabilities.getAppServices()[0].getUpdatedAppServiceRecord().getServiceID());

            Validator.assertEquals(cachedCap, appServicesCapabilities);

            const newServiceName = createAppServiceCapability(SDL.rpc.structs.AppServiceType.NAVIGATION, 'TestNav', baseID);
            const newServiceNameASC = new SDL.rpc.structs.AppServicesCapabilities();
            newServiceNameASC.setAppServices([newServiceName]);

            systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, newServiceNameASC);

            onSystemCapabilityUpdated = new SDL.rpc.messages.OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            Validator.assertNotNull(cachedCap);
            Validator.assertEquals(cachedCap.getAppServices().length, 1);

            const newService = createAppServiceCapability(SDL.rpc.enums.AppServiceType.NAVIGATION, 'NewNav', 'eeeeeeeee');
            const newServiceASC = new SDL.rpc.structs.AppServicesCapabilities();
            newServiceASC.setAppServices([newService]);

            systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, newServiceASC);

            onSystemCapabilityUpdated = new SDL.rpc.messages.OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            Validator.assertNotNull(cachedCap);
            Validator.assertEquals(cachedCap.getAppServices().length, 2);

            const removedService = createAppServiceCapability(SDL.rpc.enums.AppServiceType.NAVIGATION, 'NewNav', 'eeeeeeeee');
            removedService.setUpdateReason(SDL.rpc.enums.ServiceUpdateReason.REMOVED);
            const removedServiceASC = new SDL.rpc.structs.AppServicesCapabilities();
            removedServiceASC.setAppServices([removedService]);

            systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, removedServiceASC);

            onSystemCapabilityUpdated = new SDL.rpc.messages.OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            Validator.assertNotNull(cachedCap);
            Validator.assertEquals(cachedCap.getAppServices().length, 1);

            done();
        });

        it('testOnSystemCapabilityUpdatedOverwrite', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const scmRpcListener = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.OnSystemCapabilityUpdated)[0];
            Validator.assertNotNull(scmRpcListener);
            scm.setPhoneCapability(Test.GENERAL_PHONECAPABILITY);
            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL, Test.GENERAL_PHONECAPABILITY);


            const phoneCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL);
            Validator.assertNotNull(phoneCapability);
            Validator.assertEquals(phoneCapability, Test.GENERAL_PHONECAPABILITY);

            phoneCapability.setDialNumberEnabled(!Test.GENERAL_PHONECAPABILITY.getDialNumberEnabled()); // Flip it
            const systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL, phoneCapability);
            const onSystemCapabilityUpdated = new SDL.rpc.messages.OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener(onSystemCapabilityUpdated);

            const phoneCapabilityUpdated = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL);
            Validator.assertNotNull(phoneCapabilityUpdated);
            Validator.assertTrue(!phoneCapabilityUpdated.getDialNumberEnabled());
            Validator.assertEquals(phoneCapability, phoneCapabilityUpdated);
            done();
        });

        it('testOnSetDisplayLayout', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const dlRpcListener = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.SetDisplayLayout)[0];
            Validator.assertNotNull(dlRpcListener);

            const newLayout = new SDL.rpc.messages.SetDisplayLayoutResponse();
            newLayout.setDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES);
            newLayout.setButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST);
            newLayout.setSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST);
            newLayout.setPresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES);
            newLayout.setSuccess(true);
            newLayout.setResultCode(SDL.rpc.enums.Result.SUCCESS);

            dlRpcListener(newLayout);

            const appliedCaps = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAY);
            Validator.assertNotNull(appliedCaps);
            Validator.assertTrue(Validator.validateDisplayCapabilities(newLayout.getDisplayCapabilities(), appliedCaps));

            const convertedCaps = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAYS);
            Validator.assertNotNull(convertedCaps);
            const testCaps = createDisplayCapabilityList(newLayout.getDisplayCapabilities(), newLayout.getButtonCapabilities(), newLayout.getSoftButtonCapabilities());
            Validator.assertTrue(Validator.validateDisplayCapabilityList(convertedCaps, testCaps));

            const matchWindowCapability = testCaps[0].getWindowCapabilities()[0];
            const testWindowCapability = scm.getDefaultMainWindowCapability();
            Validator.assertTrue(Validator.validateWindowCapability(matchWindowCapability, testWindowCapability));
            Validator.assertNull(scm.getWindowCapability(42));
            done();
        });

        it('testManagerBeforeDisplayUpdate', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);

            Validator.assertNull(scm.getDefaultMainWindowCapability());
            Validator.assertNull(scm.getWindowCapability(SDL.rpc.enums.PredefinedWindows.DEFAULT_WINDOW));
            Validator.assertNull(scm.getWindowCapability(SDL.rpc.enums.PredefinedWindows.PRIMARY_WIDGET));

            done();
        });

        it('testSyncNonMediaBug', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const dlRpcListeners = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.SetDisplayLayout);

            const displayCapabilities = new SDL.rpc.structs.DisplayCapabilities();
            displayCapabilities.setGraphicSupported(true);
            const templatesAvailable = [];
            templatesAvailable.push("NON_MEDIA");
            templatesAvailable.push("MEDIA");
            displayCapabilities.setTemplatesAvailable(templatesAvailable);

            const newLayout = new SDL.rpc.messages.SetDisplayLayoutResponse();
            newLayout.setDisplayCapabilities(displayCapabilities);
            newLayout.setSuccess(true);
            newLayout.setResultCode(SDL.rpc.enums.Result.SUCCESS);
            dlRpcListeners.forEach(dl => dl(newLayout));

            const windowCapability = scm.getDefaultMainWindowCapability();
            Validator.assertTrue(windowCapability.getTemplatesAvailable().includes("NON-MEDIA"));
            done();
        });

        it('testFixingIncorrectCapabilities', function (done) {
            let setDisplayLayoutResponse;

            const registerAppInterFaceCapabilities = new SDL.rpc.structs.DisplayCapabilities()
                .setImageFields([new SDL.rpc.structs.ImageField(SDL.rpc.enums.ImageFieldName.graphic, [SDL.rpc.enums.FileType.GRAPHIC_PNG])]);

            const setDisplayLayoutCapabilities = new SDL.rpc.structs.DisplayCapabilities()
                .setImageFields([]);

            sdlManager._lifecycleManager._initialMediaCapabilities = registerAppInterFaceCapabilities;

            // Test switching to MEDIA template - Capabilities in setDisplayLayoutResponse should be replaced with the ones from RAIR
            sdlManager._lifecycleManager._lastDisplayLayoutRequestTemplate = SDL.rpc.enums.PredefinedLayout.MEDIA;
            setDisplayLayoutResponse = new SDL.rpc.messages.SetDisplayLayoutResponse()
                .setDisplayCapabilities(setDisplayLayoutCapabilities);
            sdlManager._lifecycleManager.fixIncorrectDisplayCapabilities(setDisplayLayoutResponse);
            Validator.assertEquals(registerAppInterFaceCapabilities, setDisplayLayoutResponse.getDisplayCapabilities());

            // Test switching to non-MEDIA template - Capabilities in setDisplayLayoutResponse should not be altered
            sdlManager._lifecycleManager._lastDisplayLayoutRequestTemplate = SDL.rpc.enums.PredefinedLayout.TEXT_WITH_GRAPHIC;
            setDisplayLayoutResponse = new SDL.rpc.messages.SetDisplayLayoutResponse()
                .setDisplayCapabilities(setDisplayLayoutCapabilities);
            sdlManager._lifecycleManager.fixIncorrectDisplayCapabilities(setDisplayLayoutResponse);
            Validator.assertEquals(setDisplayLayoutCapabilities, setDisplayLayoutResponse.getDisplayCapabilities());

            done();
        });
    });
};
