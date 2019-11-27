/*
* Copyright (c) 2019, Livio, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { SdlPacket } from './SdlPacket.js';
import { ControlFrameTags } from './enums/ControlFrameTags.js'
import { BitConverter } from './../util/BitConverter.js';
import { FrameType } from './enums/FrameType.js';

/**
 * Creates control packets.
 * For regular RPC RPCMessage should be used.
 */
class SdlPacketFactory {
    /**
     * Creates a heartbeat acknowlegement packet.
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID 
     * @param {Number} version 
     * @returns {SdlPacket}
     */
    static createHeartbeatACK (serviceType, sessionID, version) {
        return new SdlPacket(version, false, FrameType.CONTROL,
            serviceType, SdlPacket.FRAME_INFO_HEART_BEAT_ACK, sessionID,
            0, 0, null);
    }

    /**
     * Creates an end session packet.
     * @param {ServiceType} serviceType 
     * @param {Number} sessionID 
     * @param {Number} messageID 
     * @param {Number} version 
     * @param {Number} hashID 
     */
    static createEndSession (serviceType, sessionID, messageID, version, hashID) {
        if (version < 5) {
            const payload = new Uint8Array(BitConverter.int32ToArrayBuffer(hashID));
            return new SdlPacket(version, false, FrameType.CONTROL,
                serviceType, SdlPacket.FRAME_INFO_END_SERVICE, sessionID,
                payload.length, messageID, payload, 0, payload.length);
        } else {
            const endSession = new SdlPacket(version, false, FrameType.CONTROL,
                serviceType, SdlPacket.FRAME_INFO_END_SERVICE, sessionID,
                0, messageID, null);
            endSession.putTag(ControlFrameTags.RPC.EndService.HASH_ID, hashID);
            return endSession;
        }
    }
}

export { SdlPacketFactory };