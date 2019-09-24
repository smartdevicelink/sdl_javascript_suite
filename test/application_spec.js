
const path = require('path');

const expect = require('chai').expect;


const sdl_javascript_suite = require('./../');

console.log(`sdl_javascript_suite version`,sdl_javascript_suite.version);

const {Application} = sdl_javascript_suite;
console.log(`Application`,Application);

describe(`${path.basename(__filename)}`, function() {


    describe('build an applicationt', function() {
        it('build an application', async function() {
            let app = new Application({
                "appName": 1,
                "appID": 1,
                                          });

            console.log(`app`,app);


        })
    });



});
