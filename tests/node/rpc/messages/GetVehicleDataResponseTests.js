const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const GetVehicleDataResponse = SDL.rpc.messages.GetVehicleDataResponse;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const VehicleDataStatus = SDL.rpc.enums.VehicleDataStatus;
const StabilityControlsStatus = SDL.rpc.structs.StabilityControlsStatus;

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

        this.createMessage = function () {
            return new GetVehicleDataResponse()
                .setStabilityControlsStatus(this.stabilityControlsStatus)
                .setHandsOffSteering(Test.GENERAL_BOOLEAN)
                .setWindowStatus([Test.GENERAL_WINDOW_STATUS]);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [GetVehicleDataResponse.KEY_STABILITY_CONTROLS_STATUS]: JSON_STABILITYCONTROLSSTATUS,
                [GetVehicleDataResponse.KEY_HANDS_OFF_STEERING]: Test.GENERAL_BOOLEAN,
                [GetVehicleDataResponse.KEY_WINDOW_STATUS]: [Test.JSON_WINDOWSTATUS],
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

        // Valid Tests
        Validator.assertEquals(this.stabilityControlsStatus, testStabilityControlsStatus);
        Validator.assertEquals(Test.GENERAL_BOOLEAN, testHandsOffSteering);
        Validator.assertEquals([Test.GENERAL_WINDOW_STATUS], testWindowStatus);

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

        done();
    });
});