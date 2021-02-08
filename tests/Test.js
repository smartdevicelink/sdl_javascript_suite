/* eslint-disable no-unused-vars */

const SDL = require('./config.js').node;

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
const SoftButtonCapabilities = SDL.rpc.structs.SoftButtonCapabilities;
const HMICapabilities = SDL.rpc.structs.HMICapabilities;
const WindowState = SDL.rpc.structs.WindowState;
const Grid = SDL.rpc.structs.Grid;
const WindowStatus = SDL.rpc.structs.WindowStatus;
const KeyboardLayoutCapability = SDL.rpc.structs.KeyboardLayoutCapability;
const DynamicUpdateCapabilities = SDL.rpc.structs.DynamicUpdateCapabilities;
const KeyboardCapabilities = SDL.rpc.structs.KeyboardCapabilities;

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
const CapacityUnit = SDL.rpc.enums.CapacityUnit;
const ComponentVolumeStatus = SDL.rpc.enums.ComponentVolumeStatus;
const FuelType = SDL.rpc.enums.FuelType;
const RequestType = SDL.rpc.enums.RequestType;
const KeyboardLayout = SDL.rpc.enums.KeyboardLayout;
const KeypressMode = SDL.rpc.enums.KeypressMode;
const KeyboardInputMask = SDL.rpc.enums.KeyboardInputMask;
const MenuLayout = SDL.rpc.enums.MenuLayout;

class Test {
    constructor () {
    }
}

const NULL = Test.NULL = 'Value should be null.';
const MATCH = Test.MATCH = 'Values should match.';
const ARRAY = Test.ARRAY = 'Array values should match.';
const TRUE = Test.TRUE = 'Value should be true.';
const FALSE = Test.FALSE = 'Value should be false.';
const NOT_NULL = Test.NOT_NULL = 'Value should not be null.';
const JSON_FAIL = Test.JSON_FAIL = 'Json testing failed.';

const GENERAL_INT = Test.GENERAL_INT = 100;
const GENERAL_INTEGER = Test.GENERAL_INTEGER = 100;
const GENERAL_NUMBER = Test.GENERAL_NUMBER = 10.5;
const GENERAL_BOOLEAN = Test.GENERAL_BOOLEAN = true;
const GENERAL_STRING = Test.GENERAL_STRING = 'test';

const GENERAL_FILETYPE  = Test.GENERAL_FILETYPE = FileType.BINARY;

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

const  GENERAL_HMICAPABILITIES = Test.GENERAL_HMICAPABILITIES = new HMICapabilities();
GENERAL_HMICAPABILITIES.setNavigation(GENERAL_BOOLEAN);
GENERAL_HMICAPABILITIES.setVideoStreaming(GENERAL_BOOLEAN);
GENERAL_HMICAPABILITIES.setPhoneCall(GENERAL_BOOLEAN);

const GENERAL_SCREENPARAMS = new ScreenParams();
GENERAL_SCREENPARAMS.setResolution(GENERAL_IMAGERESOLUTION);
GENERAL_SCREENPARAMS.setTouchEventAvailable(GENERAL_TOUCHEVENTCAPABILITIES);

const JSON_GENERAL_SCREENPARAMS = {
    [ScreenParams.KEY_RESOLUTION] : GENERAL_IMAGERESOLUTION.getParameters(),
    [ScreenParams.KEY_TOUCH_EVENT_AVAILABLE] : GENERAL_TOUCHEVENTCAPABILITIES.getParameters(),
};


const JSON_SDLMSGVERSION = Test.JSON_SDLMSGVERSION = {
    [SdlMsgVersion.KEY_MAJOR_VERSION]: GENERAL_INT,
    [SdlMsgVersion.KEY_MINOR_VERSION]: GENERAL_INT,
};

const GENERAL_APP_ID = Test.GENERAL_APP_ID = '123e4567e8';
const GENERAL_FULL_APP_ID = Test.GENERAL_FULL_APP_ID = '123e4567-e89b-12d3-a456-426655440000';

const GENERAL_CHARACTERSET = CharacterSet.CID1SET;

const GENERAL_IMAGEFIELDNAME = ImageFieldName.graphic;

const GENERAL_IMAGEFIELDNAME_LIST = Test.GENERAL_IMAGEFIELDNAME_LIST = [
    GENERAL_IMAGEFIELDNAME,
];

