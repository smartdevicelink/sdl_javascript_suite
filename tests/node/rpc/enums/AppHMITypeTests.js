
const expect = require('chai').expect;
const SDL = require('./../../../../lib/js/dist/SDL');

const AppHMIType = SDL.rpc.enums.AppHMIType;

function assertNotNull (msg, val) {
    expect(val, msg).to.not.be.null;
}

describe('AppHMITypeTests', function () {
    it('testValidEnums', function (done) {
        let example = 'DEFAULT';
        const enumDefault = AppHMIType.valueForKey(example);

        example = 'COMMUNICATION';
        const enumCommunication = AppHMIType.valueForKey(example);
        example = 'MEDIA';
        const enumMedia = AppHMIType.valueForKey(example);
        example = 'MESSAGING';
        const enumMessaging = AppHMIType.valueForKey(example);
        example = 'NAVIGATION';
        const enumNavigation = AppHMIType.valueForKey(example);
        example = 'INFORMATION';
        const enumInformation = AppHMIType.valueForKey(example);
        example = 'SOCIAL';
        const enumSocial = AppHMIType.valueForKey(example);
        example = 'BACKGROUND_PROCESS';
        const enumBackgroundProcess = AppHMIType.valueForKey(example);
        example = 'PROJECTION';
        const enumProjection = AppHMIType.valueForKey(example);
        example = 'TESTING';
        const enumTesting = AppHMIType.valueForKey(example);
        example = 'SYSTEM';
        const enumSystem = AppHMIType.valueForKey(example);
        example = 'REMOTE_CONTROL';
        const enumRemoteControl = AppHMIType.valueForKey(example);

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
        const temp = AppHMIType.valueForKey(example);
        expect(temp).to.be.null;
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = AppHMIType.valueForKey(example);
        expect(temp).to.be.null;
        done();
    });


    // TODO missing test for listing of all possible enums?
});