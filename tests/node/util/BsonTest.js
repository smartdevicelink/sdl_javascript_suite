const SDL = require('./../../../lib/js/dist/SDL.js');
const Bson = SDL.util.Bson;
const Validator = require('./../../Validator.js');

const testBuffer = new Uint8Array([12, 0, 0, 0, 16, 120, 0, 1, 0, 0, 0, 0]);
const testObj = { 'x': 1 };


describe('BsonTest', function () {
    it('testSerialize', function (done) {
        Validator.assertEquals(Bson.serialize(testObj), testBuffer);
        done();
    });

    it('testDeserialize', function (done) {
        Validator.assertEquals(Bson.deserialize(testBuffer), testObj);
        done();
    });
});