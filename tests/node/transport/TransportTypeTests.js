const SDL = require('../../config.js').node;

const TransportType = SDL.transport.enums.TransportType;

const Validator = require('./../../Validator');
const Test = require('./../../Test');

describe('TransportTypeTests', function () {
    it('testTransportTypeEnum', function (done) {
        const testWebSocketClient = 'WEBSOCKET_CLIENT';
        const testWebSocketServer = 'WEBSOCKET_SERVER';
        const testCustom = 'CUSTOM';
        const testInvalid = 'INVALID';

        const expectedWebSocketClientEnum = TransportType.WEBSOCKET_CLIENT;
        const expectedWebSocketServerEnum = TransportType.WEBSOCKET_SERVER;
        const expectedCustomEnum = TransportType.CUSTOM;

        const expectedEnumList = [];
        expectedEnumList.push(TransportType.WEBSOCKET_CLIENT);
        expectedEnumList.push(TransportType.WEBSOCKET_SERVER);
        expectedEnumList.push(TransportType.CUSTOM);

        const actualNullEnum = TransportType.valueForKey(null);
        const actualWebSocketClientEnum = TransportType.valueForKey(testWebSocketClient);
        const actualWebSocketServerEnum = TransportType.valueForKey(testWebSocketServer);
        const actualCustomEnum = TransportType.valueForKey(testCustom);
        const actualInvalidEnum = TransportType.valueForKey(testInvalid);

        // Valid Tests
        Validator.assertEquals(expectedWebSocketClientEnum, actualWebSocketClientEnum, Test.MATCH);
        Validator.assertEquals(expectedWebSocketServerEnum, actualWebSocketServerEnum, Test.MATCH);
        Validator.assertEquals(expectedCustomEnum, actualCustomEnum, Test.MATCH);

        // Invalid/Null Tests
        Validator.assertNull(actualInvalidEnum, Test.NULL);
        Validator.assertNull(actualNullEnum, Test.NULL);
        done();
    });
});