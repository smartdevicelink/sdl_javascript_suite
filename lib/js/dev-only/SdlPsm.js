const Net = require('net');
const SdlPacket = require('./SdlPacket');


const logger = {
    info: () => {},
    // info: console.log
};


const SdlPsm = class SdlPsm {

    //5.2.1 BINARY HEADER
    //is there any reason not to just handle it here?
    //split the payload up,

    constructor() {
        this.state = 0;

        this.state = SdlPsm.START_STATE;

        this.version = 0;

        this.sessionId = null;

        this.dataLength = 0;

        this.messageId = 0;

        this.byteCount = 0;

        this.states = [];

        //when calling frametype = single frame, the initial frame with no payload that has the version, datalength, etc does not count.

        //version
        //compression
        //encryption
        //frameType
        //serviceType
        //frameInfo
        //sessionId
        //dataSize
        //messageId
        this.initialFrame = null;

        //first frame has header only, no payload.

        //version
        //compression
        //encryption
        //frameType
        //serviceType
        //frameInfo
        //sessionId
        //dataSize
        //messageId
        this.frames = [];

    }


    get isFinished()
    {
        //TODO fix this.
        let length = (this.dataLength + this.dataStart) - 1;

        logger.info(`isFinished`,this.dataStart,this.dataLength,this.data.length,{
            length
        });

        if (!this.dataLength)
        {
            return false;
        }
        if (!this.data)
        {
            return false;
        }
        if (this.data.length >= length)
        {
            return true;
        }
        return false;
    }

    addData(data)
    {
        let self = this;
        let buffer1 = new Uint8Array(this.data);
        let buffer2 = new Uint8Array(data);


        console.log(`combining`,SdlPsm.uint8arrayToStringMethod(buffer1));
        console.log(`combining`,SdlPsm.uint8arrayToStringMethod(buffer2));

        this.data = new Uint8Array([...buffer1,...buffer2]);
        console.log(`final`,SdlPsm.uint8arrayToStringMethod(this.data));

        const fs = require('fs');
        //
        // // let filenames = [`buffer1${this.messageId}`,`buffer2${this.messageId}`];
        //
        (function() {
            // let path = require('path');
            // let location;
            // location = path.resolve(__dirname,`images`,`tmp`,`buffer1${this.messageId}`);
            // console.log({location})

            fs.writeFileSync(`${__dirname}/images/tmp/${self.messageId}-buffer1.txt`,buffer1);

        })();

        (function() {
            // let path = require('path');
            // let location;
            // location = path.resolve(__dirname,`images`,`tmp`,`buffer1${this.messageId}`);
            // console.log({location})

            fs.writeFileSync(`${__dirname}/images/tmp/${self.messageId}-buffer2.txt`,buffer2);

        })();



        // (function() {
        //     fs.writeFileSync(`${__dirname}/images/tmp/${self.messageId}-final.txt`,this.data);
        //
        // })();
        //
        // (function() {
        //     let path = require('path');
        //     let location;
        //     location = path.resolve(__dirname,`images`,`tmp`,`buffer2${this.messageId}`);
        //
        //     console.log({location})
        //
        //     // fs.writeFileSync(location,buffer2);
        //
        // })();
        //
        // (function() {
        //     let path = require('path');
        //     let location;
        //     location = path.resolve(__dirname,`images`,`tmp`,`final${this.messageId}`);
        //
        //     // fs.writeFileSync(location,this.data);
        //
        // })();





    }

    //TODO correlation_id or messageId ?
    //messageId is the full message, correlationId is for rpc.
    // get messageId()
    // {
    //     return this.correlation_id;
    // }
    //
    // set messageId(val)
    // {
    //     this.correlation_id = val;
    // }

    readByte(byte) {
        let self = this;
        // print("Current state: ", self.state)
        if (this.states.length === 0 || this.states[this.states.length - 1] !== SdlPsm.DATA_PUMP_STATE) {
            this.states.push(this.state);

        }
        self.state = self.transitionOnInput(byte, self.state);
        // console.log(`readByte`,byte,self.state);

        if (self.state === SdlPsm.ERROR_STATE) {
            return false;
        } else {
            return true;
        }
    }

    getVersionFromByte(byte) {
        let version = (byte & SdlPsm.VERSION_MASK) >> 4;
        // console.log(`getVersionFromByte`,byte, SdlPsm.VERSION_MASK,version);

        return version;
    }

    handleControlFrameInfoState(raw_byte) {
        let self = this;
        self.controlFrameInfo = raw_byte & 0xFF;

        if (
            self.frameType === SdlPacket.FRAME_TYPE_CONTROL ||
            self.frameType === SdlPacket.FRAME_TYPE_CONSECUTIVE
        ) {
            return; //pseudo break;
        } else if (self.frameType === SdlPacket.FRAME_TYPE_SINGLE
            || self.frameType === SdlPacket.FRAME_TYPE_SINGLE
        ) {

        }

        //     self.controlFrameInfo = raw_byte & 0xFF
        //     if self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_CONTROL or self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_CONSECUTIVE:
        //     self.pseudo_break()
        //     elif self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_SINGLE \
        //                 or self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_FIRST:
        //     # Fall through since they are both the same
        //     if self.controlFrameInfo != 0x00:
        //     return self.ERROR_STATE
        // else:
        //     return self.ERROR_STATE
    }

    transitionOnInput(raw_byte, state) {
        let self = this;

        this.byteCount++;

        //1st byte
        if (state === SdlPsm.START_STATE) {
            this.version = this.getVersionFromByte(raw_byte);
            if (self.version === 0) {
                return SdlPsm.ERROR_STATE;
            }

            self.compression = (1 == ((raw_byte & SdlPsm.COMPRESSION_MASK) >> 3));

            self.frameType = raw_byte & SdlPsm.FRAME_TYPE_MASK;

            // # Log.trace(TAG, raw_byte + " = Frame Type: " + frameType);

            // # These are known versions supported by this library.
            // if (self.version < 1 or self.version > 5) and self.frameType != SdlPacket.SdlPacket.FRAME_TYPE_CONTROL:
            //     return self.ERROR_STATE

            // if self.frameType < SdlPacket.SdlPacket.FRAME_TYPE_CONTROL \
            // or self.frameType > SdlPacket.SdlPacket.FRAME_TYPE_CONSECUTIVE:
            // return self.ERROR_STATE
            //
            // # We made it through.
            return SdlPsm.SERVICE_TYPE_STATE;

        }
        // 2nd byte
        else if (state === SdlPsm.SERVICE_TYPE_STATE) {
            self.serviceType = (raw_byte & 0xFF);

            return SdlPsm.CONTROL_FRAME_INFO_STATE;
        }
        //3rd byte
        else if (state === SdlPsm.CONTROL_FRAME_INFO_STATE) {
            //
            //     elif state == self.CONTROL_FRAME_INFO_STATE:
            //     self.controlFrameInfo = raw_byte & 0xFF
            //     if self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_CONTROL or self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_CONSECUTIVE:
            //     self.pseudo_break()
            //     elif self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_SINGLE \
            //                 or self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_FIRST:
            //     # Fall through since they are both the same
            //     if self.controlFrameInfo != 0x00:
            //     return self.ERROR_STATE

            self.controlFrameInfo = raw_byte & 0xFF;
            // return self.handleControlFrameInfoState(raw_byte);

            // return;
            return SdlPsm.SESSION_ID_STATE;
        }
        //4th byte
        else if (state === SdlPsm.SESSION_ID_STATE) {

            // console.log(`set sessionId`,raw_byte,(raw_byte & 0xFF));
            self.sessionId = (raw_byte & 0xFF);

            return SdlPsm.DATA_SIZE_1_STATE;
            // self.sessionId
            // return this.handleSessionIdState(raw_byte);
            //     elif state == self.SESSION_ID_STATE:
            //     self.sessionId = (raw_byte & 0xFF)
            //     return self.DATA_SIZE_1_STATE
        }
        //5
        else if (state === SdlPsm.DATA_SIZE_1_STATE) {
            self.dataLength += (raw_byte & 0xFF) << 24;
            return SdlPsm.DATA_SIZE_2_STATE;

        }
        //6
        else if (state === SdlPsm.DATA_SIZE_2_STATE) {
            self.dataLength += (raw_byte & 0xFF) << 16; // # 2 bytes x 8 bits
            return SdlPsm.DATA_SIZE_3_STATE;
        }
        //7
        else if (state === SdlPsm.DATA_SIZE_3_STATE) {
            self.dataLength += (raw_byte & 0xFF) << 8; // #  1 byte x 8 bits
            return SdlPsm.DATA_SIZE_4_STATE;
        }
        //8
        else if (state === SdlPsm.DATA_SIZE_4_STATE) {
            self.dataLength += (raw_byte & 0xFF); // # 2 bytes x 8 bits

            //https://stackoverflow.com/questions/38718202/how-to-use-uint8array-uint16array-uin32array

            //create an empty bytearray to populate from raw data.
            //The bytearray() method returns a bytearray object which is a mutable (can be modified) sequence of integers in the range 0 <=x < 256.
            //https://en.wikipedia.org/wiki/8-bit use 8bit unsigned
            // self.payload =  bytearray(self.dataLength);
            self.payload = new Uint8Array(self.dataLength);
            self.dumpSize = self.dataLength;
            //Version 1 packets will not have message id's

            if (self.version === 1) {
                if (self.dataLength > 0) {
                    return SdlPsm.DATA_PUMP_STATE;

                } else {
                    return SdlPsm.FINISHED_STATE;

                }
            } else {
                return SdlPsm.MESSAGE_1_STATE;
            }

        }
        //9
        else if (state === SdlPsm.MESSAGE_1_STATE) {
            self.messageId += (raw_byte & 0xFF) << 24;
            return SdlPsm.MESSAGE_2_STATE;
        }
        //10
        else if (state === SdlPsm.MESSAGE_2_STATE) {
            self.messageId += (raw_byte & 0xFF) << 16;
            return SdlPsm.MESSAGE_3_STATE;
        }
        //11
        else if (state === SdlPsm.MESSAGE_3_STATE) {
            self.messageId += (raw_byte & 0xFF) << 8;
            return SdlPsm.MESSAGE_4_STATE;
        }
        //12
        else if (state === SdlPsm.MESSAGE_4_STATE) {
            self.messageId += (raw_byte & 0xFF);

            if (self.dataLength > 0) {
                return SdlPsm.DATA_PUMP_STATE;

            } else {
                return SdlPsm.FINISHED_STATE;

            }
        }

        // HEADER_SIZE = 12
        // HEADER_SIZE_V1 = 8  # Backwards

        //9+ contains data. in version 1
        //13+ contains data in other versions.
        else if (state === SdlPsm.DATA_PUMP_STATE) {
            if (!this.dataStart) {
                this.dataStart = this.byteCount;
            }
            self.payload[self.dataLength - self.dumpSize] = raw_byte;
            self.dumpSize -= 1;  // Do we have any more bytes to  read in?

            if (self.dumpSize > 0) {
                return SdlPsm.DATA_PUMP_STATE;
            } else {
                return SdlPsm.FINISHED_STATE;
            }
        }

        /**
         elif state == self.DATA_SIZE_4_STATE:
         self.dataLength += raw_byte & 0xFF
         if self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_SINGLE or self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_CONSECUTIVE:
         SdlPsm.pseudo_break()
         elif self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_CONTROL:
         # Ok, well here's some interesting bit of knowledge.
         # Because the start session request is from the phone with no knowledge of version it sends out a
         # v1 packet.THEREFORE there is no message id field.
         # ** ** Now you know and knowing is half the battle ** **
         if self.version == 1 and self.controlFrameInfo == SdlPacket.SdlPacket.FRAME_INFO_START_SERVICE:
         if self.dataLength == 0:
         return self.FINISHED_STATE  # We are done if we don't have any payload
         if self.dataLength <= SdlProtocol.SdlProtocol.V1_V2_MTU_SIZE - SdlProtocol.SdlProtocol.V1_HEADER_SIZE:
         self.payload = bytearray(self.dataLength)
         else:
         return self.ERROR_STATE
         self.dumpSize = self.dataLength
         return self.DATA_PUMP_STATE
         elif self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_FIRST:
         if self.dataLength == self.FIRST_FRAME_DATA_SIZE:
         SdlPsm.pseudo_break()
         else:
         return self.ERROR_STATE

         if self.version == 1:  # Version 1 packets will not have message id's
         if self.dataLength == 0:
         return self.FINISHED_STATE # We are done if we don't have any payload
         if self.dataLength <= SdlProtocol.SdlProtocol.V1_V2_MTU_SIZE - SdlProtocol.SdlProtocol.V1_HEADER_SIZE:
         self.payload =  bytearray(self.dataLength)
         else :
         return self.ERROR_STATE
         self.dumpSize = self.dataLength
         return self.DATA_PUMP_STATE
         else:
         return self.MESSAGE_1_STATE
         elif state == self.MESSAGE_1_STATE:
         self.messageId += (raw_byte & 0xFF) << 24 # 3bytesx8bits
         return self.MESSAGE_2_STATE
         elif state == self.MESSAGE_2_STATE:
         self.messageId += (raw_byte & 0xFF) << 16 # 2bytesx8bits
         return self.MESSAGE_3_STATE
         elif state == self.MESSAGE_3_STATE:
         self.messageId += (raw_byte & 0xFF) << 8 # 1bytex8bits
         return self.MESSAGE_4_STATE
         elif state == self.MESSAGE_4_STATE:
         self.messageId += raw_byte & 0xFF
         if self.dataLength == 0:
         return self.FINISHED_STATE; # We are done if we don't have any payload
         # TODO We might need a try/catch or w/e the hell it is in python for OOM
         try:
         self.payload = bytearray(self.dataLength)
         except Exception:
         return self.ERROR_STATE
         self.dumpSize = self.dataLength
         return self.DATA_PUMP_STATE
         elif state == self.DATA_PUMP_STATE:
         self.payload[self.dataLength - self.dumpSize] = raw_byte;
         self.dumpSize -= 1  # Do we have any more bytes to  read in?
         if self.dumpSize > 0:
         return self.DATA_PUMP_STATE
         elif self.dumpSize == 0:
         return self.FINISHED_STATE
         else:
         return self.ERROR_STATE
         elif state == self.FINISHED_STATE: # We shouldn't be here...Should have been reset
         return self.ERROR_STATE
         else:
         return self.ERROR_STATE
         */

        //     elif state == self.DATA_SIZE_1_STATE:
        //     # First data size byte
        //     self.dataLength += (raw_byte & 0xFF) << 24  # 3 bytes x 8 bits
        //     return self.DATA_SIZE_2_STATE
        //     elif state == self.DATA_SIZE_2_STATE:
        //     self.dataLength += (raw_byte & 0xFF) << 16  # 2 bytes x 8 bits
        //     return self.DATA_SIZE_3_STATE
        //     elif state == self.DATA_SIZE_3_STATE:
        //     self.dataLength += (raw_byte & 0xFF) << 8  # 1 byte x 8 bits
        //     return self.DATA_SIZE_4_STATE
        //     elif state == self.DATA_SIZE_4_STATE:
        //     self.dataLength += raw_byte & 0xFF
        //     if self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_SINGLE or self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_CONSECUTIVE:
        //     SdlPsm.pseudo_break()
        //     elif self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_CONTROL:
        //     # Ok, well here's some interesting bit of knowledge.
        //     # Because the start session request is from the phone with no knowledge of version it sends out a
        //     # v1 packet.THEREFORE there is no message id field.
        //     # ** ** Now you know and knowing is half the battle ** **
        //     if self.version == 1 and self.controlFrameInfo == SdlPacket.SdlPacket.FRAME_INFO_START_SERVICE:
        //     if self.dataLength == 0:
        //     return self.FINISHED_STATE  # We are done if we don't have any payload
        //     if self.dataLength <= SdlProtocol.SdlProtocol.V1_V2_MTU_SIZE - SdlProtocol.SdlProtocol.V1_HEADER_SIZE:
        //     self.payload = bytearray(self.dataLength)
        // else:
        //     return self.ERROR_STATE
        //     self.dumpSize = self.dataLength
        //     return self.DATA_PUMP_STATE
        //     elif self.frameType == SdlPacket.SdlPacket.FRAME_TYPE_FIRST:
        //     if self.dataLength == self.FIRST_FRAME_DATA_SIZE:
        //     SdlPsm.pseudo_break()
        // else:
        //     return self.ERROR_STATE
        //
        //     if self.version == 1:  # Version 1 packets will not have message id's
        //     if self.dataLength == 0:
        //     return self.FINISHED_STATE # We are done if we don't have any payload
        //     if self.dataLength <= SdlProtocol.SdlProtocol.V1_V2_MTU_SIZE - SdlProtocol.SdlProtocol.V1_HEADER_SIZE:
        //     self.payload =  bytearray(self.dataLength)
        // else :
        //     return self.ERROR_STATE
        //     self.dumpSize = self.dataLength
        //     return self.DATA_PUMP_STATE
        // else:
        //     return self.MESSAGE_1_STATE
        //     elif state == self.MESSAGE_1_STATE:
        //     self.messageId += (raw_byte & 0xFF) << 24 # 3bytesx8bits
        //     return self.MESSAGE_2_STATE
        //     elif state == self.MESSAGE_2_STATE:
        //     self.messageId += (raw_byte & 0xFF) << 16 # 2bytesx8bits
        //     return self.MESSAGE_3_STATE
        //     elif state == self.MESSAGE_3_STATE:
        //     self.messageId += (raw_byte & 0xFF) << 8 # 1bytex8bits
        //     return self.MESSAGE_4_STATE
        //     elif state == self.MESSAGE_4_STATE:
        //     self.messageId += raw_byte & 0xFF
        //     if self.dataLength == 0:
        //     return self.FINISHED_STATE; # We are done if we don't have any payload
        //     # TODO We might need a try/catch or w/e the hell it is in python for OOM
        //     try:
        //     self.payload = bytearray(self.dataLength)
        //     except Exception:
        //     return self.ERROR_STATE
        //     self.dumpSize = self.dataLength
        //     return self.DATA_PUMP_STATE
        //     elif state == self.DATA_PUMP_STATE:
        //     self.payload[self.dataLength - self.dumpSize] = raw_byte;
        //     self.dumpSize -= 1  # Do we have any more bytes to  read in?
        //     if self.dumpSize > 0:
        //     return self.DATA_PUMP_STATE
        //     elif self.dumpSize == 0:
        //     return self.FINISHED_STATE
        // else:
        //     return self.ERROR_STATE
        //     elif state == self.FINISHED_STATE: # We shouldn't be here...Should have been reset
        //     return self.ERROR_STATE
        // else:
        //     return self.ERROR_STATE
    }

    /**
     * Return data required.
     * @param chunk
     * @returns {SdlPsm}
     */
    static parseChunk(chunk) {
        let sdlPsm = new SdlPsm();

        //may be more data.
        sdlPsm.data = chunk;

        let byteCount = 0;
        for (let byte of chunk) {
            byteCount++;
            // console.log(`read byte`,byte);
            let success = sdlPsm.readByte(byte);

            if (!success) {
                break;
            }

        }

        // TODO called from tcpmessagehandler
        if (sdlPsm.isFinished)
        {
            sdlPsm.initData();

        }
        else {
            console.error(`Message not finished`)
            sdlPsm.initData();

        }

        return sdlPsm;

    }

    /**
     * After reading each byte parse the data
     *
     */
    initData() {
        let self = this;

        //could be a simple Uint8Array or could be a stream
        let data = self.data;

        let {
            state,
            version,
            sessionId,
            dataLength,
            compression,
            frameType,
            serviceType,
            controlFrameInfo,
            messageId,
            dataStart,
            states,
        } = self;

        let dataStartFix = dataStart - 1;
        let dataLoad = data.slice(dataStartFix);

        let jsonDataLoad;

        //data after the meta, state, version frame type, etc.
        self.dataLoad = dataLoad;

        if (version == 1) {
            //payload from bocks " protocolVersion5.2.0" { state: 255, function_id: undefined, version: 1, frameType: 0 }
            if (frameType == 0) {
                let message_size;
                logger.info(`sdlpsm`, { frameType, version });
                self.fullDataStr = SdlPsm.uint8arrayToStringMethod(dataLoad);
                const binary_frame_header = new Uint8Array(dataLoad.slice(0, 4));

                message_size = (binary_frame_header[0] & 0x0F) << 24;//  # TODO check if this is right with the mask
                message_size += (binary_frame_header[1] & 0xFF) << 16;
                message_size += (binary_frame_header[2] & 0xFF) << 8;
                message_size += binary_frame_header[3] & 0xFF;

                logger.info(`sdlpsm`, { frameType, version, message_size, dataStart, dataLength });

            }
            return;
        } else {
            if (version > 1) {

                //TODO how do I know this is an rpc?
                //russ-misc/SdlProxy/rpc/RpcStruct.py
                //5.2.1 BINARY HEADER
                if (frameType == 1) {
                    try {
                        let {
                            jsonDataLoad,
                            function_id,
                            json_size,
                            rpc_type,
                            correlation_id,
                            jsonData
                        } = SdlPsm.parseSingleFrame(dataLoad);

                        //push rpc frame.
                        self.frames.push({
                                             json_size,
                                             function_id,
                                             rpc_type,
                                             correlation_id,
                                             jsonData,
                                             jsonDataLoad,
                                         });

                        // self.function_id = function_id;
                        // self.json_size = json_size;
                        // self.rpc_type = rpc_type;
                        // self.correlation_id = correlation_id;
                        // self.jsonData = jsonData;
                        // self.jsonDataLoad = jsonDataLoad;

                        // logger.info(`parsed data`,self.jsonData,self.rpc_type);
                        // process.exit(1);
                    } catch (e) {
                        logger.info(`frameType ${frameType}`, e.message);

                        logger.info(`data`, SdlPsm.uint8arrayToStringMethod(dataLoad));

                        throw new Error(e);
                    }

                } else if (frameType === 0) {
                    return;
                } else {
                    throw new Error(`unsupported frame type ${frameType}`);
                }

            }
        }

    }

    static uint8arrayToStringMethod(myUint8Arr) {
        //TODO what is happening with this payload: "2/{}"

        //2
        //4
        // let newArry = myUint8Arr.slice(10);
        // let newArry = myUint8Arr.slice(0);

        // logger.info(`uint8arrayToStringMethod`,newArry);

        var ab2str = require('arraybuffer-to-string');

        // var uint8 = new Uint8Array([ 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33 ])

        // logger.info(ab2str(uint8)); // 'Hello World!'

        // let str =  String.fromCharCode.apply(null, newArry);

        let str = ab2str(myUint8Arr);
        // logger.info(`str`,str);
        return str;
    }

    //TODO move to packet.
    // russ-misc/SdlProxy/protocol/SdlPacket.py
    static constructPacket(
        packetObj,
    ) {
        let { version, serviceType, frameInfo, sessionId, messageId, frameType, payload } = packetObj;



        let HEADER_SIZE = 12;
        let HEADER_SIZE_V1 = 8;  //# Backwards

        let size;
        //     let size = 0
        //     if self.version == 1:
        //     size = self.HEADER_SIZE_V1 + self.dataSize
        // else:

        size = HEADER_SIZE;

        // # buffer = bytearray(size)  # TODO look into bytes over bytearray

        // buffer = bytearray()

        let buffer = [];

        // def get_encryption_bit(encryption):
        // if encryption:
        // return SdlPacket.ENCRYPTION_MASK
        // else:
        //     return 0

        // payload = rai.encode()
        // packet = SdlPacket.SdlPacket.create_sdl_packet(self.version, False, SdlPacket.SdlPacket.FRAME_TYPE_SINGLE,
        //                                                ServiceType.RPC, 0x00, self.session_id, len(payload), 2,
        //                                                payload)
        //not encrypted.

        let dataSize = payload.length;

        let encryptionBit = 0;

        let result;

        logger.info(`construct sessionId`,sessionId);
        buffer.push((version << 4) + encryptionBit + frameType);
        buffer.push(serviceType);
        buffer.push(frameInfo);
        buffer.push(sessionId);

        buffer.push(((dataSize & 0xFF000000) >> 24));
        buffer.push(((dataSize & 0x00FF0000) >> 16));
        buffer.push(((dataSize & 0x0000FF00) >> 8));
        buffer.push((dataSize & 0x000000FF));

        if (version === 5) {
            buffer.push(((messageId & 0xFF000000) >> 24));
            buffer.push(((messageId & 0x00FF0000) >> 16));
            buffer.push(((messageId & 0x0000FF00) >> 8));
            buffer.push((messageId & 0x000000FF));
            if (payload) {
                logger.info(`adding payload`);

                let buffer1 = new Uint8Array(buffer);
                let buffer2 = new Uint8Array(payload);
                result = new Uint8Array([...buffer1, ...buffer2]);
                //add payload to buffer;
                // buffer.push(self.payload[i])  # TODO there's got to be a better way
            }
        } else {
            throw new Error(`unsupported version ${version}`);
        }

        return result;

        // if self.version > 1:
        // buffer.push(((self.messageId & 0xFF000000) >> 24))
        // buffer.push(((self.messageId & 0x00FF0000) >> 16))
        // buffer.push(((self.messageId & 0x0000FF00) >> 8))
        // buffer.push((self.messageId & 0x000000FF))
        // if self.payload is not None and len(self.payload) > 0:
        // for i in range(0, len(self.payload)):
        // buffer.push(self.payload[i])  # TODO there's got to be a better way
        // return buffer
    }

    static parseSingleFrame(dataLoad) {
        // const bsonAry = new Uint8Array(dataLoad.slice(0,5));

        let function_id, json_size, correlation_id, rpc_type;
        // 0x00 Control Frame
        // 0x01 Single Frame
        // 0x02 First Frame
        // 0x03 Consecutive Frame
        // 0x04 - 0x07 Reserved
        //Total size of the original payload being parsed

        const binary_frame_header = new Uint8Array(dataLoad.slice(0, 12));

        //if single frame this is just the rest of it.

        // logger.info(`binary_frame_header`,binary_frame_header,binary_frame_header[11]);

        // 0x0 Request
        // 0x1 Response
        // 0x2 Notification
        // 0x3 - 0xF Reserved
        rpc_type = binary_frame_header[0] >> 4;

        function_id = (binary_frame_header[0] & 0x0F) << 24;  //# TODO check if this is right with the mask
        function_id += (binary_frame_header[1] & 0xFF) << 16;
        function_id += (binary_frame_header[2] & 0xFF) << 8;
        function_id += binary_frame_header[3] & 0xFF;

        //correlation id not to be confused with messageId which is the id for the full message.
        correlation_id = (binary_frame_header[4] & 0xFF) << 24;
        correlation_id += (binary_frame_header[5] & 0xFF) << 16;
        correlation_id += (binary_frame_header[6] & 0xFF) << 8;
        correlation_id += binary_frame_header[7] & 0xFF;

        json_size = (binary_frame_header[8] & 0xFF) << 24;
        json_size += (binary_frame_header[9] & 0xFF) << 16;
        json_size += (binary_frame_header[10] & 0xFF) << 8;
        json_size += binary_frame_header[11] & 0xFF;

        let jsonDataLoad = dataLoad.slice(12, 12 + json_size);
        let jsonDataStr = SdlPsm.uint8arrayToStringMethod(jsonDataLoad);

        //TODO PUTFILE function_id

        let method = this.getFunctionById(function_id);

        if (method === 'PutFile')
        {
            let jsonData = JSON.parse(jsonDataStr);

            let {fileType,persistentFile,syncFileName} = jsonData;

            if (rpc_type === SdlPsm.RPC_TYPE_REQUEST)
            {

                // logger.info(`parseSingleFrame TODO special PutFile handling`,jsonDataStr);

                // let fileData = dataLoad.slice(12 + json_size + 1);
                let fileData = dataLoad.slice(12 + json_size);

                let fileDataStr = SdlPsm.uint8arrayToStringMethod(fileData);

                //parseSingleFrame fileDataStr PNG

                //parseSingleFrame fileDataStr PNG
                //parseSingleFrame TODO special PutFile handling {"fileType":"GRAPHIC_PNG","persistentFile":true,"syncFileName":"ic_launcher.png"}
                // logger.info(`parseSingleFrame fileDataStr "${fileDataStr.substr(0,10)}"`);

                const fs = require('fs');

                let path = require('path');
                let location;
                if (persistentFile)
                {
                    location = path.resolve(__dirname,`images`,`persistent`,syncFileName)
                }
                else {
                    location = path.resolve(__dirname,`images`,`persistent`,syncFileName)
                }
                fs.writeFileSync(location,fileData);
            }
        }

        return {
            jsonDataLoad,
            function_id,
            json_size,
            rpc_type,
            correlation_id,
            jsonData: JSON.parse(jsonDataStr)
        };
    }

    //TODO messageId = correlation_id. in the rpc it is called messageId.

    static buildRPCMainBuffer(params, function_id, rpc_type, correlation_id,bufferExtra) {
        // self.json_object = json.dumps(self.params, ensure_ascii=False)
        let json_object = JSON.stringify(params);

        // print(self.json_object)
        // buffer = bytearray();

        // let buffer = new ArrayBuffer();
        // let buffer = new Uint8Array();

        let buffer = [];

        buffer.push(((function_id & 0x0F000000) >> 24) + (rpc_type << 4));
        buffer.push(((function_id & 0x00FF0000) >> 16));
        buffer.push(((function_id & 0x0000FF00) >> 8));
        buffer.push((function_id & 0x000000FF));

        logger.info(`build correlation id`, correlation_id);
        //TODO deconstruction of base 10 number to these bytes makes more sense to me. study this to understand.
        buffer.push(((correlation_id & 0xFF000000) >> 24));
        buffer.push(((correlation_id & 0x00FF0000) >> 16));
        buffer.push(((correlation_id & 0x0000FF00) >> 8));
        buffer.push((correlation_id & 0x000000FF));

        let json_size = json_object.length;
        // json_size = len(self.json_object);

        buffer.push(((json_size & 0xFF000000) >> 24));
        buffer.push(((json_size & 0x00FF0000) >> 16));
        buffer.push(((json_size & 0x0000FF00) >> 8));
        buffer.push((json_size & 0x000000FF));

        var str2ab = require('string-to-arraybuffer');

        let json_buffer = str2ab(json_object);

        let bufferStart = new Uint8Array(buffer);
        let bufferJson = new Uint8Array(json_buffer);


        let bufferFinal = new Uint8Array([...bufferStart, ...bufferJson]);

        if (bufferExtra)
        {
            bufferFinal = new Uint8Array([...bufferFinal, ...bufferExtra]);
        }

        //TODO don't know what is going on here.
        // buffer.extend(self.json_object.encode());

        // let result = buffer.concat(json_buffer);

        // logger.info('packet: ', this.uint8arrayToStringMethod(bufferStart));
        // logger.info('packet: ', this.uint8arrayToStringMethod(bufferJson));
        logger.info('buffer final: ');
        logger.info(this.uint8arrayToStringMethod(bufferFinal));

        return bufferFinal;
    }

    static compareUint8Buffers(buffer1, buffer2) {

        let buffer1Str = this.uint8arrayToStringMethod(buffer1);
        let buffer2Str = this.uint8arrayToStringMethod(buffer2);

        if (buffer1Str !== buffer2Str) {
            logger.info({ buffer1, buffer2, buffer1Str, buffer2Str }, `error not matching`);
        } else {
            logger.info({ buffer1, buffer2, buffer1Str, buffer2Str }, `buffers match`);
        }
    }

    static getNextMessageId() {
        this.nextMessageId++;
        return this.nextMessageId;
    }

    //TODO messageId and correlationId.
    //messageId is a part of the sessionId/data size info.
    //correlationId is part of the rpc request alongside the json size etc.
    /**
     * returns rpc data to send
     * @param rpcObj
     */
    static buildRPC(rpcObj) {
        let version = 5;
        let frameInfo = 0;
        let frameType = 1;
        let serviceType = SdlPsm.SERVICE_TYPE_RPC;

        //TODO get sessionId and messageId elsewhere if not provided.
        //TODO frameType based on requirements of rpc requested.

        //TODO SdlSession should have sessionId

        //TODO remove original data. compare these data strings to ensure equality. sanity check
        let {
            buffer, //buffer to append on putfile etc.
            requestJSON, sessionId, messageId,
            // frameType,
            originalData, rpcType, dataLoad,
            correlation_id,
            // version
        } = rpcObj;

        if (!sessionId)
        {
            throw new Error(`sessionId is required buildRPC`);
        }

        rpcType = rpcType === undefined ? SdlPsm.RPC_TYPE_REQUEST : rpcType;
        messageId = messageId || this.getNextMessageId();

        let { method, params } = requestJSON;


        let rpcFunc = this.getFunctionByName(method);

        // let rpcFunc = this.getFunctionById(); functionByName[method];
        if (rpcFunc === undefined) {
            console.error(`requestJSON`, requestJSON);
            throw new Error(`Function ${method} not found`);
        }

        // logger.info(`buildRPC original Data`,originalData8Array,this.uint8arrayToStringMethod(originalData8Array));
        // logger.info(`buildRPC original Data`, originalData8Array);

        let { functionId } = rpcFunc;
        let mainData = JSON.stringify(params);

        //json data buffer.
        //also need to add the rpc types etc.
        let mainBuffer = this.buildRPCMainBuffer(params, functionId, rpcType, correlation_id,buffer);

        //TODO remove this testing only.
        if (dataLoad) {
            this.compareUint8Buffers(mainBuffer, dataLoad);

            let originalDataFrameResult = SdlPsm.parseSingleFrame(dataLoad);

            let mainBufferFrameData = SdlPsm.parseSingleFrame(mainBuffer);

            logger.info(
                // jsonDataLoad,
                originalDataFrameResult.function_id,
                originalDataFrameResult.json_size,
                originalDataFrameResult.rpc_type,
                originalDataFrameResult.correlation_id, //correlation id in the main data or meta or are there 2 ids?
                originalDataFrameResult.jsonData
            );

            //TODO correlation_id does not match...
            logger.info(
                // jsonDataLoad,
                mainBufferFrameData.function_id,
                mainBufferFrameData.json_size,
                mainBufferFrameData.rpc_type,
                mainBufferFrameData.correlation_id,
                mainBufferFrameData.jsonData
            );
        }

        let fullPacket =
            SdlPsm.constructPacket({
                                       version,
                                       serviceType,
                                       frameInfo,
                                       sessionId,
                                       messageId,
                                       frameType,
                                       payload: mainBuffer
                                   });

        if (originalData) {
            let originalData8Array = new Uint8Array(originalData);
            let originalFullPacketStr = this.uint8arrayToStringMethod(originalData8Array);

            let fullPacketStr = this.uint8arrayToStringMethod(fullPacket);
            logger.info(`fullPacketStr`, fullPacketStr, originalFullPacketStr);

            this.compareUint8Buffers(originalData8Array, fullPacket);

            let sdl1 = SdlPsm.parseChunk(originalData8Array);
            let sdl2 = SdlPsm.parseChunk(fullPacket);

            if (sdl1) {
                let {
                    state,
                    version,
                    sessionId,
                    dataLength,
                    compression,
                    frameType,
                    serviceType,
                    controlFrameInfo,
                    messageId,
                    dataStart,
                    states,
                    // jsonData,
                    function_id,
                    fullDataStr,
                    frames,
                } = sdl1;
                logger.info({
                                state,
                                version,
                                sessionId,
                                dataLength,
                                compression,
                                frameType,
                                serviceType,
                                controlFrameInfo,
                                messageId,
                                dataStart,
                                states,
                                // jsonData,
                                function_id,
                                // fullDataStr,
                                // frames,
                            });
            }

            if (sdl2) {
                let {
                    state,
                    version,
                    sessionId,
                    dataLength,
                    compression,
                    frameType,
                    serviceType,
                    controlFrameInfo,
                    messageId,
                    dataStart,
                    states,
                    // jsonData,
                    function_id,
                    fullDataStr,
                    frames,
                } = sdl2;
                logger.info({
                                state,
                                version,
                                sessionId,
                                dataLength,
                                compression,
                                frameType,
                                serviceType,
                                controlFrameInfo,
                                messageId,
                                dataStart,
                                states,
                                // jsonData,
                                function_id,
                                // fullDataStr,
                                // frames,
                            });
            }

        }

        let check = false;
        if (check)
        {
            let sdl = SdlPsm.parseChunk(fullPacket);

            let {
                version,
                sessionId,
                frameType,
                serviceType,
                messageId,
                dataStart,
                frames,
            } = sdl;

            logger.info(`checking`,{
                            version,
                            sessionId,
                            frameType,
                            serviceType,
                            messageId,
                            dataStart,
                            frames,
                        }
            );

            let rpcFrame = frames[0];

            let {jsonData,function_id} = rpcFrame;

            logger.info(`checking data`,{jsonData,function_id});

            // throw new Error(`invalid`);
        }

        return fullPacket;

    }


    static getFunctionByName(name)
    {
        // let functionByName = {
        //     //https://github.com/smartdevicelink/rpc_spec/blob/version/6_0_0/MOBILE_API.xml#L2655
        //     'Show': {
        //         functionId: 13
        //     },
        //     'GetVehicleData': {
        //         functionId: SdlPsm.RPC_FUNCTION_ID_GET_VEHICLE_DATA
        //     },
        //     'SubscribeVehicleData': {
        //         functionId: 20
        //     }
        // };

        return SdlPsm.functionByName[name];
    }


    static get functionById()
    {
        let functionById = {
            13: 'Show',
        };


        functionById[1] = 'RegisterAppInterface';
        functionById[34] = 'ListFiles';
        functionById[5] = 'AddCommand';
        functionById[36] = 'SetDisplayLayout';
        functionById[35] = 'SetAppIcon';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[1] = 'RegisterAppInterface';
        functionById[43] = 'GetInteriorVehicleData';
        functionById[48] = 'GetSystemCapability';
        functionById[44] = 'SetInteriorVehicleData';

        functionById[SdlPsm.RPC_FUNCTION_ID_GET_VEHICLE_DATA] = 'GetVehicleData';
        functionById[20] = 'SubscribeVehicleData';


        functionById[32] = 'PutFile';

        //notifications
        //https://github.com/smartdevicelink/rpc_spec/blob/version/6_0_0/MOBILE_API.xml#L2705
        functionById[32772] = 'OnVehicleData';

        functionById[32768] = 'OnHMIStatus';

        return functionById;
    }
    //
    // static functionById = (function() {
    //
    //
    // })();


    static get functionByName() {
        let functionById = SdlPsm.functionById;

        let functionByName = {};
        for (let id in functionById)
        {
            let functionName = functionById[id];

            functionByName[functionName] = {
                functionId: id,
            }
        }
        return functionByName;
    };


    //getFunctionById
    static getFunctionById(id)
    {
        return SdlPsm.functionById[id];
    }

    static testSend() {
        //�A{"mainField4":"","mainField3":"","mainField2":"","mainField1":""}
        let dataAry = new Uint8Array(
            [
                81,
                7,
                0,
                1,
                0,
                0,
                0,
                77,
                0,
                0,
                0,
                24,
                0,
                0,
                0,
                13,
                0,
                0,
                15,
                152,
                0,
                0,
                0,
                65,
                123,
                34,
                109,
                97,
                105,
                110,
                70,
                105,
                101,
                108,
                100,
                52,
                34,
                58,
                34,
                34,
                44,
                34,
                109,
                97,
                105,
                110,
                70,
                105,
                101,
                108,
                100,
                51,
                34,
                58,
                34,
                34,
                44,
                34,
                109,
                97,
                105,
                110,
                70,
                105,
                101,
                108,
                100,
                50,
                34,
                58,
                34,
                34,
                44,
                34,
                109,
                97,
                105,
                110,
                70,
                105,
                101,
                108,
                100,
                49,
                34,
                58,
                34,
                34,
                125]
        );

        let sdlPsm = SdlPsm.parseChunk(dataAry);

        let {
            state,
            version,
            sessionId,
            dataLength,
            compression,
            frameType,
            serviceType,
            controlFrameInfo,
            messageId,
            dataStart,
            states,
            // jsonData,
            function_id,
            fullDataStr,
            dataLoad,
            frames,
        } = sdlPsm;

        let { correlation_id, jsonData } = frames[0];

        logger.info(`testSend`, this.uint8arrayToStringMethod(dataAry));

        let requestJSON = {
            method: `Show`,
            params: jsonData,
        };

        logger.info({ requestJSON });

        let rpcObj = {
            correlation_id,
            messageId,
            requestJSON,
            function_id,
            originalData: dataAry,
            version,
            frameType,
            dataLoad,
            sessionId
            // function_id,
            // version,
            // frameType,
            // dataStart,
            // dataLength,

            // state
        };

        let sdlPsmRequest = SdlPsm.buildRPC(rpcObj);

    }

    // def get_formed_packet(self):
    // if self.state == self.FINISHED_STATE:
    // return SdlPacket.SdlPacket.create_sdl_packet(self.version, self.compression, self.frameType, self.serviceType,
    // self.controlFrameInfo, self.sessionId, self.dataLength, self.messageId,
    // self.payload)
    // else:
    // return None

};

