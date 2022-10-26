const expect = require('chai').expect;
const SDL = require('./config.js').node;

const RpcResponse = SDL.rpc.RpcResponse;
const RpcRequest = SDL.rpc.RpcRequest;

const MediaClockFormat = SDL.rpc.enums.MediaClockFormat;

class Validator {
    /**
     * Takes an RpcStruct and converts it to a json object.
     * @param {Object} obj - Either a primative value, an array, or an object with getParameters defined.
     * @returns {Object} - A JSON Object.
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
     * @returns {Boolean} - Whether or not the JSON is valid.
     */
    static validateJson (rpcMessage, expectedParameters) {
        const parameters = Validator.getParametersJson(rpcMessage.getParameters());
        expect(parameters).to.be.deep.equal(expectedParameters);
        return true;
    }

    /**
     * Checks major and minor versions match. patch versions can be different.
     * @param {SdlMsgVersion} item1 - An SdlMsgVersion.
     * @param {SdlMsgVersion} item2 - An SdlMsgVersion.
     * @returns {Boolean} - Whether or not the major and minor versions match.
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
     * @param {ImageField} item1 - An ImageField.
     * @param {ImageField} item2 - An ImageField.
     * @returns {Boolean} - Whether or not they match.
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
            expect(val1.getNameParam()).to.be.equal(val2.getNameParam());
            Validator.validateImageResolution(val1.getImageResolution(), val2.getImageResolution());
        }

        return true;
    }


    /**
     * RegisterAppInterface pcm stream capabilities validation.
     * @param {AudioPassThruCapabilities} item1 - An AudioPassThruCapabilities.
     * @param {AudioPassThruCapabilities} item2 - An AudioPassThruCapabilities.
     * @returns {Boolean} - Whether or not it is valid.
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
     * @param {Array<AudioPassThruCapabilities>} item1 - An array of AudioPassThruCapabilities.
     * @param {Array<AudioPassThruCapabilities>} item2 - An array of AudioPassThruCapabilities.
     * @returns {Boolean} - Whether or not they're the same.
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
     * @param {ImageResolution} item1 - An ImageResolution.
     * @param {ImageResolution} item2 - An ImageResolution.
     * @returns {Boolean} - Whether or not they're equal.
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

        return true;
    }


    /**
     * TouchEventCapabilities equals validation.
     * @param {TouchEventCapabilities} item1 - A TouchEventCapabilities.
     * @param {TouchEventCapabilities} item2 - A TouchEventCapabilities.
     * @returns {Boolean} - Whether or not they're equal.
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
     * @param {ScreenParams} item1 - A ScreenParams.
     * @param {ScreenParams} item2 - A ScreenParams.
     * @returns {Boolean} - Whether or not they're equal.
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
     * DisplayCapability[] equals validation.
     * @param {DisplayCapability[]} item1 - A DisplayCapability[].
     * @param {DisplayCapability[]} item2 - A DisplayCapability[].
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateDisplayCapabilityList (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }
        expect(item1.length).to.be.equal(item2.length);
        for (let index = 0; index < item1.length; index++) {
            const val1 = item1[index];
            const val2 = item2[index];
            if (val1 === null || val2 === null) {
                expect(val1).to.be.equal(val2);
            }
            Validator.validateDisplayCapability(val1, val2);
        }

        return true;
    }

    /**
     * DisplayCapabilities equals validation.
     * @param {DisplayCapabilities} item1 - A DisplayCapabilities.
     * @param {DisplayCapabilities} item2 - A DisplayCapabilities.
     * @returns {Boolean} - Whether or not they're equal.
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
        expect(item1.getTemplatesAvailable()).deep.to.equal(item2.getTemplatesAvailable());
        expect(item1.getNumCustomPresetsAvailable()).deep.to.equal(item2.getNumCustomPresetsAvailable());

        Validator.validateScreenParams(item1.getScreenParams(), item2.getScreenParams());
        return true;
    }

    /**
     * DisplayCapability equals validation.
     * @param {DisplayCapability} item1 - A DisplayCapability.
     * @param {DisplayCapability} item2 - A DisplayCapability.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateDisplayCapability (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }
        expect(item1.getDisplayName()).to.be.equal(item2.getDisplayName());

        if (item1.getWindowTypeSupported() === null || item2.getWindowTypeSupported() === null) {
            expect(item1.getWindowTypeSupported()).to.be.equal(item2.getWindowTypeSupported());
            return true;
        }
        expect(item1.getWindowTypeSupported().length).to.be.equal(item2.getWindowTypeSupported().length);
        for (let index = 0; index < item1.getWindowTypeSupported().length; index++) {
            const val1 = item1.getWindowTypeSupported()[index];
            const val2 = item2.getWindowTypeSupported()[index];
            if (val1 === null || val2 === null) {
                expect(val1).to.be.equal(val2);
            }
            Validator.validateWindowTypeCapabilities(val1, val2);
        }

        if (item1.getWindowCapabilities() === null || item2.getWindowCapabilities() === null) {
            expect(item1.getWindowCapabilities()).to.be.equal(item2.getWindowCapabilities());
            return true;
        }
        expect(item1.getWindowCapabilities().length).to.be.equal(item2.getWindowCapabilities().length);
        for (let index = 0; index < item1.getWindowCapabilities().length; index++) {
            const val1 = item1.getWindowCapabilities()[index];
            const val2 = item2.getWindowCapabilities()[index];
            if (val1 === null || val2 === null) {
                expect(val1).to.be.equal(val2);
            }
            Validator.validateWindowCapability(val1, val2);
        }
        return true;
    }

    /**
     * WindowTypeCapabilities equals validation.
     * @param {WindowTypeCapabilities} item1 - A WindowTypeCapabilities.
     * @param {WindowTypeCapabilities} item2 - A WindowTypeCapabilities.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateWindowTypeCapabilities (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        if (item1.getType() === null || item2.getType() === null) {
            expect(item1.getType()).to.be.equal(item2.getType());
            return true;
        }
        expect(item1.getType()).to.be.equal(item2.getType());

        expect(item1.getMaximumNumberOfWindows()).to.be.equal(item2.getMaximumNumberOfWindows());

        return true;
    }

    /**
     * WindowCapability equals validation.
     * @param {WindowCapability} item1 - A WindowCapability.
     * @param {WindowCapability} item2 - A WindowCapability.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateWindowCapability (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1.getWindowID()).to.be.equal(item2.getWindowID());

        if (item1.getTemplatesAvailable() === null || item2.getTemplatesAvailable() === null) {
            Validator.assertEquals(item1.getTemplatesAvailable(), item2.getTemplatesAvailable());
            return true;
        }

        expect(item1.getNumCustomPresetsAvailable()).to.be.equal(item2.getNumCustomPresetsAvailable());

        if (item1.getTextFields() === null || item2.getTextFields() === null) {
            expect(item1.getTextFields()).to.be.equal(item2.getTextFields());
            return true;
        }
        expect(item1.getTextFields().length).to.be.equal(item2.getTextFields().length);
        for (let index = 0; index < item1.getTextFields().length; index++) {
            const val1 = item1.getTextFields()[index];
            const val2 = item2.getTextFields()[index];
            if (val1 === null || val2 === null) {
                expect(val1).to.be.equal(val2);
            }
            Validator.validateTextFields(val1, val2);
        }

        if (item1.getImageFields() === null || item2.getImageFields() === null) {
            expect(item1.getImageFields()).to.be.equal(item2.getImageFields());
            return true;
        }

        Validator.validateImageFields(item1.getImageFields(), item2.getImageFields());

        if (item1.getImageTypeSupported() === null || item2.getImageTypeSupported() === null) {
            expect(item1.getImageTypeSupported()).to.be.equal(item2.getImageTypeSupported());
            return true;
        }
        expect(item1.getImageTypeSupported().length).to.be.equal(item2.getImageTypeSupported().length);
        for (let index = 0; index < item1.getImageTypeSupported().length; index++) {
            const val1 = item1.getImageTypeSupported()[index];
            const val2 = item2.getImageTypeSupported()[index];
            expect(val1).to.be.deep.equal(val2);
        }

        Validator.validateButtonCapabilities(item1.getButtonCapabilities(), item2.getButtonCapabilities());
        Validator.validateSoftButtonCapabilities(item1.getSoftButtonCapabilities(), item2.getSoftButtonCapabilities());

        return true;
    }

    /**
     * TextField equals validation.
     * @param {TextField} item1 - A TextField.
     * @param {TextField} item2 - A TextField.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateTextFields (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1.getCharacterSet()).to.be.equal(item2.getCharacterSet());
        expect(item1.getNameParam()).to.be.equal(item2.getNameParam());
        expect(item1.getRows()).to.be.equal(item2.getRows());
        expect(item1.getWidth()).to.be.equal(item2.getWidth());

        return true;
    }

    /**
     * PresetBankCapabilities equals validation.
     * @param {PresetBankCapabilities} item1 - A PresetBankCapabilities.
     * @param {PresetBankCapabilities} item2 - A PresetBankCapabilities.
     * @returns {Boolean} - Whether or not they're equal.
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
     * @param {VehicleType} item1 - A VehicleType.
     * @param {VehicleType} item2 - A VehicleType.
     * @returns {Boolean} - Whether or not they're equal.
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
     * @param {HMICapabilities} item1 - An HMICapabilities.
     * @param {HMICapabilities} item2 - An HMICapabilities.
     * @returns {Boolean} - Whether or not they're equal.
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
     * @param {Array<ButtonCapabilities>} item1 - An array of ButtonCapabilities.
     * @param {Array<ButtonCapabilities>} item2 - An array of ButtonCapabilities.
     * @returns {Boolean} - Whether or not they're equal.
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

            expect(val1.getNameParam()).to.be.equal(val2.getNameParam());
            expect(val1.getUpDownAvailable()).to.be.equal(val2.getUpDownAvailable());
            expect(val1.getLongPressAvailable()).to.be.equal(val2.getLongPressAvailable());
            expect(val1.getShortPressAvailable()).to.be.equal(val2.getShortPressAvailable());
        }
        return true;
    }

    /**
     * SoftButtonObject equals validation
     * @param {SoftButtonObject} button1 - A SoftButtonObject.
     * @param {SoftButtonObject} button2 - A SoftButtonObject.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateSoftButton (button1, button2) {
        return button1.getCurrentState().getSoftButton().getImage().getParameters() === button2.getCurrentState().getSoftButton().getImage().getParameters()
            && button1.getCurrentState().getHighlighted() === button2.getCurrentState().getHighlighted()
            && ((button1.getButtonId() === null && button2.getButtonId() === null) || button1.getButtonId() === button2.getButtonId())
            && button1.getCurrentState().getSystemAction() === button2.getCurrentState().getSystemAction()
            && button1.getCurrentState().getSoftButton().getType() === button2.getCurrentState().getSoftButton().getType();
    }

    /**
     * SoftButton equals validation
     * @param {SoftButton} button1 - A SoftButton.
     * @param {SoftButton} button2 - A SoftButton.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateSoftButtonStruct (button1, button2) {
        expect(button1.getType()).to.be.equal(button2.getType());
        expect(button1.getText()).to.be.equal(button2.getText());
        expect(button1.getIsHighlighted()).to.be.equal(button2.getIsHighlighted());
        expect(button1.getSoftButtonID()).to.be.equal(button2.getSoftButtonID());
        expect(button1.getSystemAction()).to.be.equal(button2.getSystemAction());
        expect(Validator.validateImage(button1.getImage(), button2.getImage())).to.be.true;

        return true;
    }

    /**
     * Image equals validation
     * @param {Image} item1 - An Image.
     * @param {Image} item2 - An Image.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateImage (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.be.equal(item2);
            return true;
        }

        expect(item1).to.exist;
        expect(item2).to.exist;

        expect(item1.getValueParam()).to.be.equal(item2.getValueParam());
        expect(item1.getImageType()).to.be.equal(item2.getImageType());
        expect(item1.getIsTemplate()).to.be.equal(item2.getIsTemplate());

        return true;
    }

    /**
     * SoftButtonCapabilities array equals validation.
     * @param {Array<SoftButtonCapabilities>} item1 - An array of SoftButtonCapabilities.
     * @param {Array<SoftButtonCapabilities>} item2 - An array of SoftButtonCapabilities.
     * @returns {Boolean} - Whether or not they're equal.
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
     * @param {Array<TTSChunk>} item1 - An array of TTSChunk.
     * @param {Array<TTSChunk>} item2 - An array of TTSChunk.
     * @returns {Boolean} - Whether or not they're equal.
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
     * @param {DeviceInfo} item1 - A DeviceInfo.
     * @param {DeviceInfo} item2 - A DeviceInfo.
     * @returns {Boolean} - Whether or not they're equal.
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
     * @param {TemplateColorScheme} item1 - A TemplateColorScheme.
     * @param {TemplateColorScheme} item2 - A TemplateColorScheme.
     * @returns {Boolean} - Whether or not they're equal.
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
     * VideoStreamingCapability equals validation.
     * @param {VideoStreamingCapability} item1 - A VideoStreamingCapability.
     * @param {VideoStreamingCapability} item2 - A VideoStreamingCapability.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateVideoStreamingCapability (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.equal(item2);
            return true;
        }

        if (!Validator.validateImageResolution(item1.getPreferredResolution(), item2.getPreferredResolution())) {
            return false;
        }

        expect(item1.getMaxBitrate()).to.be.equal(item2.getMaxBitrate());

        if (!Validator.validateVideoStreamingFormat(item1.getSupportedFormats(), item2.getSupportedFormats())) {
            return false;
        }

        return true;
    }

    /**
     * VideoStreamingFormat array equals validation.
     * @param {Array<VideoStreamingFormat>} item1 - An array of VideoStreamingFormat.
     * @param {Array<VideoStreamingFormat>} item2 - An array of VideoStreamingFormat.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateVideoStreamingFormat (item1, item2) {
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
            expect(val1.getCodec()).to.be.equal(val2.getCodec());
            expect(val1.getProtocolParam()).to.be.equal(val2.getProtocolParam());
        }

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
     * Assert values are not equal. Defaults to deeply equal which means
     * objects like [1,2] or {'x': 1} will be compared based on values and not
     * by reference.
     * @param {*} val1 - First value to compare.
     * @param {*} val2 - Second value to compare.
     * @param {String} msg - Message to display on failure.
     */
    static assertNotEquals (val1, val2, msg) {
        expect(val1, msg).to.not.deep.equal(val2);
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
     * @param {String} functionName - A function name.
     * @param {RpcType} messageType - An RpcType enum value.
     * @param {RpcRequest|RpcResponse} msg - An RPC request or message.
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
        Validator.assertNotNull(msg.getMessageType(), 'Message type of the RPC message was null.');
        Validator.assertEquals(messageType, msg.getMessageType(), 'Message type didn\'t match expected message type.');
        Validator.assertNotNull(msg.getFunctionId(), 'Command type of the RPC message was null.');
        Validator.assertEquals(functionName, msg.getFunctionId(), 'Command type didn\'t match expected command type.');

        try {
            Validator.assertTrue((msg.serializeJSON().length() === 1), 'Parameters weren\'t initialized, but the JSON contained 2 or more objects.');
        } catch (error) {
            // do nothing
        }
    }

