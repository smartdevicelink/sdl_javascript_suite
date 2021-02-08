const SDL = require('../../../config.js').node;
const GateStatus = SDL.rpc.structs.GateStatus;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('GateStatusTests', function () {
    before(function () {
        this.create = function () {
            return new GateStatus()
                .setLocation(Test.GENERAL_GRID)
                .setStatus(Test.GENERAL_DOORSTATUSTYPE);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [GateStatus.KEY_LOCATION]: Test.JSON_GRID,
                [GateStatus.KEY_STATUS]: Test.GENERAL_DOORSTATUSTYPE,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_GRID, msg.getLocation());
        Validator.assertEquals(Test.GENERAL_DOORSTATUSTYPE, msg.getStatus());

        // Invalid/Null Tests
        msg = new GateStatus();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getLocation());
        Validator.assertNullOrUndefined(msg.getStatus());
        done();
    });
});