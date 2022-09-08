const expect = require('chai').expect;
const SDL = require('../config.js').node;

// Mocking framework used so that some RPCs are not actually sent to Core, but the response mimicked
const sinon = require('sinon');
const Test = require('../Test.js');
const Validator = require('../Validator');

module.exports = function (appClient) {
    describe('SystemCapabilityManagerTests', function () {
        const sdlManager = appClient._sdlManager;
        const systemCapability = new SDL.rpc.structs.SystemCapability()
            .setSystemCapabilityType(SDL.rpc.enums.SystemCapabilityType.VIDEO_STREAMING);

        const videoStreamingCapability = new SDL.rpc.structs.VideoStreamingCapability()
            .setMaxBitrate(Test.GENERAL_INT)
            .setPreferredResolution(Test.GENERAL_IMAGERESOLUTION)
            .setSupportedFormats(Test.GENERAL_VIDEOSTREAMINGFORMAT_LIST)
            .setPreferredFPS(Test.GENERAL_INTEGER)
            .setAdditionalVideoStreamingCapabilities(Test.GENERAL_ADDITIONAL_CAPABILITY_LIST);

        systemCapability.setVideoStreamingCapability(videoStreamingCapability);

        /**
         * Returns an instantiated SystemCapabilityManager
         * @param {_LifecycleManager} lcm - The lifecycle manager
         * @returns {SystemCapabilityManager} - The SystemCapabilityManager
         */
        function createSampleManager (lcm) {
            const systemCapabilityManager = new SDL.manager.SystemCapabilityManager(lcm);

            const raiResponse = new SDL.rpc.messages.RegisterAppInterfaceResponse()
                .setHmiCapabilities(Test.GENERAL_HMICAPABILITIES)
                .setDisplayCapabilities(Test.GENERAL_DISPLAYCAPABILITIES)
                .setAudioPassThruCapabilities(Test.GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST)
                .setButtonCapabilities(Test.GENERAL_BUTTONCAPABILITIES_LIST)
                .setHmiZoneCapabilities(Test.GENERAL_HMIZONECAPABILITIES_LIST)
                .setPresetBankCapabilities(Test.GENERAL_PRESETBANKCAPABILITIES)
                .setSoftButtonCapabilities(Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST)
                .setSpeechCapabilities(Test.GENERAL_SPEECHCAPABILITIES_LIST)
                .setPrerecordedSpeech(Test.GENERAL_PRERECORDEDSPEECH_LIST)
                .setSuccess(true);

            systemCapabilityManager._parseRaiResponse(raiResponse);
            return systemCapabilityManager;
        }

        it('testParseRAI', function (done) {
            // TODO: complete me
            done();
        });

        it('testNullDisplayCapabilitiesEnablesAllTextAndImageFields', function (done) {
            // TODO: complete me
            done();
        });

        it('testGetVSCapability', function (done) {
            // TODO: complete me
            done();
        });

        it('testGetCapability', function (done) {
            // TODO: complete me
            done();
        });

        it('testGetCapabilityHmiNone', function (done) {
            // TODO: complete me
            done();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsSupportedAndCapabilityCached', function (done) {
            // TODO: complete me
            done();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsSupportedAndCapabilityNotCached', function (done) {
            // TODO: complete me
            done();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsNotSupportedAndCapabilityCached', function (done) {
            // TODO: complete me
            done();
        });

        it('testAddOnSystemCapabilityListenerWithSubscriptionsNotSupportedAndCapabilityNotCached', function (done) {
            // TODO: complete me
            done();
        });

        it('testAddOnSystemCapabilityListenerThenGetCapabilityWhenSubscriptionsAreNotSupported', function (done) {
            // TODO: complete me
            done();
        });

        it('testGetAndAddListenerForDisplaysCapability', function (done) {
            // TODO: complete me
            done();
        });

        it('testMediaFieldConversion', function (done) {
            // TODO: complete me
            done();
        });

        it('testListConversion', function (done) {
            // TODO: complete me
            done();
        });

        it('testFalsePositive', function (done) {
            // TODO: complete me
            done();
        });

        it('testOnSystemCapabilityUpdateWithNoExistingCap', function (done) {
            // TODO: complete me
            done();
        });

        it('testOnSystemCapabilityUpdatedForDISPLAYS', function (done) {
            // TODO: complete me
            done();
        });

        it('testOnSystemCapabilityUpdated', function (done) {
            // TODO: complete me
            done();
        });

        it('testOnSystemCapabilityUpdatedOverwrite', function (done) {
            // TODO: complete me
            done();
        });

        it('testOnSetDisplayLayout', function (done) {
            // TODO: complete me
            done();
        });

        it('testManagerBeforeDisplayUpdate', function (done) {
            // TODO: complete me
            done();
        });

        it('testSyncNonMediaBug', function (done) {
            // TODO: complete me
            done();
        });

        it('testFixingIncorrectCapabilities', function (done) {
            // TODO: complete me
            done();
        });
    });
};