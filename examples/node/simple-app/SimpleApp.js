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

        this.connectedAddress = connectedAddress;


        console.log(`get manager`);
        this.manager = await SdlManagerNode.createWsManager(connection,obj.appConfig);
        console.log(`got manager`, this.manager);


        this.manager.on(
            'OnHmiStatus',function(data)
            {
                console.log(`new hmi status`);


            }
        );


        let result = await this.manager.sendRPCJson(`GetVehicleData`,
                                 {"speed": true});


        console.log(`get vehicle data result`,result);

        /**
         *
         */
        setInterval(async function() {

            let result = await this.manager.sendRPCJson(`GetVehicleData`,
                                                        {"speed": true});

            console.log(`get vehicle data result`,result);


        },1000);



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
