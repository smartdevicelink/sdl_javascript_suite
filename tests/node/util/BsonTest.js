const SDL = require('./../../../lib/js/dist/SDL.js');
const Bson = SDL.util.Bson;
const expect = require('chai').expect;


describe('BsonTest', function () {
    it('serialize deserialize test', function (done) {
        const testObj = { 'x': 1, };
        expect(testObj).to.be.deep.equal(Bson.deserialize(Bson.serialize(testObj)));
        done();
    });
});