const SDL = require('../../../config.js').node;
const StabilityControlsStatus = SDL.rpc.structs.StabilityControlsStatus;
const VehicleDataStatus = SDL.rpc.enums.VehicleDataStatus;

const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('StabilityControlsStatusTests', function () {
    before(function () {
        this.create = function () {
            return new StabilityControlsStatus()
                .setEscSystem(VehicleDataStatus.VDS_ON)
                .setTrailerSwayControl(VehicleDataStatus.VDS_ON);
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[StabilityControlsStatus.KEY_ESC_SYSTEM] = VehicleDataStatus.VDS_ON;
            expectedParameters[StabilityControlsStatus.KEY_TRAILER_SWAY_CONTROL] = VehicleDataStatus.VDS_ON;

            return expectedParameters;
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(VehicleDataStatus.VDS_ON, msg.getEscSystem());
        Validator.assertEquals(VehicleDataStatus.VDS_ON, msg.getTrailerSwayControl());

        // Invalid/Null Tests
        msg = new StabilityControlsStatus();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getEscSystem());
        Validator.assertNullOrUndefined(msg.getTrailerSwayControl());
        done();
    });
});