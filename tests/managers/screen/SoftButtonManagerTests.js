const SDL = require('./../../../lib/js/dist/SDL.min.js');

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
        const softButtonObject = new SDL.manager.screen.utils.SoftButtonObject('game', [state1, state2, state3], 'ROCK', (id, rpc) => {
            if (rpc instanceof SDL.rpc.messages.OnButtonPress) {
                console.log('First button pressed!');
            }
        });
        const softButtonObjectId = 1000;
        let sbo1, sbo2, sbo3, sbo4, sbo5;

        it('testSoftButtonManagerUpdate', function (done) {
            screenManager.setSoftButtonObjects([softButtonObject]);
            softButtonObject.setButtonId(softButtonObjectId);
            Validator.assertNotNullUndefined(softButtonManager);
            Validator.assertEquals([softButtonObject], softButtonManager.getSoftButtonObjects());
            done();
        });

        it('testSoftButtonManagerGetSoftButtonObject', function (done) {
            Validator.assertNull(softButtonManager.getSoftButtonObjectByName('INVALID'));
            Validator.assertNull(softButtonManager.getSoftButtonObjectById('infinity'));
            Validator.assertEquals(softButtonObject, softButtonManager.getSoftButtonObjectByName('game'));
            Validator.assertEquals(softButtonObject, softButtonManager.getSoftButtonObjectById(softButtonObjectId));
            done();
        });

        it('testSoftButtonState', function (done) {
            Validator.assertEquals('ROCK', state1.getName());
            Validator.assertEquals('PAPER', state2.getName());
            Validator.assertEquals('SCISSORS', state3.getName());
            done();
        });

        it('testSoftButtonObject', function (done) {
            Validator.assertEquals('game', softButtonObject.getName());
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

        it('testAssigningIdsToSoftButtonObjects', function (done) {
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
            softButtonManager._checkAndAssignButtonIds([sbo1, sbo2, sbo3, sbo4, sbo5]);
            Validator.assertEquals(0, sbo1.getButtonId());
            Validator.assertEquals(1, sbo2.getButtonId());
            Validator.assertEquals(2, sbo3.getButtonId());
            Validator.assertEquals(3, sbo4.getButtonId());
            Validator.assertEquals(4, sbo5.getButtonId());

            // sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo1.setButtonId(100);
            // sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo2.setButtonId(200);
            // sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo3.setButtonId(300);
            // sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo4.setButtonId(400);
            // sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo5.setButtonId(500);
            softButtonManager._checkAndAssignButtonIds([sbo1, sbo2, sbo3, sbo4, sbo5]);
            Validator.assertEquals(100, sbo1.getButtonId());
            Validator.assertEquals(200, sbo2.getButtonId());
            Validator.assertEquals(300, sbo3.getButtonId());
            Validator.assertEquals(400, sbo4.getButtonId());
            Validator.assertEquals(500, sbo5.getButtonId());

            // sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo1 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo1.setButtonId(50);
            // sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo2 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            // sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo3 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            // sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo4 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            sbo4.setButtonId(100);
            // sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [], null, null);
            sbo5 = new SDL.manager.screen.utils.SoftButtonObject(null, [state1, state2, state3], state1.getName(), null);
            softButtonManager._checkAndAssignButtonIds([sbo1, sbo2, sbo3, sbo4, sbo5]);
            Validator.assertEquals(50, sbo1.getButtonId());
            Validator.assertEquals(101, sbo2.getButtonId());
            Validator.assertEquals(102, sbo3.getButtonId());
            Validator.assertEquals(100, sbo4.getButtonId());
            Validator.assertEquals(103, sbo5.getButtonId());
            done();
        });
    });
};