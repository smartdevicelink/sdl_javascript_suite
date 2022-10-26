const WS = require('ws');
const AppClient = require('./AppClient');
const permissionManagerTests = require('./permission/PermissionManagerTests');
const softButtonManagerTests = require('./screen/SoftButtonManagerTests');
const screenManagerTests = require('./screen/ScreenManagerTests');
const lifecycleManagerTests = require('./lifecycle/LifecycleManagerTests');
const fileManagerTests = require('./file/FileManagerTests');
const uploadFileOperationTests = require('./file/UploadFileOperationTests');
const sdlFileTests = require('./file/SdlFileTests');
const taskTests = require('./TaskTests');
const queueTests = require('./QueueTests');
const textAndGraphicManagerTests = require('./screen/TextAndGraphicManagerTests');
const textAndGraphicUpdateOperationTests = require('./screen/TextAndGraphicUpdateOperationTests');
const alertManagerTests = require('./screen/AlertManagerTests');
const alertAudioDataTests = require('./screen/AlertAudioDataTests');
const alertViewTests = require('./screen/AlertViewTests');
const presentAlertOperationTests = require('./screen/PresentAlertOperationTests');
const voiceCommandManagerTests = require('./screen/VoiceCommandManagerTests');
const voiceCommandUpdateOperationTests = require('./screen/VoiceCommandUpdateOperationTests');
const choiceCellTests = require('./screen/choiceset/ChoiceCellTests');
const dynamicMenuUpdateRunScoreTests = require('./screen/menu/DynamicMenuUpdateRunScoreTests');
const dynamicMenuUpdatesModeTests = require('./screen/menu/DynamicMenuUpdatesModeTests');
const menuCellTests = require('./screen/menu/MenuCellTests');
const menuConfigurationTests = require('./screen/menu/MenuConfigurationTests');
const menuConfigurationUpdateOperationTests = require('./screen/menu/MenuConfigurationUpdateOperationTests');
const menuManagerTests = require('./screen/menu/MenuManagerTests');
const menuReplaceOperationTests = require('./screen/menu/MenuReplaceOperationTests');
const menuReplaceUtilitiesTests = require('./screen/menu/MenuReplaceUtilitiesTests');
const menuShowOperationTests = require('./screen/menu/MenuShowOperationTests');
const checkChoiceVROptionalOperationTests = require('./screen/choiceset/CheckChoiceVROptionalOperationTests');
const choiceSetLayoutTests = require('./screen/choiceset/ChoiceSetLayoutTests');
const choiceSetManagerTests = require('./screen/choiceset/ChoiceSetManagerTests');
const choiceSetTests = require('./screen/choiceset/ChoiceSetTests');
const preloadPresentChoicesOperationTests = require('./screen/choiceset/PreloadPresentChoicesOperationTests');
const presentKeyboardOperationTests = require('./screen/choiceset/PresentKeyboardOperationTests');
const sdlManagerTests = require('./SdlManagerTests');
const systemCapabilityManagerTests = require('./SystemCapabilityManagerTests');

// connect to core and select the app on the HMI to run the tests
describe('ManagerTests', function () {
    this.timeout(45000);
    it('StartManagerTests', function (done) {
        const appWebSocketServer = new WS.Server({ port: 3005 });
        appWebSocketServer.on('connection', function (connection) {
            console.log('Connection');
            const appClient = new AppClient(connection, async (teardown) => {
                voiceCommandManagerTests(appClient);
                voiceCommandUpdateOperationTests(appClient);
                textAndGraphicManagerTests(appClient);
                permissionManagerTests(appClient);
                screenManagerTests(appClient);
                lifecycleManagerTests(appClient);
                taskTests(appClient);
                queueTests(appClient);
                // tests fail if setting the two voicecommand tests below the textandgraphic tests
                textAndGraphicUpdateOperationTests(appClient);
                presentAlertOperationTests(appClient);
                await alertManagerTests(appClient);
                alertAudioDataTests(appClient);
                alertViewTests(appClient);
                checkChoiceVROptionalOperationTests(appClient);
                choiceCellTests(appClient);
                choiceSetLayoutTests(appClient);
                choiceSetManagerTests(appClient);
                choiceSetTests(appClient);
                preloadPresentChoicesOperationTests(appClient);
                presentKeyboardOperationTests(appClient);
                softButtonManagerTests(appClient);
                dynamicMenuUpdateRunScoreTests(appClient);
                dynamicMenuUpdatesModeTests(appClient);
                menuCellTests(appClient);
                menuConfigurationTests(appClient);
                menuConfigurationUpdateOperationTests(appClient);
                menuManagerTests(appClient);
                menuReplaceOperationTests(appClient);
                menuReplaceUtilitiesTests(appClient);
                menuShowOperationTests(appClient);
                fileManagerTests(appClient);
                uploadFileOperationTests(appClient);
                sdlFileTests(appClient);
                sdlManagerTests(appClient);
                systemCapabilityManagerTests(appClient);

                setTimeout(function () {
                    // teardown();
                    done();
                }, 30000);
            });
        });
    });
});
