const expect = require('chai').expect;
const SDL = require('../config.js').node;

// Mocking framework used so that some RPCs are not actually sent to Core, but the response mimicked
const sinon = require('sinon');

const Validator = require('../Validator');

module.exports = function (appClient) {
    describe('SdlManagerTests', function () {
        let originalHmiLanguage;
        const sdlManager = appClient._sdlManager;
        before(() => {
            originalHmiLanguage = sdlManager._lifecycleManager.getRegisterAppInterfaceResponse().getHmiDisplayLanguage();
        });
        beforeEach(() => {
            const language = sdlManager._lifecycleManager.getRegisterAppInterfaceResponse().getHmiDisplayLanguage();
            // create a mismatch that can be checked for in testing
            switch (language) {
                case SDL.rpc.enums.Language.EN_US:
                    sdlManager._lifecycleManager.getRegisterAppInterfaceResponse().setHmiDisplayLanguage(SDL.rpc.enums.Language.ES_MX);
                    sdlManager._lifecycleConfig.setHmiDisplayLanguageDesired(SDL.rpc.enums.Language.EN_US);
                    break;
                default:
                    sdlManager._lifecycleManager.getRegisterAppInterfaceResponse().setHmiDisplayLanguage(SDL.rpc.enums.Language.EN_US);
                    sdlManager._lifecycleConfig.setHmiDisplayLanguageDesired(SDL.rpc.enums.Language.ES_MX);
                    break;
            }
        });
        it('managerShouldUpdateLifecycleToLanguage', function (done) {
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve')
                .callsFake((changeRegistration) => {
                    Validator.assertEquals(changeRegistration.getAppName(), 'Hello JS');
                    Validator.assertEquals(changeRegistration.getTtsName(), [new SDL.rpc.structs.TTSChunk().setText('Hello JS')]);

                    expect(changeRegistration.getLanguage()).to.equal(SDL.rpc.enums.Language.EN_US);
                    expect(changeRegistration.getHmiDisplayLanguage()).to.equal(SDL.rpc.enums.Language.ES_MX);

                    stub.restore();
                    done();
                });
            sdlManager._managerListener.setManagerShouldUpdateLifecycleToLanguage((language = null, hmiLanguage = null) => {
                return new SDL.manager.lifecycle.LifecycleConfigurationUpdate()
                    .setAppName('Hello JS')
                    .setTtsName([new SDL.rpc.structs.TTSChunk().setText('Hello JS')]);
            });
            sdlManager._checkLifecycleConfiguration();
        });
        it('managerShouldUpdateLifecycle', function (done) {
            const stub = sinon.stub(sdlManager._lifecycleManager, 'sendRpcResolve')
                .callsFake((changeRegistration) => {
                    Validator.assertEquals(changeRegistration.getAppName(), 'Hello JS');
                    Validator.assertEquals(changeRegistration.getTtsName(), [new SDL.rpc.structs.TTSChunk().setText('Hello JS')]);
                    // These languages should be the same because hmiDisplayLanguage was not used in older versions
                    expect(changeRegistration.getLanguage()).to.equal(changeRegistration.getHmiDisplayLanguage());
                    // Confirm that the desired languages are not actually the same
                    expect(sdlManager._lifecycleConfig.getLanguageDesired()).to.equal(SDL.rpc.enums.Language.EN_US);
                    expect(sdlManager._lifecycleConfig.getHmiDisplayLanguageDesired()).to.equal(SDL.rpc.enums.Language.ES_MX);

                    stub.restore();
                    done();
                });
            sdlManager._managerListener.setManagerShouldUpdateLifecycle((language = null) => {
                return new SDL.manager.lifecycle.LifecycleConfigurationUpdate()
                    .setAppName('Hello JS')
                    .setTtsName([new SDL.rpc.structs.TTSChunk().setText('Hello JS')]);
            });
            sdlManager._checkLifecycleConfiguration();
        });
        after(() => {
            sdlManager._lifecycleManager.getRegisterAppInterfaceResponse().setHmiDisplayLanguage(originalHmiLanguage);
        });
    });
};