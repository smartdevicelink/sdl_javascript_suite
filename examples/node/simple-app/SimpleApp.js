// const SdlPsm = require('./lib/SdlPsm');

const { SdlManagerNode, SdlPsm } = require('sdl-node');

/**
 * Proxy session.
 *
 *
 * TODO very basic manager for the app to allow initialize and listen to port connection.
 *
 *
 */

class SimpleApp {

    /**
     * Using a new websocket connection create an app.
     * @param connection
     * @returns {Promise<void>}
     */
    static async createApp(connection) {
        let obj = new SimpleApp();
        obj.connection = connection;
        await obj.init();

        return obj;

    }

    async init() {
        let self = this;

        console.log(`get manager`);
        self.manager = await SdlManagerNode.createWsManager(self.connection, self.appConfig);
        console.log(`got manager`);

        self.HMI_LEVEL = null;

        self.manager.on(
            'OnHMIStatus', function(rpcResponse) {
                let params = rpcResponse.getParameters();
                console.log(`OnHMIStatus`, JSON.stringify(params));

                //no hmi level change FULL {"audioStreamingState":"NOT_AUDIBLE","hmiLevel":"FULL","systemContext":"ALERT","videoStreamingState":"NOT_STREAMABLE"}
                //no hmi level change FULL {"audioStreamingState":"NOT_AUDIBLE","hmiLevel":"FULL","systemContext":"MAIN","videoStreamingState":"NOT_STREAMABLE"}
                if (self.HMI_LEVEL === params.hmiLevel) {
                    console.log(`no hmi level change`, self.HMI_LEVEL);
                } else {
                    console.log(`new hmi level`, params.hmiLevel);
                    self.HMI_LEVEL = params.hmiLevel;
                    if (params.hmiLevel === 'FULL') {
                        self.isInFocus = true;
                        self.initAppInFocus();
                    }
                }
            }
        );

    }

    async testPerformInteraction()
    {
        let self = this;
        let createInteractionChoiceSetParams = {
            interactionChoiceSetID: 1, //simple yes/no
            choiceSet: [
                {
                    choiceID: 1,
                    menuName: "Yes"
                },
                {
                    choiceID: 2,
                    menuName: "No"
                }
            ]
        };

        let createInteractionChoiceSetResponse = await self.manager.sendRPCJson(
            `CreateInteractionChoiceSet`,
            createInteractionChoiceSetParams
        );

        console.log(`createInteractionChoiceSetResponse ${JSON.stringify(createInteractionChoiceSetResponse.getParameters())}`);


        let performInteractionParams = {
            'initialText': `Do you like this example?`,
            helpPrompt: [{
                text: `help?`,
                type: "TEXT",
            }],
            initialPrompt: [{
                text: `Do you like this example?`,
                type: "TEXT",
            }],
            interactionMode: "MANUAL_ONLY",
            interactionChoiceSetIDList: [
                1
            ]
        };


        let performInteractionResponse = await self.manager.sendRPCJson(
            `PerformInteraction`,
            performInteractionParams
        );

        console.log(`performInteractionResponse ${JSON.stringify(performInteractionResponse.getParameters())}`);
    }

    async initAppInFocus() {
        let self = this;
        if (!this.isInFocus) {
            return;
        }

        console.log(`GetVehicleData`);
        let rpcResponse = await self.manager.sendRPCJson(`GetVehicleData`,
                                                         { 'speed': true });

        console.log(`GetVehicleData Response`, rpcResponse);

        let params = rpcResponse.getParameters();
        console.log(`get vehicle data speed:`, params.speed);


        // await this.testPerformInteraction();

        let alertParameters = {
            'alertText1': `Your current speed is ${params.speed}`
        };


        console.log(`Alert`, alertParameters);

        let alertResponse = await self.manager.sendRPCJson(
            `Alert`,
            alertParameters
        );

    }

    get appConfig() {
        return {
            appName: '1',
            appID: '1'
        };
    }

}

module.exports = SimpleApp;
