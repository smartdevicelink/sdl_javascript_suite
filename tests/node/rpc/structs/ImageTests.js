const SDL = require('./../../../../lib/js/dist/SDL');
const Image = SDL.rpc.structs.Image;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const assertTrue = Validator.assertTrue.bind(Validator);
const assertEquals = Validator.assertEquals.bind(Validator);
const assertNull = Validator.assertNull.bind(Validator);
const assertNullOrUndefined = Validator.assertNullOrUndefined.bind(Validator);
const assertNotNull = Validator.assertNotNull.bind(Validator);

let msg;

describe('ImageTests', function () {
    it('setup', function (done) {
        msg = new Image();
        msg.setImageType(Test.GENERAL_IMAGETYPE);
        msg.setValue(Test.GENERAL_STRING);
        msg.setIsTemplate(Test.GENERAL_BOOLEAN);
        done();
    });

    it('testRpcValues', function (done) {
        // Test Values
        const imageType = msg.getImageType();
        const value = msg.getValue();
        const isTemplate = msg.getIsTemplate();
        
        // Valid Tests
        assertEquals(Test.MATCH, Test.GENERAL_IMAGETYPE, imageType);
        assertEquals(Test.MATCH, Test.GENERAL_STRING, value);
        assertEquals(Test.MATCH, Test.GENERAL_BOOLEAN, isTemplate);
        
        // Invalid/Null Tests
        msg = new Image();
        assertNotNull(Test.NOT_NULL, msg);
        assertNullOrUndefined(Test.NULL, msg.getImageType());
        assertNullOrUndefined(Test.NULL, msg.getValue());
        assertNullOrUndefined(Test.NULL, msg.getIsTemplate());
        done();
    });



});