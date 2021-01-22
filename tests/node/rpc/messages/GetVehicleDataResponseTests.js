const SDL = require('../../../config.js').node;
const GetVehicleDataResponse = SDL.rpc.messages.GetVehicleDataResponse;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const VehicleDataStatus = SDL.rpc.enums.VehicleDataStatus;
const StabilityControlsStatus = SDL.rpc.structs.StabilityControlsStatus;
const PRNDL = SDL.rpc.enums.PRNDL;
const TransmissionType = SDL.rpc.enums.TransmissionType;
const GearStatus = SDL.rpc.structs.GearStatus;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('GetVehicleDataResponseTests', function () {
    before(function () {
        this.stabilityControlsStatus = new StabilityControlsStatus()
            .setEscSystem(VehicleDataStatus.VDS_ON)
            .setTrailerSwayControl(VehicleDataStatus.VDS_ON);
        const JSON_STABILITYCONTROLSSTATUS = {
            [StabilityControlsStatus.KEY_ESC_SYSTEM]: VehicleDataStatus.VDS_ON,
            [StabilityControlsStatus.KEY_TRAILER_SWAY_CONTROL]: VehicleDataStatus.VDS_ON,
        };

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
                .setStabilityControlsStatus(this.stabilityControlsStatus)
                .setHandsOffSteering(Test.GENERAL_BOOLEAN)
                .setWindowStatus([Test.GENERAL_WINDOW_STATUS])
                .setGearStatus(this.gearStatus)
                .setSeatOccupancy(Test.GENERAL_SEAT_OCCUPANCY);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [GetVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS]: JSON_STABILITYCONTROLSSTATUS,
                [GetVehicleDataResponse.KEY_HANDS_OFF_STEERING]: Test.GENERAL_BOOLEAN,
                [GetVehicleDataResponse.KEY_WINDOW_STATUS]: [Test.JSON_WINDOWSTATUS],
                [GetVehicleDataResponse.KEY_GEAR_STATUS]: JSON_GEARSTATUS,
                [GetVehicleDataResponse.KEY_SEAT_OCCUPANCY]: Test.JSON_SEATOCCUPANCY,
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
        const testStabilityControlsStatus = rpcMessage.getStabilityControlsStatus();
        const testHandsOffSteering = rpcMessage.getHandsOffSteering();
        const testWindowStatus = rpcMessage.getWindowStatus();
        const testGearStatus = rpcMessage.getGearStatus();
        const testSeatOccupancy = rpcMessage.getSeatOccupancy();

        // Valid Tests
        Validator.assertEquals(this.stabilityControlsStatus, testStabilityControlsStatus);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testHandsOffSteering);
        Validator.assertEquals([Test.GENERAL_WINDOW_STATUS], testWindowStatus);
        Validator.assertEquals(this.gearStatus, testGearStatus);
        Validator.assertEquals(Test.GENERAL_SEAT_OCCUPANCY, testSeatOccupancy);

        // Invalid/Null Tests
        rpcMessage = new GetVehicleDataResponse();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.GetVehicleData),
            MessageType.response,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getStabilityControlsStatus());
        Validator.assertNullOrUndefined(rpcMessage.getHandsOffSteering());
        Validator.assertNullOrUndefined(rpcMessage.getWindowStatus());
        Validator.assertNullOrUndefined(rpcMessage.getGearStatus());
        Validator.assertNullOrUndefined(rpcMessage.getSeatOccupancy());

        done();
    });
});