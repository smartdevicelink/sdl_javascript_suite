const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const UnsubscribeVehicleDataResponse = SDL.rpc.messages.UnsubscribeVehicleDataResponse;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const VehicleDataType = SDL.rpc.enums.VehicleDataType;
const VehicleDataResult = SDL.rpc.structs.VehicleDataResult;

const BaseRpcTests = require('./BaseRpcTests');
const Validator = require('./../../../Validator.js');


describe('UnsubscribeVehicleDataResponseTests', function () {
    before(function () {
        this.windowStatus = new VehicleDataResult()
            .setDataType(VehicleDataType.VEHICLEDATA_WINDOWSTATUS);
        const JSON_WINDOWSTATUS = this.windowStatus.getParameters();

        this.createMessage = function () {
            return new UnsubscribeVehicleDataResponse()
                .setWindowStatus(this.windowStatus);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [UnsubscribeVehicleDataResponse.KEY_WINDOW_STATUS]: JSON_WINDOWSTATUS,
            };
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
        const testWindowStatus = rpcMessage.getWindowStatus();

        // Valid Tests
        Validator.validateVehicleDataResult(this.windowStatus, testWindowStatus);

        // Invalid/Null Tests
        rpcMessage = new UnsubscribeVehicleDataResponse();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.UnsubscribeVehicleData),
            MessageType.response,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getWindowStatus());

        done();
    });
});