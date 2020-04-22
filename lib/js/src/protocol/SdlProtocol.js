
import { _SdlProtocolBase } from './_SdlProtocolBase.js';
import { _TransportManager } from './../transport/_TransportManager.js';


class SdlProtocol extends _SdlProtocolBase {
    /**
     * Initializes an instance of SdlProtocol.
     * @class
     * @param {_TransportConfigBase} baseTransportConfig - A TransportConfig instance.
     * @param {SdlProtocolListener} sdlProtocolListener - An SdlProtocolListener instance.
     */
    constructor (baseTransportConfig, sdlProtocolListener) {
        super(baseTransportConfig, sdlProtocolListener);
        this.setTransportManager(new _TransportManager(this._transportConfig, this._transportListener));
    }
}

export { SdlProtocol };