const GENERAL_FILETYPE_LIST = [
    GENERAL_FILETYPE,
];



const GENERAL_IMAGEFIELD = Test.GENERAL_IMAGEFIELD = new ImageField();
GENERAL_IMAGEFIELD.setImageResolution(GENERAL_IMAGERESOLUTION);
GENERAL_IMAGEFIELD.setNameParam(GENERAL_IMAGEFIELDNAME);
GENERAL_IMAGEFIELD.setImageTypeSupported(GENERAL_FILETYPE_LIST);

const JSON_GENERAL_IMAGEFIELD = Test.JSON_GENERAL_IMAGEFIELD = {
    [ImageField.KEY_NAME]: GENERAL_IMAGEFIELDNAME,
    [ImageField.KEY_IMAGE_TYPE_SUPPORTED]: GENERAL_FILETYPE_LIST,
    [ImageField.KEY_IMAGE_RESOLUTION]: GENERAL_IMAGERESOLUTION.getParameters(),
};

const GENERAL_IMAGEFIELD_LIST = Test.GENERAL_IMAGEFIELD_LIST = [
    GENERAL_IMAGEFIELD,
];

const JSON_GENERAL_IMAGEFIELD_LIST = Test.JSON_GENERAL_IMAGEFIELD_LIST = [
    JSON_GENERAL_IMAGEFIELD,
];



const GENERAL_IMAGETYPE = Test.GENERAL_IMAGETYPE = ImageType.DYNAMIC;

const GENERAL_IMAGETYPE_LIST = Test.GENERAL_IMAGETYPE_LIST = [
    GENERAL_IMAGETYPE,
];

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

GENERAL_RGBCOLOR.setRed(GENERAL_INTEGER);
GENERAL_RGBCOLOR.setGreen(GENERAL_INTEGER);
GENERAL_RGBCOLOR.setBlue(GENERAL_INTEGER);

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
    MediaClockFormat.CLOCK2,
];

const GENERAL_TEXTFIELDNAME = TextFieldName.ETA;


const GENERAL_TEXTFIELD = Test.GENERAL_TEXTFIELD = new TextField();
GENERAL_TEXTFIELD.setNameParam(GENERAL_TEXTFIELDNAME);
GENERAL_TEXTFIELD.setRows(GENERAL_INT);
GENERAL_TEXTFIELD.setWidth(GENERAL_INT);
GENERAL_TEXTFIELD.setCharacterSet(GENERAL_CHARACTERSET);

const JSON_TEXTFIELD = Test.JSON_TEXTFIELD = GENERAL_TEXTFIELD.getParameters();

const GENERAL_TEXTFIELD_LIST = Test.GENERAL_TEXTFIELD_LIST = [
    GENERAL_TEXTFIELD,
];

const JSON_TEXTFIELD_LIST = Test.JSON_TEXTFIELD_LIST = [
    JSON_TEXTFIELD,
];

const GENERAL_DISPLAYTYPE = DisplayType.CID;
const GENERAL_DISPLAYCAPABILITIES = Test.GENERAL_DISPLAYCAPABILITIES = new DisplayCapabilities();
GENERAL_DISPLAYCAPABILITIES.setDisplayType(GENERAL_DISPLAYTYPE);
GENERAL_DISPLAYCAPABILITIES.setDisplayName(GENERAL_STRING);
GENERAL_DISPLAYCAPABILITIES.setGraphicSupported(GENERAL_BOOLEAN);
GENERAL_DISPLAYCAPABILITIES.setImageFields(GENERAL_IMAGEFIELD_LIST);
GENERAL_DISPLAYCAPABILITIES.setMediaClockFormats(GENERAL_MEDIACLOCKFORMAT_LIST);
GENERAL_DISPLAYCAPABILITIES.setNumCustomPresetsAvailable(GENERAL_INT);
GENERAL_DISPLAYCAPABILITIES.setScreenParams(GENERAL_SCREENPARAMS);
GENERAL_DISPLAYCAPABILITIES.setTemplatesAvailable(GENERAL_STRING_LIST);
GENERAL_DISPLAYCAPABILITIES.setTextFields(GENERAL_TEXTFIELD_LIST);

