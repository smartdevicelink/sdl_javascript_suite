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
            return new GetVehicleData()
                .setStabilityControlsStatus(Test.GENERAL_BOOLEAN)
                .setHandsOffSteering(Test.GENERAL_BOOLEAN)
                .setWindowStatus(Test.GENERAL_BOOLEAN);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [GetVehicleData.KEY_STABILITY_CONTROLS_STATUS]: Test.GENERAL_BOOLEAN,
                [GetVehicleData.KEY_HANDS_OFF_STEERING]: Test.GENERAL_BOOLEAN,
                [GetVehicleData.KEY_WINDOW_STATUS]: Test.GENERAL_BOOLEAN,
            };
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
        const testStabilityControlsStatus = rpcMessage.getStabilityControlsStatus();
        const testHandsOffSteering = rpcMessage.getHandsOffSteering();
        const testWindowStatus = rpcMessage.getWindowStatus();

        // Valid Tests
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testStabilityControlsStatus);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testHandsOffSteering);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testWindowStatus);

        // Invalid/Null Tests
        rpcMessage = new GetVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(FunctionID.keyForValue(FunctionID.GetVehicleData),
            MessageType.request,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getStabilityControlsStatus());
        Validator.assertNullOrUndefined(rpcMessage.getHandsOffSteering());
        Validator.assertNullOrUndefined(rpcMessage.getWindowStatus());

        done();
    });
});