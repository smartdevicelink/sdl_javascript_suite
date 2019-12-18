const expect = require('chai').expect;
const SDL = require('./../lib/js/dist/SDL.js');

const RpcResponse = SDL.rpc.RpcResponse;
const RpcRequest = SDL.rpc.RpcRequest;

const MediaClockFormat = SDL.rpc.enums.MediaClockFormat;

class Validator {
    /**
     * Takes an RpcStruct and converts it to a json object.
     * @param {Object} obj Either a primative value, an array, or an object with getParameters defined. 
     */
    static getParametersJson (obj) {
        let result;
        if (typeof obj === 'object') {
            if (typeof obj.getParameters === 'function') {
                return this.getParametersJson(obj.getParameters());
            } else {
                if (Array.isArray(obj)) {
                    result = [];
                    for (const val of obj) {
                        result.push(this.getParametersJson(val));
                    }
                    return result;
                } else {
                    result = {};
                    for (const key in obj) {
                        const val = obj[key];
                        result[key] = this.getParametersJson(val);
                    }
                }
            }
        } else {
            return obj;
        }
        return result;
    }

    /**
     * Validate an rpcMessage matches the given expectedParameters
     * @param {RpcMessage} rpcMessage - ssageto validate against.
     * @param {Object} expectedParameters - json object of expected parameters
     */
    static validateJson (rpcMessage, expectedParameters) {
        const parameters = this.getParametersJson(rpcMessage.getParameters());
        expect(parameters).to.be.deep.equal(expectedParameters);
    }

    /**
     * 
     * Checks major and minor versions match. patch versions can be different.
     * @param {SdlMsgVersion} item1 
     * @param {SdlMsgVersion} item2 
     * @returns {Boolean} 
     */
    static validateSdlMsgVersion (item1, item2) {
        if (item1 === null) {
            return (item2 === null);
        }
        if (item2 === null) {
            return (item1 === null);
        }

        if (item1.getMajorVersion() !== item2.getMajorVersion() ||
            item1.getMinorVersion() !== item2.getMinorVersion()) {
            return false;
        }
        return true;
    }


    static validateImageFields (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }
        expect(Array.isArray(item1)).to.be.true;
        expect(Array.isArray(item2)).to.be.true;

        expect(item1.length).to.be.equal(item2.length);

        for (let index = 0; index < item1.length; index++) {
            const val1 = item1[index];
            const val2 = item2[index];
            
            expect(val1.getImageTypeSupported()).to.be.deep.equal(val2.getImageTypeSupported());
            expect(val1.getImageFieldName()).to.be.equal(val2.getImageFieldName());
            this.validateImageResolution(val1.getImageResolution(), val2.getImageResolution());
        }



