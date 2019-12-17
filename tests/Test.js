const SDL = require('./../lib/js/dist/SDL.js');

const SdlMsgVersion = SDL.rpc.structs.SdlMsgVersion;
const TTSChunk = SDL.rpc.structs.TTSChunk;

// structs
const DeviceInfo = SDL.rpc.structs.DeviceInfo;
const TemplateColorScheme = SDL.rpc.structs.TemplateColorScheme;
const RGBColor = SDL.rpc.structs.RGBColor;
const DisplayCapabilities = SDL.rpc.structs.DisplayCapabilities;
const PresetBankCapabilities = SDL.rpc.structs.PresetBankCapabilities;
const VehicleType = SDL.rpc.structs.VehicleType;
const AudioPassThruCapabilities =  SDL.rpc.structs.AudioPassThruCapabilities;
const ButtonCapabilities =  SDL.rpc.structs.ButtonCapabilities;
const ImageField =  SDL.rpc.structs.ImageField;
const ImageResolution =  SDL.rpc.structs.ImageResolution;
const ScreenParams = SDL.rpc.structs.ScreenParams;
const TextField = SDL.rpc.structs.TextField;
const TouchEventCapabilities = SDL.rpc.structs.TouchEventCapabilities;




// enums
const SpeechCapabilities = SDL.rpc.enums.SpeechCapabilities;
const AppHMIType = SDL.rpc.enums.AppHMIType;
const Language = SDL.rpc.enums.Language;
const ImageType = SDL.rpc.enums.ImageType;
const AudioType = SDL.rpc.enums.AudioType;
const BitsPerSample = SDL.rpc.enums.BitsPerSample;
const SamplingRate = SDL.rpc.enums.SamplingRate;
const ButtonName = SDL.rpc.enums.ButtonName;
const ImageFieldName = SDL.rpc.enums.ImageFieldName;
const FileType = SDL.rpc.enums.FileType;
const DisplayType = SDL.rpc.enums.DisplayType;
const MediaClockFormat = SDL.rpc.enums.MediaClockFormat;
const TextFieldName = SDL.rpc.enums.TextFieldName;
const CharacterSet = SDL.rpc.enums.CharacterSet;
const HmiZoneCapabilities =  SDL.rpc.enums.HmiZoneCapabilities;
const PrerecordedSpeech = SDL.rpc.enums.PrerecordedSpeech;
const VrCapabilities = SDL.rpc.enums.VrCapabilities;
const AudioStreamingState = SDL.rpc.enums.AudioStreamingState;
const VideoStreamingState = SDL.rpc.enums.VideoStreamingState;
const HMILevel = SDL.rpc.enums.HMILevel;
const SystemContext = SDL.rpc.enums.SystemContext;

class Test {
    constructor() {
    }
}


const NULL = Test.NULL = 'Value should be null.';
const MATCH = Test.MATCH = 'Values should match.';
const ARRAY = Test.ARRAY = 'Array values should match.';
const TRUE = Test.TRUE = 'Value should be true.';
const FALSE = Test.FALSE = 'Value should be false.';
const NOT_NULL = Test.NOT_NULL = 'Value should not be null.';
const JSON_FAIL = Test.JSON_FAIL = 'Json testing failed.';

//sdl_javascript_suite/lib/js/src/rpc/structs/SdlMsgVersion.js

const GENERAL_INT = Test.GENERAL_INT = 100;
const GENERAL_INTEGER = Test.GENERAL_INTEGER = 100;
const GENERAL_BOOLEAN = Test.GENERAL_BOOLEAN = true;
const GENERAL_STRING = Test.GENERAL_STRING = 'test';

const GENERAL_FILETYPE  = FileType.BINARY;

const GENERAL_SDLMSGVERSION = Test.GENERAL_SDLMSGVERSION = new SdlMsgVersion();
GENERAL_SDLMSGVERSION.setMajorVersion(GENERAL_INT);
GENERAL_SDLMSGVERSION.setMinorVersion(GENERAL_INT);

const GENERAL_IMAGERESOLUTION = new ImageResolution();
GENERAL_IMAGERESOLUTION.setResolutionHeight(GENERAL_INT);
GENERAL_IMAGERESOLUTION.setResolutionWidth(GENERAL_INT);

const GENERAL_TOUCHEVENTCAPABILITIES = new TouchEventCapabilities();
GENERAL_TOUCHEVENTCAPABILITIES.setDoublePressAvailable(GENERAL_BOOLEAN);
GENERAL_TOUCHEVENTCAPABILITIES.setMultiTouchAvailable(GENERAL_BOOLEAN);
GENERAL_TOUCHEVENTCAPABILITIES.setPressAvailable(GENERAL_BOOLEAN);

