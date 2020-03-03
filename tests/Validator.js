const expect = require('chai').expect;
const SDL = require('./../lib/js/dist/SDL.js');

const RpcResponse = SDL.rpc.RpcResponse;
const RpcRequest = SDL.rpc.RpcRequest;

const MediaClockFormat = SDL.rpc.enums.MediaClockFormat;

class Validator {
    /**
     * Takes an RpcStruct and converts it to a json object.
     * @param {Object} obj - Either a primative value, an array, or an object with getParameters defined.
     */
    static getParametersJson (obj) {
        let result;
        if (typeof obj === 'object') {
            if (typeof obj.getParameters === 'function') {
                return Validator.getParametersJson(obj.getParameters());
            } else {
                if (Array.isArray(obj)) {
                    result = [];
                    for (const val of obj) {
                        result.push(Validator.getParametersJson(val));
                    }
                    return result;
                } else {
                    result = {};
                    for (const key in obj) {
                        const val = obj[key];
                        result[key] = Validator.getParametersJson(val);
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
     * @param {RpcMessage} rpcMessage - message to validate against.
     * @param {Object} expectedParameters - json object of expected parameters
     */
    static validateJson (rpcMessage, expectedParameters) {
        const parameters = Validator.getParametersJson(rpcMessage.getParameters());
        expect(parameters).to.be.deep.equal(expectedParameters);
        return true;
    }

    /**
     * Checks major and minor versions match. patch versions can be different.
     * @param {SdlMsgVersion} item1
     * @param {SdlMsgVersion} item2
     * @returns {Boolean}
     */
    static validateSdlMsgVersion (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }
        expect(item1.getMajorVersion()).to.be.equal(item2.getMajorVersion());
        expect(item1.getMinorVersion()).to.be.equal(item2.getMinorVersion());

        return true;
    }


    /**
     * ImageField equals validation.
     * @param {ImageField} item1
     * @param {ImageField} item2
     */
    static validateImageFields (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }
        expect(Array.isArray(item1)).to.be.true;
        expect(Array.isArray(item2)).to.be.true;
        expect(item1.length).to.be.equal(item2.length);

        for (let index = 0; index < item1.length; index++) {
            const val1 = item1[index];
            const val2 = item2[index];

            expect(val1.getImageTypeSupported()).to.be.deep.equal(val2.getImageTypeSupported());
            expect(val1.getName()).to.be.equal(val2.getName());
            Validator.validateImageResolution(val1.getImageResolution(), val2.getImageResolution());
        }

        return true;
    }


    /**
     * RegisterAppInterface pcm stream capabilities validation.
     * @param {AudioPassThruCapabilities} item1
     * @param {AudioPassThruCapabilities} item2
     */
    static validatePcmStreamCapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1.getAudioType()).to.be.equal(item2.getAudioType());
        expect(item1.getBitsPerSample()).to.be.equal(item2.getBitsPerSample());
        expect(item1.getSamplingRate()).to.be.equal(item2.getSamplingRate());
        return true;
    }


    /**
     * AudioPassThruCapabilities array equals validation.
     * @param {Array<AudioPassThruCapabilities>} item1
     * @param {Array<AudioPassThruCapabilities>} item2
     */
    static validateAudioPassThruCapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
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

    /**
     * ImageResolution equals validation
     * @param {ImageResolution} item1
     * @param {ImageResolution} item2
     */
    static validateImageResolution (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1).to.exist;
        expect(item2).to.exist;

        expect(item1.getResolutionHeight()).to.be.equal(item2.getResolutionHeight());
        expect(item1.getResolutionWidth()).to.be.equal(item2.getResolutionWidth());
    }


