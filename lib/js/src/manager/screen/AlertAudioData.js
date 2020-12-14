import { AudioData } from './AudioData';

class AlertAudioData extends AudioData {
    constructor (phoneticString = null, phoneticType = null, audioFile = null) {
        super(phoneticString, phoneticType, audioFile);
        this.playTone = false;
    }

    isPlayTone () {
        return this.playTone;
    }

    setPlayTone (playTone) {
        this.playTone = playTone;
    }
}

export { AlertAudioData };