const JSON_GENERAL_DISPLAYCAPABILITIES = Test.JSON_GENERAL_DISPLAYCAPABILITIES = {
    [DisplayCapabilities.KEY_DISPLAY_TYPE]: GENERAL_DISPLAYTYPE,
    [DisplayCapabilities.KEY_DISPLAY_NAME]: GENERAL_STRING,
    [DisplayCapabilities.KEY_TEXT_FIELDS]: [
        GENERAL_TEXTFIELD.getParameters(),
    ],
    [DisplayCapabilities.KEY_IMAGE_FIELDS]: JSON_GENERAL_IMAGEFIELD_LIST,
    [DisplayCapabilities.KEY_MEDIA_CLOCK_FORMATS]: GENERAL_MEDIACLOCKFORMAT_LIST,
    [DisplayCapabilities.KEY_GRAPHIC_SUPPORTED]: GENERAL_BOOLEAN,
    [DisplayCapabilities.KEY_TEMPLATES_AVAILABLE]: GENERAL_STRING_LIST,
    [DisplayCapabilities.KEY_SCREEN_PARAMS]: JSON_GENERAL_SCREENPARAMS,
    [DisplayCapabilities.KEY_NUM_CUSTOM_PRESETS_AVAILABLE]:  GENERAL_INT,
};

const  GENERAL_SOFTBUTTONCAPABILITIES = Test.GENERAL_SOFTBUTTONCAPABILITIES = new SoftButtonCapabilities();
GENERAL_SOFTBUTTONCAPABILITIES.setLongPressAvailable(GENERAL_BOOLEAN);
GENERAL_SOFTBUTTONCAPABILITIES.setShortPressAvailable(GENERAL_BOOLEAN);
GENERAL_SOFTBUTTONCAPABILITIES.setUpDownAvailable(GENERAL_BOOLEAN);
GENERAL_SOFTBUTTONCAPABILITIES.setImageSupported(GENERAL_BOOLEAN);

const GENERAL_SOFTBUTTONCAPABILITIES_LIST = Test.GENERAL_SOFTBUTTONCAPABILITIES_LIST = [
    GENERAL_SOFTBUTTONCAPABILITIES,
];

const JSON_SOFTBUTTONCAPABILITIES_LIST = Test.JSON_SOFTBUTTONCAPABILITIES_LIST = [
    GENERAL_SOFTBUTTONCAPABILITIES.getParameters(),
];

const GENERAL_PRESETBANKCAPABILITIES = Test.GENERAL_PRESETBANKCAPABILITIES = new PresetBankCapabilities();
GENERAL_PRESETBANKCAPABILITIES.setOnScreenPresetsAvailable(GENERAL_BOOLEAN);

const JSON_PRESETBANKCAPABILITIES = Test.JSON_PRESETBANKCAPABILITIES = {
    [PresetBankCapabilities.KEY_ON_SCREEN_PRESETS_AVAILABLE]: GENERAL_BOOLEAN,
};

const GENERAL_VEHICLETYPE = Test.GENERAL_VEHICLETYPE = new VehicleType();
GENERAL_VEHICLETYPE.setMake(GENERAL_STRING);
GENERAL_VEHICLETYPE.setModel(GENERAL_STRING);
GENERAL_VEHICLETYPE.setModelYear(GENERAL_STRING);
GENERAL_VEHICLETYPE.setTrim(GENERAL_STRING);

const JSON_GENERAL_VEHICLETYPE = Test.JSON_GENERAL_VEHICLETYPE = {
    [VehicleType.KEY_MAKE]: GENERAL_STRING,
    [VehicleType.KEY_MODEL]: GENERAL_STRING,
    [VehicleType.KEY_MODEL_YEAR]: GENERAL_STRING,
    [VehicleType.KEY_TRIM]: GENERAL_STRING,
};

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

const JSON_AUDIOPASSTHRUCAPABILITIES = Test.JSON_AUDIOPASSTHRUCAPABILITIES = {
    [AudioPassThruCapabilities.KEY_SAMPLING_RATE] : GENERAL_SAMPLINGRATE,
    [AudioPassThruCapabilities.KEY_BITS_PER_SAMPLE] : GENERAL_BITSPERSAMPLE,
    [AudioPassThruCapabilities.KEY_AUDIO_TYPE] : GENERAL_AUDIOTYPE,
};

const JSON_AUDIOPASSTHRUCAPABILITIES_LIST = Test.JSON_AUDIOPASSTHRUCAPABILITIES_LIST = [
    JSON_AUDIOPASSTHRUCAPABILITIES,
];

