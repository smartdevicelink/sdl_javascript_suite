const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const MessageType = SDL.rpc.enums.MessageType;
const RpcNotification = SDL.rpc.RpcNotification;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');


describe('RpcNotificationTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new RpcNotification();
            msg.setFunctionId(Test.GENERAL_STRING);
            msg.setParameter(Test.GENERAL_STRING, Test.GENERAL_STRING);

            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[Test.GENERAL_STRING] = Test.GENERAL_STRING;
            return expectedParameters;
        };

        this.getMessageType = function () {
            return MessageType.notification;
        };

        this.getFunctionId = function () {
            return Test.GENERAL_STRING;
        };
    });

    BaseRpcTests.tests();
});