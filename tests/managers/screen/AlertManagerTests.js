const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core

const Validator = require ('../../Validator');

module.exports = async function (appClient) {
    const sdlManager = appClient._sdlManager;
    const screenManager = sdlManager.getScreenManager();
    const alertManager = screenManager._alertManager;
    describe('AlertManagerTests', function () {
        it('testInstantiation', async function () {
            Validator.assertNotNullUndefined(alertManager._defaultMainWindowCapability);
            Validator.assertNotNullUndefined(alertManager._nextCancelId);
            Validator.assertTrue(!alertManager._currentAlertPermissionStatus);
            return;
        });

        it('testPresentAlert', async function () {
            const alertView = new SDL.manager.screen.utils.AlertView();
            await alertManager.presentAlert(alertView);
            Validator.assertTrue(alertManager._getTasks().length === 0);
            return;
        });
    });
};