/*
* Copyright (c) 2019, Livio, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

const fs = require('fs');
const promisify = require('util').promisify;
const spec = require('./spec/spec.json');
// const mandatory = require('./spec/default-mandatory.json');
// const optional = require('./spec/default-optional.json');

async function start () {
    // port and host must be defined
    if (process.env.HOST === undefined) {
        console.error('HOST environment variable required');
        return;
    }
    if (process.env.PORT === undefined) {
        console.error('PORT environment variable required');
        return;
    }

    // keep track of rpc property coverage when doing all the tests
    const coverage = createCoverageState();

    await runTests(coverage);

    console.log('\nEnd of test overview:');

    const overviewStats = {
        enums: analyzeCoverage(coverage, 'enums'),
        structs: analyzeCoverage(coverage, 'structs'),
        functions: {
            request: analyzeCoverage(coverage, 'functions', 'request'),
            response: analyzeCoverage(coverage, 'functions', 'response'),
            notification: analyzeCoverage(coverage, 'functions', 'notification'),
        },
    };

    if (process.env.HIDE_COVERAGE !== 'true') {
        console.log('\nEnum coverage:');
        console.log(overviewStats.enums);
        console.log('\nStruct coverage:');
        console.log(overviewStats.structs);
        console.log('\nFunction request coverage:');
        console.log(overviewStats.functions.request);
        console.log('\nFunction response coverage:');
        console.log(overviewStats.functions.response);
        console.log('\nFunction notification coverage:');
        console.log(overviewStats.functions.notification);

        console.log('\nFinal grade is measured by:');
        console.log('\tTop level coverage of enums');
        console.log('\tTop level coverage of structs');
        console.log('\tTop level and property coverage of requests');
    }
    

    let covered = 0;
    let total = 0;
    covered += overviewStats.enums.topLevelCovered;
    total += overviewStats.enums.topLevelTotal;
    covered += overviewStats.structs.topLevelCovered;
    total += overviewStats.structs.topLevelTotal;
    covered += overviewStats.functions.request.allPropsCovered + overviewStats.functions.request.topLevelCovered;
    total += overviewStats.functions.request.allPropsTotal + overviewStats.functions.request.topLevelTotal;

    const grade = Math.floor(covered * 100 / total);
    console.log(`\nFinal grade: ${covered}/${total}, or ${grade}%`);

    await promisify(fs.writeFile)('./coverage-results.json', JSON.stringify(coverage, null, 4));
}

function analyzeCoverage (coverage, section, functionType = null) {
    let topLevelCovered = 0;
    let topLevelTotal = 0;
    let allPropsCovered = 0;
    let allPropsTotal = 0;
    const missingCoverage = [];

    let baseSearchObj;
    if (section === 'functions') {
        baseSearchObj = coverage[section][functionType];
    } else {
        baseSearchObj = coverage[section];
    }

    // search for true values in all nested properties
    for (const name in baseSearchObj) {
        let atLeastOnePropCovered = false;
        for (const prop in baseSearchObj[name]) {
            if (prop === '_isUsed') {
                continue; // ignore the custom property
            }
            allPropsTotal++;
            if (baseSearchObj[name][prop]) {
                atLeastOnePropCovered = true;
                allPropsCovered++;
            }
        }
        topLevelTotal++;
        if (baseSearchObj[name]._isUsed) { // for functions
            topLevelCovered++;
        } else if (atLeastOnePropCovered) { // for enums and structs
            topLevelCovered++;
        } else {
            missingCoverage.push(name);
        }
    }
    return {
        topLevelCovered,
        topLevelTotal,
        allPropsCovered,
        allPropsTotal,
        missingCoverage,
    };
}

function createCoverageState () {
    const specCopy = JSON.parse(JSON.stringify(spec));
    // enums
    for (const name in specCopy.enums) {
        const obj = {};
        for (const prop in specCopy.enums[name]) {
            obj[specCopy.enums[name][prop]] = false;
        }
        specCopy.enums[name] = obj;
    }

    // structs
    for (const name in specCopy.structs) {
        for (const prop in specCopy.structs[name]) {
            specCopy.structs[name][prop] = false;
        }
    }

    // functions
    // restructure the object so that request/response/notifications are the next level properties
    const newFunctions = {};
    newFunctions.request = {};
    newFunctions.response = {};
    newFunctions.notification = {};

    for (const name in specCopy.functions) {
        if (specCopy.functions[name].request !== undefined) {
            newFunctions.request[name] = {};
            newFunctions.request[name]._isUsed = false;
        }
        if (specCopy.functions[name].response !== undefined) {
            newFunctions.response[name] = {};
            newFunctions.response[name]._isUsed = false;
        }
        if (specCopy.functions[name].notification !== undefined) {
            newFunctions.notification[name] = {};
            newFunctions.notification[name]._isUsed = false;
        }

        for (const prop in specCopy.functions[name].request) {
            newFunctions.request[name][prop] = false;
        }
        for (const prop in specCopy.functions[name].response) {
            newFunctions.response[name][prop] = false;
        }
        for (const prop in specCopy.functions[name].notification) {
            newFunctions.notification[name][prop] = false;
        }
    }

    specCopy.functions = newFunctions;

    return specCopy;
}

function catalogRpc (coverage) {
    return function log (rpc) {
        const rpcTypeValue = rpc.getRPCType();
        let rpcTypeName;
        if (rpcTypeValue === 0) {
            rpcTypeName = 'request';
        } else if (rpcTypeValue === 1) {
            rpcTypeName = 'response';
        } else if (rpcTypeValue === 2) {
            rpcTypeName = 'notification';
        } else {
            console.error('No rpc type found');
            console.error(rpc);
            return;
        }
        const parameters = rpc.getParameters();

        const rpcInSpec = spec.functions[rpc.getFunctionName()][rpcTypeName];
        const rpcInCoverage = coverage.functions[rpcTypeName][rpc.getFunctionName()];

        rpcInCoverage._isUsed = true;

        // add coverage to the RPC message
        for (const prop in parameters) {
            rpcInCoverage[prop] = true;
        }

        // add coverage to the structs and enums
        analyzeStruct(coverage, parameters, rpcInSpec, null);
    };
}

function analyzeStruct (coverage, parameters, specScope, structName = null) {
    // add coverage to the struct
    if (structName !== null) {
        for (const prop in parameters) {
            coverage.structs[structName][prop] = true;
        }
    }

    // for every property found, find its type using spec.json and add it to the coverage JSON
    for (const prop in parameters) {
        let value = parameters[prop];
        const propType = specScope[prop].type;
        const isArray = specScope[prop].array === 'true';

        if (propType !== 'String' && propType !== 'Number' && propType !== 'Boolean') {
            // make value into an array to simplify the logic, if it isn't one already
            if (!isArray) {
                value = [value];
            }
            // loop through the elements and mark their properties or values as covered
            for (const element of value) {
                // check enums and structs
                if (coverage.enums[propType]) {
                    coverage.enums[propType][element] = true;
                }
                if (coverage.structs[propType]) {
                    coverage.structs[propType][prop] = true;
                    // recurse this logic if it's a struct

                    let params;
                    if (typeof element.getParameters === 'function') {
                        params = element.getParameters();
                    } else {
                        params = element;
                    }

                    analyzeStruct(coverage, params, spec.structs[propType], propType);
                }
            }
        }
    }
}

async function runTests (coverage) {
    const folders = await promisify(fs.readdir)(`${__dirname}/tests`, {
        withFileTypes: true,
    });

    for (const folder of folders) {
        if (!folder.isDirectory()) {
            continue; // ignore regular files
        }

        if (process.env.TEST !== undefined && process.env.TEST !== folder.name) {
            continue; // if TEST is defined, make it so that only that test runs
        }

        const testModule = require(`${__dirname}/tests/${folder.name}`);
        const result = await testModule(catalogRpc(coverage))
            .catch(err => console.error(err));
    }
}

start();