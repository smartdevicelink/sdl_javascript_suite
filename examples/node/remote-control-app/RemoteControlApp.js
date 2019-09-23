// const SdlPsm = require('./lib/SdlPsm');

const {SdlManager,SdlPsm} = require('sdl-node');

// import SdlManager from 'sdl-node';

// console.log(`SdlManager`,SdlManager);
// console.log(`SdlPsm`,SdlPsm);


/**
 * Proxy session.
 *
 *
 * TODO very basic manager for the app to allow initialize and listen to port connection.
 *
 *
 */

class RemoteControlApp {

    populateApp(application) {
        application = application || {};

        application.appID = application.appID || "1";
        application.fullAppId = application.fullAppId || application.appID;
        application.appName = application.appName || application.appID;
        application.appName = application.appName || application.appID;
        application.vrSynonyms = application.vrSynonyms || [application.appName];
        // application.ttsName = application.ttsName || [application.appName];


        application = Object.assign({
                                        'hmiDisplayLanguageDesired': 'EN-US',
                                        'isMediaApplication': true,
                                        'appHMIType': [
                                            'DEFAULT',
                                            'MEDIA',
                                            'REMOTE_CONTROL'
                                        ],
                                        'languageDesired': 'EN-US',
                                        'syncMsgVersion': {
                                            'majorVersion': 5,
                                            'minorVersion': 1,
                                            'patchVersion': 0
                                        }
                                    }, {}, application);

        this.application = application;
    }

    getAppID()
    {
        return this.application.appID;
    }

    //TODO accept requests.
    constructor(opts) {

        this.populateApp(opts.application);

        this.sessionId = null;
        this.messageId = 0;

        this.coreWs = opts.coreWs;


        this.requestHistory = [];


        this.sdlManager = new SdlManager();
    }


    getNextMessageId() {
        this.messageId++;
        return this.messageId;
    }

    static async create(opts) {
        let obj = new RemoteControlApp(opts);
        await obj.init();

        return obj;
    }

    async getSessionInfo() {
        let {
            sessionId,
            hmiStatus,
            application,
        } = this;

        // let { hmiLevel } = hmiStatus;

        return {
            sessionId,
            hmiStatus,
            application
            // hmiLevel
        };
    }

    getRequestHistory() {
        return this.requestHistory;
    }

    setSessionId(id) {
        if (this.sessionId !== id) {
            console.log(`sessionId updated`, this.sessionId, id);
            this.sessionId = id;
        } else {
            console.log(`sessionId is already ${id}`);

        }
    }

    updateHmiStatus(data) {
        this.hmiStatus = data;
    }

    async init() {

        console.log(`requesting websocket`);
        let self = this;
        let coreWs = this.coreWs;

        //handle
        coreWs.on('message', async msg => {
            // console.log(`received message from core`, msg);
            let data = msg;

            let payloadStr;
            const dataAry = new Uint8Array(data);
            // let fullString = SdlPsm.uint8arrayToStringMethod(dataAry);

            console.log(`received message from core`);
            // console.log(fullString);
            let sdlPsm = SdlPsm.parseChunk(dataAry);

            let {
                state,
                version,
                sessionId,
                dataLength,
                compression,
                frameType,
                serviceType,
                controlFrameInfo,
                messageId,
                dataStart,
                states,
                // function_id,
                // jsonData,
                frames,
            } = sdlPsm;
            self.setSessionId(sessionId);
            let function_id, correlation_id, jsonData;

            // let jsonData;

            if (frames.length === 1) {
                jsonData = frames[0].jsonData;
                function_id = frames[0].function_id;
                correlation_id = frames[0].correlation_id;
            }
            let method = SdlPsm.getFunctionById(function_id);
            console.log(`payload from core:`, JSON.stringify(jsonData), {
                function_id,
                version,
                frameType,
                correlation_id,
                messageId,
                method
            });

            if (method === 'OnHMIStatus') {
                self.updateHmiStatus(jsonData);
            }

        });

        coreWs.on('close', () => {
            console.log('WebSocket was closed');
        });

        await this.initApp();
    }

    async sendInitRequest() {
        console.log(`sendInitRequest`)
        let self = this;

        let connectionRequest = SdlPsm.INIT_REQUEST;
        console.log(`sendInitRequest 2`,connectionRequest)

        //  protocolVersion5.2.0
        self.coreWs.send(connectionRequest);
        console.log(`sendInitRequest 3`);
        return new Promise((r) => {
            self.coreWs.on('message', async function(data) {
                console.log(`sendInitRequest received response`);
                // await self.handleCoreData(data);

                return r();
            });
        });

    }

