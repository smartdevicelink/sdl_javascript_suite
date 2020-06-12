const SDL = require('./../../../lib/js/dist/SDL.min.js');

const Validator = require('./../../Validator');
module.exports = function (appClient) {
    describe('PermissionManagerTests', function () {
        const permissionManager = appClient._sdlManager.getPermissionManager();

        /**
         * Safely attempt to send an RPC.
         * @param {RpcMessage} rpcMessage - The RPC message to send.
         */
        function sendRpc (rpcMessage) {
            if (rpcMessage !== null) {
                appClient._sdlManager.sendRpc(rpcMessage);
            }
        }

        it('testListenersAllAllowed', function (done) {
            Validator.assertNotNullUndefined(permissionManager);
            Validator.assertTrue(!permissionManager.getRequiresEncryption());
            const permissionElements = [new SDL.manager.permission.PermissionElement(SDL.rpc.enums.FunctionID.Show),
                new SDL.manager.permission.PermissionElement(SDL.rpc.enums.FunctionID.GetVehicleData, ['rpm', 'airbagStatus'])];

            permissionManager.addListener(permissionElements, SDL.manager.permission.enums.PermissionGroupType.ALL_ALLOWED,
                function (allowedPermissions, permissionGroupStatus) {
                    Validator.assertEquals(permissionGroupStatus, SDL.manager.permission.enums.PermissionGroupType.ALL_ALLOWED);
                    Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.Show].getIsRpcAllowed());
                    Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getIsRpcAllowed());
                    Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().rpm);
                    Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().airbagStatus);
                });
            sendRpc(new SDL.rpc.messages.Show());

            const permissionItems = [];
            const permissionItem1 = new SDL.rpc.structs.PermissionItem();
            permissionItem1.setRpcName(SDL.rpc.enums.FunctionID.Show);
            permissionItem1.setHmiPermissions(new SDL.rpc.structs.HMIPermissions([
                SDL.rpc.enums.HMILevel.HMI_BACKGROUND,
                SDL.rpc.enums.HMILevel.HMI_FULL,
                SDL.rpc.enums.HMILevel.HMI_LIMITED]));
            permissionItem1.setParameterPermissions(new SDL.rpc.structs.ParameterPermissions());
            permissionItems.push(permissionItem1);
            const permissionItem2 = new SDL.rpc.structs.PermissionItem();
            permissionItem2.setRpcName(SDL.rpc.enums.FunctionID.GetVehicleData);
            permissionItem2.setHmiPermissions(new SDL.rpc.structs.HMIPermissions([
                SDL.rpc.enums.HMILevel.HMI_BACKGROUND,
                SDL.rpc.enums.HMILevel.HMI_FULL]));
            permissionItem2.setParameterPermissions(new SDL.rpc.structs.ParameterPermissions(['rpm', 'airbagStatus']));
            permissionItems.push(permissionItem2);
            appClient._sdlManager.sendRpc(new SDL.rpc.messages.Show());
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
                        Validator.assertEquals(permissionGroupStatus, SDL.manager.permission.PermissionGroupStatus.ALLOWED);
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.Show].getIsRpcAllowed());
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getIsRpcAllowed());
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().rpm);
                        Validator.assertTrue(allowedPermissions[SDL.rpc.enums.FunctionID.GetVehicleData].getAllowedParameters().airbagStatus);
                    }
                    listenerCalledCounter++;
                });
            appClient._sdlManager.sendRpc(new SDL.rpc.messages.Show());
            const permissionItems = [];
            const permissionItem1 = new SDL.rpc.structs.PermissionItem();
            permissionItem1.setRpcName(SDL.rpc.enums.FunctionID.Show);
            permissionItem1.setHmiPermissions(new SDL.rpc.structs.HMIPermissions([
                SDL.rpc.enums.HMILevel.HMI_BACKGROUND,
                SDL.rpc.enums.HMILevel.HMI_FULL,
                SDL.rpc.enums.HMILevel.HMI_LIMITED]));
            permissionItem1.setParameterPermissions(new SDL.rpc.structs.ParameterPermissions());
            permissionItems.push(permissionItem1);
            const permissionItem2 = new SDL.rpc.structs.PermissionItem();
            permissionItem2.setRpcName(SDL.rpc.enums.FunctionID.GetVehicleData);
            permissionItem2.setHmiPermissions(new SDL.rpc.structs.HMIPermissions([
                SDL.rpc.enums.HMILevel.HMI_BACKGROUND,
                SDL.rpc.enums.HMILevel.HMI_FULL]));
            permissionItem2.setParameterPermissions(new SDL.rpc.structs.ParameterPermissions(['rpm', 'airbagStatus']));
            permissionItems.push(permissionItem2);
            appClient._sdlManager.sendRpc(new SDL.rpc.messages.Show());
            done();
        });
    });
};
