const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('ChoiceCellTests', function () {
        const MAX_ID = SDL.manager.screen.choiceset.ChoiceCell.MAX_ID;
        const artwork = new SDL.manager.file.filetypes.SdlArtwork('image', SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setFilePath(1)
            .setPersistent(true);

        it('testInstantiation', function () {
            const choiceCell = new SDL.manager.screen.choiceset.ChoiceCell();
            Validator.assertNull(choiceCell.getText());
            Validator.assertNull(choiceCell.getSecondaryText());
            Validator.assertNull(choiceCell.getTertiaryText());
            Validator.assertNull(choiceCell.getArtwork());
            Validator.assertNull(choiceCell.getSecondaryArtwork());
        });

        it('testSettersAndGetters', function () {
            // set everything
            const choiceCell = new SDL.manager.screen.choiceset.ChoiceCell(Test.GENERAL_STRING)
                .setSecondaryText(Test.GENERAL_STRING)
                .setTertiaryText(Test.GENERAL_STRING)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setArtwork(artwork)
                .setSecondaryArtwork(artwork);

            // use getters and assert equality
            Validator.assertEquals(choiceCell.getText(), Test.GENERAL_STRING);
            Validator.assertEquals(choiceCell.getSecondaryText(), Test.GENERAL_STRING);
            Validator.assertEquals(choiceCell.getTertiaryText(), Test.GENERAL_STRING);
            Validator.assertEquals(choiceCell.getVoiceCommands(), Test.GENERAL_STRING_LIST);
            Validator.assertEquals(choiceCell.getArtwork(), artwork);
            Validator.assertEquals(choiceCell.getSecondaryArtwork(), artwork);
            Validator.assertEquals(choiceCell._getChoiceId(), MAX_ID);

            Validator.assertEquals(choiceCell._getUniqueText(), choiceCell.getText());

            choiceCell._setUniqueText('hi');
            Validator.assertEquals(choiceCell._getUniqueText(), 'hi');

            choiceCell.setText('hello');
            Validator.assertEquals(choiceCell.getText(), 'hello');
        });

        it('testCellEquality', function () {
            const choiceCell = new SDL.manager.screen.choiceset.ChoiceCell(Test.GENERAL_STRING)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setArtwork(artwork)
                .setSecondaryText(Test.GENERAL_STRING)
                .setTertiaryText(Test.GENERAL_STRING)
                .setSecondaryArtwork(artwork);

            const choiceCell2 = new SDL.manager.screen.choiceset.ChoiceCell(Test.GENERAL_STRING)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setArtwork(artwork)
                .setSecondaryText(Test.GENERAL_STRING)
                .setTertiaryText(Test.GENERAL_STRING)
                .setSecondaryArtwork(artwork);

            const choiceCell3 = new SDL.manager.screen.choiceset.ChoiceCell(Test.GENERAL_STRING)
                .setVoiceCommands(Test.GENERAL_STRING_LIST)
                .setArtwork(artwork)
                .setSecondaryText(Test.GENERAL_STRING)
                .setTertiaryText(Test.GENERAL_STRING);

            // UniqueText should not be taken into consideration when checking equality
            choiceCell._setUniqueText('1');
            choiceCell2._setUniqueText('2');
            choiceCell3._setUniqueText('3');

            Validator.assertTrue(choiceCell.equals(choiceCell2));
            Validator.assertTrue(!choiceCell.equals(choiceCell3));
        });
    });
};
