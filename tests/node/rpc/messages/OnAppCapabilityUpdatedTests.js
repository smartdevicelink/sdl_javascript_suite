const SDL = require('./../../../../dist/js/SDL.min.js');
const OnAppCapabilityUpdated = SDL.rpc.messages.OnAppCapabilityUpdated;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('OnAppCapabilityUpdatedTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new OnAppCapabilityUpdated();
            msg.setAppCapability(Test.GENERAL_APP_CAPABILITY);
            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[OnAppCapabilityUpdated.KEY_APP_CAPABILITY] = Test.JSON_APP_CAPABILITY;
            return expectedParameters;
        };

        this.getMessageType = function () {
            return MessageType.notification;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.OnAppCapabilityUpdated);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        // Test Values
        let rpcMessage = this.msg;
        const appCapability = rpcMessage.getAppCapability();

        // Valid Tests
        Validator.assertEquals(Test.GENERAL_APP_CAPABILITY, appCapability);

        // Invalid/Null Tests
        rpcMessage = new OnAppCapabilityUpdated();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.OnAppCapabilityUpdated),
            MessageType.notification,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getAppCapability());

        done();
    });
});