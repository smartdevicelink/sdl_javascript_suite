const SDL = require('./../../../../dist/js/SDL.min.js');
const WindowStatus = SDL.rpc.structs.WindowStatus;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('WindowStatusTests', function () {
    before(function () {
        this.create = function () {
            return new WindowStatus()
                .setLocation(Test.GENERAL_GRID)
                .setState(Test.GENERAL_WINDOW_STATE);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [WindowStatus.KEY_LOCATION]: Test.JSON_GRID,
                [WindowStatus.KEY_STATE]: Test.JSON_WINDOW_STATE,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_GRID, msg.getLocation());
        Validator.assertEquals(Test.GENERAL_WINDOW_STATE, msg.getState());

        // Invalid/Null Tests
        msg = new WindowStatus();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getLocation());
        Validator.assertNullOrUndefined(msg.getState());
        done();
    });
});