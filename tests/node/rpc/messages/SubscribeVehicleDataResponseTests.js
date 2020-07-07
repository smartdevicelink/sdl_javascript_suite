const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const SubscribeVehicleDataResponse = SDL.rpc.messages.SubscribeVehicleDataResponse;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const VehicleDataType = SDL.rpc.enums.VehicleDataType;
const VehicleDataResult = SDL.rpc.structs.VehicleDataResult;

const BaseRpcTests = require('./BaseRpcTests');
const Validator = require('./../../../Validator.js');


describe('SubscribeVehicleDataResponseTests', function () {
    before(function () {
        const vehicleDataResult = this.vehicleDataResult = new VehicleDataResult();
        vehicleDataResult.setDataType(VehicleDataType.VEHICLEDATA_HANDSOFFSTEERING);

        const JSON_VEHICLEDATARESULT = {
            [VehicleDataResult.KEY_DATA_TYPE]: VehicleDataType.VEHICLEDATA_HANDSOFFSTEERING,
        };

        this.createMessage = function () {
            const msg = new SubscribeVehicleDataResponse();
            msg.setHandsOffSteering(vehicleDataResult);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[SubscribeVehicleDataResponse.KEY_HANDS_OFF_STEERING] = JSON_VEHICLEDATARESULT;
            return expectedParameters;
        };

        this.getMessageType = function () {
            return MessageType.response;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.SubscribeVehicleData);
        };
    });

    BaseRpcTests.tests();


    it ('testRpcValues', function (done) {
        let rpcMessage = this.msg;
        // Test Values
        const testHandsOffSteering = rpcMessage.getHandsOffSteering();

        // Valid Tests
        Validator.validateVehicleDataResult(this.vehicleDataResult, testHandsOffSteering);

        // Invalid/Null Tests
        rpcMessage = new SubscribeVehicleDataResponse();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.SubscribeVehicleData),
            MessageType.response,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getHandsOffSteering());

        done();
    });
});