    //TODO create an app config and a lifecycle manager on startup.
    // public void start(){
    //     Log.i(TAG, "start");
    //     if (lifecycleManager == null) {
    //         if (transport != null
    //             && (transport.getTransportType().equals(TransportType.WEB_SOCKET_SERVER) || transport.getTransportType().equals(TransportType.CUSTOM))) {
    //             //Do the thing
    //
    //             LifecycleManager.AppConfig appConfig = new LifecycleManager.AppConfig();
    //             appConfig.setAppName(appName);
    //             //short app name
    //             appConfig.setMediaApp(isMediaApp);
    //             appConfig.setHmiDisplayLanguageDesired(hmiLanguage);
    //             appConfig.setLanguageDesired(hmiLanguage);
    //             appConfig.setAppType(hmiTypes);
    //             appConfig.setVrSynonyms(vrSynonyms);
    //             appConfig.setTtsName(ttsChunks);
    //             appConfig.setDayColorScheme(dayColorScheme);
    //             appConfig.setNightColorScheme(nightColorScheme);
    //             appConfig.setAppID(appId);
    //             appConfig.setMinimumProtocolVersion(minimumProtocolVersion);
    //             appConfig.setMinimumRPCVersion(minimumRPCVersion);
    //
    //             lifecycleManager = new LifecycleManager(appConfig, transport, lifecycleListener);
    //             _internalInterface = lifecycleManager.getInternalInterface(SdlManager.this);
    //
    //             if (sdlSecList != null && !sdlSecList.isEmpty()) {
    //                 lifecycleManager.setSdlSecurityClassList(sdlSecList);
    //             }
    //
    //             //Setup the notification queue
    //             initNotificationQueue();
    //
    //             lifecycleManager.start();
    //
    //
    //         }else{
    //             throw new RuntimeException("No transport provided");
    //         }
    //     }
    // }
    async initApp() {
        let self = this;
        console.log(`initializeApp`);
        await this.sendInitRequest(); //protocolVersion5.2.0 and wait for response.

        console.log(`connection initialized`);

        let appRequest = {
            'method': 'RegisterAppInterface',
            'params':
            this.application,

        };
        console.log(`initializeApp - RegisterAppInterface`,JSON.stringify(appRequest,null,4));

        let result = await this.doRpc(appRequest);
        console.log(`initializeApp - RegisterAppInterface`,JSON.stringify(result,null,4));

    }

    async doRpc(requestJSON, buffer) {
        console.log(`BocksSession doRpc`, requestJSON);
        let coreWs = this.coreWs;
        let self = this;
        let originalMessageId = this.getNextMessageId();
        let sessionId = this.sessionId;

        if (!requestJSON || !requestJSON.method) {
            console.error(`doRpc invalid`, requestJSON);
            return {};
        }


        //TODO use less raw methods. reduce code required here for the example. return an rpc struct.
        let data = SdlPsm.buildRPC({
                                       messageId: originalMessageId,
                                       sessionId,
                                       requestJSON,
                                       buffer
                                   });

        // let data = self.sdlManager.sendRPCJSON(
        //     requestJSON,
            // {
            //                                        messageId: originalMessageId,
                                                   // sessionId,
                                                   // requestJSON,
                                                   // buffer
                                               // }
                                               // )

        return new Promise(function(resolve) {
            let listener = function(msg) {
                // console.log(`doRpc`,`received message`);
                // let fullString = self.uint8arrayToStringMethod(data);
                // console.log(`received message from core`, msg);
                let data = msg;

                const dataAry = new Uint8Array(data);
                let sdlPsm = SdlPsm.parseChunk(dataAry);
                let {
                    // state,
                    version,
                    sessionId,
                    messageId,
                    // dataLength,
                    // compression,
                    // frameType,
                    serviceType,
                    // controlFrameInfo,
                    // messageId,
                    // dataStart,
                    // states,
                    // function_id,
                    // jsonData,
                    frames,
                } = sdlPsm;
                // console.log(`doRpc`,`received message`,{serviceType},requestJSON.method);

                if (sdlPsm.isFinished) {
                    sdlPsm.initData();
                }

                if (serviceType === SdlPsm.SERVICE_TYPE_RPC) {
                    //TODO return rpc data with easy to read function_id -> Functionname.
                    let { jsonData, function_id, correlation_id } = frames[0];

                    // console.log(`doRpc received message`,{jsonData,requestJSON});

                    let method = SdlPsm.getFunctionById(function_id);

                    //GetVehicleData
                    if (method === requestJSON.method) {

                        let response = {
                            method,
                            functionId: function_id,
                            version,
                            sessionId,
                            messageId,
                            correlationId: correlation_id,
                            // params: jsonData,
                            parameters: jsonData,

                        };

                        coreWs.removeListener('message', listener);

                        resolve({
                                    response
                                });

                    }
                }
            };

            coreWs.on('message', listener);

            coreWs.send(data);

        });

    }

}

module.exports = RemoteControlApp;
