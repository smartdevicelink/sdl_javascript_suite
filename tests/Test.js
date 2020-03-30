const SDL = require('./../lib/js/dist/SDL.min.js');

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

// enums
const SpeechCapabilities = SDL.rpc.enums.SpeechCapabilities;
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

class Test {
    constructor () {
    }
}

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

const  GENERAL_HMICAPABILITIES = Test.GENERAL_HMICAPABILITIES = new HMICapabilities();
GENERAL_HMICAPABILITIES.setNavigation(GENERAL_BOOLEAN);
GENERAL_HMICAPABILITIES.setVideoStreaming(GENERAL_BOOLEAN);
GENERAL_HMICAPABILITIES.setPhoneCall(GENERAL_BOOLEAN);

const GENERAL_SCREENPARAMS = new ScreenParams();
GENERAL_SCREENPARAMS.setResolution(GENERAL_IMAGERESOLUTION);
GENERAL_SCREENPARAMS.setTouchEventAvailable(GENERAL_TOUCHEVENTCAPABILITIES);

const GENERAL_CHARACTERSET = CharacterSet.CID1SET;

const GENERAL_IMAGEFIELDNAME = ImageFieldName.graphic;

const GENERAL_FILETYPE_LIST = [
    GENERAL_FILETYPE,
];



const GENERAL_IMAGEFIELD = new ImageField();
GENERAL_IMAGEFIELD.setImageResolution(GENERAL_IMAGERESOLUTION);
GENERAL_IMAGEFIELD.setName(GENERAL_IMAGEFIELDNAME);
GENERAL_IMAGEFIELD.setImageTypeSupported(GENERAL_FILETYPE_LIST);

const GENERAL_IMAGEFIELD_LIST = [
    GENERAL_IMAGEFIELD,
];

const GENERAL_TTSCHUNK_LIST = Test.GENERAL_TTSCHUNK_LIST = [];
const GENERAL_STRING_LIST = Test.GENERAL_STRING_LIST = [
    'a',
    'b',
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

const GENERAL_MEDIACLOCKFORMAT_LIST = [
    MediaClockFormat.CLOCK1,
    MediaClockFormat.CLOCK2,
];

const GENERAL_TEXTFIELDNAME = TextFieldName.ETA;


const GENERAL_TEXTFIELD = new TextField();
GENERAL_TEXTFIELD.setName(GENERAL_TEXTFIELDNAME);
GENERAL_TEXTFIELD.setRows(GENERAL_INT);
GENERAL_TEXTFIELD.setWidth(GENERAL_INT);
GENERAL_TEXTFIELD.setCharacterSet(GENERAL_CHARACTERSET);


const GENERAL_TEXTFIELD_LIST = [
    GENERAL_TEXTFIELD,
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

const  GENERAL_SOFTBUTTONCAPABILITIES = Test.GENERAL_SOFTBUTTONCAPABILITIES = new SoftButtonCapabilities();
GENERAL_SOFTBUTTONCAPABILITIES.setLongPressAvailable(GENERAL_BOOLEAN);
GENERAL_SOFTBUTTONCAPABILITIES.setShortPressAvailable(GENERAL_BOOLEAN);
GENERAL_SOFTBUTTONCAPABILITIES.setUpDownAvailable(GENERAL_BOOLEAN);
GENERAL_SOFTBUTTONCAPABILITIES.setImageSupported(GENERAL_BOOLEAN);

const GENERAL_PRESETBANKCAPABILITIES = Test.GENERAL_PRESETBANKCAPABILITIES = new PresetBankCapabilities();
GENERAL_PRESETBANKCAPABILITIES.setOnScreenPresetsAvailable(GENERAL_BOOLEAN);



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

const GENERAL_BUTTONCAPABILITIES = Test.GENERAL_BUTTONCAPABILITIES = new ButtonCapabilities();

GENERAL_BUTTONCAPABILITIES.setLongPressAvailable(false);
GENERAL_BUTTONCAPABILITIES.setShortPressAvailable(true);
GENERAL_BUTTONCAPABILITIES.setUpDownAvailable(true);
GENERAL_BUTTONCAPABILITIES.setName(ButtonName.SEEKRIGHT);

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


module.exports = Test;