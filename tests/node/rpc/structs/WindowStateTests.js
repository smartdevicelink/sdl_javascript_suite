const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const WindowState = SDL.rpc.structs.WindowState;

const Validator = require('./../../../Validator.js');
const Test = require('./../../../Test.js');
const BaseStructTests = require('./BaseStructTests');

describe('WindowStateTests', function () {
    before(function () {
        this.create = function () {
            return new WindowState()
                .setApproximatePosition(Test.GENERAL_INTEGER)
                .setDeviation(Test.GENERAL_INTEGER);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [WindowState.KEY_APPROXIMATE_POSITION]: Test.GENERAL_INTEGER,
                [WindowState.KEY_DEVIATION]: Test.GENERAL_INTEGER,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_INTEGER, msg.getApproximatePosition());
        Validator.assertEquals(Test.GENERAL_INTEGER, msg.getDeviation());

        // Invalid/Null Tests
        msg = new WindowState();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getApproximatePosition());
        Validator.assertNullOrUndefined(msg.getDeviation());
        done();
    });
});