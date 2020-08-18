const SDL = require('./../../../dist/js/SDL.min.js');

const Validator = require('./../../Validator');
module.exports = function (appClient) {
    describe('PermissionManagerTests', function () {
        const permissionManager = appClient._sdlManager.getPermissionManager();

        it('testListenersAllAllowed', function (done) {
            Validator.assertNotNullUndefined(permissionManager);
            Validator.assertTrue(!permissionManager.getRequiresEncryption());
            const permissionElements = [new SDL.manager.permission.PermissionElement(SDL.rpc.enums.FunctionID.Show),
                new SDL.manager.permission.PermissionElement(SDL.rpc.enums.FunctionID.GetVehicleData, ['rpm', 'airbagStatus'])];

            const functionID = permissionManager.addListener(permissionElements, SDL.manager.permission.enums.PermissionGroupType.ALL_ALLOWED,
                function (allowedPermissions, permissionGroupStatus) {
                    Validator.assertEquals(permissionGroupStatus, SDL.manager.permission.enums.PermissionGroupStatus.ALLOWED);
                    Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.Show].getIsRpcAllowed());
                    Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getIsRpcAllowed());
                    Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().rpm);
                    Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().airbagStatus);
                });
            permissionManager._onHMIStatusListener(
                new SDL.rpc.messages.OnHMIStatus()
                    .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_LIMITED)
                    .setWindowID(SDL.rpc.enums.PredefinedWindows.DEFAULT_WINDOW)
            );

            const permissionItem1 = new SDL.rpc.structs.PermissionItem();
            permissionItem1.setRpcName(SDL.rpc.enums.FunctionID.Show);
            permissionItem1.setHmiPermissions(new SDL.rpc.structs.HMIPermissions().setAllowed([
                SDL.rpc.enums.HMILevel.HMI_BACKGROUND,
                SDL.rpc.enums.HMILevel.HMI_FULL,
                SDL.rpc.enums.HMILevel.HMI_LIMITED]).setUserDisallowed([]));
            permissionItem1.setParameterPermissions(new SDL.rpc.structs.ParameterPermissions());
            permissionManager._currentPermissionItems[permissionItem1.getRpcName()] = permissionItem1;
            const permissionItem2 = new SDL.rpc.structs.PermissionItem();
            permissionItem2.setRpcName(SDL.rpc.enums.FunctionID.GetVehicleData);
            permissionItem2.setHmiPermissions(new SDL.rpc.structs.HMIPermissions().setAllowed([
                SDL.rpc.enums.HMILevel.HMI_BACKGROUND,
                SDL.rpc.enums.HMILevel.HMI_FULL]).setUserDisallowed([]));
            permissionItem2.setParameterPermissions(new SDL.rpc.structs.ParameterPermissions().setAllowed(['rpm', 'airbagStatus']));
            permissionManager._currentPermissionItems[permissionItem2.getRpcName()] = permissionItem2;

            permissionManager._onHMIStatusListener(
                new SDL.rpc.messages.OnHMIStatus()
                    .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL)
                    .setWindowID(SDL.rpc.enums.PredefinedWindows.DEFAULT_WINDOW)
            );
            permissionManager.removeListener(functionID);
            done();
        });

        it('testListenersAnyAllowed', function (done) {
            let listenerCalledCounter = 0;
            const permissionElements = [];
            permissionElements.push(new SDL.manager.permission.PermissionElement(SDL.rpc.enums.FunctionID.Show));
            permissionElements.push(new SDL.manager.permission.PermissionElement(SDL.rpc.enums.FunctionID.GetVehicleData, ['rpm', 'airbagStatus']));
            permissionManager.addListener(permissionElements, SDL.manager.permission.enums.PermissionGroupType.ANY,
                function (allowedPermissions, permissionGroupStatus) {
                    if (listenerCalledCounter === 0) {
                        Validator.assertEquals(permissionGroupStatus, SDL.manager.permission.enums.PermissionGroupStatus.ALLOWED);
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.Show].getIsRpcAllowed());
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getIsRpcAllowed());
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().rpm);
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().airbagStatus);
                    } else if (listenerCalledCounter === 1) {
                        Validator.assertEquals(permissionGroupStatus, SDL.manager.permission.enums.PermissionGroupStatus.MIXED);
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.Show].getIsRpcAllowed());
                        Validator.assertTrue(!allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getIsRpcAllowed());
                        Validator.assertTrue(!allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().rpm);
                        Validator.assertTrue(!allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().airbagStatus);
                    }
                    listenerCalledCounter++;
                });
            permissionManager._onHMIStatusListener(
                new SDL.rpc.messages.OnHMIStatus()
                    .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_LIMITED)
                    .setWindowID(SDL.rpc.enums.PredefinedWindows.DEFAULT_WINDOW)
            );
            const permissionItem1 = new SDL.rpc.structs.PermissionItem();
            permissionItem1.setRpcName(SDL.rpc.enums.FunctionID.Show);
            permissionItem1.setHmiPermissions(new SDL.rpc.structs.HMIPermissions([
                SDL.rpc.enums.HMILevel.HMI_BACKGROUND,
                SDL.rpc.enums.HMILevel.HMI_FULL,
                SDL.rpc.enums.HMILevel.HMI_LIMITED]));
            permissionItem1.setParameterPermissions(new SDL.rpc.structs.ParameterPermissions());
            permissionManager._currentPermissionItems[permissionItem1.getRpcName()] = permissionItem1;

            const permissionItem2 = new SDL.rpc.structs.PermissionItem();
            permissionItem2.setRpcName(SDL.rpc.enums.FunctionID.GetVehicleData);
            permissionItem2.setHmiPermissions(new SDL.rpc.structs.HMIPermissions([
                SDL.rpc.enums.HMILevel.HMI_BACKGROUND,
                SDL.rpc.enums.HMILevel.HMI_FULL]));
            permissionItem2.setParameterPermissions(new SDL.rpc.structs.ParameterPermissions(['rpm', 'airbagStatus']));

            permissionManager._currentPermissionItems[permissionItem2.getRpcName()] = permissionItem2;
            permissionManager._onHMIStatusListener(
                new SDL.rpc.messages.OnHMIStatus()
                    .setHmiLevel(SDL.rpc.enums.HMILevel.HMI_FULL)
                    .setWindowID(SDL.rpc.enums.PredefinedWindows.DEFAULT_WINDOW)
            );
            done();
        });
    });
};