const GENERAL_SCREENPARAMS = new ScreenParams();
GENERAL_SCREENPARAMS.setResolution(GENERAL_IMAGERESOLUTION);
GENERAL_SCREENPARAMS.setTouchEventAvailable(GENERAL_TOUCHEVENTCAPABILITIES);


const JSON_SDLMSGVERSION = Test.JSON_SDLMSGVERSION = {
    [SdlMsgVersion.KEY_MAJOR_VERSION]: GENERAL_INT,
    [SdlMsgVersion.KEY_MINOR_VERSION]: GENERAL_INT,
};

const GENERAL_APP_ID = Test.GENERAL_APP_ID = '123e4567e8';
const GENERAL_FULL_APP_ID = Test.GENERAL_FULL_APP_ID = '123e4567-e89b-12d3-a456-426655440000';
const GENERAL_CHARACTERSET = CharacterSet.CID1SET;

const GENERAL_IMAGEFIELDNAME = ImageFieldName.graphic;

const GENERAL_FILETYPE_LIST = [
    GENERAL_FILETYPE
];



const GENERAL_IMAGEFIELD                     = new ImageField();
GENERAL_IMAGEFIELD.setImageResolution(GENERAL_IMAGERESOLUTION);
GENERAL_IMAGEFIELD.setImageFieldName(GENERAL_IMAGEFIELDNAME);
GENERAL_IMAGEFIELD.setImageTypeSupported(GENERAL_FILETYPE_LIST);



const GENERAL_IMAGETYPE = Test.GENERAL_IMAGETYPE = ImageType.DYNAMIC;
const GENERAL_LANGUAGE = Test.GENERAL_LANGUAGE = Language.EN_US;
const GENERAL_TTSCHUNK_LIST = Test.GENERAL_TTSCHUNK_LIST = [];
const GENERAL_STRING_LIST = Test.GENERAL_STRING_LIST = [
    'a',
    'b',
];
const GENERAL_INTEGER_LIST = Test.GENERAL_INTEGER_LIST = [
    -1,
    -2,
];
const GENERAL_APPHMITYPE_LIST = Test.GENERAL_APPHMITYPE_LIST = [
    AppHMIType.BACKGROUND_PROCESS,
    AppHMIType.COMMUNICATION,
];
const GENERAL_DEVICEINFO = Test.GENERAL_DEVICEINFO = new DeviceInfo();
const GENERAL_DAYCOLORSCHEME = Test.GENERAL_DAYCOLORSCHEME = new TemplateColorScheme();
const GENERAL_NIGHTCOLORSCHEME = Test.GENERAL_NIGHTCOLORSCHEME = new TemplateColorScheme();
const GENERAL_RGBCOLOR = Test.GENERAL_RGBCOLOR = new RGBColor();

GENERAL_RGBCOLOR.setRedValue(GENERAL_INTEGER);
GENERAL_RGBCOLOR.setGreenValue(GENERAL_INTEGER);
GENERAL_RGBCOLOR.setBlueValue(GENERAL_INTEGER);

GENERAL_NIGHTCOLORSCHEME.setPrimaryColor(GENERAL_RGBCOLOR);
GENERAL_NIGHTCOLORSCHEME.setSecondaryColor(GENERAL_RGBCOLOR);
GENERAL_NIGHTCOLORSCHEME.setBackgroundColor(GENERAL_RGBCOLOR);

GENERAL_DAYCOLORSCHEME.setPrimaryColor(GENERAL_RGBCOLOR);
GENERAL_DAYCOLORSCHEME.setSecondaryColor(GENERAL_RGBCOLOR);
GENERAL_DAYCOLORSCHEME.setBackgroundColor(GENERAL_RGBCOLOR);


const JSON_RGBCOLOR = Test.JSON_RGBCOLOR = {
    [RGBColor.KEY_RED]: GENERAL_INT,
    [RGBColor.KEY_GREEN]: GENERAL_INT,
    [RGBColor.KEY_BLUE]: GENERAL_INT,
};

const JSON_DAYCOLORSCHEME = Test.JSON_DAYCOLORSCHEME = {
    [TemplateColorScheme.KEY_PRIMARY_COLOR]: JSON_RGBCOLOR,
    [TemplateColorScheme.KEY_SECONDARY_COLOR]: JSON_RGBCOLOR,
    [TemplateColorScheme.KEY_BACKGROUND_COLOR]: JSON_RGBCOLOR,
};

const JSON_NIGHTCOLORSCHEME = Test.JSON_NIGHTCOLORSCHEME = {
    [TemplateColorScheme.KEY_PRIMARY_COLOR]: JSON_RGBCOLOR,
    [TemplateColorScheme.KEY_SECONDARY_COLOR]: JSON_RGBCOLOR,
    [TemplateColorScheme.KEY_BACKGROUND_COLOR]: JSON_RGBCOLOR,
};