//TODO move this to session manager.
SdlPsm.nextMessageId = 0;


SdlPsm.RPC_FUNCTION_ID_GET_VEHICLE_DATA = 22;

// 0x0 Request
// 0x1 Response
// 0x2 Notification
// 0x3 - 0xF Reserved

//main meta 1st frame?
//version<1>frame_type<1>data_start<1>data_length<1>
//rpc data 2nd frame? rpc payload
// binary header,json data
//type<1>correlation_id<1>json_size<1>

//This is part of the main rpc data which is after the version,frametype,datastart info at the very beginning.
//https://smartdevicelink.com/en/guides/sdl-overview-guides/protocol-spec/
SdlPsm.RPC_TYPE_REQUEST = 0x0;
SdlPsm.RPC_TYPE_RESPONSE = 0x0;
SdlPsm.RPC_TYPE_NOTIFICATION = 0x0;
SdlPsm.RPC_TYPE_RESERVED = 0x0;

// Service Type	8 bit	0x00 Control Service
// 0x01 - 0x06 Reserved
// 0x07 Remote Procedure Call (RPC) Service
// 0x08 - 0x09 Reserved
// 0x0A Audio Service
// 0x0B Video Service
// 0x0C - 0x0E Reserved
// 0x0F Bulk Data (Hybrid Service)
// 0x10 - 0xFF Reserved
SdlPsm.SERVICE_TYPE_RPC = 0x07;

