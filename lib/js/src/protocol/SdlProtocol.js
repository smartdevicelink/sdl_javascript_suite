
import { SdlProtocolBase } from './SdlProtocolBase.js';
import { TransportManager } from './../transport/TransportManager.js';


class SdlProtocol extends SdlProtocolBase {
    /**
     * @param {TransportConfigBase} baseTransportConfig
     * @param {SdlProtocolListener} sdlProtocolListener
     */
    constructor (baseTransportConfig, sdlProtocolListener) {
        super(baseTransportConfig, sdlProtocolListener);
        this.setTransportManager(new TransportManager(this._transportConfig, this._transportListener));
    }
}

export { SdlProtocol };