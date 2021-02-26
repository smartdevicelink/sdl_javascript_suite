const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');
const sinon = require('sinon');

module.exports = function (appClient) {
    describe('MenuConfigurationUpdateOperationTests', function () {
        const sdlManager = appClient._sdlManager;

        const mm = new SDL.manager.screen.menu._MenuManagerBase(sdlManager._lifecycleManager, sdlManager._fileManager);

        it('testSuccess', function (done) {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(7)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const propertiesResponse = sinon.fake(createSetGlobalPropertiesAnswer(true));
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(propertiesResponse);

            const windowCapability = createWindowCapability(true, true);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.TILES);

            const operation = new SDL.manager.screen.menu._MenuConfigurationUpdateOperation(sdlManager._lifecycleManager, windowCapability, menuConfiguration, success => {
                Validator.assertTrue(success);
                Validator.assertEquals(propertiesResponse.called, true);
                stub.restore();
                getVersionStub.restore();
                done();
            });


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        it('testFailsRpcVersionOld', function (done) {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(5)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const propertiesResponse = sinon.fake(createSetGlobalPropertiesAnswer(true));
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(propertiesResponse);

            const windowCapability = createWindowCapability(true, true);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.TILES);

            const operation = new SDL.manager.screen.menu._MenuConfigurationUpdateOperation(sdlManager._lifecycleManager, windowCapability, menuConfiguration, success => {
                Validator.assertTrue(!success);
                Validator.assertEquals(propertiesResponse.called, false);
                stub.restore();
                getVersionStub.restore();
                done();
            });


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        it('testFailsMenuLayoutNotSet', function (done) {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(7)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const propertiesResponse = sinon.fake(createSetGlobalPropertiesAnswer(true));
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(propertiesResponse);

            const windowCapability = createWindowCapability(true, true);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.TILES);

            const operation = new SDL.manager.screen.menu._MenuConfigurationUpdateOperation(sdlManager._lifecycleManager, windowCapability, menuConfiguration, success => {
                Validator.assertTrue(!success);
                Validator.assertEquals(propertiesResponse.called, false);
                stub.restore();
                getVersionStub.restore();
                done();
            });


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        it('testFailsMenuLayoutsAvailableEmpty', function (done) {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(7)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const propertiesResponse = sinon.fake(createSetGlobalPropertiesAnswer(true));
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(propertiesResponse);

            const windowCapability = createWindowCapability(true, true);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration();

            const operation = new SDL.manager.screen.menu._MenuConfigurationUpdateOperation(sdlManager._lifecycleManager, windowCapability, menuConfiguration, success => {
                Validator.assertTrue(!success);
                Validator.assertEquals(propertiesResponse.called, false);
                stub.restore();
                getVersionStub.restore();
                done();
            });


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        it('testFailsRpcNotSent', function (done) {
            const getVersionStub = sinon.stub(sdlManager._lifecycleManager, 'getSdlMsgVersion')
                .returns(new SDL.rpc.structs.SdlMsgVersion()
                    .setMajorVersion(7)
                    .setMinorVersion(0)
                    .setPatchVersion(0));

            const propertiesResponse = sinon.fake(createSetGlobalPropertiesAnswer(false));
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve');
            stub.withArgs(sinon.match.instanceOf(SDL.rpc.messages.SetGlobalProperties)).callsFake(propertiesResponse);

            const windowCapability = createWindowCapability(true, true);
            const menuConfiguration = new SDL.manager.screen.menu.MenuConfiguration()
                .setMenuLayout(SDL.rpc.enums.MenuLayout.LIST)
                .setSubMenuLayout(SDL.rpc.enums.MenuLayout.TILES);

            const operation = new SDL.manager.screen.menu._MenuConfigurationUpdateOperation(sdlManager._lifecycleManager, windowCapability, menuConfiguration, success => {
                Validator.assertTrue(!success);
                Validator.assertEquals(propertiesResponse.called, true);
                stub.restore();
                getVersionStub.restore();
                done();
            });


            mm._canRunTasks = true;
            mm._addTask(operation);
        });

        /**
         * Creates a window capability
         * @param {Boolean} supportsList - Whether lists are supported
         * @param {Boolean} supportsTile - Whether tiles are supported
         * @returns {WindowCapability} - A generated window capability
         */
        function createWindowCapability (supportsList, supportsTile) {
            const supported = [];
            if (supportsList) {
                supported.push(SDL.rpc.enums.MenuLayout.LIST);
            }
            if (supportsTile) {
                supported.push(SDL.rpc.enums.MenuLayout.TILES);
            }
            return new SDL.rpc.structs.WindowCapability()
                .setMenuLayoutsAvailable(supported);
        }

        /**
         * Responds to SetGlobalProperties requests
         * @param {Boolean} success - Whether to respond positively
         * @returns {CancelInteractionResponse} - Response
         */
        function createSetGlobalPropertiesAnswer (success) {
            return function (req) {
                return new SDL.rpc.messages.SetGlobalPropertiesResponse({
                    functionName: SDL.rpc.enums.FunctionID.SetGlobalProperties,
                })
                    .setSuccess(success);
            };
        }
    });
};