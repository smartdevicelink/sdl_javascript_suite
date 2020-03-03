const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const RegisterAppInterfaceResponse = SDL.rpc.messages.RegisterAppInterfaceResponse;
const FunctionID = SDL.rpc.enums.FunctionID;
const RpcType = SDL.rpc.enums.RpcType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');


describe('RegisterAppInterfaceResponseTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new RegisterAppInterfaceResponse();

            msg.setSdlMsgVersion(Test.GENERAL_SDLMSGVERSION);
            msg.setLanguage(Test.GENERAL_LANGUAGE);
            msg.setHmiDisplayLanguage(Test.GENERAL_LANGUAGE);
            msg.setDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES);
            msg.setButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST);
            msg.setSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST);
            msg.setPresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES);
            msg.setHmiZoneCapabilities(Test.GENERAL_HMIZONECAPABILITIES_LIST);
            msg.setSpeechCapabilities(Test.GENERAL_SPEECHCAPABILITIES_LIST);
            msg.setPrerecordedSpeech(Test.GENERAL_PRERECORDEDSPEECH_LIST);
            msg.setVrCapabilities(Test.GENERAL_VRCAPABILITIES_LIST);
            msg.setAudioPassThruCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST);
            msg.setPcmStreamCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES);
            msg.setVehicleType(Test.GENERAL_VEHICLETYPE);
            msg.setSupportedDiagModes(Test.GENERAL_INTEGER_LIST);
            msg.setHmiCapabilities(Test.GENERAL_HMICAPABILITIES);
            // TODO sdlVersion https://github.com/smartdevicelink/rpc_spec/blob/version/6_0_0/MOBILE_API.xml#L4663 unused?
            msg.setSystemSoftwareVersion(Test.GENERAL_STRING);
            msg.setIconResumed(Test.GENERAL_BOOLEAN);

            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};

            expectedParameters[RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION] = Test.JSON_SDLMSGVERSION;
            expectedParameters[RegisterAppInterfaceResponse.KEY_LANGUAGE] = Test.GENERAL_LANGUAGE;
            expectedParameters[RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE] = Test.GENERAL_LANGUAGE;
            expectedParameters[RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES] = Test.JSON_GENERAL_DISPLAYCAPABILITIES;
            expectedParameters[RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES] = Test.JSON_GENERAL_BUTTON_CAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES] = Test.JSON_SOFTBUTTONCAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES] = Test.JSON_PRESETBANKCAPABILITIES;
            expectedParameters[RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES] = Test.GENERAL_HMIZONECAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES] = Test.GENERAL_SPEECHCAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH] = Test.GENERAL_PRERECORDEDSPEECH_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES] = Test.GENERAL_VRCAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES] = Test.JSON_AUDIOPASSTHRUCAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES] = Test.JSON_AUDIOPASSTHRUCAPABILITIES;
            expectedParameters[RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE] = Test.JSON_GENERAL_VEHICLETYPE;
            expectedParameters[RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODES] = Test.GENERAL_INTEGER_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES] = Test.GENERAL_HMICAPABILITIES.getParameters();
            expectedParameters[RegisterAppInterfaceResponse.KEY_SYSTEM_SOFTWARE_VERSION] = Test.GENERAL_STRING;
            expectedParameters[RegisterAppInterfaceResponse.KEY_ICON_RESUMED] = Test.GENERAL_BOOLEAN;

            return expectedParameters;
        };

        this.getRPCType = function () {
            return RpcType.RESPONSE;
        };

        this.getFunctionName = function () {
            return FunctionID.keyForValue(FunctionID.RegisterAppInterface);
        };
    });

    BaseRpcTests.tests();


    it ('testRpcValues', function (done) {
        let msg = this.msg;
        // Test Values
        const testMsgVersion =  msg.getSdlMsgVersion();
        const testLang =  msg.getLanguage();
        const testHmiLang =  msg.getHmiDisplayLanguage();
        const testDc =  msg.getDisplayCapabilities();
        const testButtonCapabilities =  msg.getButtonCapabilities();
        const testSoftButtonCapabilities =  msg.getSoftButtonCapabilities();
        const testPbc =  msg.getPresetBankCapabilities();
        const testHmiZoneCapabilities =  msg.getHmiZoneCapabilities();
        const testSpeechCapabilities =  msg.getSpeechCapabilities();
        const testPrerecordedSpeech  =  msg.getPrerecordedSpeech();
        const testVrCapabilities     =  msg.getVrCapabilities();
        const testAptc =  msg.getAudioPassThruCapabilities();
        const testPcmStream =  msg.getPcmStreamCapabilities();
        const testVehicleType =  msg.getVehicleType();
        const testSupportedDiagModes =  msg.getSupportedDiagModes();
        const testHmiCapabilities =  msg.getHmiCapabilities();
        const testSystemSoftwareVersion =  msg.getSystemSoftwareVersion();
        const testIconResumed =  msg.getIconResumed();

        // Valid Tests
        Validator.validateSdlMsgVersion(Test.GENERAL_SDLMSGVERSION, testMsgVersion);
        Validator.assertEquals(Test.GENERAL_LANGUAGE, testLang);
        Validator.assertEquals(Test.GENERAL_LANGUAGE, testHmiLang);
        Validator.validateDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES, testDc);
        Validator.validateButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST, testButtonCapabilities);
        Validator.validateSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST, testSoftButtonCapabilities);
        Validator.validatePresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES, testPbc);
        Validator.assertEquals(Test.GENERAL_HMIZONECAPABILITIES_LIST, testHmiZoneCapabilities);
        Validator.assertEquals(Test.GENERAL_SPEECHCAPABILITIES_LIST, testSpeechCapabilities);
        Validator.assertEquals(Test.GENERAL_PRERECORDEDSPEECH_LIST, testPrerecordedSpeech);
        Validator.assertEquals(Test.GENERAL_VRCAPABILITIES_LIST, testVrCapabilities);
        Validator.validateAudioPassThruCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST, testAptc);
        Validator.validatePcmStreamCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES, testPcmStream);
        Validator.validateVehicleType(Test.GENERAL_VEHICLETYPE, testVehicleType);
        Validator.assertEquals(Test.GENERAL_INTEGER_LIST, testSupportedDiagModes);
        Validator.validateHMICapabilities(Test.GENERAL_HMICAPABILITIES, testHmiCapabilities);
        Validator.assertEquals(Test.GENERAL_STRING, testSystemSoftwareVersion);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testIconResumed);

        // Invalid/Null Tests
        msg = new RegisterAppInterfaceResponse();
        Validator.assertNotNull(msg);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.RegisterAppInterface),
            RpcType.RESPONSE,
            msg);

        Validator.assertNullOrUndefined(msg.getSdlMsgVersion());
        Validator.assertNullOrUndefined(msg.getLanguage());
        Validator.assertNullOrUndefined(msg.getHmiDisplayLanguage());
        Validator.assertNullOrUndefined(msg.getDisplayCapabilities());
        Validator.assertNullOrUndefined(msg.getButtonCapabilities());
        Validator.assertNullOrUndefined(msg.getSoftButtonCapabilities());
        Validator.assertNullOrUndefined(msg.getPresetBankCapabilities());
        Validator.assertNullOrUndefined(msg.getHmiZoneCapabilities());
        Validator.assertNullOrUndefined(msg.getSpeechCapabilities());
        Validator.assertNullOrUndefined(msg.getPrerecordedSpeech());
        Validator.assertNullOrUndefined(msg.getVrCapabilities());
        Validator.assertNullOrUndefined(msg.getAudioPassThruCapabilities());
        Validator.assertNullOrUndefined(msg.getPcmStreamCapabilities());
        Validator.assertNullOrUndefined(msg.getVehicleType());
        Validator.assertNullOrUndefined(msg.getSupportedDiagModes());
        Validator.assertNullOrUndefined(msg.getHmiCapabilities());
        Validator.assertNullOrUndefined(msg.getSystemSoftwareVersion());
        Validator.assertNullOrUndefined(msg.getIconResumed());


        done();
    });
});