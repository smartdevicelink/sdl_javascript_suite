const SDL = require('./../../../../lib/js/dist/SDL.js');
const OnHmiStatus = SDL.rpc.messages.OnHmiStatus;
const FunctionID = SDL.rpc.enums.FunctionID;
const RpcType = SDL.rpc.enums.RpcType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('OnHmiStatusTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new OnHmiStatus();
            msg.setHMILevel(Test.GENERAL_HMILEVEL);
            msg.setAudioStreamingState(Test.GENERAL_AUDIOSTREAMINGSTATE);
            msg.setSystemContext(Test.GENERAL_SYSTEMCONTEXT);
            msg.setVideoStreamingState(Test.GENERAL_VIDEOSTREAMINGSTATE);
            msg.setWindowID(Test.GENERAL_INT);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[OnHmiStatus.KEY_HMI_LEVEL] = Test.GENERAL_HMILEVEL;
            expectedParameters[OnHmiStatus.KEY_AUDIO_STREAMING_STATE] = Test.GENERAL_AUDIOSTREAMINGSTATE;
            expectedParameters[OnHmiStatus.KEY_SYSTEM_CONTEXT] = Test.GENERAL_SYSTEMCONTEXT;
            expectedParameters[OnHmiStatus.KEY_VIDEO_STREAMING_STATE] = Test.GENERAL_VIDEOSTREAMINGSTATE;
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
        const hmiLevel = rpcMessage.getHMILevel();
        const audioStreamingState = rpcMessage.getAudioStreamingState();
        const context = rpcMessage.getSystemContext();
        const videoStreamingState = rpcMessage.getVideoStreamingState();
        const testWindowID = rpcMessage.getWindowID();

        // Valid Tests
        Validator.assertEquals(Test.GENERAL_HMILEVEL, hmiLevel);
        Validator.assertEquals(Test.GENERAL_AUDIOSTREAMINGSTATE, audioStreamingState);
        Validator.assertEquals(Test.GENERAL_SYSTEMCONTEXT, context);
        Validator.assertEquals(Test.GENERAL_VIDEOSTREAMINGSTATE, videoStreamingState);
        Validator.assertEquals(Test.GENERAL_INT, testWindowID);

        // Invalid/Null Tests
        rpcMessage = new OnHmiStatus();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.OnHMIStatus),
            RpcType.NOTIFICATION,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getHMILevel());
        Validator.assertNullOrUndefined(rpcMessage.getAudioStreamingState());
        Validator.assertNullOrUndefined(rpcMessage.getSystemContext());
        Validator.assertNullOrUndefined(rpcMessage.getVideoStreamingState());
        Validator.assertNullOrUndefined(rpcMessage.getWindowID());

        done();
    });
});