const JSON_DEVICEINFO = Test.JSON_DEVICEINFO = {
    [DeviceInfo.KEY_CARRIER]: GENERAL_STRING,
    [DeviceInfo.KEY_FIRMWARE_REV]: GENERAL_STRING,
    [DeviceInfo.KEY_HARDWARE]: GENERAL_STRING,
    [DeviceInfo.KEY_MAX_NUMBER_RFCOMM_PORTS]: GENERAL_INT,
    [DeviceInfo.KEY_OS]: GENERAL_STRING,
    [DeviceInfo.KEY_OS_VERSION]: GENERAL_STRING,
};


const JSON_TTSCHUNKS = Test.JSON_TTSCHUNKS = [
    {
        [TTSChunk.KEY_TEXT]: 'Welcome to the jungle',
        [TTSChunk.KEY_TYPE]: SpeechCapabilities.SC_TEXT,
    },
    {
        [TTSChunk.KEY_TEXT]: 'Say a command',
        [TTSChunk.KEY_TYPE]: SpeechCapabilities.SC_TEXT,
    },
];



const GENERAL_MEDIACLOCKFORMAT_LIST = [
    MediaClockFormat.CLOCK1,
    MediaClockFormat.CLOCK2
];

const GENERAL_TEXTFIELDNAME = TextFieldName.ETA;


const GENERAL_TEXTFIELD = new TextField();
GENERAL_TEXTFIELD.setTextFieldName(GENERAL_TEXTFIELDNAME);
GENERAL_TEXTFIELD.setRows(GENERAL_INT);
GENERAL_TEXTFIELD.setWidth(GENERAL_INT);
GENERAL_TEXTFIELD.setCharacterSet(GENERAL_CHARACTERSET);


const GENERAL_IMAGEFIELD_LIST = [
    GENERAL_IMAGEFIELD,
];

const GENERAL_TEXTFIELD_LIST = [
    GENERAL_TEXTFIELD,
];

const                 GENERAL_DISPLAYTYPE                    = DisplayType.CID;

const GENERAL_DISPLAYCAPABILITIES = Test.GENERAL_DISPLAYCAPABILITIES = new DisplayCapabilities();
GENERAL_DISPLAYCAPABILITIES.setDisplayType(GENERAL_DISPLAYTYPE);
GENERAL_DISPLAYCAPABILITIES.setDisplayName(GENERAL_STRING);
GENERAL_DISPLAYCAPABILITIES.setGraphicsSupported(GENERAL_BOOLEAN);
GENERAL_DISPLAYCAPABILITIES.setImageFields(GENERAL_IMAGEFIELD_LIST);
GENERAL_DISPLAYCAPABILITIES.setMediaClockFormats(GENERAL_MEDIACLOCKFORMAT_LIST);
GENERAL_DISPLAYCAPABILITIES.setNumCustomPresetsAvailable(GENERAL_INT);
GENERAL_DISPLAYCAPABILITIES.setScreenParams(GENERAL_SCREENPARAMS);
GENERAL_DISPLAYCAPABILITIES.setTemplatesAvailable(GENERAL_STRING_LIST);
GENERAL_DISPLAYCAPABILITIES.setTextFields(GENERAL_TEXTFIELD_LIST);



const GENERAL_PRESETBANKCAPABILITIES = Test.GENERAL_PRESETBANKCAPABILITIES = new PresetBankCapabilities();
const GENERAL_VEHICLETYPE = Test.GENERAL_VEHICLETYPE = new VehicleType();
GENERAL_VEHICLETYPE.setMake(GENERAL_STRING);
GENERAL_VEHICLETYPE.setModel(GENERAL_STRING);
GENERAL_VEHICLETYPE.setModelYear(GENERAL_STRING);
GENERAL_VEHICLETYPE.setTrim(GENERAL_STRING);

const GENERAL_AUDIOTYPE = AudioType.PCM;
const GENERAL_BITSPERSAMPLE = BitsPerSample.BitsPerSample_8_BIT;
const GENERAL_SAMPLINGRATE = SamplingRate.SamplingRate_8KHZ;

const GENERAL_AUDIOPASSTHRUCAPABILITIES = Test.GENERAL_AUDIOPASSTHRUCAPABILITIES = new AudioPassThruCapabilities();
GENERAL_AUDIOPASSTHRUCAPABILITIES.setAudioType(GENERAL_AUDIOTYPE);
GENERAL_AUDIOPASSTHRUCAPABILITIES.setBitsPerSample(GENERAL_BITSPERSAMPLE);
GENERAL_AUDIOPASSTHRUCAPABILITIES.setSamplingRate(GENERAL_SAMPLINGRATE);
const GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST = Test.GENERAL_AUDIOPASSTHRUCAPABILITIES_LIST = [
    GENERAL_AUDIOPASSTHRUCAPABILITIES,
];

