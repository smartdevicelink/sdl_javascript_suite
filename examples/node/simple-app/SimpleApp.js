// const SdlPsm = require('./lib/SdlPsm');

const {SdlManagerNode,SdlPsm} = require('sdl-node');


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
    static async createApp(connection)
    {
        let obj = new SimpleApp();

        let connectedAddress = connection.remoteAddress;

        console.log(`connectedAddress`,connectedAddress);

        obj.connectedAddress = connectedAddress;

        console.log(`get manager`);
        obj.manager = await SdlManagerNode.createWsManager(connection,obj.appConfig);
        console.log(`got manager`);


        obj.manager.on(
            'OnHMIStatus',function(rpcResponse)
            {
                let params = rpcResponse.getParameters();
                console.log(`new hmi status`,params.hmiLevel);

                if (params.hmiLevel === 'FULL')
                {
                    obj.isInFocus = true;
                    obj.initAppInFocus();
                }


            }
        );



        //
        // /**
        //  *
        //  */
        // setInterval(async function() {
        //
        //     let result = await self.manager.sendRPCJson(`GetVehicleData`,
        //                                                 {"speed": true});
        //
        //     console.log(`get vehicle data result`,result);
        //
        //
        // },1000);



    }

    async initAppInFocus()
    {
        let self = this;
        if (!this.isInFocus)
        {
            return;
        }

        console.log(`GetVehicleData`);
        let rpcResponse = await self.manager.sendRPCJson(`GetVehicleData`,
                                 {"speed": true});

        console.log(`GetVehicleData Response`,rpcResponse);

        let params = rpcResponse.getParameters();
        console.log(`get vehicle data speed:`,params.speed);

    }


    get appConfig()
    {
        return {
            appName: '1',
            appID: '1'
        }
    }

}

module.exports = SimpleApp;
