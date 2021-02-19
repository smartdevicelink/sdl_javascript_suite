const SDL = require('../../config.js').node;

const _ScreenManagerBase = SDL.manager.screen._ScreenManagerBase;
const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('ScreenManagerTests', function () {
        const screenManager = appClient._sdlManager.getScreenManager();
        const testArtwork = new SDL.manager.file.filetypes.SdlArtwork('sdl-logo', SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setFilePath('./test_icon_1.png');
        const state1 = new SDL.manager.screen.utils.SoftButtonState('ROCK', 'rock', testArtwork);
        const state2 = new SDL.manager.screen.utils.SoftButtonState('PAPER', 'paper', testArtwork);
        const state3 = new SDL.manager.screen.utils.SoftButtonState('SCISSORS', 'scissors', testArtwork);
        it('testInstantiation', function (done) {
            Validator.assertNull(screenManager.getTextField1());
            Validator.assertNull(screenManager.getTextField1());
            Validator.assertNull(screenManager.getTextField2());
            Validator.assertNull(screenManager.getTextField3());
            Validator.assertNull(screenManager.getTextField4());
            Validator.assertNull(screenManager.getTitle());
            Validator.assertNull(screenManager.getMediaTrackTextField());
            Validator.assertNull(screenManager.getPrimaryGraphic());
            Validator.assertNull(screenManager.getSecondaryGraphic());
            Validator.assertNull(screenManager.getTextField1Type());
            Validator.assertNull(screenManager.getTextField2Type());
            Validator.assertNull(screenManager.getTextField3Type());
            Validator.assertNull(screenManager.getTextField4Type());
            Validator.assertTrue(screenManager.getVoiceCommands().length === 0);
            Validator.assertNotNullUndefined(screenManager.getSoftButtonObjects());
            Validator.assertNull(screenManager.getSoftButtonObjectByName('test'));
            Validator.assertNull(screenManager._getSoftButtonObjectById(1));
            done();
        });

        it('testSetTextField', function (done) {
            screenManager.setTextField1('It is');
            screenManager.setTextField2('Wednesday');
            screenManager.setTextField3('My');
            screenManager.setTextField4('Dudes');
            screenManager.setTitle('title');

            Validator.assertEquals(screenManager.getTextField1(), 'It is');
            Validator.assertEquals(screenManager.getTextField2(), 'Wednesday');
            Validator.assertEquals(screenManager.getTextField3(), 'My');
            Validator.assertEquals(screenManager.getTextField4(), 'Dudes');
            Validator.assertEquals(screenManager.getTitle(), 'title');
            done();
        });

        it('testMediaTrackTextFields', function (done) {
            const songTitle = 'Wild For The Night';
            screenManager.setMediaTrackTextField(songTitle);
            Validator.assertEquals(screenManager.getMediaTrackTextField(), songTitle);
            done();
        });

        it('testSetPrimaryGraphic', function (done) {
            screenManager.setPrimaryGraphic(testArtwork);
            Validator.assertEquals(screenManager.getPrimaryGraphic(), testArtwork);
            done();
        });

        it('testSetPrimaryGraphicWithBlankImage', function (done) {
            screenManager.setPrimaryGraphic(null);
            Validator.assertNull(screenManager.getPrimaryGraphic());
            done();
        });

        it('testSetSecondaryGraphic', function (done) {
            screenManager.setSecondaryGraphic(testArtwork);
            Validator.assertEquals(screenManager.getSecondaryGraphic(), testArtwork);
            done();
        });

        it('testSetSecondaryGraphicWithBlankImage', function (done) {
            screenManager.setSecondaryGraphic(null);
            Validator.assertNull(screenManager.getSecondaryGraphic());
            done();
        });

        it('testSetTextFieldTypes', function (done) {
            screenManager.setTextAlignment(SDL.rpc.enums.TextAlignment.LEFT_ALIGNED);
            Validator.assertEquals(screenManager.getTextAlignment(), SDL.rpc.enums.TextAlignment.LEFT_ALIGNED);
            done();
        });

        it('testSetTextFieldTypes', function (done) {
            screenManager.setTextField1Type(SDL.rpc.enums.MetadataType.mediaTitle);
            screenManager.setTextField2Type(SDL.rpc.enums.MetadataType.mediaAlbum);
            screenManager.setTextField3Type(SDL.rpc.enums.MetadataType.mediaArtist);
            screenManager.setTextField4Type(SDL.rpc.enums.MetadataType.mediaGenre);
            Validator.assertEquals(screenManager.getTextField1Type(), SDL.rpc.enums.MetadataType.mediaTitle);
            Validator.assertEquals(screenManager.getTextField2Type(), SDL.rpc.enums.MetadataType.mediaAlbum);
            Validator.assertEquals(screenManager.getTextField3Type(), SDL.rpc.enums.MetadataType.mediaArtist);
            Validator.assertEquals(screenManager.getTextField4Type(), SDL.rpc.enums.MetadataType.mediaGenre);
            done();
        });

        it('testSettingSoftButtonId', function (done) {
            // Create softButtonObject1
            const softButtonState1 = new SDL.manager.screen.utils.SoftButtonState('object1-state1', 'it is', testArtwork);
            const softButtonState2 = new SDL.manager.screen.utils.SoftButtonState('object1-state2', 'Wed', testArtwork);
            const softButtonObject1 = new SDL.manager.screen.utils.SoftButtonObject('object1', [softButtonState1, softButtonState2], softButtonState1.getName(), null);
            softButtonObject1._setButtonId(100);

            // Create softButtonObject2
            const softButtonState3 = new SDL.manager.screen.utils.SoftButtonState('object2-state1', 'my', testArtwork);
            const softButtonState4 = new SDL.manager.screen.utils.SoftButtonState('object2-state2', 'dudes!', null);
            const softButtonObject2 = new SDL.manager.screen.utils.SoftButtonObject('object2', [softButtonState3, softButtonState4], softButtonState3.getName(), null);
            softButtonObject2._setButtonId(200);

            const softButtonObjects = [softButtonObject1, softButtonObject2];
            Validator.assertTrue(_ScreenManagerBase._checkAndAssignButtonIds(softButtonObjects, _ScreenManagerBase._ManagerLocation.SOFTBUTTON_MANAGER));
            _ScreenManagerBase._softButtonIDBySoftButtonManager.add(200);
            Validator.assertTrue(!_ScreenManagerBase._checkAndAssignButtonIds(softButtonObjects, _ScreenManagerBase._ManagerLocation.ALERT_MANAGER));
            _ScreenManagerBase._softButtonIDByAlertManager.add(100);
            Validator.assertTrue(!_ScreenManagerBase._checkAndAssignButtonIds(softButtonObjects, _ScreenManagerBase._ManagerLocation.SOFTBUTTON_MANAGER));
            _ScreenManagerBase._softButtonIDByAlertManager.clear();
            _ScreenManagerBase._softButtonIDBySoftButtonManager.clear();
            Validator.assertTrue(_ScreenManagerBase._checkAndAssignButtonIds(softButtonObjects, _ScreenManagerBase._ManagerLocation.ALERT_MANAGER));
            softButtonObject1._setButtonId(400);
            softButtonObject2._setButtonId(500);
            Validator.assertTrue(_ScreenManagerBase._checkAndAssignButtonIds(softButtonObjects, _ScreenManagerBase._ManagerLocation.SOFTBUTTON_MANAGER));
            const softButtonObject3 = new SDL.manager.screen.utils.SoftButtonObject('object1', [softButtonState1, softButtonState2], softButtonState1.getName(), null);
            const softButtonObject4 = new SDL.manager.screen.utils.SoftButtonObject('object2', [softButtonState3, softButtonState4], softButtonState3.getName(), null);
            softButtonObjects.push(softButtonObject3);
            softButtonObjects.push(softButtonObject4);
            Validator.assertTrue(_ScreenManagerBase._checkAndAssignButtonIds(softButtonObjects, _ScreenManagerBase._ManagerLocation.SOFTBUTTON_MANAGER));
            done();
        });

        it('testAssigningIdsToSoftButtonObjects', function (done) {
            let sbo1, sbo2, sbo3, sbo4, sbo5;
            // FIXME: SoftButtonObject null constructor values do not work despite using the default values
            // If this is intended, remove these commented lines, else replace existing lines with these and do the same in the tests below
            /* sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);*/

            sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            _ScreenManagerBase._checkAndAssignButtonIds([sbo1, sbo2, sbo3, sbo4, sbo5]);
            Validator.assertEquals(1, sbo1.getButtonId());
            Validator.assertEquals(2, sbo2.getButtonId());
            Validator.assertEquals(3, sbo3.getButtonId());
            Validator.assertEquals(4, sbo4.getButtonId());
            Validator.assertEquals(5, sbo5.getButtonId());

            // sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo1._setButtonId(100);
            // sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo2._setButtonId(200);
            // sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo3._setButtonId(300);
            // sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo4._setButtonId(400);
            // sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo5._setButtonId(500);
            _ScreenManagerBase._checkAndAssignButtonIds([sbo1, sbo2, sbo3, sbo4, sbo5]);
            Validator.assertEquals(100, sbo1.getButtonId());
            Validator.assertEquals(200, sbo2.getButtonId());
            Validator.assertEquals(300, sbo3.getButtonId());
            Validator.assertEquals(400, sbo4.getButtonId());
            Validator.assertEquals(500, sbo5.getButtonId());

            // sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo1._setButtonId(50);
            // sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            // sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            // sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo4._setButtonId(100);
            // sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            _ScreenManagerBase._checkAndAssignButtonIds([sbo1, sbo2, sbo3, sbo4, sbo5]);
            Validator.assertEquals(50, sbo1.getButtonId());
            Validator.assertEquals(101, sbo2.getButtonId());
            Validator.assertEquals(102, sbo3.getButtonId());
            Validator.assertEquals(100, sbo4.getButtonId());
            Validator.assertEquals(103, sbo5.getButtonId());
            done();
        });
    });
};