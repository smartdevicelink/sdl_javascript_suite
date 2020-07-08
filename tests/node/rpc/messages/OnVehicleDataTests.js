const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const OnVehicleData = SDL.rpc.messages.OnVehicleData;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;
const WindowStatus = SDL.rpc.structs.WindowStatus;
const WindowState = SDL.rpc.structs.WindowState;
const Grid = SDL.rpc.structs.Grid;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('OnVehicleDataTests', function () {
    before(function () {
        const windowState = new WindowState()
            .setApproximatePosition(Test.GENERAL_INTEGER)
            .setDeviation(Test.GENERAL_INTEGER);

        const JSON_WINDOW_STATE = windowState.getParameters();

        const grid = new Grid()
            .setColumn(Test.GENERAL_INTEGER)
            .setRow(Test.GENERAL_INTEGER);

        const JSON_GRID = grid.getParameters();

        this.windowStatus = new WindowStatus()
            .setLocation(grid)
            .setState(windowState);

        const JSON_WINDOWSTATUS = {
            [WindowStatus.KEY_LOCATION]: JSON_GRID,
            [WindowStatus.KEY_STATE]: JSON_WINDOW_STATE,
        };

        this.createMessage = function () {
            return new OnVehicleData()
                .setWindowStatus([this.windowStatus]);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [OnVehicleData.KEY_WINDOW_STATUS]: [JSON_WINDOWSTATUS],
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
        const testWindowStatus = rpcMessage.getWindowStatus();

        // Valid Tests
        Validator.assertEquals([this.windowStatus], testWindowStatus);

        // Invalid/Null Tests
        rpcMessage = new OnVehicleData();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.OnVehicleData),
            MessageType.notification,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getWindowStatus());

        done();
    });
});