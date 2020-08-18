const SDL = require('./../../../../dist/js/SDL.min.js');
const MessageType = SDL.rpc.enums.MessageType;
const RpcRequest = SDL.rpc.RpcRequest;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');

describe('RpcRequestsTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new RpcRequest();
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
            return MessageType.request;
        };

        this.getFunctionId = function () {
            return Test.GENERAL_STRING;
        };
    });

    BaseRpcTests.tests();
});