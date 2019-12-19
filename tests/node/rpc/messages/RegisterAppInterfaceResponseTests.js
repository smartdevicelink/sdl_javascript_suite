const SDL = require('./../../../../lib/js/dist/SDL.js');
const RegisterAppInterfaceResponse = SDL.rpc.messages.RegisterAppInterfaceResponse;
const FunctionID = SDL.rpc.enums.FunctionID;
const RpcType = SDL.rpc.enums.RpcType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

const assertTrue = Validator.assertTrue.bind(Validator);
const assertEquals = Validator.assertEquals.bind(Validator);
const assertNull = Validator.assertNull.bind(Validator);
const assertNullOrUndefined = Validator.assertNullOrUndefined.bind(Validator);
const assertNotNull = Validator.assertNotNull.bind(Validator);

const testNullBase = Validator.testNullBase.bind(Validator, 
    FunctionID.keyForValue(FunctionID.RegisterAppInterface), 
    RpcType.RESPONSE);


describe('RegisterAppInterfaceResponseTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new RegisterAppInterfaceResponse();

            msg.setSdlMsgVersion(Test.GENERAL_SDLMSGVERSION);
            msg.setLanguage(Test.GENERAL_LANGUAGE);
            msg.setHmiDisplayLanguage(Test.GENERAL_LANGUAGE);
            msg.setDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES);
            msg.setPresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES);
            msg.setVehicleType(Test.GENERAL_VEHICLETYPE);
            msg.setButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST);
            msg.setSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST);
            msg.setAudioPassThruCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST);
            msg.setPcmStreamCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES);
            msg.setHmiZoneCapabilities(Test.GENERAL_HMIZONECAPABILITIES_LIST);
            msg.setSpeechCapabilities(Test.GENERAL_SPEECHCAPABILITIES_LIST);
            msg.setVrCapabilities(Test.GENERAL_VRCAPABILITIES_LIST);
            msg.setPrerecordedSpeech(Test.GENERAL_PRERECORDEDSPEECH_LIST);
            msg.setSupportedDiagModes(Test.GENERAL_INTEGER_LIST);
            msg.setIconResumed(Test.GENERAL_BOOLEAN);
            msg.setHMICapabilities(Test.GENERAL_HMICAPABILITIES);

            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};

            expectedParameters[RegisterAppInterfaceResponse.KEY_LANGUAGE] = Test.GENERAL_LANGUAGE;
            expectedParameters[RegisterAppInterfaceResponse.KEY_HMI_DISPLAY_LANGUAGE] = Test.GENERAL_LANGUAGE;
            expectedParameters[RegisterAppInterfaceResponse.KEY_SUPPORTED_DIAG_MODE] = Test.GENERAL_INTEGER_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_SDL_MSG_VERSION] = Test.JSON_SDLMSGVERSION;
            expectedParameters[RegisterAppInterfaceResponse.KEY_VEHICLE_TYPE] = Test.JSON_GENERAL_VEHICLETYPE;
            expectedParameters[RegisterAppInterfaceResponse.KEY_PRESET_BANK_CAPABILITIES] = Test.JSON_PRESETBANKCAPABILITIES;
            expectedParameters[RegisterAppInterfaceResponse.KEY_DISPLAY_CAPABILITIES] = Test.JSON_GENERAL_DISPLAYCAPABILITIES;
            expectedParameters[RegisterAppInterfaceResponse.KEY_BUTTON_CAPABILITIES] = Test.JSON_GENERAL_BUTTON_CAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_SOFT_BUTTON_CAPABILITIES] = Test.JSON_SOFTBUTTONCAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_AUDIO_PASS_THRU_CAPABILITIES] = Test.JSON_AUDIOPASSTHRUCAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_PCM_STREAM_CAPABILITIES] = Test.JSON_AUDIOPASSTHRUCAPABILITIES;
            expectedParameters[RegisterAppInterfaceResponse.KEY_SPEECH_CAPABILITIES] = Test.GENERAL_SPEECHCAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_VR_CAPABILITIES] = Test.GENERAL_VRCAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_HMI_ZONE_CAPABILITIES] = Test.GENERAL_HMIZONECAPABILITIES_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_PRERECORDED_SPEECH] = Test.GENERAL_PRERECORDEDSPEECH_LIST;
            expectedParameters[RegisterAppInterfaceResponse.KEY_ICON_RESUMED] = Test.GENERAL_BOOLEAN;
            expectedParameters[RegisterAppInterfaceResponse.KEY_HMI_CAPABILITIES] = Test.GENERAL_HMICAPABILITIES.getParameters();

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
        const testSupportedDiagModes =  msg.getSupportedDiagModes();
        const testPrerecordedSpeech  =  msg.getPrerecordedSpeech();
        const  testVrCapabilities     =  msg.getVrCapabilities();
        const testSpeechCapabilities =  msg.getSpeechCapabilities();
        const testHmiZoneCapabilities =  msg.getHmiZoneCapabilities();
        const testSoftButtonCapabilities =  msg.getSoftButtonCapabilities();
        const testButtonCapabilities =  msg.getButtonCapabilities();
        const testVehicleType =  msg.getVehicleType();
        const testPbc =  msg.getPresetBankCapabilities();
        const testDc =  msg.getDisplayCapabilities();
        const testHmiLang =  msg.getHmiDisplayLanguage();
        const testLang =  msg.getLanguage();
        const testMsgVersion =  msg.getSdlMsgVersion();
        const testAptc =  msg.getAudioPassThruCapabilities();
        const testPcmStream =  msg.getPcmStreamCapabilities();
        const testIconResumed =  msg.getIconResumed();
		
        // Valid Tests
        assertEquals(Test.MATCH, Test.GENERAL_INTEGER_LIST, testSupportedDiagModes);
        assertEquals(Test.MATCH, Test.GENERAL_PRERECORDEDSPEECH_LIST, testPrerecordedSpeech);
        assertEquals(Test.MATCH, Test.GENERAL_VRCAPABILITIES_LIST, testVrCapabilities);
        assertEquals(Test.MATCH, Test.GENERAL_SPEECHCAPABILITIES_LIST, testSpeechCapabilities);
        assertEquals(Test.MATCH, Test.GENERAL_HMIZONECAPABILITIES_LIST, testHmiZoneCapabilities);
        Validator.validateSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST, testSoftButtonCapabilities);


        Validator.validateButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST, testButtonCapabilities);
        Validator.validateVehicleType(Test.GENERAL_VEHICLETYPE, testVehicleType);
        Validator.validatePresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES, testPbc);
        Validator.validateDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES, testDc);
        assertEquals(Test.MATCH, Test.GENERAL_LANGUAGE, testHmiLang);
        assertEquals(Test.MATCH, Test.GENERAL_LANGUAGE, testLang);
        Validator.validateSdlMsgVersion(Test.GENERAL_SDLMSGVERSION, testMsgVersion);
        Validator.validateAudioPassThruCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST, testAptc);
        Validator.validatePcmStreamCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES, testPcmStream);
        assertEquals(Test.MATCH, Test.GENERAL_BOOLEAN, testIconResumed);

        // Invalid/Null Tests
        msg = new RegisterAppInterfaceResponse();
        assertNotNull(Test.NOT_NULL, msg);
        testNullBase(msg);

        assertNullOrUndefined(Test.NULL, msg.getSdlMsgVersion());
        assertNullOrUndefined(Test.NULL, msg.getLanguage());
        assertNullOrUndefined(Test.NULL, msg.getHmiDisplayLanguage());
        assertNullOrUndefined(Test.NULL, msg.getDisplayCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getPresetBankCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getVehicleType());
        assertNullOrUndefined(Test.NULL, msg.getButtonCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getSoftButtonCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getAudioPassThruCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getPcmStreamCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getHmiZoneCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getSpeechCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getVrCapabilities());
        assertNullOrUndefined(Test.NULL, msg.getPrerecordedSpeech());
        assertNullOrUndefined(Test.NULL, msg.getSupportedDiagModes());
        assertNullOrUndefined(Test.NULL, msg.getIconResumed());

        done();
    });
});