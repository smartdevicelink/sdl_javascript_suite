import SDL from '../../../lib/js/dist/SDL.js';

//import everything
const LifecycleManager = SDL.manager.lifecycle.LifecycleManager;
const BinaryFrameHeader = SDL.protocol.BinaryFrameHeader;
const MessageFrameAssembler = SDL.protocol.MessageFrameAssembler;
const MessageFrameDisassembler = SDL.protocol.MessageFrameDisassembler;
const SdlPacket = SDL.protocol.SdlPacket;
const SdlPacketFactory = SDL.protocol.SdlPacketFactory;
const SdlProtocolBase = SDL.protocol.SdlProtocolBase;
const SdlProtocolListener = SDL.protocol.SdlProtocolListener;
const ControlFrameTags = SDL.protocol.enums.ControlFrameTags;
const FrameType = SDL.protocol.enums.FrameType;
const ServiceType = SDL.protocol.enums.ServiceType;
const RpcMessage = SDL.rpc.RpcMessage;
const RpcNotification = SDL.rpc.RpcNotification;
const RpcRequest = SDL.rpc.RpcRequest;
const RpcResponse = SDL.rpc.RpcResponse;
const RpcStruct = SDL.rpc.RpcStruct;
const AppHMIType = SDL.rpc.enums.AppHMIType;
const AudioStreamingState = SDL.rpc.enums.AudioStreamingState;
const AudioType = SDL.rpc.enums.AudioType;
const BitsPerSample = SDL.rpc.enums.BitsPerSample;
const ButtonName = SDL.rpc.enums.ButtonName;
const CharacterSet = SDL.rpc.enums.CharacterSet;
const DisplayType = SDL.rpc.enums.DisplayType;
const FileType = SDL.rpc.enums.FileType;
const FunctionID = SDL.rpc.enums.FunctionID;
const HMILevel = SDL.rpc.enums.HMILevel;
const HmiZoneCapabilities = SDL.rpc.enums.HmiZoneCapabilities;
const ImageFieldName = SDL.rpc.enums.ImageFieldName;
const ImageType = SDL.rpc.enums.ImageType;
const Language = SDL.rpc.enums.Language;
const MediaClockFormat = SDL.rpc.enums.MediaClockFormat;
const MetadataType = SDL.rpc.enums.MetadataType;
const PrerecordedSpeech = SDL.rpc.enums.PrerecordedSpeech;
const Result = SDL.rpc.enums.Result;
const RpcType = SDL.rpc.enums.RpcType;
const SamplingRate = SDL.rpc.enums.SamplingRate;
const SoftButtonType = SDL.rpc.enums.SoftButtonType;
const SpeechCapabilities = SDL.rpc.enums.SpeechCapabilities;
const SystemAction = SDL.rpc.enums.SystemAction;
const SystemContext = SDL.rpc.enums.SystemContext;
const TextAlignment = SDL.rpc.enums.TextAlignment;
const TextFieldName = SDL.rpc.enums.TextFieldName;
const VideoStreamingState = SDL.rpc.enums.VideoStreamingState;
const VrCapabilities = SDL.rpc.enums.VrCapabilities;
const AddCommand = SDL.rpc.messages.AddCommand;
const AddCommandResponse = SDL.rpc.messages.AddCommandResponse;
const OnHmiStatus = SDL.rpc.messages.OnHmiStatus;
const OnLanguageChange = SDL.rpc.messages.OnLanguageChange;
const PutFile = SDL.rpc.messages.PutFile;
const PutFileResponse = SDL.rpc.messages.PutFileResponse;
const RegisterAppInterface = SDL.rpc.messages.RegisterAppInterface;
const RegisterAppInterfaceResponse = SDL.rpc.messages.RegisterAppInterfaceResponse;
const SetAppIcon = SDL.rpc.messages.SetAppIcon;
const SetAppIconResponse = SDL.rpc.messages.SetAppIconResponse;
const Show = SDL.rpc.messages.Show;
const ShowResponse = SDL.rpc.messages.ShowResponse;
const AppInfo = SDL.rpc.structs.AppInfo;
const AudioPassThruCapabilities = SDL.rpc.structs.AudioPassThruCapabilities;
const ButtonCapabilities = SDL.rpc.structs.ButtonCapabilities;
const DeviceInfo = SDL.rpc.structs.DeviceInfo;
const DisplayCapabilities = SDL.rpc.structs.DisplayCapabilities;
const Grid = SDL.rpc.structs.Grid;
const HMICapabilities = SDL.rpc.structs.HMICapabilities;
const Image = SDL.rpc.structs.Image;
const ImageField = SDL.rpc.structs.ImageField;
const ImageResolution = SDL.rpc.structs.ImageResolution;
const MenuParams = SDL.rpc.structs.MenuParams;
const MetadataTags = SDL.rpc.structs.MetadataTags;
const ModuleInfo = SDL.rpc.structs.ModuleInfo;
const PresetBankCapabilities = SDL.rpc.structs.PresetBankCapabilities;
const RGBColor = SDL.rpc.structs.RGBColor;
const ScreenParams = SDL.rpc.structs.ScreenParams;
const SdlMsgVersion = SDL.rpc.structs.SdlMsgVersion;
const SoftButton = SDL.rpc.structs.SoftButton;
const SoftButtonCapabilities = SDL.rpc.structs.SoftButtonCapabilities;
const TTSChunk = SDL.rpc.structs.TTSChunk;
const TemplateColorScheme = SDL.rpc.structs.TemplateColorScheme;
const TextField = SDL.rpc.structs.TextField;
const TouchEventCapabilities = SDL.rpc.structs.TouchEventCapabilities;
const VehicleType = SDL.rpc.structs.VehicleType;
const SdlServiceListener = SDL.session.SdlServiceListener;
const SdlSession = SDL.session.SdlSession;
const SdlSessionListener = SDL.session.SdlSessionListener;
const ServiceListenerMap = SDL.session.ServiceListenerMap;
const SdlPsm = SDL.transport.SdlPsm;
const SslConfig = SDL.transport.SslConfig;
const TransportBase = SDL.transport.TransportBase;
const TransportConfigBase = SDL.transport.TransportConfigBase;
const TransportListener = SDL.transport.TransportListener;
const TransportManagerBase = SDL.transport.TransportManagerBase;
const TransportType = SDL.transport.enums.TransportType;
const BitConverter = SDL.util.BitConverter;
const Bson = SDL.util.Bson;
const Enum = SDL.util.Enum;
const JsonRpcMarshaller = SDL.util.JsonRpcMarshaller;
const TextEncoder = SDL.util.TextEncoder;
const Version = SDL.util.Version;


