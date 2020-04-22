
import { _SdlProtocolBase } from './_SdlProtocolBase.js';
import { TransportManager } from './../transport/TransportManager.js';


class _SdlProtocol extends _SdlProtocolBase {
    /**
     * Initializes an instance of _SdlProtocol.
     * @class
     * @param {_TransportConfigBase} baseTransportConfig - A TransportConfig instance.
     * @param {_SdlProtocolListener} sdlProtocolListener - An _SdlProtocolListener instance.
     */
    constructor (baseTransportConfig, sdlProtocolListener) {
        super(baseTransportConfig, sdlProtocolListener);
        this.setTransportManager(new TransportManager(this._transportConfig, this._transportListener));
    }
}

export { _SdlProtocol };