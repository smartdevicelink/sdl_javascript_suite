const SDL = require('../../config.js').node;

const FunctionID = SDL.rpc.enums.FunctionID;
const _BinaryFrameHeader = SDL.protocol._BinaryFrameHeader;
const Validator = require('./../../Validator');

const RPC_TYPE_NOTIFICATION = 0x02;
const JSON_SIZE = 0;

describe('_BinaryFrameHeaderTests', function () {
    before(function () {
        this.createDummyBfh = function () {
            const bfh = new _BinaryFrameHeader(RPC_TYPE_NOTIFICATION, FunctionID.OnHMIStatus, 123, JSON_SIZE);
            bfh.setBulkData(null);
            return bfh;
        };
    });

    it('testAssemblyAndParse', function (done) {
        const bfh = this.createDummyBfh();
        const bfhBytes = bfh.assembleHeaderBytes();
        Validator.assertNotNullUndefined(bfhBytes, 'Header bytes returned null.');

        const parsedBfh = _BinaryFrameHeader.fromBinaryHeader(bfhBytes);
        Validator.assertNotNullUndefined(parsedBfh, 'Parsed header returned null.');

        Validator.assertTrue(bfh.getCorrelationId() === parsedBfh.getCorrelationId(), 'Correlation ID not parsed properly.');

        Validator.assertTrue(bfh.getFunctionId() === parsedBfh.getFunctionId(), 'Function ID not parsed properly.');

        Validator.assertEquals(parsedBfh.getMessageType(), bfh.getMessageType(), 'RPC type not parsed properly.');

        Validator.assertEquals(parsedBfh.getBulkData(), bfh.getBulkData(), 'Bulk data not parsed properly.');

        Validator.assertEquals(parsedBfh.getJsonData(), bfh.getJsonData(), 'JSON data not parsed properly.');

        Validator.assertEquals(parsedBfh.getJsonSize(), bfh.getJsonSize(), 'JSON size not parsed properly.');

        done();
    });
});