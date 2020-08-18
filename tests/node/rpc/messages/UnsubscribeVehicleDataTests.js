const SDL = require('./../../../../dist/js/SDL.min.js');
const UnsubscribeVehicleData = SDL.rpc.messages.UnsubscribeVehicleData;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('UnsubscribeVehicleDataTests', function () {
    before(function () {
        this.createMessage = function () {
            return new UnsubscribeVehicleData()
                .setStabilityControlsStatus(Test.GENERAL_BOOLEAN)
                .setHandsOffSteering(Test.GENERAL_BOOLEAN)
                .setWindowStatus(Test.GENERAL_BOOLEAN)
                .setGearStatus(Test.GENERAL_BOOLEAN);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [UnsubscribeVehicleData.KEY_STABILITY_CONTROLS_STATUS]: Test.GENERAL_BOOLEAN,
                [UnsubscribeVehicleData.KEY_HANDS_OFF_STEERING]: Test.GENERAL_BOOLEAN,
                [UnsubscribeVehicleData.KEY_WINDOW_STATUS]: Test.GENERAL_BOOLEAN,
                [UnsubscribeVehicleData.KEY_GEAR_STATUS]: Test.GENERAL_BOOLEAN,
            };
        };

        this.getMessageType = function () {
            return MessageType.request;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.UnsubscribeVehicleData);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        let rpcMessage = this.msg;
        // Test Values
        const testStabilityControlsStatus = rpcMessage.getStabilityControlsStatus();
        const testHandsOffSteering = rpcMessage.getHandsOffSteering();
        const testWindowStatus = rpcMessage.getWindowStatus();
        const testGearStatus = rpcMessage.getGearStatus();

        // Valid Tests
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testStabilityControlsStatus);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testHandsOffSteering);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testWindowStatus);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testGearStatus);

        // Invalid/Null Tests
        rpcMessage = new UnsubscribeVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(FunctionID.keyForValue(FunctionID.UnsubscribeVehicleData),
            MessageType.request,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getStabilityControlsStatus());
        Validator.assertNullOrUndefined(rpcMessage.getHandsOffSteering());
        Validator.assertNullOrUndefined(rpcMessage.getWindowStatus());
        Validator.assertNullOrUndefined(rpcMessage.getGearStatus());

        done();
    });
});