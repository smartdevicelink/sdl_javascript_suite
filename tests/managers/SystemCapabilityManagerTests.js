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

        function createDisplayCapabilityList(display = null,button, softButton) {
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

        function createDisplayCapabilities(displayName,defaultMainWindow) {
            const convertedCapabilities = new SDL.rpc.structs.DisplayCapabilities();
            convertedCapabilities.setDisplayType(SDL.rpc.enums.DisplayType.SDL_GENERIC); //deprecated but it is mandatory...
            convertedCapabilities.setDisplayName(displayName);
            convertedCapabilities.setTextFields(defaultMainWindow.getTextFields());
            convertedCapabilities.setImageFields(defaultMainWindow.getImageFields());
            convertedCapabilities.setTemplatesAvailable(defaultMainWindow.getTemplatesAvailable());
            convertedCapabilities.setNumCustomPresetsAvailable(defaultMainWindow.getNumCustomPresetsAvailable());
            convertedCapabilities.setMediaClockFormats([MediaClockFormat]); // mandatory field but can be empty
            convertedCapabilities.setGraphicSupported(defaultMainWindow.getImageTypeSupported().contains(ImageType.DYNAMIC));

            return convertedCapabilities;
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

        it('testGetVSCapability', function (done) {
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

            const referenceCapability = cap;
            const capability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);

            //Raed: Need to add validateVideoStreamingCapability
            //Validator.assertEquals(Validator.validateVideoStreamingCapability(referenceCapability.getVideoStreamingCapability(),capability));

            done();
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
               .callsFake(createOnSendGetSystemCapabilityAnswer(true, null)); 
            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);
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
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, null)); 
            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);
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
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, null));
            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);
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

        it('testAddOnSystemCapabilityListenerWithSubscriptionsSupportedAndCapabilityCached', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(6)
                .setMinorVersion(0)
                .setPatchVersion(0);
            
        /*    when(internalInterface.getSdlMsgVersion()).thenReturn(sdlMsgVersion);
        SystemCapabilityManager scm = new SystemCapabilityManager(internalInterface);
        scm.setCapability(SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);*/

         /*   const stub = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(function () {
                    const responseSuccess = new SDL.rpc.messages.OnHMIStatus({
                        functionName: SDL.rpc.enums.FunctionID.OnHMIStatus,
                    })
                        .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_NONE); //Raed: Need FULL
                    lifecycleManager._handleRpc(responseSuccess);
                    return new Promise((resolve, reject) => {
                        resolve(responseSuccess);
                    });
                });

            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);   
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });


            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);

*/
            // Add listener1
            // When the first listener is added, GetSystemCapability request should go out with subscribe=true
            /*let onSystemCapabilityListener1 //= mock(OnSystemCapabilityListener.class);
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, true));                
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            verify(internalInterface, times(1)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(1)).onCapabilityRetrieved(any(Object.class));


            // Add listener2
            const onSystemCapabilityListener2 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            verify(onSystemCapabilityListener2, times(1)).onCapabilityRetrieved(any(Object.class));


            // Add listener3
            const onSystemCapabilityListener3 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(onSystemCapabilityListener3, times(1)).onCapabilityRetrieved(any(Object.class));


            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);


            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);


            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should go out with subscribe=false
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, false));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(internalInterface, times(2)).sendRPC(any(GetSystemCapability.class));*/
            done();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsSupportedAndCapabilityNotCached', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve')
            
            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(6)
                .setMinorVersion(0)
                .setPatchVersion(0);

            const HMIStatusAnswer = sinon.stub(lifecycleManager, 'addRpcListener')
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

            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING,null);

            // Add listener1
            // When the first listener is added, GetSystemCapability request should go out with subscribe=true
            const onSystemCapabilityListener1 = sdlManager._lifecycleManager;
            //const SystemCapabilityAnswer = sinon.stub(lifecycleManager,'sendRPC')
            //    .callsFake(createOnSendGetSystemCapabilityAnswer(true, true));
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            Validator.verify(lifecycleManager, times(1)).sendRPC(any(GetSystemCapability.class));
            Validator.verify(onSystemCapabilityListener1, times(1)).onCapabilityRetrieved(any(Object.class));


            // Add listener2
            const onSystemCapabilityListener2 = sdlManager._lifecycleManager;
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            verify(onSystemCapabilityListener2, times(1)).onCapabilityRetrieved(any(Object.class));


            // Add listener3
            const onSystemCapabilityListener3 = sdlManager._lifecycleManager;
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(onSystemCapabilityListener3, times(1)).onCapabilityRetrieved(any(Object.class));


            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);


            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);


            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should go out with subscribe=false
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, false));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(internalInterface, times(2)).sendRPC(any(GetSystemCapability.class));
            done();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsNotSupportedAndCapabilityCached', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(5)
                .setMinorVersion(0)
                .setPatchVersion(0);

            const HMIStatusAnswer = sinon.stub(lifecycleManager, 'addRpcListener')
                .callsFake(setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL));  
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });
            


            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);


            // Add listener1
            // When the first listener is added, GetSystemCapability request should not go out because subscription is not supported and the capability is cached
            let onSystemCapabilityListener1 = new OnSystemCapabilityListener();
            const SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, true));
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            verify(internalInterface, times(0)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(1)).onCapabilityRetrieved(any(Object.class));


            // Add listener2
            const onSystemCapabilityListener2 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SSDL.rpc.enums.ystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            verify(onSystemCapabilityListener2, times(1)).onCapabilityRetrieved(any(Object.class));


            // Add listener3
            const onSystemCapabilityListener3 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(onSystemCapabilityListener3, times(1)).onCapabilityRetrieved(any(Object.class));

            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);

            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);

            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should not go out because subscription is not supported
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, false));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(internalInterface, times(0)).sendRPC(any(GetSystemCapability.class));
            done();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsNotSupportedAndCapabilityNotCached', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(5)
                .setMinorVersion(0)
                .setPatchVersion(0);

            //Raed
            const HMIStatusAnswer = sinon.stub(lifecycleManager,'addOnRPCListener')
                .callsFake(createOnHMIStatusAnswer(HMILevel.HMI_FULL)); 
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });

            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, null);

            // Add listener1
            // When the first listener is added, GetSystemCapability request should out because because capability is not cached
            let onSystemCapabilityListener1 = new OnSystemCapabilityListener();
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, false));
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            verify(internalInterface, times(1)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(1)).onCapabilityRetrieved(any(Object.class));


            // Add listener2
            const onSystemCapabilityListener2 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            verify(onSystemCapabilityListener2, times(1)).onCapabilityRetrieved(any(Object.class));


            // Add listener3
            const onSystemCapabilityListener3 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(onSystemCapabilityListener3, times(1)).onCapabilityRetrieved(any(Object.class));


            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);


            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);


            // Remove listener3
            // When the last listener is removed, GetSystemCapability request should not go out because subscription is not supported
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, false));
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(internalInterface, times(1)).sendRPC(any(GetSystemCapability.class));
            done();
        });

        it('testAddOnSystemCapabilityListenerThenGetCapabilityWhenSubscriptionsAreNotSupported', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const sdlMsgVersion = new SDL.rpc.structs.SdlMsgVersion()
                .setMajorVersion(5)
                .setMinorVersion(0)
                .setPatchVersion(0);

            //Raed
            const HMIStatusAnswer = sinon.stub(lifecycleManager,'addOnRPCListener')
                .callsFake(createOnHMIStatusAnswer(HMILevel.HMI_FULL)); 
            const versionStub = sinon.stub(lifecycleManager, 'getSdlMsgVersion')
                .callsFake(function () {
                    return new SDL.rpc.structs.SdlMsgVersion()
                        .setMajorVersion(6)
                        .setMinorVersion(0)
                        .setPatchVersion(0);
                });


            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, videoStreamingCapability);

            // Add listener1
            // When the first listener is added, GetSystemCapability request should go out with subscribe=false
            let onSystemCapabilityListener1 //= mock(OnSystemCapabilityListener.class);
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, false));
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);
            verify(internalInterface, times(0)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(1)).onCapabilityRetrieved(any(Object.class));


            // Get Capability (should notify listener1 again)
            scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            verify(internalInterface, times(1)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(2)).onCapabilityRetrieved(any(Object.class));


            // Add listener2
            const onSystemCapabilityListener2 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);
            verify(onSystemCapabilityListener2, times(1)).onCapabilityRetrieved(any(Object.class));


            // Get Capability (should notify listener1 & listener2 again)
            scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            verify(internalInterface, times(2)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(3)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener2, times(2)).onCapabilityRetrieved(any(Object.class));


            // Add listener3
            const onSystemCapabilityListener3 = mock(OnSystemCapabilityListener.class);
            scm.addOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(onSystemCapabilityListener3, times(1)).onCapabilityRetrieved(any(Object.class));


            // Get Capability (should notify listener1 & listener2 & listener3 again)
            scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            verify(internalInterface, times(3)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(4)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener2, times(3)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener3, times(2)).onCapabilityRetrieved(any(Object.class));


            // Remove listener1
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener1);


            // Get Capability (should notify listener2 & listener3 again)
            scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            verify(internalInterface, times(4)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(4)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener2, times(4)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener3, times(3)).onCapabilityRetrieved(any(Object.class));


            // Remove listener2
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener2);


            // Get Capability (should notify listener3 again)
            scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            verify(internalInterface, times(5)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(4)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener2, times(4)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener3, times(4)).onCapabilityRetrieved(any(Object.class));


            // Remove listener3
            scm.removeOnSystemCapabilityListener(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING, onSystemCapabilityListener3);
            verify(internalInterface, times(5)).sendRPC(any(GetSystemCapability.class));


            // Get Capability (should not notify any listener again because they are all removed)
            scm.getCapability(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);
            verify(internalInterface, times(6)).sendRPC(any(GetSystemCapability.class));
            verify(onSystemCapabilityListener1, times(4)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener2, times(4)).onCapabilityRetrieved(any(Object.class));
            verify(onSystemCapabilityListener3, times(4)).onCapabilityRetrieved(any(Object.class));
            done();
        });

        it('testGetAndAddListenerForDisplaysCapability', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);

            let onSystemCapabilityListener;
            let retrievedCapability;


            // Test case 1 (capability cached, listener not null, forceUpdate true)
            //Raed
            const HMIStatusAnswer = sinon.stub(lifecycleManager,'addOnRPCListener')
                .callsFake(createOnHMIStatusAnswer(HMILevel.HMI_FULL)); 
            scm = new SDL.manager.SystemCapabilityManager(lifecycleManager);
            onSystemCapabilityListener = mock(OnSystemCapabilityListener.class);
            SystemCapabilityAnswer = sinon.stub(internalInterface,'sendRPC')
                .callsFake(createOnSendGetSystemCapabilityAnswer(true, null));
            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.DISPLAYS, new DisplayCapabilities());
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
            
            //Raed
            const textField = SDL.rpc.struct.TextField;
            textField.setName(TextFieldName.mainField1);
            displayCapabilities.setTextFields([textField]);
            raiResponse.setDisplayCapabilities(displayCapabilities);
            raiResponse.setSuccess(true);
            scm.parseRAIResponse(raiResponse);

            const windowCapability = scm.getDefaultMainWindowCapability();
            Validator.assertNull(windowCapability.getTemplatesAvailable());

            const templates = [];
            templates.push("NON_MEDIA");
            displayCapabilities.setTemplatesAvailable(templates);
            scm.parseRAIResponse(raiResponse);
            windowCapability = scm.getDefaultMainWindowCapability();
            Validator.assertTrue(windowCapability.getTemplatesAvailable().contains("NON-MEDIA"));
            done();
        });

        it('testListConversion', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);
            //console.log(scm.getDefaultMainWindowCapability())
            //console.log(scm.getDefaultMainWindowCapability().getSoftButtonCapabilities())
            const capability = scm.getCapability(scm.getDefaultMainWindowCapability().getSoftButtonCapabilities());
            Validator.assertNotNull(capability);
            let list = [capability];
            Validator.assertNotNull(list);

            capability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.SOFTBUTTON);
            Validator.assertNotNull(capability);
            list = [capability];
            Validator.assertNotNull(list);
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

            Validator.assertNull(scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES));

            /* PERFORM A NOTIFICATION SEND THROUGH THE SCM */
            const addServiceID = SDL.rpc.struct.AppServiceFactory.createAppServiceCapability(AppServiceType.NAVIGATION, "test", "3453", true, null);
            const serviceIdASC = new AppServicesCapabilities();
            serviceIdASC.setAppServices([addServiceID]);

            const systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, serviceIdASC);

            const onSystemCapabilityUpdated = new OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            Validator.assertNotNull(scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES));
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
            //Raed: how
            //systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.DISPLAYS, newCaps);

            const onSystemCapabilityUpdated = new SDL.rpc.messages.OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

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

            let baseName = "NavTest";
            let baseID = "37F98053AE";
            
            //Raed
            const capability1 = new SDL.rpc.structs.AppServiceCapability()
                .setUpdateReason(SDL.rpc.enums.AppServiceType.NAVIGATION)
                .setUpdatedAppServiceRecord(baseName);

            const appServicesCapabilities = new SDL.rpc.struct.AppServicesCapabilities();
            appServicesCapabilities.setAppServices([capability1]);

            assertNotNull(lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.OnSystemCapabilityUpdated));
            const scmRpcListener = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.OnSystemCapabilityUpdated)[0];
            assertNotNull(scmRpcListener);


            const cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            assertNull(cachedCap);


            scm.setCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, appServicesCapabilities);
     
            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            assertNotNull(cachedCap);
       
            assertEquals(cachedCap, appServicesCapabilities);
            assertNull(cachedCap.getAppServices().get(0).getUpdatedAppServiceRecord().getServiceID());

          
            const addServiceID = AppServiceFactory.createAppServiceCapability(AppServiceType.NAVIGATION, baseName, baseID);
            const serviceIdASC = new AppServicesCapabilities();
            serviceIdASC.setAppServices([addServiceID]);

            const systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, serviceIdASC);

            const onSystemCapabilityUpdated = new OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            assertNotNull(cachedCap);

            assertTrue(cachedCap.getAppServices().get(0).getUpdatedAppServiceRecord().getServiceID().equals(baseID));

            appServicesCapabilities.updateAppServices(Collections.singletonList(addServiceID));
            assertTrue(serviceIdASC.getAppServices()[0].getUpdatedAppServiceRecord().getServiceID().equalsIgnoreCase(appServicesCapabilities.getAppServices()[0].getUpdatedAppServiceRecord().getServiceID()));

            assertEquals(cachedCap, appServicesCapabilities);


         
            const newServiceName = AppServiceFactory.createAppServiceCapability(AppServiceType.NAVIGATION, "TestNav", baseID);
            const newServiceNameASC = new AppServicesCapabilities();
            newServiceNameASC.setAppServices(Collections.singletonList(newServiceName));

            systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, newServiceNameASC);

            onSystemCapabilityUpdated = new OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            assertNotNull(cachedCap);
            assertEquals(cachedCap.getAppServices().size(), 1);

            const newService = AppServiceFactory.createAppServiceCapability(AppServiceType.NAVIGATION, "NewNav", "eeeeeeeee");
            const newServiceASC = new AppServicesCapabilities();
            newServiceASC.setAppServices(Collections.singletonList(newService));

            systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, newServiceASC);

            onSystemCapabilityUpdated = new OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            assertNotNull(cachedCap);
            assertEquals(cachedCap.getAppServices().size(), 2);

         
            const removedService = AppServiceFactory.createAppServiceCapability(AppServiceType.NAVIGATION, "NewNav", "eeeeeeeee");
            removedService.setUpdateReason(ServiceUpdateReason.REMOVED);
            const removedServiceASC = new AppServicesCapabilities();
            removedServiceASC.setAppServices(Collections.singletonList(removedService));

            systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES, removedServiceASC);

            onSystemCapabilityUpdated = new OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener.onReceived(onSystemCapabilityUpdated);

            cachedCap = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.APP_SERVICES);
            assertNotNull(cachedCap);
            assertEquals(cachedCap.getAppServices().length, 1);

            done();
        });

        it('testOnSystemCapabilityUpdatedOverwrite', function (done) {
            const sdlManager = appClient._sdlManager;
            const lifecycleManager = sdlManager._lifecycleManager;
            const scm = createSampleManager(lifecycleManager);

            const scmRpcListener = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.OnSystemCapabilityUpdated)[0];
            Validator.assertNotNull(scmRpcListener);
            //Raed
            scm.setPhoneCapability(Test.GENERAL_PHONECAPABILITY);
            scm._setCapability(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL, Test.GENERAL_PHONECAPABILITY);


            const phoneCapability = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL);
            Validator.assertNotNull(phoneCapability);
            Validator.assertEquals(phoneCapability, TestValues.GENERAL_PHONECAPABILITY);

            phoneCapability.setDialNumberEnabled(!TestValues.GENERAL_PHONECAPABILITY.getDialNumberEnabled()); //Flip it
            const systemCapability = new SDL.rpc.structs.SystemCapability();
            systemCapability.setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL);
            systemCapability.setCapabilityForType(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL, phoneCapability);
            const onSystemCapabilityUpdated = new OnSystemCapabilityUpdated();
            onSystemCapabilityUpdated.setSystemCapability(systemCapability);

            scmRpcListener(onSystemCapabilityUpdated);

            const phoneCapabilityUpdated = scm.getCapability(SDL.rpc.enums.SystemCapabilityType.PHONE_CALL);
            Validator.assertNotNull(phoneCapabilityUpdated);
            Validator.assertFalse(phoneCapabilityUpdated.getDialNumberEnabled());
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

            //Raed
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

            const dlRpcListener = lifecycleManager._rpcListeners.get(SDL.rpc.enums.FunctionID.SetDisplayLayout)[0];

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
            
            dlRpcListener(newLayout);
            //Raed
            //Validator.assertTrue(scm.getDefaultMainWindowCapability().getTemplatesAvailable().includes("NON-MEDIA"));
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
