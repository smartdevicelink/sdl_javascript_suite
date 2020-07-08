const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const OnVehicleData = SDL.rpc.messages.OnVehicleData;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const VehicleDataStatus = SDL.rpc.enums.VehicleDataStatus;
const StabilityControlsStatus = SDL.rpc.structs.StabilityControlsStatus;

const BaseRpcTests = require('./BaseRpcTests');
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

        this.createMessage = function () {
            return new OnVehicleData()
                .setStabilityControlsStatus(this.stabilityControlsStatus);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [OnVehicleData.KEY_STABILITY_CONTROLS_STATUS]: JSON_STABILITYCONTROLSSTATUS,
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

        // Valid Tests
        Validator.assertEquals(this.stabilityControlsStatus, testStabilityControlsStatus);

        // Invalid/Null Tests
        rpcMessage = new OnVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.OnVehicleData),
            MessageType.notification,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getStabilityControlsStatus());

        done();
    });
});