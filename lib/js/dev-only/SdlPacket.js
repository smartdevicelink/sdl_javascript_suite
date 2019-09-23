const SdlPacket = class SdlPacket
{
    static constructPacket(version, encryption, frameType, serviceType, controlFrameInfo, sessionID, dataSize, messageID, payload) {
        let dataView = null;
        let dataViewIndex = 0;

        switch (version) {
            case 1:
                dataView = new Uint8Array(this.HEADER_SIZE_V1 + dataSize);
                break;
            default:
                dataView = new Uint8Array(this.HEADER_SIZE + dataSize);
        }

        dataView[dataViewIndex++] = version<<4 + getEncryptionBit(encryption) + frameType;
        dataView[dataViewIndex++] = serviceType;
        dataView[dataViewIndex++] = controlFrameInfo;
        dataView[dataViewIndex++] = sessionID;
        dataView[dataViewIndex++] = dataSize&0xFF000000 >> 24;
        dataView[dataViewIndex++] = dataSize&0x00FF0000 >> 16;
        dataView[dataViewIndex++] = dataSize&0x0000FF00 >> 8;
        dataView[dataViewIndex++] = dataSize&0x000000FF;

        if (version > 1) {
            dataView[dataViewIndex++] = messageID&0xFF000000 >> 24;
            dataView[dataViewIndex++] = messageID&0x00FF0000 >> 16;
            dataView[dataViewIndex++] = messageID&0x0000FF00 >> 8;
            dataView[dataViewIndex++] = messageID&0x000000FF;
        }

        if (payload !== null && payload.length > 0) {
            dataView.set(payload, dataViewIndex++);
        }

        return dataView;
    }
};



SdlPacket.HEADER_SIZE = 12;
SdlPacket.HEADER_SIZE_V1 = 8;//  # Backwards
SdlPacket.ENCRYPTION_MASK = 0x08;//  # 4th lowest bit

SdlPacket.FRAME_TYPE_CONTROL = 0x00;
SdlPacket.FRAME_TYPE_SINGLE = 0x01;
SdlPacket.FRAME_TYPE_FIRST = 0x02;
SdlPacket.FRAME_TYPE_CONSECUTIVE = 0x03;

// # Service Type
SdlPacket.SERVICE_TYPE_CONTROL = 0x00;
// # RESERVED 0x01 - 0x06
SdlPacket.SERVICE_TYPE_RPC = 0x07;
// # RESERVED 0x08 - 0x09
SdlPacket.SERVICE_TYPE_PCM = 0x0A;
SdlPacket.SERVICE_TYPE_VIDEO = 0x0B;
// # RESERVED 0x0C - 0x0E
SdlPacket.SERVICE_TYPE_BULK_DATA = 0x0F;
// # RESERVED 0x10 - 0xFF

// # Frame Info
// # Control Frame Info
SdlPacket.FRAME_INFO_HEART_BEAT = 0x00;
SdlPacket.FRAME_INFO_START_SERVICE = 0x01;
SdlPacket.FRAME_INFO_START_SERVICE_ACK = 0x02;
SdlPacket.FRAME_INFO_START_SERVICE_NAK = 0x03;
SdlPacket.FRAME_INFO_END_SERVICE = 0x04;
SdlPacket.FRAME_INFO_END_SERVICE_ACK = 0x05;
SdlPacket.FRAME_INFO_END_SERVICE_NAK = 0x06;
// # 0x07-0xFD are reserved
SdlPacket.FRAME_INFO_SERVICE_DATA_ACK = 0xFE;
SdlPacket.FRAME_INFO_HEART_BEAT_ACK = 0xFF;

SdlPacket.FRAME_INFO_FINAL_CONNESCUTIVE_FRAME = 0x00;






module.exports = SdlPacket;
