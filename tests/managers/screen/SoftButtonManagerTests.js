const SDL = require('../../config.js').node;

const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('SoftButtonManagerTests', function () {
        const screenManager = appClient._sdlManager.getScreenManager();
        const softButtonManager = screenManager._softButtonManager;
        const art1 = new SDL.manager.file.filetypes.SdlArtwork('fef2', SDL.rpc.enums.FileType.GRAPHIC_PNG)
            .setFilePath('./test_icon_1.png');
        const state1 = new SDL.manager.screen.utils.SoftButtonState('ROCK', 'rock', art1);
        const state2 = new SDL.manager.screen.utils.SoftButtonState('PAPER', 'paper', art1);
        const state3 = new SDL.manager.screen.utils.SoftButtonState('SCISSORS', 'scissors', art1);
        const softButtonObject = new SDL.manager.screen.utils.SoftButtonObject('game2', [state1, state2, state3], 'ROCK', (id, rpc) => {
            if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                console.log('First button pressed!');
            }
        });
        const softButtonObjectId = 1000;

        it('testSoftButtonManagerUpdate', async function () {
            await screenManager.setSoftButtonObjects([softButtonObject]);
            softButtonObject._setButtonId(softButtonObjectId);
            Validator.assertNotNullUndefined(softButtonManager);
            Validator.assertEquals([softButtonObject], softButtonManager.getSoftButtonObjects());
        });

        it('testSoftButtonManagerGetSoftButtonObject', function (done) {
            Validator.assertNull(softButtonManager.getSoftButtonObjectByName('INVALID'));
            Validator.assertNull(softButtonManager._getSoftButtonObjectById('infinity'));
            Validator.assertEquals(softButtonObject, softButtonManager.getSoftButtonObjectByName('game2'));
            Validator.assertEquals(softButtonObject, softButtonManager._getSoftButtonObjectById(softButtonObjectId));
            done();
        });

        it('testSoftButtonState', function (done) {
            Validator.assertEquals('ROCK', state1.getName());
            Validator.assertEquals('PAPER', state2.getName());
            Validator.assertEquals('SCISSORS', state3.getName());
            done();
        });

        it('testSoftButtonObject', function (done) {
            Validator.assertEquals('game2', softButtonObject.getName());
            Validator.assertEquals(softButtonObjectId, softButtonObject.getButtonId());
            Validator.assertTrue(Validator.validateSoftButton(softButtonObject, softButtonManager.getSoftButtonObjects()[0]));
            Validator.assertEquals([state1, state2, state3], softButtonObject.getStates());

            Validator.assertEquals(state1, softButtonObject.getCurrentState());
            softButtonObject.transitionToNextState();
            Validator.assertEquals(state2, softButtonObject.getCurrentState());

            let success = softButtonObject.transitionToStateByName('INVALID');
            Validator.assertTrue(!success);

            success = softButtonObject.transitionToStateByName(state1.getName());
            Validator.assertTrue(success);
            Validator.assertEquals(state1, softButtonObject.getCurrentState());
            done();
        });
    });
};