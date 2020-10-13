const SDL = require('../../../config.js').node;

const PRNDL = SDL.rpc.enums.PRNDL;
const Validator = require('./../../../Validator.js');

describe('PRNDLTests', function () {
    it('testValidEnums', function (done) {
        let example = 'NINTH';
        const enumNinth = PRNDL.valueForKey(example);

        example = 'TENTH';
        const enumTenth = PRNDL.valueForKey(example);

        Validator.assertNotNullUndefined(enumNinth, 'NINTH returned null.');
        Validator.assertNotNullUndefined(enumTenth, 'TENTH returned null.');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'nIGHT';
        const temp = PRNDL.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = PRNDL.valueForKey(example);
        Validator.assertNull(temp, 'Result of valueForKey should be null.');
        done();
    });
});