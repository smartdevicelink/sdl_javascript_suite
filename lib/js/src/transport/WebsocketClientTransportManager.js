import { TransportType } from './enums/TransportType.js';
import { TransportManagerBase } from './TransportManagerBase.js';
import { SdlPsm } from './SdlPsm.js';

class WebsocketClientTransportManager extends TransportManagerBase
{
    constructor (config, transportListener) {
        super(config,transportListener);
        this._config = config;
        this._transportListener = transportListener;
        this._queue = [];
        this._isRunning = false;

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

        self._queue.push(msg.data);

        new Response(msg.data).arrayBuffer().then((arrayBuffer) => {
            let uint8 = new Uint8Array(arrayBuffer);
        }); 

        self._multiByteHandler();
    }

    _multiByteHandler () {
        const self = this;
        if (this._isRunning) return;
        this._isRunning = true;

        while (this._queue.length > 0) {
            const msgData = this._queue.shift();
            new Response(msgData).arrayBuffer().then((arrayBuffer) => {
                let uint8 = new Uint8Array(arrayBuffer);
                for (let byte of uint8) {
                    self._handleByte(byte);
                }
            });  
        }

        this._isRunning = false;
    }

    _handleByte (byte) {
        const self = this;
        const sdlPsm = self._sdlPsm;

        let success = sdlPsm.handleByte(byte);
        if (!success) {
            console.error(`failed`,sdlPsm);
            sdlPsm.reset();
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