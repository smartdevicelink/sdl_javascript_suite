const SDL = require('../../config.js').node;

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('AlertAudioDataTests', function () {
        const testAudio = new SdlFile("TestAudioFile", FileType.AUDIO_MP3, uri1, false);
        it('testConstructors', function (done) {
            const alertAudioData = new AlertAudioData();
            alertAudioData.setPlayTone(true);
            Validator.assertTrue(alertAudioData.isPlayTone());

            const alertAudioData1 = new AlertAudioData('phoneticString', SDL.rpc.enums.SpeechCapabilities.TEXT);
            Validator.assertEquals('phoneticString', alertAudioData1.getPrompts().get(0).getText());

            const alertAudioData2 = new AlertAudioData('spokenString');
            Validator.assertEquals('spokenString', alertAudioData2.getPrompts().get(0).getText());

            const alertAudioData3 = new AlertAudioData(testAudio);
            Validator.assertEquals(alertAudioData3.getAudioFiles().get(0).getName(), testAudio.getName());
            done();
        });
    });
};