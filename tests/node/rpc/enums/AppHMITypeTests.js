const SDL = require('./../../../../dist/js/SDL.min.js');

const AppHMIType = SDL.rpc.enums.AppHMIType;
const Validator = require('./../../../Validator.js');

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
        example = 'WEB_VIEW';
        const enumWebView = AppHMIType.valueForKey(example);

        Validator.assertNotNull(enumDefault, 'DEFAULT returned null');
        Validator.assertNotNull(enumCommunication, 'COMMUNICATION returned null');
        Validator.assertNotNull(enumMedia, 'MEDIA returned null');
        Validator.assertNotNull(enumMessaging, 'MESSAGING returned null');
        Validator.assertNotNull(enumNavigation, 'NAVIGATION returned null');
        Validator.assertNotNull(enumInformation, 'INFORMATION returned null');
        Validator.assertNotNull(enumSocial, 'SOCIAL returned null');
        Validator.assertNotNull(enumBackgroundProcess, 'BACKGROUND_PROCESS returned null');
        Validator.assertNotNull(enumProjection, 'PROJECTION returned null');
        Validator.assertNotNull(enumTesting, 'TESTING returned null');
        Validator.assertNotNull(enumSystem, 'SYSTEM returned null');
        Validator.assertNotNull(enumRemoteControl, 'REMOTE_CONTROL returned null');
        Validator.assertNotNull(enumWebView, 'WEB_VIEW returned null');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'deFaUlt';
        const temp = AppHMIType.valueForKey(example);
        Validator.assertNull(temp);
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = AppHMIType.valueForKey(example);
        Validator.assertNull(temp);
        done();
    });
});
