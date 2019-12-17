const SDL = require('./../../../../lib/js/dist/SDL.js');
const OnHmiStatus = SDL.rpc.messages.OnHmiStatus;
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
    FunctionID.keyForValue(FunctionID.OnHMIStatus), 
    RpcType.NOTIFICATION);

describe('OnHmiStatusTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new OnHmiStatus();
            msg.setAudioStreamingState(Test.GENERAL_AUDIOSTREAMINGSTATE);
            msg.setVideoStreamingState(Test.GENERAL_VIDEOSTREAMINGSTATE);
            msg.setHMILevel(Test.GENERAL_HMILEVEL);
            msg.setSystemContext(Test.GENERAL_SYSTEMCONTEXT);
            msg.setWindowID(Test.GENERAL_INT);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[OnHmiStatus.KEY_AUDIO_STREAMING_STATE] = Test.GENERAL_AUDIOSTREAMINGSTATE;
            expectedParameters[OnHmiStatus.KEY_VIDEO_STREAMING_STATE] = Test.GENERAL_VIDEOSTREAMINGSTATE;
            expectedParameters[OnHmiStatus.KEY_HMI_LEVEL] = Test.GENERAL_HMILEVEL;
            expectedParameters[OnHmiStatus.KEY_SYSTEM_CONTEXT] = Test.GENERAL_SYSTEMCONTEXT;
            expectedParameters[OnHmiStatus.KEY_WINDOW_ID] = Test.GENERAL_INT;
            return expectedParameters;
        };

        this.getRPCType = function () {
            return RpcType.NOTIFICATION;
        };

        this.getFunctionName = function () {
            return FunctionID.keyForValue(FunctionID.OnHMIStatus);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        // Test Values
        let rpcMessage = this.msg;
        const audioStreamingState = rpcMessage.getAudioStreamingState();
        const videoStreamingState = rpcMessage.getVideoStreamingState();
        const hmiLevel = rpcMessage.getHMILevel();
        const context = rpcMessage.getSystemContext();
        const testWindowID = rpcMessage.getWindowID();
       
        // Valid Tests
        assertEquals(Test.MATCH, Test.GENERAL_AUDIOSTREAMINGSTATE, audioStreamingState);
        assertEquals(Test.MATCH, Test.GENERAL_VIDEOSTREAMINGSTATE, videoStreamingState);
        assertEquals(Test.MATCH, Test.GENERAL_HMILEVEL, hmiLevel);
        assertEquals(Test.MATCH, Test.GENERAL_SYSTEMCONTEXT, context);
        assertEquals(Test.MATCH, Test.GENERAL_INT, testWindowID);

        // Invalid/Null Tests
        rpcMessage = new OnHmiStatus();
        assertNotNull(Test.NOT_NULL, rpcMessage);
        testNullBase(rpcMessage);

        assertNull(Test.NULL, rpcMessage.getAudioStreamingState());
        assertNull(Test.NULL, rpcMessage.getVideoStreamingState());
        assertNull(Test.NULL, rpcMessage.getHMILevel());
        assertNull(Test.NULL, rpcMessage.getSystemContext());
        assertNull(Test.NULL, rpcMessage.getWindowID());

        done();
    });
});