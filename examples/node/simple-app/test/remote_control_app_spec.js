
const path = require('path');

const expect = require('chai').expect;

const request = require('request');

const PORT = process.env.PORT || 2004;
const APP_ID = 1;
const BASE_URL = `http://localhost:${PORT}`;
const DO_RPC_URL = `${BASE_URL}/DoRpc/${APP_ID}`;
const GET_APPS_INFO_URL = `${BASE_URL}/GetAppsInfo`;

describe(`${path.basename(__filename)}`, function() {

    describe(`build rpc test`, function() {

        it(`build rpc test`, function(done) {

            var options = {
                method: 'POST',
                url: DO_RPC_URL,
                headers:
                    {
                        'Content-Type': 'application/json'
                    },
                body:
                    {
                        method: 'SubscribeVehicleData',
                        params: { speed: true, gps: true, fuelLevel: true }
                    },
                json: true
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);


                console.log(body);
                done();
            });
        });
    });



    describe('GetVehicleData', function() {
        it(`GetVehicleData`, function(done) {

            var options = {
                method: 'POST',
                url: DO_RPC_URL,
                headers:
                    {
                        'Content-Type': 'application/json'
                    },
                body:
                    {
                        method: 'GetVehicleData',
                        params: { speed: true, gps: true, fuelLevel: true }
                    },
                json: true
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);

                console.log(body);
                done();
            });
        });
    })


    describe('GetSessionInfo', function() {
        it(`GetSessionInfo`, function(done) {

            var options = {
                method: 'GET',
                url: GET_APPS_INFO_URL,
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);

                console.log(body);
                done();
            });
        });
    });


});
