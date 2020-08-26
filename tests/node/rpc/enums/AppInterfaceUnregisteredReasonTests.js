const SDL = require('../../../config.js').node;

const AppInterfaceUnregisteredReason = SDL.rpc.enums.AppInterfaceUnregisteredReason;
const Validator = require('./../../../Validator.js');

describe('AppInterfaceUnregisteredReasonTests', function () {
    it('testValidEnums', function (done) {
        let example = 'IGNITION_OFF';
        const enumIgnitionOff = AppInterfaceUnregisteredReason.valueForKey(example);

        example = 'BLUETOOTH_OFF';
        const enumBluetoothOff = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'USB_DISCONNECTED';
        const enumUsbDisconnected = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'REQUEST_WHILE_IN_NONE_HMI_LEVEL';
        const enumRequestWhileInNoneHmiLevel = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'TOO_MANY_REQUESTS';
        const enumTooManyRequests = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'DRIVER_DISTRACTION_VIOLATION';
        const enumDriverDistractionViolation = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'LANGUAGE_CHANGE';
        const enumLanguageChange = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'MASTER_RESET';
        const enumMasterReset = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'FACTORY_DEFAULTS';
        const enumFactoryDefaults = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'APP_UNAUTHORIZED';
        const enumAppUnauthorized = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'PROTOCOL_VIOLATION';
        const enumProtocolViolation = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'UNSUPPORTED_HMI_RESOURCE';
        const enumUnsupportedHmiResource = AppInterfaceUnregisteredReason.valueForKey(example);
        example = 'RESOURCE_CONSTRAINT';
        const enumResourceConstraint = AppInterfaceUnregisteredReason.valueForKey(example);

        Validator.assertNotNull(enumIgnitionOff, 'IGNITION_OFF returned null');
        Validator.assertNotNull(enumBluetoothOff, 'BLUETOOTH_OFF returned null');
        Validator.assertNotNull(enumUsbDisconnected, 'USB_DISCONNECTED returned null');
        Validator.assertNotNull(enumRequestWhileInNoneHmiLevel, 'REQUEST_WHILE_IN_NONE_HMI_LEVEL returned null');
        Validator.assertNotNull(enumTooManyRequests, 'TOO_MANY_REQUESTS returned null');
        Validator.assertNotNull(enumDriverDistractionViolation, 'DRIVER_DISTRACTION_VIOLATION returned null');
        Validator.assertNotNull(enumLanguageChange, 'LANGUAGE_CHANGE returned null');
        Validator.assertNotNull(enumMasterReset, 'MASTER_RESET returned null');
        Validator.assertNotNull(enumFactoryDefaults, 'FACTORY_DEFAULTS returned null');
        Validator.assertNotNull(enumAppUnauthorized, 'APP_UNAUTHORIZED returned null');
        Validator.assertNotNull(enumProtocolViolation, 'PROTOCOL_VIOLATION returned null');
        Validator.assertNotNull(enumUnsupportedHmiResource, 'UNSUPPORTED_HMI_RESOURCE returned null');
        Validator.assertNotNull(enumResourceConstraint, 'RESOURCE_CONSTRAINT returned null');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'deFaUlt';
        const temp = AppInterfaceUnregisteredReason.valueForKey(example);
        Validator.assertNull(temp);
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = AppInterfaceUnregisteredReason.valueForKey(example);
        Validator.assertNull(temp);
        done();
    });
});
