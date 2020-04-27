const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const RegisterAppInterface = SDL.rpc.messages.RegisterAppInterface;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('RegisterAppInterfaceTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new RegisterAppInterface();
            msg.setSdlMsgVersion(Test.GENERAL_SDLMSGVERSION);
            msg.setAppName(Test.GENERAL_STRING);
            msg.setTtsName(Test.GENERAL_TTSCHUNK_LIST);
            msg.setNgnMediaScreenAppName(Test.GENERAL_STRING);
            msg.setVrSynonyms(Test.GENERAL_STRING_LIST);
            msg.setIsMediaApplication(Test.GENERAL_BOOLEAN);
            msg.setLanguageDesired(Test.GENERAL_LANGUAGE);
            msg.setHmiDisplayLanguageDesired(Test.GENERAL_LANGUAGE);
            msg.setAppHMIType(Test.GENERAL_APPHMITYPE_LIST);
            msg.setHashID(Test.GENERAL_STRING);
            msg.setDeviceInfo(Test.GENERAL_DEVICEINFO);
            // appID is set based on the fullAppID
            msg.setFullAppId(Test.GENERAL_FULL_APP_ID);
            msg.setDayColorScheme(Test.GENERAL_DAYCOLORSCHEME);
            msg.setNightColorScheme(Test.GENERAL_NIGHTCOLORSCHEME);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[RegisterAppInterface.KEY_SDL_MSG_VERSION] = Test.JSON_SDLMSGVERSION;
            expectedParameters[RegisterAppInterface.KEY_APP_NAME] = Test.GENERAL_STRING;
            expectedParameters[RegisterAppInterface.KEY_NGN_MEDIA_SCREEN_APP_NAME] = Test.GENERAL_STRING;
            expectedParameters[RegisterAppInterface.KEY_APP_ID] = Test.GENERAL_APP_ID;
            expectedParameters[RegisterAppInterface.KEY_FULL_APP_ID] = Test.GENERAL_FULL_APP_ID;
            expectedParameters[RegisterAppInterface.KEY_LANGUAGE_DESIRED] = Test.GENERAL_LANGUAGE;
            expectedParameters[RegisterAppInterface.KEY_HMI_DISPLAY_LANGUAGE_DESIRED] = Test.GENERAL_LANGUAGE;
            expectedParameters[RegisterAppInterface.KEY_HASH_ID] = Test.GENERAL_STRING;
            expectedParameters[RegisterAppInterface.KEY_TTS_NAME] = Test.JSON_TTSCHUNKS;
            expectedParameters[RegisterAppInterface.KEY_VR_SYNONYMS] = Test.GENERAL_STRING_LIST;
            expectedParameters[RegisterAppInterface.KEY_APP_HMI_TYPE] = Test.GENERAL_APPHMITYPE_LIST;
            expectedParameters[RegisterAppInterface.KEY_IS_MEDIA_APPLICATION] = Test.GENERAL_BOOLEAN;
            expectedParameters[RegisterAppInterface.KEY_DEVICE_INFO] = Test.JSON_DEVICEINFO;
            expectedParameters[RegisterAppInterface.KEY_DAY_COLOR_SCHEME] = Test.JSON_DAYCOLORSCHEME;
            expectedParameters[RegisterAppInterface.KEY_NIGHT_COLOR_SCHEME] = Test.JSON_NIGHTCOLORSCHEME;
            return expectedParameters;
        };

        this.getMessageType = function () {
            return MessageType.request;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.RegisterAppInterface);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        let rpcMessage = this.msg;
        const testVersion = rpcMessage.getSdlMsgVersion();
        const testName = rpcMessage.getAppName();
        const testTts = rpcMessage.getTtsName();
        const testNgnName = rpcMessage.getNgnMediaScreenAppName();
        const testSynonyms = rpcMessage.getVrSynonyms();
        const testMedia = rpcMessage.getIsMediaApplication();
        const testLang = rpcMessage.getLanguageDesired();
        const testHmiLang = rpcMessage.getHmiDisplayLanguageDesired();
        const testApps = rpcMessage.getAppHMIType();
        const testHashId = rpcMessage.getHashID();
        const testDeviceInfo = rpcMessage.getDeviceInfo();
        const testAppId = rpcMessage.getAppId();
        const testFullAppId = rpcMessage.getFullAppId();
        const testDayColorScheme = rpcMessage.getDayColorScheme();
        const testNightColorScheme = rpcMessage.getNightColorScheme();


        // Valid Tests
        Validator.validateSdlMsgVersion(Test.GENERAL_SDLMSGVERSION, testVersion);
        Validator.assertEquals(Test.GENERAL_STRING, testName);
        Validator.validateTtsChunks(Test.GENERAL_TTSCHUNK_LIST, testTts);
        Validator.assertEquals(Test.GENERAL_STRING, testNgnName);
        Validator.assertEquals(Test.GENERAL_STRING_LIST, testSynonyms);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testMedia);
        Validator.assertEquals(Test.GENERAL_LANGUAGE, testLang);
        Validator.assertEquals(Test.GENERAL_LANGUAGE, testHmiLang);
        Validator.assertEquals(Test.GENERAL_APPHMITYPE_LIST, testApps);
        Validator.assertEquals(Test.GENERAL_STRING, testHashId);
        Validator.validateDeviceInfo(Test.GENERAL_DEVICEINFO, testDeviceInfo);
        Validator.assertEquals(Test.GENERAL_APP_ID, testAppId);
        Validator.assertEquals(Test.GENERAL_FULL_APP_ID, testFullAppId);
        Validator.validateTemplateColorScheme(Test.GENERAL_DAYCOLORSCHEME, testDayColorScheme);
        Validator.validateTemplateColorScheme(Test.GENERAL_NIGHTCOLORSCHEME, testNightColorScheme);

        // Invalid/Null Tests
        rpcMessage = new RegisterAppInterface();
        // TODO correlationId should be set automatically during construction using a correlation id generator.
        rpcMessage.setCorrelationId(Test.GENERAL_INT);
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(FunctionID.keyForValue(FunctionID.RegisterAppInterface),
            MessageType.request,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getSdlMsgVersion());
        Validator.assertNullOrUndefined(rpcMessage.getAppName());
        Validator.assertNullOrUndefined(rpcMessage.getTtsName());
        Validator.assertNullOrUndefined(rpcMessage.getNgnMediaScreenAppName());
        Validator.assertNullOrUndefined(rpcMessage.getVrSynonyms());
        Validator.assertNullOrUndefined(rpcMessage.getIsMediaApplication());
        Validator.assertNullOrUndefined(rpcMessage.getLanguageDesired());
        Validator.assertNullOrUndefined(rpcMessage.getHmiDisplayLanguageDesired());
        Validator.assertNullOrUndefined(rpcMessage.getAppHMIType());
        Validator.assertNullOrUndefined(rpcMessage.getHashID());
        Validator.assertNullOrUndefined(rpcMessage.getDeviceInfo());
        Validator.assertNullOrUndefined(rpcMessage.getAppId());
        Validator.assertNullOrUndefined(rpcMessage.getFullAppId());
        Validator.assertNullOrUndefined(rpcMessage.getDayColorScheme());
        Validator.assertNullOrUndefined(rpcMessage.getNightColorScheme());

        done();
    });
});