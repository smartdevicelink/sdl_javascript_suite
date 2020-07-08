const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const GetVehicleDataResponse = SDL.rpc.messages.GetVehicleDataResponse;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const PRNDL = SDL.rpc.enums.PRNDL;
const TransmissionType = SDL.rpc.enums.TransmissionType;
const GearStatus = SDL.rpc.structs.GearStatus;

const BaseRpcTests = require('./BaseRpcTests');
const Validator = require('./../../../Validator.js');


describe('GetVehicleDataResponseTests', function () {
    before(function () {
        this.gearStatus = new GearStatus()
            .setUserSelectedGear(PRNDL.NINTH)
            .setActualGear(PRNDL.NINTH)
            .setTransmissionType(TransmissionType.MANUAL);
        const JSON_GEARSTATUS = {
            [GearStatus.KEY_USER_SELECTED_GEAR]: PRNDL.NINTH,
            [GearStatus.KEY_ACTUAL_GEAR]: PRNDL.NINTH,
            [GearStatus.KEY_TRANSMISSION_TYPE]: TransmissionType.MANUAL,
        };

        this.createMessage = function () {
            return new GetVehicleDataResponse()
                .setGearStatus(this.gearStatus);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [GetVehicleDataResponse.KEY_GEAR_STATUS]: JSON_GEARSTATUS,
            };
        };

        this.getMessageType = function () {
            return MessageType.response;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.GetVehicleData);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        let rpcMessage = this.msg;
        // Test Values
        const testGearStatus = rpcMessage.getGearStatus();

        // Valid Tests
        Validator.assertEquals(this.gearStatus, testGearStatus);

        // Invalid/Null Tests
        rpcMessage = new GetVehicleDataResponse();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.GetVehicleData),
            MessageType.response,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getGearStatus());

        done();
    });
});