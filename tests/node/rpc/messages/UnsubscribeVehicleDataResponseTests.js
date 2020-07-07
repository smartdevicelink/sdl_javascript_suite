const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const UnsubscribeVehicleDataResponse = SDL.rpc.messages.UnsubscribeVehicleDataResponse;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const VehicleDataType = SDL.rpc.enums.VehicleDataType;
const VehicleDataResult = SDL.rpc.structs.VehicleDataResult;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');


describe('UnsubscribeVehicleDataResponseTests', function () {
    before(function () {
        const vehicleDataResult = this.vehicleDataResult = new VehicleDataResult();
        vehicleDataResult.setDataType(VehicleDataType.VEHICLEDATA_HANDSOFFSTEERING);
        this.JSON_VEHICLEDATARESULT = vehicleDataResult.getParameters();

        this.createMessage = function () {
            const msg = new UnsubscribeVehicleDataResponse();
            msg.setHandsOffSteering(vehicleDataResult);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[UnsubscribeVehicleDataResponse.KEY_HANDS_OFF_STEERING] = this.JSON_VEHICLEDATARESULT;
            return expectedParameters;
        };

        this.getMessageType = function () {
            return MessageType.response;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.UnsubscribeVehicleData);
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
        rpcMessage = new UnsubscribeVehicleDataResponse();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.UnsubscribeVehicleData),
            MessageType.response,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getHandsOffSteering());

        done();
    });
});