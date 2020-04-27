const SDL = require('./../../../../lib/js/dist/SDL.min.js');

const RpcRequest = SDL.rpc.RpcRequest;
const RpcResponse = SDL.rpc.RpcResponse;

const Validator = require('./../../../Validator.js');

const CORR_ID = 402;

exports.tests = function () {
    before(function () {
        this.CORR_ID = CORR_ID;
        const msg = this.msg = this.createMessage();
        if (msg instanceof RpcRequest) {
            msg.setCorrelationId(CORR_ID);
        } else if (msg instanceof RpcResponse) {
            msg.setCorrelationId(CORR_ID);
        }
    });

    it('testCreation', function (done) {
        Validator.assertNotNullUndefined(this.msg, 'Object creation failed.');
        done();
    });

    it('testCorrelationId', function (done) {
        const msg = this.msg;
        const CORR_ID = this.CORR_ID;
        if (msg instanceof RpcRequest) {
            const correlationId = msg.getCorrelationId();
            Validator.assertNotNullUndefined(correlationId, 'Correlation ID should be defined.');
            Validator.assertEquals(CORR_ID, correlationId, 'Correlation ID doesn\'t match expected ID.');
        } else if (msg instanceof RpcResponse) {
            const correlationId = msg.getCorrelationId();
            Validator.assertNotNullUndefined(correlationId, 'Correlation ID should be defined.');
            Validator.assertEquals(CORR_ID, correlationId, 'Correlation ID doesn\'t match expected ID.');
        }
        done();
    });

    it('testMessageType', function (done) {
        const messageType = this.msg.getMessageType();
        Validator.assertNotNullUndefined(messageType);
        Validator.assertEquals(messageType, this.getMessageType());
        done();
    });

    it('testFunctionName', function (done) {
        const functionId = this.msg.getFunctionId();
        Validator.assertNotNullUndefined(functionId);
        Validator.assertEquals(functionId, this.getFunctionId());

        done();
    });

    it('testJson', function (done) {
        Validator.validateJson(this.msg, this.getExpectedParameters());
        done();
    });

    it('testNullBase', function (done) {
        const msg = this.msg;
        Validator.assertNotNullUndefined(msg, 'RPCMessage was null.');

        const CORR_ID = msg.getCorrelationId();
        if (msg instanceof RpcRequest) {
            Validator.assertNotNullUndefined(CORR_ID, 'Correlation ID of the RpcRequest was null.');
        } else if (msg instanceof RpcResponse) {
            Validator.assertNotNullUndefined(CORR_ID, 'Correlation ID of the RpcResponse was null.');
        }

        Validator.assertNotNullUndefined(msg.getMessageType(), 'Message Type of the RPC message was null.');
        Validator.assertEquals(msg.getMessageType(), this.getMessageType(), 'Message Type didn\'t match expected type.');
        Validator.assertNotNullUndefined(msg.getFunctionId(), 'Function id of the RPC message was null.');
        Validator.assertEquals(this.getFunctionId(), msg.getFunctionId(), 'Function id didn\'t match expected function name.');

        done();
    });
};
