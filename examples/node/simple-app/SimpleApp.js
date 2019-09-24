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

        this.manager = await SdlManagerNode.createWsManager(connection,obj.appConfig)



    }


    get appConfig()
    {
        return {
            appName: 'Simple',
            appID: 'liviosimple'
        }
    }

}

module.exports = SimpleApp;