    /**
     * TouchEventCapabilities equals validation.
     * @param {TouchEventCapabilities} item1
     * @param {TouchEventCapabilities} item2
     */
    static validateTouchEventCapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1).to.exist;
        expect(item2).to.exist;

        expect(item1.getPressAvailable()).to.be.equal(item2.getPressAvailable());
        expect(item1.getDoublePressAvailable()).to.be.equal(item2.getDoublePressAvailable());
        expect(item1.getMultiTouchAvailable()).to.be.equal(item2.getMultiTouchAvailable());

        return true;
    }

    /**
     * ScreenParams equals validation.
     * @param {ScreenParams} item1
     * @param {ScreenParams} item2
     */
    static validateScreenParams (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1).to.exist;
        expect(item2).to.exist;

        Validator.validateImageResolution(item1.getResolution(), item2.getResolution());
        Validator.validateTouchEventCapabilities(item1.getTouchEventAvailable(), item2.getTouchEventAvailable());

        return true;
    }


    /**
     * DisplayCapabilities equals validation.
     * @param {DisplayCapabilities} item1
     * @param {DisplayCapabilities} item2
     */
    static validateDisplayCapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }
        expect(item1.getDisplayType()).to.be.equal(item2.getDisplayType());

        expect(Array.isArray(item1.getImageFields())).to.be.true;
        expect(Array.isArray(item2.getImageFields())).to.be.true;

        expect(Array.isArray(item1.getMediaClockFormats())).to.be.true;
        expect(Array.isArray(item2.getMediaClockFormats())).to.be.true;

        expect(Array.isArray(item1.getTextFields())).to.be.true;
        expect(Array.isArray(item2.getTextFields())).to.be.true;

        Validator.validateImageFields(item1.getImageFields(), item2.getImageFields());

        const mediaClockFormats = item1.getMediaClockFormats();
        for (const clockFormat of mediaClockFormats) {
            expect(clockFormat).to.be.a.string;
            expect(MediaClockFormat.valueForKey(clockFormat)).to.be.a.string;
        }

        expect(item1.getDisplayType()).to.be.equal(item2.getDisplayType());
        expect(item1.getDisplayName()).to.be.equal(item2.getDisplayName());
        expect(item1.getGraphicSupported()).to.be.equal(item2.getGraphicSupported());
        expect(item1.getTemplatesAvailable()).to.be.equal(item2.getTemplatesAvailable());
        expect(item1.getNumCustomPresetsAvailable()).to.be.equal(item2.getNumCustomPresetsAvailable());

        Validator.validateScreenParams(item1.getScreenParams(), item2.getScreenParams());
        return true;
    }

    /**
     * PresetBankCapabilities equals validation.
     * @param {PresetBankCapabilities} item1
     * @param {PresetBankCapabilities} item2
     */
    static validatePresetBankCapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1.getOnScreenPresetsAvailable()).to.be.equal(item2.getOnScreenPresetsAvailable());
        return true;
    }

    /**
     * VehicleType equals validation.
     * @param {VehicleType} item1
     * @param {VehicleType} item2
     */
    static validateVehicleType (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1.getMake()).to.be.equal(item2.getMake());
        expect(item1.getModel()).to.be.equal(item2.getModel());
        expect(item1.getTrim()).to.be.equal(item2.getTrim());
        expect(item1.getModelYear()).to.be.equal(item2.getModelYear());
        return true;
    }


    /**
     * HMICapabilities equals validation.
     * @param {HMICapabilities} item1
     * @param {HMICapabilities} item2
     */
    static validateHMICapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1.getNavigation()).to.be.equal(item2.getNavigation());
        expect(item1.getVideoStreaming()).to.be.equal(item2.getVideoStreaming());
        expect(item1.getPhoneCall()).to.be.equal(item2.getPhoneCall());
        return true;
    }

    /**
     * ButtonCapabilities array equals validation.
     * @param {Array<ButtonCapabilities>} item1
     * @param {Array<ButtonCapabilities>} item2
     */
    static validateButtonCapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
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
        return true;
    }

    /**
     * SoftButtonCapabilities array equals validation.
     * @param {Array<SoftButtonCapabilities>} item1
     * @param {Array<SoftButtonCapabilities>} item2
     */
    static validateSoftButtonCapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
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
        return true;
    }

    /**
     * TTSChunk array equals validation.
     * @param {Array<TTSChunk>} item1
     * @param {Array<TTSChunk>} item2
     */
    static validateTtsChunks (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }
        expect(Array.isArray(item1)).to.be.true;
        expect(Array.isArray(item2)).to.be.true;

        expect(item1.length).to.be.equal(item2.length);

        for (let index = 0; index < item1.length; index++) {
            const val1 = item1[index];
            const val2 = item2[index];
            expect(val1.getText()).to.be.equal(val2.getText());
        }
        return true;
    }


    /**
     * DeviceInfo equals validation.
     * @param {DeviceInfo} item1
     * @param {DeviceInfo} item2
     */
    static validateDeviceInfo (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.equal(item2);
            return true;
        }

        expect(item1.getOs()).to.be.equal(item2.getOs());
        expect(item1.getCarrier()).to.be.equal(item2.getCarrier());
        expect(item1.getHardware()).to.be.equal(item2.getHardware());
        expect(item1.getOsVersion()).to.be.equal(item2.getOsVersion());
        expect(item1.getFirmwareRev()).to.be.equal(item2.getFirmwareRev());
        expect(item1.getMaxNumberRFCOMMPorts()).to.be.equal(item2.getMaxNumberRFCOMMPorts());

        return true;
    }

    /**
     * TemplateColorScheme equals validation.
     * @param {TemplateColorScheme} item1
     * @param {TemplateColorScheme} item2
     */
    static validateTemplateColorScheme (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.equal(item2);
            return true;
        }

        expect(item1.getPrimaryColor().getRed()).to.be.equal(item2.getPrimaryColor().getRed());
        expect(item1.getPrimaryColor().getGreen()).to.be.equal(item2.getPrimaryColor().getGreen());
        expect(item1.getPrimaryColor().getBlue()).to.be.equal(item2.getPrimaryColor().getBlue());

        expect(item1.getSecondaryColor().getRed()).to.be.equal(item2.getSecondaryColor().getRed());
        expect(item1.getSecondaryColor().getGreen()).to.be.equal(item2.getSecondaryColor().getGreen());
        expect(item1.getSecondaryColor().getBlue()).to.be.equal(item2.getSecondaryColor().getBlue());

        expect(item1.getBackgroundColor().getRed()).to.be.equal(item2.getBackgroundColor().getRed());
        expect(item1.getBackgroundColor().getGreen()).to.be.equal(item2.getBackgroundColor().getGreen());
        expect(item1.getBackgroundColor().getBlue()).to.be.equal(item2.getBackgroundColor().getBlue());

        return true;
    }

    /**
     * Assert val is true.
     * @param {*} val - value to assert
     * @param {String} msg - Message to display on failure.
     */
    static assertTrue (val, msg) {
        expect(val, msg).to.be.true;
    }

    /**
     * Assert values are equal. Defaults to deeply equal which means
     * objects like [1,2] or {'x': 1} will be compared based on values and not
     * by reference.
     * @param {*} val1 - First value to compare.
     * @param {*} val2 - Second value to compare.
     * @param {String} msg - Message to display on failure.
     */
    static assertEquals (val1, val2, msg) {
        expect(val1, msg).to.be.deep.equal(val2);
    }

    /**
     * Assert value is null or undefined.
     * @param {*} val - value to assert.
     * @param {String} msg - Message to display on failure.
     */
    static assertNullOrUndefined (val, msg) {
        expect(val, msg).to.not.exist;
    }

    /**
     * Assert value is not null.
     * @param {*} val - value to assert.
     * @param {String} msg - Message to display on failure.
     */
    static assertNotNull (val, msg) {
        expect(val, msg).to.be.not.null;
    }

    /**
     * Assert value is null.
     * @param {*} val - value to assert.
     * @param {String} msg - Message to display on failure.
     */
    static assertNull (val, msg) {
        expect(val, msg).to.be.null;
    }

    /**
     * Assert value is not null or undefined.
     * @param {*} val - value to assert.
     * @param {String} msg - Message to display on failure.
     */
    static assertNotNullUndefined (val, msg) {
        expect(val, msg).not.to.be.null.and.not.to.be.undefined;
    }

    /**
     * Test a basic RpcRequest or RpcResponse with no params set.
     * @param {String} functionName
     * @param {RpcType} messageType
     * @param {RpcRequest|RpcResponse} msg
     */
    static testNullBase (functionName, messageType, msg) {
        Validator.assertNotNull(msg, 'RPCMessage was null.');
        let correlationId;
        if (msg instanceof RpcRequest) {
            correlationId = msg.getCorrelationId();
            Validator.assertNotNull(correlationId, 'Correlation ID of the RPC message was null.');
        } else if (msg instanceof RpcResponse) {
            correlationId = msg.getCorrelationId();
            Validator.assertNullOrUndefined(correlationId, 'Correlation ID of the RPC message was not null.');
        }
        Validator.assertNotNull(msg.getRPCType(), 'Message type of the RPC message was null.');
        Validator.assertEquals(messageType, msg.getRPCType(), 'Message type didn\'t match expected message type.');
        Validator.assertNotNull(msg.getFunctionName(), 'Command type of the RPC message was null.');
        Validator.assertEquals(functionName, msg.getFunctionName(), 'Command type didn\'t match expected command type.');

        try {
            Validator.assertTrue((msg.serializeJSON().length() === 1), 'Parameters weren\'t initialized, but the JSON contained 2 or more objects.');
        } catch (error) {
            // do nothing
        }
    }
}



module.exports = Validator;
