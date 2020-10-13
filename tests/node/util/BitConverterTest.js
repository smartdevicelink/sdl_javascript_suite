
const SDL = require('../../config.js').node;
const BitConverter = SDL.util._BitConverter;
const Validator = require('./../../Validator.js');

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
        Validator.assertEquals(expectedInt, actualInt);
        Validator.assertEquals(expectedBytes, actualBytes);

        // Invalid/Null Tests
        Validator.assertEquals(-1, actualNullBytes);
        done();
    });
});