const GENERAL_BUTTONCAPABILITIES = Test.GENERAL_BUTTONCAPABILITIES = new ButtonCapabilities(); 

GENERAL_BUTTONCAPABILITIES.setLongPressAvailable(false);
GENERAL_BUTTONCAPABILITIES.setShortPressAvailable(true);
GENERAL_BUTTONCAPABILITIES.setUpDownAvailable(true);
GENERAL_BUTTONCAPABILITIES.setName(ButtonName.SEEKRIGHT);

const GENERAL_BUTTONCAPABILITIES_LIST = Test.GENERAL_BUTTONCAPABILITIES_LIST = [
    GENERAL_BUTTONCAPABILITIES,
];


const GENERAL_HMIZONECAPABILITIES_LIST = Test.GENERAL_HMIZONECAPABILITIES_LIST = [
    HmiZoneCapabilities.BACK,
    HmiZoneCapabilities.FRONT,
];

const GENERAL_PRERECORDEDSPEECH_LIST = Test.GENERAL_PRERECORDEDSPEECH_LIST = [
    PrerecordedSpeech.HELP_JINGLE,
    PrerecordedSpeech.INITIAL_JINGLE,
];

const GENERAL_VRCAPABILITIES_LIST = Test.GENERAL_VRCAPABILITIES_LIST = [
    VrCapabilities.VR_TEXT
];

const GENERAL_SPEECHCAPABILITIES_LIST = Test.GENERAL_SPEECHCAPABILITIES_LIST = [
    SpeechCapabilities.SILENCE,
    SpeechCapabilities.SC_TEXT,
];

const GENERAL_AUDIOSTREAMINGSTATE = Test.GENERAL_AUDIOSTREAMINGSTATE = [
    AudioStreamingState.AUDIBLE,
    AudioStreamingState.ATTENUATED,
    AudioStreamingState.NOT_AUDIBLE,
];

const GENERAL_VIDEOSTREAMINGSTATE = Test.GENERAL_VIDEOSTREAMINGSTATE = [
    VideoStreamingState.STREAMABLE,
    VideoStreamingState.NOT_STREAMABLE,
];

const GENERAL_HMILEVEL = Test.GENERAL_HMILEVEL = [
    HMILevel.HMI_FULL,
    HMILevel.HMI_LIMITED,
    HMILevel.HMI_BACKGROUND,
    HMILevel.HMI_NONE,
];

const GENERAL_SYSTEMCONTEXT = Test.GENERAL_SYSTEMCONTEXT = [
    SystemContext.SYSCTXT_MAIN,
    SystemContext.SYSCTXT_VRSESSION,
    SystemContext.SYSCTXT_MENU,
    SystemContext.SYSCTXT_HMI_OBSCURED,
    SystemContext.SYSCTXT_ALERT,
];

function createTtsChunk(type, text) {
    const ttsChunk = new TTSChunk();
    ttsChunk.setType(type);
    ttsChunk.setText(text);
    return ttsChunk;
}
(function () {
    new TTSChunk();
})();


GENERAL_TTSCHUNK_LIST.push(createTtsChunk(SpeechCapabilities.SC_TEXT, 'Welcome to the jungle'));
GENERAL_TTSCHUNK_LIST.push(createTtsChunk(SpeechCapabilities.SC_TEXT, 'Say a command'));

// msg.setFullAppId(Test.GENERAL_FULL_APP_ID);
// msg.setLanguageDesired(Test.GENERAL_LANGUAGE);
// msg.setHmiDisplayLanguageDesired(Test.GENERAL_LANGUAGE);
// msg.setHashID(Test.GENERAL_STRING);
// msg.setTtsName(Test.GENERAL_TTSCHUNK_LIST);
// msg.setVrSynonyms(Test.GENERAL_STRING_LIST);
// msg.setAppHMIType(Test.GENERAL_APPHMITYPE_LIST);
// msg.setIsMediaApplication(Test.GENERAL_BOOLEAN);
// msg.setDeviceInfo(Test.GENERAL_DEVICEINFO);
// msg.setDayColorScheme(Test.GENERAL_DAYCOLORSCHEME);
// msg.setNightColorScheme(Test.GENERAL_NIGHTCOLORSCHEME);

GENERAL_DEVICEINFO.setCarrier(GENERAL_STRING);
GENERAL_DEVICEINFO.setFirmwareRev(GENERAL_STRING);
GENERAL_DEVICEINFO.setHardware(GENERAL_STRING);
GENERAL_DEVICEINFO.setMaxNumberRFCOMMPorts(GENERAL_INT);
GENERAL_DEVICEINFO.setOs(GENERAL_STRING);
GENERAL_DEVICEINFO.setOsVersion(GENERAL_STRING);


module.exports = Test;