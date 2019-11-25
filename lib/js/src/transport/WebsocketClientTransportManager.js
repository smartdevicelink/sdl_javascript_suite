import { TransportType } from './enums/TransportType.js';
import { TransportManagerBase } from './TransportManagerBase.js';
import { SdlPsm } from './SdlPsm.js';

class WebsocketClientTransportManager extends TransportManagerBase
{
    constructor (config, transportListener) {
        super(config,transportListener);
        this._config = config;
        this._transportListener = transportListener;

        if (config.getTransportType() === TransportType.WEBSOCKET_CLIENT) {
            this.wsUrl = config.getHost() + ':' + config.getPort();
        }

        this._sdlPsm = new SdlPsm();
    }


    start () {
        this.init();
    }

    init () {
        const self = this;
        this.ws  = new WebSocket(this.wsUrl);

        this.ws.onopen = function() {
            self._transportListener.onTransportConnected();
        };

        this.ws.onerror = function(error) {
            console.error(`Failed to connect`,error);
        };
        this._initIncomingDataHandler();
    }


    sendPacket (packet) {
        let bytes = packet.toPacket();
        this.ws.send(bytes);
    }


    _initIncomingDataHandler () {
        const self = this;
        self.ws.addEventListener('message', (msg) => {
            self._handleIncoming(msg);
        });
    }

    _handleIncoming (msg) {
        const self = this;
        new Response(msg.data).arrayBuffer().then((arrayBuffer) => {
            let uint8 = new Uint8Array(arrayBuffer);
            for (let byte of uint8) {
                self._handleByte(byte);
            }
        });  

    }

    _handleByte (byte) {
        const self = this;
        const sdlPsm = self._sdlPsm;

        let success = sdlPsm.handleByte(byte);
        if (!success) {
            console.error(`failed`,sdlPsm);
        }
        let isFinished = sdlPsm.getState() === SdlPsm.FINISHED_STATE;

        if (isFinished) {
            const packet = sdlPsm.getFormedPacket();
            sdlPsm.reset();
            self.onPacketReceived(packet);
        }
    }
}


export { WebsocketClientTransportManager };