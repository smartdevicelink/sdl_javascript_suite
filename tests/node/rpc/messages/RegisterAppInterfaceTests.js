const SDL = require('./../../../../lib/js/dist/SDL.js');
const RegisterAppInterface = SDL.rpc.messages.RegisterAppInterface;
const FunctionID = SDL.rpc.enums.FunctionID;
const RpcType = SDL.rpc.enums.RpcType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');


const assertTrue = Validator.assertTrue.bind(Validator);
const assertEquals = Validator.assertEquals.bind(Validator);
const assertNull = Validator.assertNull.bind(Validator);
const assertNotNull = Validator.assertNotNull.bind(Validator);
const testNullBase = Validator.testNullBase.bind(Validator, 
    FunctionID.keyForValue(FunctionID.RegisterAppInterface), 
    RpcType.REQUEST);

describe('RegisterAppInterfaceTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new RegisterAppInterface();
            msg.setSdlMsgVersion(Test.GENERAL_SDLMSGVERSION);
            msg.setAppName(Test.GENERAL_STRING);
            msg.setNgnMediaScreenAppName(Test.GENERAL_STRING);
            msg.setFullAppId(Test.GENERAL_FULL_APP_ID);
            msg.setLanguageDesired(Test.GENERAL_LANGUAGE);
            msg.setHmiDisplayLanguageDesired(Test.GENERAL_LANGUAGE);
            msg.setHashID(Test.GENERAL_STRING);
            msg.setTtsName(Test.GENERAL_TTSCHUNK_LIST);
            msg.setVrSynonyms(Test.GENERAL_STRING_LIST);
            msg.setAppHmiType(Test.GENERAL_APPHMITYPE_LIST);
            msg.setIsMediaApplication(Test.GENERAL_BOOLEAN);
            msg.setDeviceInfo(Test.GENERAL_DEVICEINFO);
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

        this.getRPCType = function () {
            return RpcType.REQUEST;
        };

        this.getFunctionName = function () {
            return FunctionID.keyForValue(FunctionID.RegisterAppInterface);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        let rpcMessage = this.msg;
        const testVersion = rpcMessage.getSdlMsgVersion();
        const testName = rpcMessage.getAppName();
        const testNgnName = rpcMessage.getNgnMediaScreenAppName();
        const testAppId = rpcMessage.getAppId();
        const testFullAppId = rpcMessage.getFullAppId();
        const testLang = rpcMessage.getLanguageDesired();
        const testHmiLang = rpcMessage.getHmiDisplayLanguageDesired();
        const testHashId = rpcMessage.getHashID();
        const testTts = rpcMessage.getTtsName();
        const testSynonyms = rpcMessage.getVrSynonyms();
        const testApps = rpcMessage.getAppHmiType();
        const testMedia = rpcMessage.getIsMediaApplication();
        const testDeviceInfo = rpcMessage.getDeviceInfo();
        const testDayColorScheme = rpcMessage.getDayColorScheme();
        const testNightColorScheme = rpcMessage.getNightColorScheme();

       
        // Valid Tests
        assertTrue(Test.TRUE, Validator.validateSdlMsgVersion(Test.GENERAL_SDLMSGVERSION, testVersion));
        assertEquals(Test.MATCH, Test.GENERAL_STRING, testName);
        assertEquals(Test.MATCH, Test.GENERAL_STRING, testNgnName);
        assertEquals(Test.MATCH, Test.GENERAL_APP_ID, testAppId);
        assertEquals(Test.MATCH, Test.GENERAL_FULL_APP_ID, testFullAppId);
        assertEquals(Test.MATCH, Test.GENERAL_LANGUAGE, testLang);
        assertEquals(Test.MATCH, Test.GENERAL_LANGUAGE, testHmiLang);
        assertEquals(Test.MATCH, Test.GENERAL_STRING, testHashId);
        Validator.validateTtsChunks(Test.GENERAL_TTSCHUNK_LIST, testTts);

        assertEquals(Test.MATCH, Test.GENERAL_STRING_LIST, testSynonyms);
        assertEquals(Test.MATCH, Test.GENERAL_APPHMITYPE_LIST, testApps);
        assertEquals(Test.MATCH, Test.GENERAL_BOOLEAN, testMedia);
        assertTrue(Test.TRUE, Validator.validateDeviceInfo(Test.GENERAL_DEVICEINFO, testDeviceInfo));
        assertTrue(Test.TRUE, Validator.validateTemplateColorScheme(Test.GENERAL_DAYCOLORSCHEME, testDayColorScheme));
        assertTrue(Test.TRUE, Validator.validateTemplateColorScheme(Test.GENERAL_NIGHTCOLORSCHEME, testNightColorScheme));

        // Invalid/Null Tests
        rpcMessage = new RegisterAppInterface();
        assertNotNull(Test.NOT_NULL, rpcMessage);
        testNullBase(rpcMessage);

        assertNull(Test.NULL, rpcMessage.getSdlMsgVersion());
        assertNull(Test.NULL, rpcMessage.getAppName());
        assertNull(Test.NULL, rpcMessage.getNgnMediaScreenAppName());
        assertNull(Test.NULL, rpcMessage.getAppId());
        assertNull(Test.NULL, rpcMessage.getFullAppId());
        assertNull(Test.NULL, rpcMessage.getLanguageDesired());
        assertNull(Test.NULL, rpcMessage.getHmiDisplayLanguageDesired());
        assertNull(Test.NULL, rpcMessage.getHashID());
        assertNull(Test.NULL, rpcMessage.getTtsName());
        assertNull(Test.NULL, rpcMessage.getVrSynonyms());
        assertNull(Test.NULL, rpcMessage.getAppHmiType());
        assertNull(Test.NULL, rpcMessage.getIsMediaApplication());
        assertNull(Test.NULL, rpcMessage.getDeviceInfo());
        assertNull(Test.NULL, rpcMessage.getDayColorScheme());
        assertNull(Test.NULL, rpcMessage.getNightColorScheme());

        done();
    });
});