SdlPsm.START_STATE = 0x0;
SdlPsm.SERVICE_TYPE_STATE = 0x02;
SdlPsm.CONTROL_FRAME_INFO_STATE = 0x03;
SdlPsm.SESSION_ID_STATE = 0x04;
SdlPsm.DATA_SIZE_1_STATE = 0x05;
SdlPsm.DATA_SIZE_2_STATE = 0x06;
SdlPsm.DATA_SIZE_3_STATE = 0x07;
SdlPsm.DATA_SIZE_4_STATE = 0x08;
SdlPsm.MESSAGE_1_STATE = 0x09;
SdlPsm.MESSAGE_2_STATE = 0x0A;
SdlPsm.MESSAGE_3_STATE = 0x0B;
SdlPsm.MESSAGE_4_STATE = 0x0C;
SdlPsm.DATA_PUMP_STATE = 0x0D;
SdlPsm.FINISHED_STATE = 0xFF;
SdlPsm.ERROR_STATE = -1;

SdlPsm.FIRST_FRAME_DATA_SIZE = 0x08;
SdlPsm.VERSION_MASK = 0xF0;  //# 4 highest bits
SdlPsm.COMPRESSION_MASK = 0x08;  //# 4th lowest bit
SdlPsm.FRAME_TYPE_MASK = 0x07;  //# 3 lowest bits

SdlPsm.INIT_REQUEST = new Uint8Array([
                                         16,
                                         7,
                                         1,
                                         0,
                                         0,
                                         0,
                                         0,
                                         32,
                                         32,
                                         0,
                                         0,
                                         0,
                                         2,
                                         112,
                                         114,
                                         111,
                                         116,
                                         111,
                                         99,
                                         111,
                                         108,
                                         86,
                                         101,
                                         114,
                                         115,
                                         105,
                                         111,
                                         110,
                                         0,
                                         6,
                                         0,
                                         0,
                                         0,
                                         53,
                                         46,
                                         50,
                                         46,
                                         48,
                                         0,
                                         0]);

module.exports = SdlPsm;
