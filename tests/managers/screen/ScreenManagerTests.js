const SDL = require('../../config.js').node;

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('ScreenManagerTests', function () {
        const screenManager = appClient._sdlManager.getScreenManager();
        const testArtwork = new SDL.manager.file.filetypes.SdlArtwork('sdl-logo', SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setFilePath('./test_icon_1.png');
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
    });
};