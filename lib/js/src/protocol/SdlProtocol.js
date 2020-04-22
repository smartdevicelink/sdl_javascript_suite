
import { _SdlProtocolBase } from './_SdlProtocolBase.js';
import { TransportManager } from './../transport/TransportManager.js';


class SdlProtocol extends _SdlProtocolBase {
    /**
     * Initializes an instance of SdlProtocol.
     * @class
     * @param {_TransportConfigBase} baseTransportConfig - A TransportConfig instance.
     * @param {SdlProtocolListener} sdlProtocolListener - An SdlProtocolListener instance.
     */
    constructor (baseTransportConfig, sdlProtocolListener) {
        super(baseTransportConfig, sdlProtocolListener);
        this.setTransportManager(new TransportManager(this._transportConfig, this._transportListener));
    }
}

export { SdlProtocol };