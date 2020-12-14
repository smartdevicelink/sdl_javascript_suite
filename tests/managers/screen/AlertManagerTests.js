const SDL = require('../../config.js').node;

const Validator = require ('../Validator');

module.exports = function (appClient) {
    describe('SoftButtonManagerTests', function () {
        const sdlManager = appClient._sdlManager;
        const lifecycleManager = sdlManager._lifecycleManager;
        const fileManager = sdlManager.getFileManager();
        const permissionManager = sdlManager.getPermissionManager();
        const screenManager = sdlManager.getScreenManager();
        const alertManager = screenManager._alertManager;

        function getWindowCapability (numberOfAlertFields) {
            const alertText1 = new SDL.rpc.structs.TextField();
            alertText1.setName(TextFieldName.alertText1);
            const alertText2 = new SDL.rpc.structs.TextField();
            alertText2.setName(TextFieldName.alertText2);
            const alertText3 = new SDL.rpc.structs.TextField();
            alertText3.setName(TextFieldName.alertText3);
            const mainField4 = new SDL.rpc.structs.TextField();
            mainField4.setName(TextFieldName.mainField4);

            const textFieldList = [];

            textFieldList.push(alertText1);
            textFieldList.push(alertText2);
            textFieldList.push(alertText3);

            const returnList = [];

            if (numberOfAlertFields > 0) {
                for (const i = 0; i < numberOfAlertFields; i++) {
                    returnList.push(textFieldList[i]);
                }
            }

            const windowCapability = new SDL.rpc.structs.WindowCapability();
            windowCapability.setTextFields(returnList);

            const imageField = new SDL.rpc.structs.ImageField();
            imageField.setName(ImageFieldName.alertIcon);
            const imageFieldList = [];
            imageFieldList.push(imageField);
            windowCapability.setImageFields(imageFieldList);

            windowCapability.setImageFields(imageFieldList);

            const softButtonCapabilities = new SDL.rpc.structs.SoftButtonCapabilities();
            softButtonCapabilities.setImageSupported(true);
            softButtonCapabilities.setShortPressAvailable(true);
            softButtonCapabilities.setLongPressAvailable(true);
            softButtonCapabilities.setUpDownAvailable(true);
            softButtonCapabilities.setTextSupported(true);

            windowCapability.setSoftButtonCapabilities([softButtonCapabilities]);
            return windowCapability;
        }

        it('testInstantiation', function (done) {
            Validator.assertNotNullUndefined(alertManager.defaultMainWindowCapability);
            Validator.assertNotNullUndefined(alertManager.nextCancelId);
            Validator.assertTrue(!alertManager.currentAlertPermissionStatus);
            done();
        });

        it('testPresentAlert', function (done) {
            const alertView = new SDL.manager.screen._AlertView();
            // ???
            await alertManager.presentAlert(alertView);
        });
    });
};