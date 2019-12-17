
const expect = require('chai').expect;
const SDL = require('./../../../../lib/js/dist/SDL');

const AppHMIType = SDL.rpc.enums.AppHMIType;

function assertNotNull (msg, val) {
    expect(val, msg).to.not.be.null;
}

describe('AppHMITypeTests', function () {
    it('testValidEnums', function (done) {
        let example = 'DEFAULT';
        const enumDefault = AppHMIType.valueForString(example);

        example = 'COMMUNICATION';
        const enumCommunication = AppHMIType.valueForString(example);
        example = 'MEDIA';
        const enumMedia = AppHMIType.valueForString(example);
        example = 'MESSAGING';
        const enumMessaging = AppHMIType.valueForString(example);
        example = 'NAVIGATION';
        const enumNavigation = AppHMIType.valueForString(example);
        example = 'INFORMATION';
        const enumInformation = AppHMIType.valueForString(example);
        example = 'SOCIAL';
        const enumSocial = AppHMIType.valueForString(example);
        example = 'BACKGROUND_PROCESS';
        const enumBackgroundProcess = AppHMIType.valueForString(example);
        example = 'PROJECTION';
        const enumProjection = AppHMIType.valueForString(example);
        example = 'TESTING';
        const enumTesting = AppHMIType.valueForString(example);
        example = 'SYSTEM';
        const enumSystem = AppHMIType.valueForString(example);
        example = 'REMOTE_CONTROL';
        const enumRemoteControl = AppHMIType.valueForString(example);

        assertNotNull('DEFAULT returned null', enumDefault);
        assertNotNull('COMMUNICATION returned null', enumCommunication);
        assertNotNull('MEDIA returned null', enumMedia);
        assertNotNull('MESSAGING returned null', enumMessaging);
        assertNotNull('NAVIGATION returned null', enumNavigation);
        assertNotNull('INFORMATION returned null', enumInformation);
        assertNotNull('SOCIAL returned null', enumSocial);
        assertNotNull('BACKGROUND_PROCESS returned null', enumBackgroundProcess);
        assertNotNull('PROJECTION returned null', enumProjection);
        assertNotNull('TESTING returned null', enumTesting);
        assertNotNull('SYSTEM returned null', enumSystem);
        assertNotNull('REMOTE_CONTROL returned null', enumRemoteControl);
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'deFaUlt';
        const temp = AppHMIType.valueForString(example);
        expect(temp).to.be.null;
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = AppHMIType.valueForString(example);
        expect(temp).to.be.null;
        done();
    });


    // TODO missing test for listing of all possible enums?
});