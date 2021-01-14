const SDL = require('../../config.js').node;

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('AlertAudioDataTests', function () {
        const testAudio = new SDL.manager.file.filetypes.SdlFile('TestAudioFile', SDL.rpc.enums.FileType.AUDIO_MP3);
        it('testConstructors', function (done) {
            const alertAudioData = new SDL.manager.screen.utils.AlertAudioData();
            alertAudioData.setPlayTone(true);
            Validator.assertTrue(alertAudioData.isPlayTone());

            const alertAudioData1 = new SDL.manager.screen.utils.AlertAudioData('phoneticString', SDL.rpc.enums.SpeechCapabilities.SC_TEXT);
            Validator.assertEquals('phoneticString', alertAudioData1.getAudioData()[0].getText());

            const alertAudioData2 = new SDL.manager.screen.utils.AlertAudioData('spokenString');
            Validator.assertEquals('spokenString', alertAudioData2.getAudioData()[0].getText());

            const alertAudioData3 = new SDL.manager.screen.utils.AlertAudioData(null, null, testAudio);
            Validator.assertEquals(alertAudioData3.getAudioFiles().get(testAudio.getName()).getName(), testAudio.getName());
            done();
        });

        it('testAdd', function (done) {
            const alertAudioData1 = new SDL.manager.screen.utils.AlertAudioData('phoneticString', SDL.rpc.enums.SpeechCapabilities.SC_TEXT);
            alertAudioData1.addAudioFiles([testAudio]);
            alertAudioData1.addPhoneticSpeechSynthesizerStrings(['addition'], SDL.rpc.enums.SpeechCapabilities.SC_TEXT);
            alertAudioData1.addSpeechSynthesizerStrings(['addition2']);
            alertAudioData1.addAudioFiles([testAudio]);
            Validator.assertEquals('phoneticString', alertAudioData1.getAudioData()[0].getText());
            Validator.assertEquals('addition', alertAudioData1.getAudioData()[2].getText());
            Validator.assertEquals('addition2', alertAudioData1.getAudioData()[3].getText());
            Validator.assertEquals(testAudio.getName(), alertAudioData1.getAudioFiles().get(testAudio.getName()).getName());
            done();
        });
    });
};