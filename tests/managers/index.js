const WS = require('ws');
const AppClient = require('./AppClient');
const permissionManagerTests = require('./permission/PermissionManagerTests');
const softButtonManagerTests = require('./screen/SoftButtonManagerTests');
const screenManagerTests = require('./screen/ScreenManagerTests');
const lifecycleManagerTests = require('./lifecycle/LifecycleManagerTests');
const fileManagerTests = require('./file/FileManagerTests');
const taskTests = require('./TaskTests');
const queueTests = require('./QueueTests');
const textAndGraphicManagerTests = require('./screen/TextAndGraphicManagerTests');
const textAndGraphicUpdateOperationTests = require('./screen/TextAndGraphicUpdateOperationTests');
const voiceCommandManagerTests = require('./screen/VoiceCommandManagerTests');
const voiceCommandUpdateOperationTests = require('./screen/VoiceCommandUpdateOperationTests');

// connect to core and select the app on the HMI to run the tests
describe('ManagerTests', function () {
    this.timeout(30000);
    it('StartManagerTests', function (done) {
        const appWebSocketServer = new WS.Server({ port: 3005 });
        appWebSocketServer.on('connection', function (connection) {
            console.log('Connection');
            const appClient = new AppClient(connection, async (teardown) => {
                textAndGraphicManagerTests(appClient);
                permissionManagerTests(appClient);
                softButtonManagerTests(appClient);
                screenManagerTests(appClient);
                lifecycleManagerTests(appClient);
                fileManagerTests(appClient);
                taskTests(appClient);
                queueTests(appClient);
                voiceCommandManagerTests(appClient);
                voiceCommandUpdateOperationTests(appClient);
                // tests fail if setting the two voicecommand tests below the textandgraphic tests
                textAndGraphicUpdateOperationTests(appClient);
                setTimeout(function () {
                    teardown();
                    done();
                }, 5000);
            });
        });
    });
});