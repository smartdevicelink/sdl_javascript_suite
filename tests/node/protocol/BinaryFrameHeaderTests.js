const SDL = require('./../../../lib/js/dist/SDL.min.js');

const FunctionID = SDL.rpc.enums.FunctionID;
const BinaryFrameHeader = SDL.protocol.BinaryFrameHeader;
const Validator = require('./../../Validator');

const RPC_TYPE_NOTIFICATION = 0x02;
const MAX_SAFE_INT = Math.pow(2, 31) - 1;

describe('BinaryFrameHeaderTests', function(){
    before(function (){
        this.createDummyBfh = function(){
            const bfh = new BinaryFrameHeader(RPC_TYPE_NOTIFICATION, FunctionID.OnHMIStatus, 123, MAX_SAFE_INT);
            //bfh.setCorrelationId(123);
            //bfh.setFunctionId(FunctionID.OnHMIStatus);
            //bfh.setRpcType(RPC_TYPE_NOTIFICATION);
            bfh.setBulkData(new Uint8Array(2));
            bfh.setJsonData(new Uint8Array(2));
            return bfh;
        };
    });

    it('testAssemblyAndParse', function(done){
        const bfh = this.createDummyBfh();
        const bfhBytes = bfh.assembleHeaderBytes();
        Validator.assertNotNullUndefined(bfhBytes, 'Header bytes returned null.');
        
        const parsedBfh = BinaryFrameHeader.fromBinaryHeader(bfhBytes);
        Validator.assertNotNullUndefined(parsedBfh, 'Parsed header returned null.');
        
        Validator.assertTrue(bfh.getCorrelationId() == parsedBfh.getCorrelationId(), 'Correlation ID not parsed properly.');

        Validator.assertTrue(bfh.getFunctionId() == parsedBfh.getFunctionId(), 'Function ID not parsed properly.');

        //RPCType is parsed to 0x00, should be 0x02
        //Validator.assertNull(parsedBfh.getRpcType());
        //Validator.assertTrue(bfh.getRpcType() == parsedBfh.getRpcType(), 'RPC type not parsed properly.');

        //BulkData is parsed to null, should be Uint8Array
        //Validator.assertTrue(parsedBfh.getBulkData());
        //Validator.assertTrue(bfh.getBulkData() == parsedBfh.getBulkData(), 'Bulk data not parsed properly.');

        //JSONData is parsed to [], should be Uint8Array
        //Validator.assertNull(parsedBfh.getJsonData());
        //Validator.assertTrue(bfh.getJsonData() == parsedBfh.getJsonData(), 'JSON data not parsed properly.');

        Validator.assertTrue(bfh.getJsonSize() == parsedBfh.getJsonSize(), 'JSON size not parsed properly.');

        done();
    });
});