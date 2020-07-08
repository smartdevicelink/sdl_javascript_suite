const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const WindowStatus = SDL.rpc.structs.WindowStatus;
const WindowState = SDL.rpc.structs.WindowState;
const Grid = SDL.rpc.structs.Grid;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('WindowStatusTests', function () {
    before(function () {
        this.windowState = new WindowState()
            .setApproximatePosition(Test.GENERAL_INTEGER)
            .setDeviation(Test.GENERAL_INTEGER);

        const JSON_WINDOW_STATE = this.windowState.getParameters();

        this.grid = new Grid()
            .setColumn(Test.GENERAL_INTEGER)
            .setRow(Test.GENERAL_INTEGER);

        const JSON_GRID = this.grid.getParameters();

        this.create = function () {
            return new WindowStatus()
                .setLocation(this.grid)
                .setState(this.windowState);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [WindowStatus.KEY_LOCATION]: JSON_GRID,
                [WindowStatus.KEY_STATE]: JSON_WINDOW_STATE,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(this.grid, msg.getLocation());
        Validator.assertEquals(this.windowState, msg.getState());

        // Invalid/Null Tests
        msg = new WindowStatus();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getLocation());
        Validator.assertNullOrUndefined(msg.getState());
        done();
    });
});