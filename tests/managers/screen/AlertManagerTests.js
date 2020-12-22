const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const sinon = require('sinon');

const Validator = require ('../../Validator');

module.exports = async function (appClient) {
    const sdlManager = appClient._sdlManager;
    const systemCapabilityManager = sdlManager.getSystemCapabilityManager();
    const screenManager = sdlManager.getScreenManager();
    const permissionManager = sdlManager.getPermissionManager();
    const alertManager = screenManager._alertManager;
    describe('AlertManagerTests', function () {
        /**
         * Gets the windowCapability
         * @param {Number} numberOfAlertFields - number of lines
         * @returns {WindowCapability} - the capability
         */
        function getWindowCapability (numberOfAlertFields) {
            const alertText1 = new SDL.rpc.structs.TextField();
            alertText1.setNameParam(SDL.rpc.enums.TextFieldName.alertText1);
            const alertText2 = new SDL.rpc.structs.TextField();
            alertText2.setNameParam(SDL.rpc.enums.TextFieldName.alertText2);
            const alertText3 = new SDL.rpc.structs.TextField();
            alertText3.setNameParam(SDL.rpc.enums.TextFieldName.alertText3);
            const mainField4 = new SDL.rpc.structs.TextField();
            mainField4.setNameParam(SDL.rpc.enums.TextFieldName.mainField4);

            const textFieldList = [];

            textFieldList.push(alertText1);
            textFieldList.push(alertText2);
            textFieldList.push(alertText3);

            const returnList = [];

            if (numberOfAlertFields > 0) {
                for (let index = 0; index < numberOfAlertFields; index++) {
                    returnList.push(textFieldList[index]);
                }
            }

            const windowCapability = new SDL.rpc.structs.WindowCapability();
            windowCapability.setTextFields(returnList);

            const imageField = new SDL.rpc.structs.ImageField();
            imageField.setName(SDL.rpc.enums.ImageFieldName.alertIcon);
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

        /**
         * Calls the listener with pre-built capabilities
         * @param {SystemCapabilityType} capabilityType - the capability type
         * @param {Function} onSystemCapabilityListener - the capability listener
         */
        function onSystemCapabilityAnswer (capabilityType, onSystemCapabilityListener) {
            const windowCapability = getWindowCapability(3);
            const displayCapability = new SDL.rpc.structs.DisplayCapability();
            displayCapability.setWindowCapabilities([windowCapability]);
            const capabilities = [displayCapability];
            onSystemCapabilityListener(capabilities);
        }

        /**
         * Calls the listener with pre-built permissions
         * @param {PermissionElement[]} permissionElements - An array of PermissionElement that represents the RPC IDs and their parameters
         * @param {Number} groupType - PermissionGroupType int value represents whether we need the listener to be called when there is any permissions change or only when all permission become allowed
         * @param {function} listener - A function to be invoked upon permission change: function(Object<FunctionID, PermissionStatus>, PermissionGroupStatus)
         */
        function permissionAnswer (permissionElements, groupType, listener) {
            const onPermissionChangeListener = listener;
            const allowedPermissions = [];
            const permissionGroupStatus = SDL.manager.permission.enums.PermissionGroupStatus.PERMISSION_GROUP_STATUS_DISALLOWED;
            onPermissionChangeListener(allowedPermissions, permissionGroupStatus);
        }

        it('testInstantiation', async function () {
            // const stub = sinon.stub(systemCapabilityManager, 'addOnSystemCapabilityListener').callsFake(onSystemCapabilityAnswer);
            // const permStub = sinon.stub(permissionManager, 'addListener').callsFake(permissionAnswer);
            // await systemCapabilityManager.updateCapability(SDL.rpc.enums.SystemCapabilityType.WindowCapability);
            Validator.assertNotNullUndefined(alertManager._defaultMainWindowCapability);
            Validator.assertNotNullUndefined(alertManager._nextCancelId);
            Validator.assertTrue(!alertManager._currentAlertPermissionStatus);
            // permStub.restore();
            // stub.restore();
            return;
        });

        it('testPresentAlert', async function () {
            const alertView = new SDL.manager.screen._AlertView();
            await alertManager.presentAlert(alertView);
            Validator.assertTrue(alertManager._getTasks().length === 0);
            return;
        });
    });
};