const appID = (`${Math.floor(Date.now() / 1000)}`).substr(7);
const appConfig = {
    'appName': appID,
    appID,
    'fullAppID':appID,
    'appHMIType': [
        'DEFAULT',
        'MEDIA',
    ],
    'hmiDisplayLanguageDesired': 'EN-US', 
    'isMediaApplication': false,
    'languageDesired': 'EN-US',
    'syncMsgVersion': { 
        'majorVersion': 3,
        'minorVersion': 1,
        'patchVersion': 0,
    },
};
let maxCorrelationId = 0;
let hashID;
let sessionID;
let sdlSession;
const baseTransportConfig = {
    port: 8888
};
const sendRPCJson = async function (
    data
) {
    const { method, params, bulkData, } = data;
    const id = ++maxCorrelationId;
    // https://stackoverflow.com/questions/9546437/how-send-arraybuffer-as-binary-via-websocket
    const rpcMessage = new RpcMessage(
        {
            functionName: method,
            parameters: params,
            rpcType: RpcType.REQUEST,
            correlationId: id, //
        }
    );
    // bulk data is blob.
    if (bulkData) {
        rpcMessage.setBulkData(bulkData);
    }
    const result = await sendRPC(rpcMessage);
    console.log('sendRPC result', result);
    const result2 = {
        method: result.getFunctionName(),
        params: result.getParameters(),
        bulkData: result.getBulkData(),
    };
    console.log('sendRPC result', result2);
    return result2;
};
const sendRPC = async function (rpcMessage) {
    return new Promise((resolve) => {
        const correlationId = rpcMessage.getCorrelationId();
        rpcListeners.push((rpcMessage) => {
            const responsCorrelationId = rpcMessage.getCorrelationId();
            if (responsCorrelationId === correlationId) {
                return resolve(rpcMessage);
            }
        });
        sdlSession.sendRpc(rpcMessage);
    });
};
const rpcListeners = [];
const registerApp = async function () {
    // let {method,params,bulkData} = 
    const result = await sendRPCJson(
        {
            method: 'RegisterAppInterface',
            params: appConfig,
        }
    );
    console.log('app registered response', { result, });
    // hashID = session.getSessionId();
    // console.log(`hashID++++++++++++++++
    // ${hashID}
    // 
    // 
    // `)
    // console.log(`app registered response`, {method,params,bulkData})
};
let listener = {
    onProtocolSessionEnded () {
        console.error('protocol session ended ACk');
    },
    onProtocolSessionEndedNACKed () {
        console.error('protocol session ended NACK');
        // process.exit(1);
    },
    async onProtocolSessionStarted (session) {
        console.log('session started', session);
        await registerApp();
        // RAI request
        // sdlSession.sendRpc(rpcMessage) 
        // {
        // this._sdlProtocol.sendRpc(rpcMessage);
        // }    
    },
    async onRpcMessageReceived (rpcMessage) {
        for (listener of rpcListeners) {
            listener(rpcMessage);
        }
        // console.log(`app listener onRpcMessageReceived`,rpcMessage);
        const functionName = rpcMessage.getFunctionName();
        const parameters = rpcMessage.getParameters();
        if (functionName === 'OnHMIStatus') {
            OnHMIStatus(parameters);
        }
    },
};
async function OnHMIStatus (parameters) {
    console.log('handleHmi', { parameters, });
    const { hmiLevel, } = parameters;
    if (hmiLevel === 'FULL') {
        return OnHmiFull();
    }
}
async function OnHmiFull () {
    console.log(`send show message
    ++++++++++++++++++++++
    `);
    const rpcResponse = await sendRPCJson(
        {
            'method': 'Show',
            'params': {
                'mainField1': 'こんにちは',
                'mainField2': '你好 ( ni hao / nĭ hăo )',
                'mainField3': '@#$#%$^^%&**&(_     !@#$@#$~~~```',
            },
        }
    );
    console.log('show message response', rpcResponse);
    // get/put/delete
    await putGetDeleteImage();
    setTimeout(async function () {
        const requestJson = {
            method: 'UnregisterAppInterface',
        };
        const result = await sendRPCJson(requestJson);
        console.log('UnregisterAppInterface response', result);
        // unregister and close session.
        console.log('closing session');
        sdlSession.close();
    }, 1000);
}
const putGetDeleteImage = async function () {
    const fileBinary = new Uint8Array([1, 2, 3, ]);
    try {
        const fileName = `${Date.now()}`;
        const fileType = 'GRAPHIC_JPEG';
        const result = await sendRPCJson({
            method: 'PutFile',
            params: {
                syncFileName: fileName,
                // fileType: 'GRAPHIC_PNG',
                fileType,
                persistentFile: true,
            },
            bulkData: fileBinary, // unit8 array
        });
        // <element name="GRAPHIC_BMP" />
        // <element name="GRAPHIC_JPEG" />
        // <element name="GRAPHIC_PNG" />
        // <element name="AUDIO_WAVE" />
        // <element name="AUDIO_MP3" />
        // <element name="AUDIO_AAC" />
        // <element name="BINARY" />
        // <element name="JSON" />
        const resultGetFile = await sendRPCJson({
            method: 'GetFile',
            params: {
                fileName,
                fileType,
                persistentFile: true,
            },
        });
        // let data = resultGetFile.bulkData;
        console.log('GetFile', { resultGetFile, });
        // var blob = new Blob( [ data ], { type: "image/jpeg" } );
        // var blob = new Blob( resultGetFile.bulkData , { type: "image/jpeg" } );
        // var imageUrl = URL.createObjectURL( blob );
        // this.setState({displayImage:imageUrl})
        // console.log(`putGetImage`,resultGetFile,{imageUrl});
        // let base64 = this.base
        const resultDeleteFile = await sendRPCJson({
            method: 'DeleteFile',
            params: {
                syncFileName: fileName,
                fileType,
                persistentFile: true,
            },
        });
        // console.log(`putGetImage delete`,{resultDeleteFile});
        // TODO await response.
        // TODO correlationID or messageID?
    } catch (e) {
        console.error(e);
    }
};

