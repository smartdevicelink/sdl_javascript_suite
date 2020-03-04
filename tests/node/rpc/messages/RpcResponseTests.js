const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const RpcType = SDL.rpc.enums.RpcType;
const RpcResponse = SDL.rpc.RpcResponse;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');

describe('RpcResponseTests', function () {
    before(function () {
        this.createMessage = function () {
            const msg = new RpcResponse();
            msg.setFunctionName(Test.GENERAL_STRING);
            msg.setParameter(Test.GENERAL_STRING, Test.GENERAL_STRING);

            return msg;
        };

        this.getExpectedParameters = function (sdlVersion) {
            const expectedParameters = {};
            expectedParameters[Test.GENERAL_STRING] = Test.GENERAL_STRING;
            return expectedParameters;
        };

        this.getRPCType = function () {
            return RpcType.RESPONSE;
        };

        this.getFunctionName = function () {
            return Test.GENERAL_STRING;
        };
    });

    BaseRpcTests.tests();
});