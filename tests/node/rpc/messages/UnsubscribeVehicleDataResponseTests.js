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
        this.gearStatus = new VehicleDataResult()
            .setDataType(VehicleDataType.VEHICLEDATA_GEARSTATUS);
        const JSON_GEARSTATUS = this.gearStatus.getParameters();

        this.createMessage = function () {
            return new UnsubscribeVehicleDataResponse()
                .setGearStatus(this.gearStatus);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [UnsubscribeVehicleDataResponse.KEY_GEAR_STATUS]: JSON_GEARSTATUS,
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
        const testGearStatus = rpcMessage.getGearStatus();

        // Valid Tests
        Validator.validateVehicleDataResult(this.gearStatus, testGearStatus);

        // Invalid/Null Tests
        rpcMessage = new UnsubscribeVehicleDataResponse();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.UnsubscribeVehicleData),
            MessageType.response,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getGearStatus());

        done();
    });
});