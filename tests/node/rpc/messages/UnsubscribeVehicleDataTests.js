const SDL = require('./../../../../lib/js/dist/SDL.min.js');
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
                .setStabilityControlsStatus(Test.GENERAL_BOOLEAN);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [UnsubscribeVehicleData.KEY_STABILITY_CONTROLS_STATUS]: Test.GENERAL_BOOLEAN,
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

        // Valid Tests
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testStabilityControlsStatus);

        // Invalid/Null Tests
        rpcMessage = new UnsubscribeVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(FunctionID.keyForValue(FunctionID.UnsubscribeVehicleData),
            MessageType.request,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getStabilityControlsStatus());

        done();
    });
});