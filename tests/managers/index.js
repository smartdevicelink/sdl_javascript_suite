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

// connect to core and select the app on the HMI to run the tests
describe('ManagerTests', function () {
    this.timeout(30000);
    it('StartManagerTests', function (done) {
        const appWebSocketServer = new WS.Server({ port: 3005 });
        appWebSocketServer.on('connection', function (connection) {
            console.log('Connection');
            const appClient = new AppClient(connection, async (teardown) => {
                await textAndGraphicManagerTests(appClient);
                permissionManagerTests(appClient);
                softButtonManagerTests(appClient);
                await screenManagerTests(appClient);
                lifecycleManagerTests(appClient);
                fileManagerTests(appClient);
                taskTests(appClient);
                queueTests(appClient);
                textAndGraphicUpdateOperationTests(appClient);
                setTimeout(function () {
                    teardown();
                    done();
                }, 2000);
            });
        });
    });
});