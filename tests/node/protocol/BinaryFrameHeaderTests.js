const SDL = require('./../../../lib/js/dist/SDL.min.js');

const FunctionID = SDL.rpc.enums.FunctionID;
const BinaryFrameHeader = SDL.protocol.BinaryFrameHeader;
const Validator = require('./../../Validator');

const RPC_TYPE_NOTIFICATION = 0x02;
const JSON_SIZE = 0;

describe('BinaryFrameHeaderTests', function () {
    before(function () {
        this.createDummyBfh = function () {
            const bfh = new BinaryFrameHeader(RPC_TYPE_NOTIFICATION, FunctionID.OnHMIStatus, 123, JSON_SIZE);
            bfh.setBulkData(null);
            return bfh;
        };
    });

    it('testAssemblyAndParse', function (done) {
        const bfh = this.createDummyBfh();
        const bfhBytes = bfh.assembleHeaderBytes();
        Validator.assertNotNullUndefined(bfhBytes, 'Header bytes returned null.');

        const parsedBfh = BinaryFrameHeader.fromBinaryHeader(bfhBytes);
        Validator.assertNotNullUndefined(parsedBfh, 'Parsed header returned null.');

        Validator.assertTrue(bfh.getCorrelationId() === parsedBfh.getCorrelationId(), 'Correlation ID not parsed properly.');

        Validator.assertTrue(bfh.getFunctionId() === parsedBfh.getFunctionId(), 'Function ID not parsed properly.');

        // RPCType is parsed to 0x00, should be 0x02
        Validator.assertEquals(parsedBfh.getRpcType(), bfh.getRpcType(), 'RPC type not parsed properly.');

        // BulkData is parsed to null, should be Uint8Array
        Validator.assertEquals(parsedBfh.getBulkData(), bfh.getBulkData(), 'Bulk data not parsed properly.');

        // JSONData is parsed to [], should be Uint8Array
        Validator.assertEquals(parsedBfh.getJsonData(), bfh.getJsonData(), 'JSON data not parsed properly.');

        Validator.assertEquals(parsedBfh.getJsonSize(), bfh.getJsonSize(), 'JSON size not parsed properly.');

        done();
    });
});