const SDL = require('../../../config.js').node;
const GearStatus = SDL.rpc.structs.GearStatus;
const PRNDL = SDL.rpc.enums.PRNDL;
const TransmissionType = SDL.rpc.enums.TransmissionType;

const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('GearStatusTests', function () {
    before(function () {
        this.create = function () {
            return new GearStatus()
                .setUserSelectedGear(PRNDL.NINTH)
                .setActualGear(PRNDL.NINTH)
                .setTransmissionType(TransmissionType.MANUAL);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [GearStatus.KEY_USER_SELECTED_GEAR]: PRNDL.NINTH,
                [GearStatus.KEY_ACTUAL_GEAR]: PRNDL.NINTH,
                [GearStatus.KEY_TRANSMISSION_TYPE]: TransmissionType.MANUAL,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(PRNDL.NINTH, msg.getUserSelectedGear());
        Validator.assertEquals(PRNDL.NINTH, msg.getActualGear());
        Validator.assertEquals(TransmissionType.MANUAL, msg.getTransmissionType());

        // Invalid/Null Tests
        msg = new GearStatus();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getUserSelectedGear());
        Validator.assertNullOrUndefined(msg.getActualGear());
        Validator.assertNullOrUndefined(msg.getTransmissionType());
        done();
    });
});