const SDL = require('./../../../../lib/js/dist/SDL.js');

const RpcRequest = SDL.rpc.RpcRequest;
const RpcResponse = SDL.rpc.RpcResponse;

const Validator = require('./../../../Validator.js');

const assertEquals = Validator.assertEquals.bind(Validator);
const assertNotNullUndefined = Validator.assertNotNullUndefined.bind(Validator);

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
        assertNotNullUndefined('Object creation failed.', this.msg);
        done();
    });

    it('testCorrelationId', function (done) {
        const msg = this.msg;
        const CORR_ID = this.CORR_ID;
        if (msg instanceof RpcRequest) {
            const correlationId = msg.getCorrelationId(); 
            assertNotNullUndefined('Correlation ID should be defined.', correlationId);
            assertEquals('Correlation ID doesn\'t match expected ID.', CORR_ID, correlationId);
        } else if (msg instanceof RpcResponse) {
            const correlationId = msg.getCorrelationId();
            assertNotNullUndefined('Correlation ID should be defined.', correlationId);
            assertEquals('Correlation ID doesn\'t match expected ID.', CORR_ID, correlationId);
        }
        done();
    });

    it('testRPCType', function (done) {
        const messageType = this.msg.getRPCType();
        assertNotNullUndefined(messageType);
        assertEquals(messageType, this.getRPCType());
        done();
    });

    it('testFunctionName', function (done) {
        const functionName = this.msg.getFunctionName();
        assertNotNullUndefined(functionName);
        assertEquals(functionName, this.getFunctionName());

        done();
    });

    it('testJson', function (done) {
        Validator.validateJson(this.msg, this.getExpectedParameters());
        done();
    });
};