        return true;
    }


    static validatePcmStreamCapabilities (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }

        expect(item1.getAudioType()).to.be.equal(item2.getAudioType());
        expect(item1.getBitsPerSample()).to.be.equal(item2.getBitsPerSample());
        expect(item1.getSamplingRate()).to.be.equal(item2.getSamplingRate());
    }


    static validateImageResolution (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }

        expect(item1).to.exist;
        expect(item2).to.exist;

        expect(item1.getResolutionHeight()).to.be.equal(item2.getResolutionHeight());
        expect(item1.getResolutionWidth()).to.be.equal(item2.getResolutionWidth());
    }


    static validateAudioPassThruCapabilities (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }
        expect(Array.isArray(item1)).to.be.true;
        expect(Array.isArray(item2)).to.be.true;

        expect(item1.length).to.be.equal(item2.length);

        for (let index = 0; index < item1.length; index++) {
            const val1 = item1[index];
            const val2 = item2[index];
            
            expect(val1.getAudioType()).to.be.equal(val2.getAudioType());
            expect(val1.getBitsPerSample()).to.be.equal(val2.getBitsPerSample());
            expect(val1.getSamplingRate()).to.be.equal(val2.getSamplingRate());
        }

        return true;
    }


    static validateTouchEventCapabilities(item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }

        expect(item1).to.exist;
        expect(item2).to.exist;

        expect(item1.getPressAvailable()).to.be.equal(item2.getPressAvailable());
        expect(item1.getDoublePressAvailable()).to.be.equal(item2.getDoublePressAvailable());
        expect(item1.getMultiTouchAvailable()).to.be.equal(item2.getMultiTouchAvailable());

        return true;
    }

    static validateScreenParams (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }

        expect(item1).to.exist;
        expect(item2).to.exist;



        this.validateImageResolution(item1.getResolution(), item2.getResolution());
        this.validateTouchEventCapabilities(item1.getTouchEventAvailable(), item2.getTouchEventAvailable());

        return true;

        if(!( validateImageResolution(params1.getImageResolution(), params2.getImageResolution()) )){
            log("validateScreenParams", "Image resolutions didn't match!");
            return false;
        }

        if(!( validateTouchEventCapabilities(params1.getTouchEventAvailable(), params2.getTouchEventAvailable()) )){
            log("validateScreenParams", "Touch event capabilities didn't match!");
            return false;
        }

        return true;
    }


    static validateDisplayCapabilities  (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }
        expect(item1.getDisplayType()).to.be.equal(item2.getDisplayType());

        expect(Array.isArray(item1.getImageFields())).to.be.true;
        expect(Array.isArray(item2.getImageFields())).to.be.true;

        expect(Array.isArray(item1.getMediaClockFormats())).to.be.true;
        expect(Array.isArray(item2.getMediaClockFormats())).to.be.true;

        expect(Array.isArray(item1.getTextFields())).to.be.true;
        expect(Array.isArray(item2.getTextFields())).to.be.true;

        this.validateImageFields(item1.getImageFields(), item2.getImageFields());

        const mediaClockFormats = item1.getMediaClockFormats();
        for (const clockFormat of mediaClockFormats) {
            expect(clockFormat).to.be.a.string;
            expect(MediaClockFormat.valueForString(clockFormat)).to.be.a.string;
        }

        expect(item1.getDisplayType()).to.be.equal(item2.getDisplayType());
        expect(item1.getDisplayName()).to.be.equal(item2.getDisplayName());
        expect(item1.getGraphicsSupported()).to.be.equal(item2.getGraphicsSupported());
        expect(item1.getTemplatesAvailable()).to.be.equal(item2.getTemplatesAvailable());
        expect(item1.getNumCustomPresetsAvailable()).to.be.equal(item2.getNumCustomPresetsAvailable());

        this.validateScreenParams(item1.getScreenParams(), item2.getScreenParams());
        return true;
    }

    static validatePresetBankCapabilities (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }

        expect(item1.getOnScreenPresetsAvailable()).to.be.equal(item2.getOnScreenPresetsAvailable());
    }

    static validateVehicleType (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }

        expect(item1.getMake()).to.be.equal(item2.getMake());
        expect(item1.getModel()).to.be.equal(item2.getModel());
        expect(item1.getTrim()).to.be.equal(item2.getTrim());
        expect(item1.getModelYear()).to.be.equal(item2.getModelYear());
    }


    static validateButtonCapabilities (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }
        expect(Array.isArray(item1)).to.be.true;
        expect(Array.isArray(item2)).to.be.true;

        expect(item1.length).to.be.equal(item2.length);

        for (let index = 0; index < item1.length; index++) {
            const val1 = item1[index];
            const val2 = item2[index];
            
            expect(val1.getName()).to.be.equal(val2.getName());
            expect(val1.getUpDownAvailable()).to.be.equal(val2.getUpDownAvailable());
            expect(val1.getLongPressAvailable()).to.be.equal(val2.getLongPressAvailable());
            expect(val1.getShortPressAvailable()).to.be.equal(val2.getShortPressAvailable());
        }
    }

    // assertTrue(Test.TRUE, Validator.validateSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST, testSoftButtonCapabilities));

    static validateSoftButtonCapabilities (item1, item2) {
        if (item1 === null) {
            expect(item1).to.be.equal(item2);
            return;
        }
        expect(Array.isArray(item1)).to.be.true;
        expect(Array.isArray(item2)).to.be.true;

        expect(item1.length).to.be.equal(item2.length);

        for (let index = 0; index < item1.length; index++) {
            const val1 = item1[index];
            const val2 = item2[index];
            
            expect(val1.getImageSupported()).to.be.equal(val2.getImageSupported());
            expect(val1.getUpDownAvailable()).to.be.equal(val2.getImageSupported());
            expect(val1.getLongPressAvailable()).to.be.equal(val2.getLongPressAvailable());
            expect(val1.getShortPressAvailable()).to.be.equal(val2.getShortPressAvailable());
        }
    }

    // assertTrue(Test.TRUE, Validator.validateButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST, testButtonCapabilities));
    // assertTrue(Test.TRUE, Validator.validateVehicleType(Test.GENERAL_VEHICLETYPE, testVehicleType));
    // assertTrue(Test.TRUE, Validator.validatePresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES, testPbc));
    // assertTrue(Test.TRUE, Validator.validateDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES, testDc));

    static validateTtsChunks (list1, list2) {
        if (list1 === null || list2 === null) {
            expect(list1).to.equal(list2);
            return;
        }

        let text1 = list1.map((val) => {
            return val.getText();
        });
        let text2 = list1.map((val) => {
            return val.getText();
        });

        expect(text1).to.deep.equal(text2);
    }


    static validateDeviceInfo (item1, item2) {
        if (item1 === null) {
            return item2 === null;
        }
        if (item2 === null) {
            return item1 === null;
        }

        if (item1.getOs()                   !== item2.getOs()          ||
                item1.getCarrier()              !== item2.getCarrier()     ||
                item1.getHardware()             !== item2.getHardware()    ||
                item1.getOsVersion()            !== item2.getOsVersion()   ||
                item1.getFirmwareRev()          !== item2.getFirmwareRev() ||
                item1.getMaxNumberRFCOMMPorts() !== item2.getMaxNumberRFCOMMPorts()) {
            return false;
        }

        return true;
    }

    static validateTemplateColorScheme (item1, item2) {
        if (item1 === null) {
            return item2 === null;
        }
        if (item2 === null) {
            return item1 === null;
        }

        if (item1.getPrimaryColor().getRedValue() !== item2.getPrimaryColor().getRedValue()
                || item1.getPrimaryColor().getGreenValue() !== item2.getPrimaryColor().getGreenValue()
                || item1.getPrimaryColor().getBlueValue() !== item2.getPrimaryColor().getBlueValue()
                || item1.getSecondaryColor().getRedValue() !== item2.getSecondaryColor().getRedValue()
                || item1.getSecondaryColor().getGreenValue() !== item2.getSecondaryColor().getGreenValue()
                || item1.getSecondaryColor().getBlueValue() !== item2.getSecondaryColor().getBlueValue()
                || item1.getBackgroundColor().getRedValue() !== item2.getBackgroundColor().getRedValue()
                || item1.getBackgroundColor().getGreenValue() !== item2.getBackgroundColor().getGreenValue()
                || item1.getBackgroundColor().getBlueValue() !== item2.getBackgroundColor().getBlueValue()) {
            return false;
        }

        return true;
    }




    static assertTrue () {
        const args = arguments;
        let val1, msg;
        if (args.length === 1) {
            val1 = args[0];
        } else if (args.length === 2) {
            msg = args[0];
            val1 = args[1];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.be.true;
    }

    static assertEquals () {
        const args = arguments;
        let val1, val2, msg;
        if (args.length === 2) {
            val1 = args[0];
            val2 = args[1];
        } else if (args.length === 3) {
            msg = args[0];
            val1 = args[1];
            val2 = args[2];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.be.deep.equal(val2);
    }

    static assertNull () {
        const args = arguments;
        let val1, msg;
        if (args.length === 1) {
            val1 = args[0];
        } else if (args.length === 2) {
            msg = args[0];
            val1 = args[1];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.be.null;
    }

    static assertNullOrUndefined () {
        const args = arguments;
        let val1, msg;
        if (args.length === 1) {
            val1 = args[0];
        } else if (args.length === 2) {
            msg = args[0];
            val1 = args[1];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.not.exist;
    }

    static assertNotNull () {
        const args = arguments;
        let val1, msg;
        if (args.length === 1) {
            val1 = args[0];
        } else if (args.length === 2) {
            msg = args[0];
            val1 = args[1];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.be.not.null;
    }

    static validateText (text1, text2) {
        return text1 === text2;
    }


    static assertNotNullUndefined () {
        const args = arguments;
        let val,msg;
        if (args.length === 2) {
            val = args[1];
            msg = args[0];
        } else {
            val = args[0];
        }
        expect(val, msg).not.to.be.null.and.not.to.be.undefined;
    }



    static testNullBase (functionName, messageType, msg) {
        this.assertNotNull('RPCMessage was null.', msg);
        let correlationId;
        if (msg instanceof RpcRequest) {
            correlationId = msg.getCorrelationId(); 
            this.assertNotNull('Correlation ID of the RPC message was null.', correlationId);
        } else if (msg instanceof RpcResponse) {
            correlationId = msg.getCorrelationId();
            this.assertNullOrUndefined('Correlation ID of the RPC message was not null.', correlationId);
        }
        this.assertNotNull('Message type of the RPC message was null.', msg.getRPCType());

        this.assertEquals('Message type didn\'t match expected message type.', messageType, msg.getRPCType());

        this.assertNotNull('Command type of the RPC message was null.', msg.getFunctionName());
        this.assertEquals('Command type didn\'t match expected command type.', functionName, msg.getFunctionName());


        try {
            this.assertTrue('Parameters weren\'t initialized, but the JSON contained 2 or more objects.', (msg.serializeJSON().length() === 1));
        } catch (error) {
            //do nothing
        }
    }  
}



module.exports = Validator;