import { SpeechCapabilities } from '../../rpc/enums/SpeechCapabilities';
import { TTSChunk } from '../../rpc/structs/TTSChunk';

class AudioData {
    constructor (phoneticString = null, phoneticType = null, audioFile = null) {
        if (phoneticType !== null && !this.isValidPhoneticType(phoneticType)) {
            return;
        }
        if (audioFile !== null) {
            this._audioFiles = audioFile;
        }
        if (phoneticString !== null) {
            if (phoneticType === null) {
                phoneticType = SpeechCapabilities.TEXT;
            }
            this._prompts = [];
            this._prompts.push(new TTSChunk().setText(phoneticString).setType(phoneticType));
        }
    }

    isValidPhoneticType (phoneticType) {
        if (!(phoneticType.equals(SpeechCapabilities.SAPI_PHONEMES) || phoneticType.equals(SpeechCapabilities.LHPLUS_PHONEMES)
                || phoneticType.equals(SpeechCapabilities.TEXT) || phoneticType.equals(SpeechCapabilities.PRE_RECORDED))) {
            return false;
        }
        return true;
    }

    addAudioFiles (audioFile) {
        if (this._audioFiles === null) {
            this._audioFiles = [];
        }
        this._audioFiles.push(audioFile);
    }

    addSpeechSynthesizerStrings (spokenString) {
        if (spokenString.length === 0) {
            return;
        }
        const newPrompts = [];
        for (const spoken of spokenString) {
            if (spoken.length === 0) {
                break;
            }
            newPrompts.push(spoken);
        }
        if (newPrompts.length === 0) {
            return;
        }
        if (this._prompts === null) {
            this._prompts = newPrompts;
            return;
        }
        this._prompts.push.apply(this._prompts, newPrompts);
    }

    addPhoneticSpeechSynthesizerStrings (phoneticString, phoneticType) {
        if (!this.isValidPhoneticType(phoneticType) || phoneticString.length === 0) {
            return;
        }
        const newPrompts = [];
        for (const phonetic of phoneticString) {
            if (phonetic.length === 0) {
                break;
            }
            newPrompts.push(new TTSChunk().setText(phonetic).setType(phoneticType));
        }
        if (newPrompts.length === 0) {
            return;
        }
        this._prompts.push.apply(this._prompts, newPrompts);
    }

    getAudioFiles () {
        return this._audioFiles;
    }

    getPrompts () {
        return this._prompts;
    }
}

export { AudioData };