const GENERAL_BUTTONCAPABILITIES = Test.GENERAL_BUTTONCAPABILITIES = new ButtonCapabilities();

GENERAL_BUTTONCAPABILITIES.setLongPressAvailable(false);
GENERAL_BUTTONCAPABILITIES.setShortPressAvailable(true);
GENERAL_BUTTONCAPABILITIES.setUpDownAvailable(true);
GENERAL_BUTTONCAPABILITIES.setNameParam(ButtonName.SEEKRIGHT);

const GENERAL_BUTTONCAPABILITIES_LIST = Test.GENERAL_BUTTONCAPABILITIES_LIST = [
    GENERAL_BUTTONCAPABILITIES,
];

const JSON_GENERAL_BUTTON_CAPABILITIES = {
    [ButtonCapabilities.KEY_NAME]: ButtonName.SEEKRIGHT,
    [ButtonCapabilities.KEY_SHORT_PRESS_AVAILABLE] : true,
    [ButtonCapabilities.KEY_LONG_PRESS_AVAILABLE] : false,
    [ButtonCapabilities.KEY_UP_DOWN_AVAILABLE] : true,
};

const JSON_GENERAL_BUTTON_CAPABILITIES_LIST = Test.JSON_GENERAL_BUTTON_CAPABILITIES_LIST = [
    JSON_GENERAL_BUTTON_CAPABILITIES,
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
    VrCapabilities.VR_TEXT,
];

const GENERAL_SPEECHCAPABILITIES_LIST = Test.GENERAL_SPEECHCAPABILITIES_LIST = [
    SpeechCapabilities.SILENCE,
    SpeechCapabilities.SC_TEXT,
];

const GENERAL_AUDIOSTREAMINGSTATE = Test.GENERAL_AUDIOSTREAMINGSTATE = AudioStreamingState.AUDIBLE;

const GENERAL_VIDEOSTREAMINGSTATE = Test.GENERAL_VIDEOSTREAMINGSTATE = VideoStreamingState.STREAMABLE;

const GENERAL_HMILEVEL = Test.GENERAL_HMILEVEL = HMILevel.HMI_FULL;

const GENERAL_SYSTEMCONTEXT = Test.GENERAL_SYSTEMCONTEXT = SystemContext.SYSCTXT_MAIN;

/**
 * Create a new TTSChunk instance.
 * @param {String} type - The type of TTSChunk.
 * @param {String} text - The text of the TTSChunk.
 * @returns {TTSChunk} - A new TTSChunk instance.
 */
function createTtsChunk (type, text) {
    const ttsChunk = new TTSChunk();
    ttsChunk.setType(type);
    ttsChunk.setText(text);
    return ttsChunk;
}


GENERAL_TTSCHUNK_LIST.push(createTtsChunk(SpeechCapabilities.SC_TEXT, 'Welcome to the jungle'));
GENERAL_TTSCHUNK_LIST.push(createTtsChunk(SpeechCapabilities.SC_TEXT, 'Say a command'));

GENERAL_DEVICEINFO.setCarrier(GENERAL_STRING);
GENERAL_DEVICEINFO.setFirmwareRev(GENERAL_STRING);
GENERAL_DEVICEINFO.setHardware(GENERAL_STRING);
GENERAL_DEVICEINFO.setMaxNumberRFCOMMPorts(GENERAL_INT);
GENERAL_DEVICEINFO.setOs(GENERAL_STRING);
GENERAL_DEVICEINFO.setOsVersion(GENERAL_STRING);

const GENERAL_CAPACITY_UNIT = Test.GENERAL_CAPACITY_UNIT = CapacityUnit.LITERS;
const GENERAL_COMPONENT_VOLUME_STATUS = Test.GENERAL_COMPONENT_VOLUME_STATUS = ComponentVolumeStatus.CVS_NORMAL;
const GENERAL_FUEL_TYPE = Test.GENERAL_FUEL_TYPE = FuelType.GASOLINE;
const GENERAL_REQUESTTYPE = Test.GENERAL_REQUESTTYPE = RequestType.AUTH_REQUEST;

const GENERAL_WINDOW_STATE = Test.GENERAL_WINDOW_STATE = new WindowState()
    .setApproximatePosition(Test.GENERAL_INTEGER)
    .setDeviation(Test.GENERAL_INTEGER);

const JSON_WINDOW_STATE = Test.JSON_WINDOW_STATE = GENERAL_WINDOW_STATE.getParameters();

