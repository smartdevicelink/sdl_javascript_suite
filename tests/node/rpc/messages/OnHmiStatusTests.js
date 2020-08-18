const SDL = require('./../../../../dist/js/SDL.min.js');
const OnHMIStatus = SDL.rpc.messages.OnHMIStatus;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('OnHMIStatusTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new OnHMIStatus();
            msg.setHmiLevel(Test.GENERAL_HMILEVEL);
            msg.setAudioStreamingState(Test.GENERAL_AUDIOSTREAMINGSTATE);
            msg.setSystemContext(Test.GENERAL_SYSTEMCONTEXT);
            msg.setVideoStreamingState(Test.GENERAL_VIDEOSTREAMINGSTATE);
            msg.setWindowID(Test.GENERAL_INT);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[OnHMIStatus.KEY_HMI_LEVEL] = Test.GENERAL_HMILEVEL;
            expectedParameters[OnHMIStatus.KEY_AUDIO_STREAMING_STATE] = Test.GENERAL_AUDIOSTREAMINGSTATE;
            expectedParameters[OnHMIStatus.KEY_SYSTEM_CONTEXT] = Test.GENERAL_SYSTEMCONTEXT;
            expectedParameters[OnHMIStatus.KEY_VIDEO_STREAMING_STATE] = Test.GENERAL_VIDEOSTREAMINGSTATE;
            expectedParameters[OnHMIStatus.KEY_WINDOW_ID] = Test.GENERAL_INT;
            return expectedParameters;
        };

        this.getMessageType = function () {
            return MessageType.notification;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.OnHMIStatus);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        // Test Values
        let rpcMessage = this.msg;
        const hmiLevel = rpcMessage.getHmiLevel();
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
        rpcMessage = new OnHMIStatus();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.OnHMIStatus),
            MessageType.notification,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getHmiLevel());
        Validator.assertNullOrUndefined(rpcMessage.getAudioStreamingState());
        Validator.assertNullOrUndefined(rpcMessage.getSystemContext());
        Validator.assertNullOrUndefined(rpcMessage.getVideoStreamingState());
        Validator.assertNullOrUndefined(rpcMessage.getWindowID());

        done();
    });
});