// Create websocket transport manager.

class TransportManagerWs extends TransportManagerBase {
    constructor(baseTransportConfig, transportListener) {
        super(baseTransportConfig, transportListener);
        this._socket = null;
        this._isConnected = false;
    }

    start() {
        this._socket = new WebSocket('ws://localhost:' + this._transportConfig.port);

        this._socket.onopen = function (event) {
            this._isConnected = true;
        };

        this._socket.onmessage = async function (event) {
            console.log(await event.data.text());
        };

        this._socket.onerror = function () {
            this._isConnected = false;
        }

    }

    stop() {
        if (this._socket) {
            this._socket.close();
            this._isConnected = false;
        }
    }

    sendPacket(sdlPacket) {
        if (this._socket) {
            if (this._socket.readyState === WebSocket.OPEN) {
                this._socket.send(sdlPacket.toUint8Array());
            }
        }
    }

    isConnected (transportType, address) {
        return this._isConnected;
    }
}

const tmWs = new TransportManagerWs({port: 8888}, new TransportListener());
tmWs.start();

/*
// extend SdlSession to use SdlProtocolWs
class SdlSessionWs extends SdlSession {
    constructor (baseTransportConfig, sdlSessionListener) {
        super();
        this._sessionId = null;
        this._sessionHashId = null;
        this._sdlSessionListener = sdlSessionListener;
        this._baseTransportConfig = baseTransportConfig;

        // a hash where each key is a service type, and has an array of listeners attached
        this._serviceListeners = new ServiceListenerMap();

        const sdlProtocolListener = this._setupSdlProtocolListener();
        this._sdlProtocol = new SdlProtocolWs(baseTransportConfig, sdlProtocolListener);
    }
}

// extend SdlProtocolBase for a websocket client
class SdlProtocolWs extends SdlProtocolBase {
    constructor (baseTransportConfig, sdlSessionListener) {
        super();
        
    }
}



sdlSession = new SdlSessionWs(baseTransportConfig, listener);
// // const testing = new SdlServiceListener();
// let testing = {};
// testing.onServiceStarted = () => {
//     console.log("1");
//     console.log(`++++++++++++++++++++
//     `)
// };
// testing.onServiceEnded = () => {console.log("2")};
// testing.onServiceError = () => {console.log("3")};
sdlSession.start();
// sdlSession.addServiceListener(ServiceType.RPC,testing);
sdlSession.startService(ServiceType.RPC, 0x00, false);

*/