    /**
     * VehicleDataResult equals validation.
     * @param {VehicleDataResult} item1 - A VehicleDataResult.
     * @param {VehicleDataResult} item2 - A VehicleDataResult.
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateVehicleDataResult (item1, item2) {
        if (item1 === null || item2 === null) {
            expect(item1).to.equal(item2);
            return true;
        }
        expect(item1.getDataType()).to.be.equal(item2.getDataType());
        expect(item1.getOemCustomDataType()).to.be.equal(item2.getOemCustomDataType());
        expect(item1.getResultCode()).to.be.equal(item2.getResultCode());
        return true;
    }

    /**
     * Generic Object[] equals validation.
     * @param {Object[]} item1 - A Object[].
     * @param {Object[]} item2 - A Object[].
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateGenericList (item1, item2) {
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
            if (val1 === null || val2 === null) {
                expect(val1).to.be.equal(val2);
            }
            Validator.assertEquals(val1, val2);
        }

        return true;
    }

    /**
     * HmiZoneCapabilities[] equals validation.
     * @param {HmiZoneCapabilities[]} item1 - A HmiZoneCapabilities[].
     * @param {HmiZoneCapabilities[]} item2 - A HmiZoneCapabilities[].
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateHMIZoneCapabilities (item1, item2) {
        Validator.validateGenericList(item1, item2);
        return true;
    }

    /**
     * SpeechCapabilities[] equals validation.
     * @param {SpeechCapabilities[]} item1 - A SpeechCapabilities[].
     * @param {SpeechCapabilities[]} item2 - A SpeechCapabilities[].
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validateSpeechCapabilities (item1, item2) {
        Validator.validateGenericList(item1, item2);
        return true;
    }

    /**
     * PrerecordedSpeech[] equals validation.
     * @param {PrerecordedSpeech[]} item1 - A PrerecordedSpeech[].
     * @param {PrerecordedSpeech[]} item2 - A PrerecordedSpeech[].
     * @returns {Boolean} - Whether or not they're equal.
     */
    static validatePreRecordedSpeechCapabilities (item1, item2) {
        Validator.validateGenericList(item1, item2);
        return true;
    }
}



module.exports = Validator;
