const SDL = require('./../../../../lib/js/dist/SDL.min.js');
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
                .setWindowStatus(Test.GENERAL_BOOLEAN);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [SubscribeVehicleData.KEY_WINDOW_STATUS]: Test.GENERAL_BOOLEAN,
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
        const testWindowStatus = rpcMessage.getWindowStatus();

        // Valid Tests
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testWindowStatus);

        // Invalid/Null Tests
        rpcMessage = new SubscribeVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(FunctionID.keyForValue(FunctionID.SubscribeVehicleData),
            MessageType.request,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getWindowStatus());

        done();
    });
});