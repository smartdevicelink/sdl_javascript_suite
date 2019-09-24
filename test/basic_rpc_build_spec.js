
const path = require('path');

const expect = require('chai').expect;


const sdl_javascript_suite = require('./../');

console.log(`sdl_javascript_suite version`,sdl_javascript_suite.version);

const {RpcStruct} = sdl_javascript_suite;
console.log(`RpcStruct`,RpcStruct);

describe(`${path.basename(__filename)}`, function() {


    describe('build an rpc struct', function() {
        it('build an rpc struct', async function() {
            let rpcStruct = new RpcStruct({
                "param1": 1,
                                          });

            console.log(`rpcStruct`,rpcStruct);

            console.log(`rpcStruct`,rpcStruct.getObject())

        })
    });



});
