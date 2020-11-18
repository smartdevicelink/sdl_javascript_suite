const SDL = require('../../../config.js').node;

// messages
const OnVehicleData = SDL.rpc.messages.OnVehicleData;

// enums
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const VehicleDataStatus = SDL.rpc.enums.VehicleDataStatus;
const StabilityControlsStatus = SDL.rpc.structs.StabilityControlsStatus;
const PRNDL = SDL.rpc.enums.PRNDL;
const TransmissionType = SDL.rpc.enums.TransmissionType;

// structs
const GearStatus = SDL.rpc.structs.GearStatus;
const ClimateData = SDL.rpc.structs.ClimateData;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('OnVehicleDataTests', function () {
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

        this.climateData = new ClimateData()
            .setAtmosphericPressure(Test.GENERAL_NUMBER)
            .setCabinTemperature(Test.GENERAL_TEMPERATURE)
            .setExternalTemperature(Test.GENERAL_TEMPERATURE);
        const JSON_CLIMATE_DATA = {
            [ClimateData.KEY_ATMOSPHERIC_PRESSURE]: Test.GENERAL_NUMBER,
            [ClimateData.KEY_CABIN_TEMPERATURE]: Test.JSON_TEMPERATURE,
            [ClimateData.KEY_EXTERNAL_TEMPERATURE]: Test.JSON_TEMPERATURE,
        };

        this.createMessage = function () {
            return new OnVehicleData()
                .setStabilityControlsStatus(this.stabilityControlsStatus)
                .setHandsOffSteering(Test.GENERAL_BOOLEAN)
                .setWindowStatus([Test.GENERAL_WINDOW_STATUS])
                .setGearStatus(this.gearStatus)
                .setClimateData(this.climateData);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [OnVehicleData.KEY_STABILITY_CONTROLS_STATUS]: JSON_STABILITYCONTROLSSTATUS,
                [OnVehicleData.KEY_HANDS_OFF_STEERING]: Test.GENERAL_BOOLEAN,
                [OnVehicleData.KEY_WINDOW_STATUS]: [Test.JSON_WINDOWSTATUS],
                [OnVehicleData.KEY_GEAR_STATUS]: JSON_GEARSTATUS,
                [OnVehicleData.KEY_CLIMATE_DATA]: JSON_CLIMATE_DATA,
            };
        };

        this.getMessageType = function () {
            return MessageType.notification;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.OnVehicleData);
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
        const testClimateData = rpcMessage.getClimateData();

        // Valid Tests
        Validator.assertEquals(this.stabilityControlsStatus, testStabilityControlsStatus);
        Validator.assertEquals([Test.GENERAL_WINDOW_STATUS], testWindowStatus);
        Validator.assertEquals(this.gearStatus, testGearStatus);
        Validator.assertEquals(this.climateData, testClimateData);

        // Invalid/Null Tests
        rpcMessage = new OnVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.OnVehicleData),
            MessageType.notification,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getStabilityControlsStatus());
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testHandsOffSteering);
        Validator.assertNullOrUndefined(rpcMessage.getWindowStatus());
        Validator.assertNullOrUndefined(rpcMessage.getGearStatus());
        Validator.assertNullOrUndefined(rpcMessage.getClimateData());

        done();
    });
});
