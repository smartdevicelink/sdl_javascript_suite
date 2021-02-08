const SDL = require('../../../config.js').node;
const BodyInformation = SDL.rpc.structs.BodyInformation;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const BaseStructTests = require('./BaseStructTests');

describe('BodyInformationTests', function () {
    before(function () {
        this.create = function () {
            return new BodyInformation()
                .setParkBrakeActive(Test.GENERAL_BOOLEAN)
                .setIgnitionStableStatus(Test.GENERAL_IGNITIONSTABLESTATUS)
                .setIgnitionStatus(Test.GENERAL_IGNITIONSTATUS)
                .setDriverDoorAjar(Test.GENERAL_BOOLEAN)
                .setPassengerDoorAjar(Test.GENERAL_BOOLEAN)
                .setRearLeftDoorAjar(Test.GENERAL_BOOLEAN)
                .setRearRightDoorAjar(Test.GENERAL_BOOLEAN)
                .setDoorStatuses(Test.GENERAL_DOORSTATUS_LIST)
                .setGateStatuses(Test.GENERAL_GATESTATUS_LIST)
                .setRoofStatuses(Test.GENERAL_ROOFSTATUS_LIST);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [BodyInformation.KEY_PARK_BRAKE_ACTIVE]: Test.GENERAL_BOOLEAN,
                [BodyInformation.KEY_IGNITION_STABLE_STATUS]: Test.GENERAL_IGNITIONSTABLESTATUS,
                [BodyInformation.KEY_IGNITION_STATUS]: Test.GENERAL_IGNITIONSTATUS,
                [BodyInformation.KEY_DRIVER_DOOR_AJAR]: Test.GENERAL_BOOLEAN,
                [BodyInformation.KEY_PASSENGER_DOOR_AJAR]: Test.GENERAL_BOOLEAN,
                [BodyInformation.KEY_REAR_LEFT_DOOR_AJAR]: Test.GENERAL_BOOLEAN,
                [BodyInformation.KEY_REAR_RIGHT_DOOR_AJAR]: Test.GENERAL_BOOLEAN,
                [BodyInformation.KEY_DOOR_STATUSES]: Test.JSON_DOORSTATUS_LIST,
                [BodyInformation.KEY_GATE_STATUSES]: Test.JSON_GATESTATUS_LIST,
                [BodyInformation.KEY_ROOF_STATUSES]: Test.JSON_ROOFSTATUS_LIST,
            };
        };
    });

    BaseStructTests.tests();

    it('testRpcValues', function (done) {
        let msg = this.msg;
        // Valid Tests
        Validator.assertEquals(Test.GENERAL_BOOLEAN, msg.getParkBrakeActive());
        Validator.assertEquals(Test.GENERAL_IGNITIONSTABLESTATUS, msg.getIgnitionStableStatus());
        Validator.assertEquals(Test.GENERAL_IGNITIONSTATUS, msg.getIgnitionStatus());
        Validator.assertEquals(Test.GENERAL_BOOLEAN, msg.getDriverDoorAjar());
        Validator.assertEquals(Test.GENERAL_BOOLEAN, msg.getPassengerDoorAjar());
        Validator.assertEquals(Test.GENERAL_BOOLEAN, msg.getRearLeftDoorAjar());
        Validator.assertEquals(Test.GENERAL_BOOLEAN, msg.getRearRightDoorAjar());
        Validator.assertEquals(Test.GENERAL_DOORSTATUS_LIST, msg.getDoorStatuses());
        Validator.assertEquals(Test.GENERAL_GATESTATUS_LIST, msg.getGateStatuses());
        Validator.assertEquals(Test.GENERAL_ROOFSTATUS_LIST, msg.getRoofStatuses());

        // Invalid/Null Tests
        msg = new BodyInformation();
        Validator.assertNotNull(msg);
        Validator.assertNullOrUndefined(msg.getParkBrakeActive());
        Validator.assertNullOrUndefined(msg.getIgnitionStableStatus());
        Validator.assertNullOrUndefined(msg.getIgnitionStatus());
        Validator.assertNullOrUndefined(msg.getDriverDoorAjar());
        Validator.assertNullOrUndefined(msg.getPassengerDoorAjar());
        Validator.assertNullOrUndefined(msg.getRearLeftDoorAjar());
        Validator.assertNullOrUndefined(msg.getRearRightDoorAjar());
        Validator.assertNullOrUndefined(msg.getDoorStatuses());
        Validator.assertNullOrUndefined(msg.getGateStatuses());
        Validator.assertNullOrUndefined(msg.getRoofStatuses());
        done();
    });
});