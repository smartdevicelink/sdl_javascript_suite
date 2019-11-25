
import { SdlProtocolBase } from './../../../js/src/protocol/SdlProtocolBase.js';
import { WebsocketClientTransportManager } from './../transport/WebsocketClientTransportManager';


class SdlProtocol extends SdlProtocolBase {
    /**
     * @param {TransportConfigBase} baseTransportConfig 
     * @param {SdlSessionListener} sdlSessionListener 
     */
    constructor (baseTransportConfig, sdlSessionListener) {
        super(baseTransportConfig, sdlSessionListener);
    }

    _createTransportManager() {
        this._transportManager =  new WebsocketClientTransportManager(this._transportConfig, this._transportListener);
    }
}

export { SdlProtocol };