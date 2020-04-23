
import { _SdlProtocolBase } from './_SdlProtocolBase.js';
import { _TransportManager } from './../transport/_TransportManager.js';


class _SdlProtocol extends _SdlProtocolBase {
    /**
     * Initializes an instance of _SdlProtocol.
     * @class
     * @private
     * @param {_TransportConfigBase} baseTransportConfig - A TransportConfig instance.
     * @param {_SdlProtocolListener} sdlProtocolListener - An _SdlProtocolListener instance.
     */
    constructor (baseTransportConfig, sdlProtocolListener) {
        super(baseTransportConfig, sdlProtocolListener);
        this.setTransportManager(new _TransportManager(this._transportConfig, this._transportListener));
    }
}

export { _SdlProtocol };