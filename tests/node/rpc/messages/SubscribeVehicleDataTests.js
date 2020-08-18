const SDL = require('./../../../../dist/js/SDL.min.js');
const SubscribeVehicleData = SDL.rpc.messages.SubscribeVehicleData;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('SubscribeVehicleDataTests', function () {
    before(function () {
        this.createMessage = function () {
            return new SubscribeVehicleData()
                .setStabilityControlsStatus(Test.GENERAL_BOOLEAN)
                .setHandsOffSteering(Test.GENERAL_BOOLEAN)
                .setWindowStatus(Test.GENERAL_BOOLEAN)
                .setGearStatus(Test.GENERAL_BOOLEAN);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [SubscribeVehicleData.KEY_STABILITY_CONTROLS_STATUS]: Test.GENERAL_BOOLEAN,
                [SubscribeVehicleData.KEY_HANDS_OFF_STEERING]: Test.GENERAL_BOOLEAN,
                [SubscribeVehicleData.KEY_WINDOW_STATUS]: Test.GENERAL_BOOLEAN,
                [SubscribeVehicleData.KEY_GEAR_STATUS]: Test.GENERAL_BOOLEAN,
            };
        };

        this.getMessageType = function () {
            return MessageType.request;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.SubscribeVehicleData);
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
        rpcMessage = new SubscribeVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(FunctionID.keyForValue(FunctionID.SubscribeVehicleData),
            MessageType.request,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getStabilityControlsStatus());
        Validator.assertNullOrUndefined(rpcMessage.getHandsOffSteering());
        Validator.assertNullOrUndefined(rpcMessage.getWindowStatus());
        Validator.assertNullOrUndefined(rpcMessage.getGearStatus());

        done();
    });
});