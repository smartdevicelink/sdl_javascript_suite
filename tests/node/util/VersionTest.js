
const SDL = require('./../../../lib/js/dist/SDL');
const Validator = require('./../../Validator.js');

const Version = SDL.util.Version;

const TEST_VERSION_STRING = '1.2.3';
const TEST_VERSION = new Version(1, 2, 3);

describe('VersionTest', function () {
    it('testToString', function (done) {
        const version = new Version();
        version.fromString(TEST_VERSION_STRING);
        Validator.assertEquals(1, version.getMajor());
        Validator.assertEquals(2, version.getMinor());
        Validator.assertEquals(3, version.getPatch());
        done();
    });

    it('testToStringIncorrect', function (done) {
        let err;
        try {
            const version = new Version();
            version.fromString('1.2');
        } catch (error) {
            err = error;
        }
        Validator.assertNotNullUndefined(err);
        done();
    });


    it('testIsNewerThan', function (done) {
        const version1 = new Version(5, 0, 0);

        // Supplied version is newer
        Validator.assertEquals(-1, version1.isNewerThan(new Version(6, 0, 0)));
        Validator.assertEquals(-1, version1.isNewerThan(new Version(5, 1, 0)));
        Validator.assertEquals(-1, version1.isNewerThan(new Version(5, 0, 1)));

        // Supplied version is older
        Validator.assertEquals(1, version1.isNewerThan(new Version(4, 0, 0)));
        Validator.assertEquals(1, version1.isNewerThan(new Version(4, 1, 0)));
        Validator.assertEquals(1, version1.isNewerThan(new Version(4, 0, 1)));

        // Supplied  version is equal
        Validator.assertEquals(0, version1.isNewerThan(new Version(5, 0, 0)));

        done();
    });

    // it.skip('testIsBetween', function (done) {
    //     assertEquals(TEST_VERSION.isBetween(new Version(1, 0, 0), new Version (2, 0, 0)), 1);
    //     assertEquals(TEST_VERSION.isBetween(new Version(2, 0, 0), new Version (1, 0, 0)), -1);
    //     assertEquals(TEST_VERSION.isBetween(new Version(2, 0, 0), new Version (3, 0, 0)), -1);

    //     assertEquals(TEST_VERSION.isBetween(new Version(1, 0, 0), new Version (1, 2, 3)), 0);
    //     assertEquals(TEST_VERSION.isBetween(new Version(1, 2, 3), new Version (3, 2, 3)), 0);

    //     assertEquals(TEST_VERSION.isBetween(new Version(1, 2, 3), new Version (1, 2, 3)), 0);
    //     done();
    // });
});