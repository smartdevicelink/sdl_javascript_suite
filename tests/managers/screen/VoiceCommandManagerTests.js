const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require('../../Validator');

module.exports = async function (appClient) {
    describe('VoiceCommandManagerTests', function () {
        const sdlManager = appClient._sdlManager;
        const voiceCommandManager = sdlManager.getScreenManager()._voiceCommandManager;

        const voiceCommand1 = new SDL.manager.screen.utils.VoiceCommand(['Command 1', 'Command 2'], () => {});
        const voiceCommand2 = new SDL.manager.screen.utils.VoiceCommand(['Command 3', 'Command 4'], () => {});
        const voiceCommand3 = new SDL.manager.screen.utils.VoiceCommand(['Command 5', ' ', 'Command 6', '\t'], () => {});
        const voiceCommand4 = new SDL.manager.screen.utils.VoiceCommand(['\t'], () => {});
        const voiceCommand5 = new SDL.manager.screen.utils.VoiceCommand([''], () => {});
        const voiceCommand6 = new SDL.manager.screen.utils.VoiceCommand([], () => {});

        const voiceCommands = [voiceCommand1, voiceCommand2];

        beforeEach(function (done) {
            voiceCommandManager._currentHmiLevel = SDL.rpc.enums.HMILevel.HMI_FULL;
            voiceCommandManager._voiceCommands = [];
            done();
        });

        it('testInstantiationAndStart', function (done) {
            Validator.assertEquals(voiceCommandManager._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_FULL);
            Validator.assertEquals(voiceCommandManager._getState(), SDL.manager._SubManagerBase.READY);
            Validator.assertEquals(voiceCommandManager._lastVoiceCommandId, voiceCommandManager._voiceCommandIdMin);
            Validator.assertNotNull(voiceCommandManager._commandListener);
            Validator.assertNotNull(voiceCommandManager._hmiListener);
            Validator.assertEquals(voiceCommandManager.getVoiceCommands().length, 0);
            Validator.assertEquals(voiceCommandManager._currentVoiceCommands.length, 0);

            done();
        });

        it('testHMINotReady', function () {
            voiceCommandManager._currentHmiLevel = SDL.rpc.enums.HMILevel.HMI_NONE;
            voiceCommandManager.setVoiceCommands(voiceCommands);

            // these are the 2 commands we have waiting
            Validator.assertEquals(voiceCommandManager.getVoiceCommands().length, 2);
            Validator.assertEquals(voiceCommandManager._currentVoiceCommands.length, 0);
            Validator.assertEquals(voiceCommandManager._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_NONE);

            voiceCommandManager.setVoiceCommands([]); // don't operate on the voice commands when the manager gets an HMI_FULL
            // The VCM should send the pending voice commands once HMI full occurs
            // fake sending an OnHMILevel update
            voiceCommandManager._hmiListener(new SDL.rpc.messages.OnHMIStatus()
                .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL));

            Validator.assertEquals(voiceCommandManager._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_FULL);
        });

        it('testUpdatingCommands', function () {
            const callback = sinon.fake(() => {});
            const voiceCommand3 = new SDL.manager.screen.utils.VoiceCommand(['Command 5', 'Command 6'], callback);

            voiceCommandManager._currentHmiLevel = SDL.rpc.enums.HMILevel.HMI_NONE; // don't act on processing voice commands
            voiceCommandManager.setVoiceCommands([voiceCommand3]);

            // Fake onCommand - we want to make sure that we can pass back onCommand events to our VoiceCommand Objects
            voiceCommandManager._commandListener(new SDL.rpc.messages.OnCommand()
                .setCmdID(voiceCommand3._getCommandId())
                .setTriggerSource(SDL.rpc.enums.TriggerSource.TS_VR)); // these are voice commands

            // verify the mock listener has been hit once
            Validator.assertEquals(callback.calledOnce, true);
        });

        describe('if any of the voice commands contains an empty string', function () {
            it('should remove the empty strings and queue another operation', async function () {
                await voiceCommandManager.setVoiceCommands([voiceCommand2, voiceCommand3, voiceCommand4, voiceCommand5, voiceCommand6]);
                Validator.assertEquals(voiceCommandManager.getVoiceCommands().length, 2);
                Validator.assertEquals(voiceCommandManager.getVoiceCommands()[0].getVoiceCommands().length, 2);
                Validator.assertEquals(voiceCommandManager.getVoiceCommands()[0].getVoiceCommands(), ['Command 3', 'Command 4']);
                Validator.assertEquals(voiceCommandManager.getVoiceCommands()[1].getVoiceCommands().length, 2);
                Validator.assertEquals(voiceCommandManager.getVoiceCommands()[1].getVoiceCommands(), ['Command 5', 'Command 6']);
            });

            it('should not queue another operation if all the voice command strings are empty strings', async function () {
                await voiceCommandManager.setVoiceCommands([voiceCommand1]);
                // these commands are empty and should be ignored entirely
                await voiceCommandManager.setVoiceCommands([voiceCommand4, voiceCommand5]);
                Validator.assertEquals(voiceCommandManager.getVoiceCommands().length, 1);
                Validator.assertEquals(voiceCommandManager.getVoiceCommands()[0].getVoiceCommands().length, 2);
                Validator.assertEquals(voiceCommandManager.getVoiceCommands()[0].getVoiceCommands(), ['Command 1', 'Command 2']);
            });
        });

        after(function () {
            voiceCommandManager.dispose();

            Validator.assertEquals(voiceCommandManager._lastVoiceCommandId, voiceCommandManager._voiceCommandIdMin);
            Validator.assertEquals(voiceCommandManager._voiceCommands.length, 0);
            Validator.assertEquals(voiceCommandManager._currentHmiLevel, SDL.rpc.enums.HMILevel.HMI_NONE);

            // after everything, make sure we are in the correct state
            Validator.assertEquals(voiceCommandManager._getState(), SDL.manager._SubManagerBase.SHUTDOWN);
        });
    });
};