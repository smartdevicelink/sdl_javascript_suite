const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const GetVehicleData = SDL.rpc.messages.GetVehicleData;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('GetVehicleDataTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new GetVehicleData();
            msg.setHandsOffSteering(Test.GENERAL_BOOLEAN);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[GetVehicleData.KEY_HANDS_OFF_STEERING] = Test.GENERAL_BOOLEAN;
            return expectedParameters;
        };

        this.getMessageType = function () {
            return MessageType.request;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.GetVehicleData);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        let rpcMessage = this.msg;
        // Test Values
        const testHandsOffSteering = rpcMessage.getHandsOffSteering();

        // Valid Tests
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testHandsOffSteering);

        // Invalid/Null Tests
        rpcMessage = new GetVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(FunctionID.keyForValue(FunctionID.GetVehicleData),
            MessageType.request,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getHandsOffSteering());

        done();
    });
});