const GENERAL_GRID = Test.GENERAL_GRID = new Grid()
    .setColumn(Test.GENERAL_INTEGER)
    .setRow(Test.GENERAL_INTEGER);

const JSON_GRID = Test.JSON_GRID = GENERAL_GRID.getParameters();

const GENERAL_WINDOW_STATUS = Test.GENERAL_WINDOW_STATUS = new WindowStatus()
    .setLocation(Test.GENERAL_GRID)
    .setState(Test.GENERAL_WINDOW_STATE);

const JSON_WINDOWSTATUS = Test.JSON_WINDOWSTATUS = {
    [WindowStatus.KEY_LOCATION]: Test.JSON_GRID,
    [WindowStatus.KEY_STATE]: Test.JSON_WINDOW_STATE,
};

const GENERAL_KEYBOARDLAYOUT = Test.GENERAL_KEYBOARDLAYOUT = KeyboardLayout.QWERTY;

const GENERAL_KEYBOARDLAYOUT_LIST = Test.GENERAL_KEYBOARDLAYOUT_LIST = [
    GENERAL_KEYBOARDLAYOUT,
];

const GENERAL_KEYBOARDLAYOUTCAPABILITY = Test.GENERAL_KEYBOARDLAYOUTCAPABILITY = new KeyboardLayoutCapability()
    .setKeyboardLayout(Test.GENERAL_KEYBOARDLAYOUT)
    .setNumConfigurableKeys(Test.GENERAL_INTEGER);

const GENERAL_KEYBOARDLAYOUTCAPABILITY_LIST = Test.GENERAL_KEYBOARDLAYOUTCAPABILITY_LIST = [
    GENERAL_KEYBOARDLAYOUTCAPABILITY,
];

const JSON_KEYBOARDLAYOUTCAPABILITY = Test.JSON_KEYBOARDLAYOUTCAPABILITY = {
    [KeyboardLayoutCapability.KEY_KEYBOARD_LAYOUT]: Test.GENERAL_KEYBOARDLAYOUT,
    [KeyboardLayoutCapability.KEY_NUM_CONFIGURABLE_KEYS]: Test.GENERAL_INTEGER,
};

const JSON_KEYBOARDLAYOUTCAPABILITY_LIST = Test.JSON_KEYBOARDLAYOUTCAPABILITY_LIST = [
    JSON_KEYBOARDLAYOUTCAPABILITY,
];

const GENERAL_KEYPRESSMODE = Test.GENERAL_KEYPRESSMODE = KeypressMode.SINGLE_KEYPRESS;

const GENERAL_KEYBOARDINPUTMASK = Test.GENERAL_KEYBOARDINPUTMASK = KeyboardInputMask.ENABLE_INPUT_KEY_MASK;

const GENERAL_MENULAYOUT = Test.GENERAL_MENULAYOUT = MenuLayout.LIST;

const GENERAL_MENULAYOUT_LIST = Test.GENERAL_MENULAYOUT_LIST = [
    GENERAL_MENULAYOUT,
];

const GENERAL_DYNAMICUPDATECAPABILITIES = Test.GENERAL_DYNAMICUPDATECAPABILITIES = new DynamicUpdateCapabilities()
    .setSupportedDynamicImageFieldNames(GENERAL_IMAGEFIELDNAME_LIST)
    .setSupportsDynamicSubMenus(GENERAL_BOOLEAN);

const JSON_DYNAMICUPDATECAPABILITIES = Test.JSON_DYNAMICUPDATECAPABILITIES = GENERAL_DYNAMICUPDATECAPABILITIES.getParameters();

const GENERAL_KEYBOARDCAPABILITIES = Test.GENERAL_KEYBOARDCAPABILITIES = new KeyboardCapabilities()
    .setMaskInputCharactersSupported(GENERAL_BOOLEAN)
    .setSupportedKeyboards(GENERAL_KEYBOARDLAYOUTCAPABILITY_LIST);

const JSON_KEYBOARDCAPABILITIES = Test.JSON_KEYBOARDCAPABILITIES = {
    [KeyboardCapabilities.KEY_MASK_INPUT_CHARACTERS_SUPPORTED]: Test.GENERAL_BOOLEAN,
    [KeyboardCapabilities.KEY_SUPPORTED_KEYBOARDS]: Test.JSON_KEYBOARDLAYOUTCAPABILITY_LIST,
};

module.exports = Test;