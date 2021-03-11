const SDL = require('../../config.js').node;

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('AlertViewTests', function () {
        it('testAlertView', function (done) {
            const artwork1 = new SDL.manager.file.filetypes.SdlArtwork().setName('test1').setFilePath('./test_icon_1.png').setType(SDL.rpc.enums.FileType.GRAPHIC_PNG).setFileData(1).setPersistent(true);
            const artwork2 = new SDL.manager.file.filetypes.SdlArtwork().setName('test2').setFilePath('./test_icon_2.png').setType(SDL.rpc.enums.FileType.GRAPHIC_PNG).setFileData(2).setPersistent(true);

            const softButtonState1 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'o1s1', new SDL.manager.file.filetypes.SdlArtwork().setName('image1').setType(SDL.rpc.enums.FileType.GRAPHIC_PNG).setFileData(3).setPersistent(true));
            const softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('object1', [softButtonState1], softButtonState1.getName(), null);
            const softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('object2', [softButtonState1], softButtonState1.getName(), null);

            const alertAudioData = new SDL.manager.screen.utils.AlertAudioData('hi');
            const alertView = new SDL.manager.screen.utils.AlertView();
            alertView.setText('Test');
            alertView.setTertiaryText('Test');
            alertView.setSecondaryText('Test');
            alertView.setTimeout(1);
            alertView.setIcon(artwork1);
            alertView.setSoftButtons([softButtonObject1]);
            alertView.setDefaultTimeout(3);
            alertView.setAudio(alertAudioData);
            alertView.setShowWaitIndicator(true);

            Validator.assertEquals(alertView.getText(), 'Test');
            Validator.assertEquals(alertView.getSecondaryText(), 'Test');
            Validator.assertEquals(alertView.getTertiaryText(), 'Test');
            Validator.assertTrue(alertView.getAudio().getAudioData().length > 0);
            Validator.assertEquals(alertView.getIcon().getName(), 'test1');
            Validator.assertEquals(alertView.getSoftButtons()[0].getName(), 'object1');
            Validator.assertEquals(alertView.getDefaultTimeout(), 3);
            Validator.assertEquals(alertView.getTimeout(), 3);
            Validator.assertTrue(alertView.isShowWaitIndicator());

            alertView.setText('Test2');
            alertView.setTertiaryText('Test2');
            alertView.setSecondaryText('Test2');
            alertView.setDefaultTimeout(6);
            alertView.setTimeout(6);
            alertView.setAudio(alertAudioData);
            alertView.setIcon(artwork2);
            alertView.setSoftButtons([softButtonObject2]);
            alertView.setShowWaitIndicator(false);

            Validator.assertEquals(alertView.getText(), 'Test2');
            Validator.assertEquals(alertView.getSecondaryText(), 'Test2');
            Validator.assertEquals(alertView.getTertiaryText(), 'Test2');
            Validator.assertTrue(alertView.getAudio().getAudioData().length > 0);
            Validator.assertEquals(alertView.getIcon().getName(), 'test2');
            Validator.assertEquals(alertView.getSoftButtons()[0].getName(), 'object2');
            Validator.assertEquals(alertView.getDefaultTimeout(), 6);
            Validator.assertEquals(alertView.getTimeout(), 6);
            Validator.assertTrue(!alertView.isShowWaitIndicator());

            const alertView2 = alertView.clone();

            // Validate that the clone method copies correctly
            Validator.assertEquals(alertView2.getText(), alertView.getText());
            Validator.assertEquals(alertView2.getSecondaryText(), alertView.getSecondaryText());
            Validator.assertEquals(alertView2.getTertiaryText(), alertView.getTertiaryText());
            Validator.assertEquals(alertView2.getAudio().getAudioData().length, alertView.getAudio().getAudioData().length);
            Validator.assertEquals(alertView2.getIcon().getName(), alertView.getIcon().getName());
            Validator.assertEquals(alertView2.getSoftButtons()[0].getName(), alertView.getSoftButtons()[0].getName());
            Validator.assertEquals(alertView2.getDefaultTimeout(), alertView.getDefaultTimeout());
            Validator.assertEquals(alertView2.getTimeout(), alertView.getTimeout());

            alertView2.setText('Test');
            alertView2.setTertiaryText('Test');
            alertView2.setSecondaryText('Test');
            alertView2.setTimeout(1);
            alertView2.setIcon(artwork1);
            alertView2.setSoftButtons([softButtonObject1]);
            alertView2.setDefaultTimeout(3);
            alertView2.setAudio(alertAudioData);

            Validator.assertEquals(alertView2.getText(), 'Test');
            Validator.assertEquals(alertView2.getSecondaryText(), 'Test');
            Validator.assertEquals(alertView2.getTertiaryText(), 'Test');
            Validator.assertTrue(alertView2.getAudio().getAudioData().length > 0);
            Validator.assertEquals(alertView2.getIcon().getName(), 'test1');
            Validator.assertEquals(alertView2.getSoftButtons()[0].getName(), 'object1');
            Validator.assertEquals(alertView2.getDefaultTimeout(), 3);
            Validator.assertEquals(alertView2.getTimeout(), 3);

            // Validate that the clone is a deep copy and not a reference
            Validator.assertTrue(alertView.getText() !== alertView2.getText());
            Validator.assertTrue(alertView.getSecondaryText() !== alertView2.getSecondaryText());
            Validator.assertTrue(alertView.getTertiaryText() !== alertView2.getTertiaryText());
            Validator.assertTrue(alertView.getAudio().getAudioData() === alertView2.getAudio().getAudioData());
            Validator.assertTrue(alertView.getIcon() !== alertView2.getIcon());
            Validator.assertTrue(alertView.getSoftButtons() !== alertView2.getSoftButtons());
            Validator.assertTrue(alertView.getDefaultTimeout() === alertView2.getDefaultTimeout());
            Validator.assertTrue(alertView.getTimeout() !== alertView2.getTimeout());

            done();
        });
    });
};