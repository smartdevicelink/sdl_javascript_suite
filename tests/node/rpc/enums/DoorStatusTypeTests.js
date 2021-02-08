const SDL = require('../../../config.js').node;

const DoorStatusType = SDL.rpc.enums.DoorStatusType;
const Validator = require('./../../../Validator.js');

describe('DoorStatusTypeTests', function () {
    it('testValidEnums', function (done) {
        let example = 'CLOSED';
        const enumClosed = DoorStatusType.valueForKey(example);
        example = 'LOCKED';
        const enumLocked = DoorStatusType.valueForKey(example);
        example = 'AJAR';
        const enumAjar = DoorStatusType.valueForKey(example);
        example = 'REMOVED';
        const enumRemoved = DoorStatusType.valueForKey(example);

        Validator.assertNotNullUndefined(enumClosed, 'CLOSED returned null.');
        Validator.assertNotNullUndefined(enumLocked, 'LOCKED returned null.');
        Validator.assertNotNullUndefined(enumAjar, 'AJAR returned null.');
        Validator.assertNotNullUndefined(enumRemoved, 'REMOVED returned null.');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'Closed';
        const temp = DoorStatusType.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = DoorStatusType.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});