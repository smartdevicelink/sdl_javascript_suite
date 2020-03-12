const parseXml = require('xml2js').parseString;
const needle = require('needle');
const promisify = require('util').promisify;
const URL = "https://raw.githubusercontent.com/smartdevicelink/rpc_spec/master/MOBILE_API.xml";
const fs = require('fs');    
const USE_INTERNAL_NAMES = false;
const ARRAYS_HAVE_AT_LEAST_ONE_ELEMENT = true;
const mkdirp = promisify(require('mkdirp'));

start();

async function start () {
    const specData = await getRpcSpec();
    const spec = await parseXmlPromise(specData);

    //functions rely on structs, which rely on enums. Parse out the enums first
    const enums = spec.interface.enum;
    const parsedEnums = {};
    enums.forEach(e => {
        parsedEnums[getXmlName(e)] = parseEnum(e);
    });
    //parse out the structs
    const structs = spec.interface.struct;
    const parsedStructs = {};
    structs.forEach(e => {
        parsedStructs[getXmlName(e)] = paramsToJson(e.param);
    });
    //parse out the functions
    const functions = spec.interface.function;
    const parsedFunctions = {};
    functions.forEach(e => {
        if (!parsedFunctions[getXmlName(e)]) parsedFunctions[getXmlName(e)] = {};
        parsedFunctions[getXmlName(e)][getMessageType(e)] = paramsToJson(e.param);
    });
    //done
    const fullyParsed = {
        enums: parsedEnums,
        structs: parsedStructs,
        functions: parsedFunctions,
    }

    await mkdirp('./spec')

    //write to file
    fs.writeFile("./spec/spec.json", JSON.stringify(fullyParsed, null, 4), function (err) {
        if (err) console.error(err);
        console.log("Spec Generated");
    }); 

    //use the spec found to generate all RPCs with default values. include only the mandatory ones
    const allDefaultMandatoryRpcs = {};
    //use the spec found to generate all RPCs with default values. include everything
    const allDefaultOptionalRpcs = {};

    for (let rpcName in fullyParsed.functions) {
        const rpc = fullyParsed.functions[rpcName];
        for (let requestType in rpc) {
            if (!allDefaultMandatoryRpcs[rpcName]) allDefaultMandatoryRpcs[rpcName] = {};
            if (!allDefaultOptionalRpcs[rpcName]) allDefaultOptionalRpcs[rpcName] = {};
            allDefaultMandatoryRpcs[rpcName][requestType] = generateRpcObj(fullyParsed, ["functions", rpcName, requestType], true);
            allDefaultOptionalRpcs[rpcName][requestType] = generateRpcObj(fullyParsed, ["functions", rpcName, requestType], false);
        }        
    }

    //write to file
    fs.writeFile("./spec/default-mandatory.json", JSON.stringify(allDefaultMandatoryRpcs, null, 4), function (err) {
        if (err) console.error(err);
        console.log("Default Mandatory RPCs Generated");
    }); 
    fs.writeFile("./spec/default-optional.json", JSON.stringify(allDefaultOptionalRpcs, null, 4), function (err) {
        if (err) console.error(err);
        console.log("Default Optional RPCs Generated");
    }); 
}

function generateRpcObj (spec, propChain, excludeOptional) {
    const finalObj = {};
    let targetObj = spec;
    propChain.forEach(p => {
        targetObj = targetObj[p];
    });
    for (let key in targetObj) {
        if (!excludeOptional || targetObj[key].mandatory !== "false") {
            finalObj[key] = evaluateParam(spec, targetObj[key], excludeOptional);
        }
    }
    return finalObj;
}

function evaluateParam (spec, param) {
    let {type, minvalue, maxvalue, minlength, maxlength, array, minsize, maxsize} = param;
    let value;
    if (type === "Integer") value = minvalue !== undefined ? parseInt(minvalue) : 0;
    else if (type === "Float") value = minvalue !== undefined ? parseFloat(minvalue) : 0.0;
    else if (type === "String") {
        if (minlength === undefined) { // if minlength isn't defined, then assume it's 1
            minlength = 1;
        }
        value = "e".repeat(minlength);
    }
    else if (type === "Boolean") value = true;
    else {  //custom type. Find it in the structs or enums subobject 
        if (spec.enums[type]) { //just put in the first enum found
            value = spec.enums[type][0];
        }
        else if (spec.structs[type]) { //recursive call
            value = generateRpcObj(spec, ["structs", type]);
        }
        else { //unknown
            value = param;
        }
    };
    if (array === 'true') {
        if (ARRAYS_HAVE_AT_LEAST_ONE_ELEMENT) {
            //minsize may not exist even if array is true. in this case, default to 1. If minsize is 0, set to 1 instead
            value = new Array(minsize ? Math.max(1, parseInt(minsize)) : 1).fill(value);
        }
        else {
            value = new Array(minsize ? parseInt(minsize) : 0).fill(value);
        }
    }

    return value;
}

function paramsToJson (params) {
    const json = {};
    if (params === undefined) return json;
    for (let i = 0; i < params.length; i++) {
        const {name, type, minValue, maxValue, minLength, maxLength} = params[i]['$'];
        json[name] = {};
        for (let key in params[i]['$']) {
            json[name][key] = params[i]['$'][key];
        }
        //json[name] = type;
    }
    return json;
}

function getXmlName (obj) {
    if (USE_INTERNAL_NAMES && obj['$'].internal_name) {
        return obj['$'].internal_name;
    }
    return obj['$'].name
}

function getMessageType (obj) {
    return obj['$'].messagetype
}

function parseEnum (obj) {
    return obj['element'].map(getXmlName);
}

async function getRpcSpec () {
    const result = await promisify(needle.get)(URL);
    return result.body;
}

async function parseXmlPromise (data) {
    return promisify(parseXml)(data);
}
