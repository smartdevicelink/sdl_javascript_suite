const SDL = require('../../../config.js').node;
const MessageType = SDL.rpc.enums.MessageType;
const RpcResponse = SDL.rpc.RpcResponse;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');

describe('RpcResponseTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new RpcResponse();
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
            return MessageType.response;
        };

        this.getFunctionId = function () {
            return Test.GENERAL_STRING;
        };
    });

    BaseRpcTests.tests();
});