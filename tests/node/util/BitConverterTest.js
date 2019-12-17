
const expect = require('chai').expect;
const SDL = require('./../../../lib/js/dist/SDL');
const BitConverter = SDL.util.BitConverter;

function assertEquals (val1, val2) {
    expect(val1).to.be.deep.equal(val2);
}

describe('BitConverterTest', function () {
    it('testIntToByteConversions', function (done) {
        // Comparison Values
        const expectedInt = 1234;
        const expectedBytes = new Uint8Array([
            (1234 >>> 24),
            (1234 >>> 16),
            (1234 >>> 8),
            (1234),
        ]).buffer;
        const actualInt = BitConverter.arrayBufferToInt32(expectedBytes, 0);
        const actualBytes = BitConverter.int32ToArrayBuffer(expectedInt);
        const actualNullBytes = BitConverter.arrayBufferToInt32(null, 0);

        // Valid Tests
        assertEquals(expectedInt, actualInt);
        assertEquals(expectedBytes, actualBytes);

        // Invalid/Null Tests
        assertEquals(-1, actualNullBytes);
        done();
    });
});