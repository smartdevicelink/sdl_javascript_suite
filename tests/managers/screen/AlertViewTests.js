const SDL = require('../../config.js').node;

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('AlertViewTests', function () {
        it('testAlertView', function (done) {
            const artwork1 = new SDL.manager.file.filetypes.SdlArtwork('./test_icon_1.png', SDL.rpc.enums.FileType.GRAPHIC_PNG, 1, true);
            const artwork2 = new SDL.manager.file.filetypes.SdlArtwork('./test_icon_2.png', SDL.rpc.enums.FileType.GRAPHIC_PNG, 2, true);

            const softButtonState1 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'o1s1', new SDL.manager.file.filetypes.SdlArtwork('image1', SDL.rpc.enums.FileType.GRAPHIC_PNG, 3, true));
            const softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('object1', [softButtonState1], softButtonState1.getName(), null);
            const softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('object2', [softButtonState1], softButtonState1.getName(), null);

            const alertAudioData = new SDL.manager.screen.AlertAudioData('hi');
            const alertView = new SDL.manager.screen._AlertView();
            alertView.setText('Test');
            alertView.setTertiaryText('Test');
            alertView.setSecondaryText('Test');
            alertView.setTimeout(1);
            alertView.setIcon(artwork1);
            alertView.setSoftButtons([softButtonObject1]);
            alertView.setDefaultTimeOut(3);
            alertView.setAudio(alertAudioData);

            Validator.assertEquals(alertView.getText(), 'Test');
            Validator.assertEquals(alertView.getSecondaryText(), 'Test');
            Validator.assertEquals(alertView.getTertiaryText(), 'Test');
            Validator.assertTrue(alertView.getAudio().getPrompts().length > 0);
            Validator.assertEquals(alertView.getIcon().getName(), 'test1');
            Validator.assertEquals(alertView.getSoftButtons()[0].getName(), 'object1');
            Validator.assertEquals(alertView.getDefaultTimeout(), 3);
            Validator.assertEquals(alertView.getTimeout().intValue(), 3);

            alertView.setText('Test2');
            alertView.setTertiaryText('Test2');
            alertView.setSecondaryText('Test2');
            alertView.setDefaultTimeout(6);
            alertView.setTimeout(6);
            alertView.setAudio(alertAudioData);
            alertView.setIcon(artwork2);
            alertView.setSoftButtons([softButtonObject2]);

            Validator.assertEquals(alertView.getText(), 'Test2');
            Validator.assertEquals(alertView.getSecondaryText(), 'Test2');
            Validator.assertEquals(alertView.getTertiaryText(), 'Test2');
            Validator.assertTrue(alertView.getAudio().getPrompts().length > 0);
            Validator.assertEquals(alertView.getIcon().getName(), 'test2');
            Validator.assertEquals(alertView.getSoftButtons()[0].getName(), 'object2');
            Validator.assertEquals(alertView.getDefaultTimeout(), 6);
            Validator.assertEquals(alertView.getTimeout().intValue(), 6);
            done();
        });
    });
};