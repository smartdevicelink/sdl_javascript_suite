
const SdlPsm = require('./lib/SdlPsm');

/**
 * Proxy session.
 *
 *
 * TODO very basic manager for the app to allow initialize and listen to port connection.
 *
 *
 */

class RemoteControlApp {

    //TODO accept requests.
    constructor(opts) {
        this.appId = opts.appId + "";
        this.sessionId = null;
        this.messageId = 0;

        this.coreWs = opts.coreWs;

        // this.baseUrl =


        this.requestHistory = [];
    }

    // updateSessionId(id)
    // {
    //     this.sessionId = id;
    // }

    getNextMessageId() {
        this.messageId++;
        return this.messageId;
    }

    static async create(opts) {
        let obj = new RussWsApp(opts);
        await obj.init();

        return obj;
    }

    async getSessionInfo() {
        let {
            sessionId,
            hmiStatus
        } = this;

        // let { hmiLevel } = hmiStatus;

        return {
            sessionId,
            hmiStatus,
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
            let fullString = SdlPsm.uint8arrayToStringMethod(dataAry);

            console.log(`received message from core`);
            console.log(fullString);
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



    async sendInitRequest()
    {
        let self = this;

        let connectionRequest = SdlPsm.INIT_REQUEST;


        // 65782 INFO  [17:33:13,541][ProtocolHandler] Processing incoming data of size 40 for connection 356
        // 65783 WARN  [17:33:13,541][ProtocolHandler] Unknown version:1
        // 65784 WARN  [17:33:13,541][ProtocolHandler] Unknown version:1
        // 65785 INFO  [17:33:13,541][ProtocolHandler] Created and passed 1 packets
        // 65786 WARN  [17:33:13,541][ConnectionHandler] Connection not found !
        // 65787 INFO  [17:33:13,542][ProtocolHandler] StartSession ID 0 and Connection ID 356
        // 65788 WARN  [17:33:13,542][ConnectionHandler] Session not found in this connection!
        // 65789 INFO  [17:33:13,542][ProtocolHandler] Protocol Version String 5.2.0

        //  protocolVersion5.2.0
        self.coreWs.send(connectionRequest);
        return new Promise((r) => {
            self.coreWs.on('message', async function(data) {
                console.log(`sendInitRequest received response`)
                // await self.handleCoreData(data);

                return r();
            });
        })

    }


    async initApp()
    {
        let self = this;
        console.log(`initializeApp`);
        await this.sendInitRequest(); //protocolVersion5.2.0 and wait for response.


        console.log(`connection initialized`);


        {/*<element name="COMMUNICATION" />*/}
        {/*<element name="MEDIA" />*/}
        {/*<element name="MESSAGING" />*/}
        {/*<element name="NAVIGATION" />*/}
        {/*<element name="INFORMATION" />*/}
        {/*<element name="SOCIAL" />*/}
        {/*<element name="BACKGROUND_PROCESS" />*/}
        {/*<element name="TESTING" />*/}
        {/*<element name="SYSTEM" />*/}
        {/*<element name="PROJECTION" />*/}
        {/*<element name="REMOTE_CONTROL" />*/}
        // let appId = "" + Date.now();
        let appId = this.appId;
        let ngnMediaScreenAppName = appId;
        let appName = appId;
        let appRequest = {
            "method": "RegisterAppInterface",
            "params": {
                "fullAppID": appId,
                "hmiDisplayLanguageDesired": "EN-US",
                "ngnMediaScreenAppName": ngnMediaScreenAppName,
                "appID": appId,
                "isMediaApplication": false,
                "vrSynonyms": [
                    "BOCKS"
                ],
                "appHMIType": [
                    "DEFAULT",
                    "MEDIA",
                    "REMOTE_CONTROL"
                ],
                "appName": appName,
                "languageDesired": "EN-US",
                "syncMsgVersion": {
                    "majorVersion": 5,
                    "minorVersion": 1,
                    "patchVersion": 0
                }
            }
        };

        let result = await this.doRpc(appRequest);
        console.log(`initializeApp - RegisterAppInterface`,result)

    }

    async doRpc(requestJSON,buffer) {
        console.log(`BocksSession doRpc`, requestJSON);
        let coreWs = this.coreWs;
        let self = this;
        let originalMessageId = this.getNextMessageId();
        let sessionId = this.sessionId;

        if (!requestJSON || !requestJSON.method) {
            console.error(`doRpc invalid`, requestJSON);
            return {};
        }

        let data = SdlPsm.buildRPC({
                                       messageId: originalMessageId,
                                       sessionId,
                                       requestJSON,
                                       buffer
                                   });

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

                if (sdlPsm.isFinished)
                {
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

            // console.log(`sending ${requestJSON.method}`);
            // console.log(SdlPsm.uint8arrayToStringMethod(data));
            //handle
            coreWs.on('message', listener);

            coreWs.send(data);

        });

    }

}

module.exports = RemoteControlApp;
