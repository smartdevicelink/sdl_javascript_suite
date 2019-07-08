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


// FIXME: these sub-classes need to be extracted into their own classes rather than nested and re-written to follow the GUIDELINES
class ControlFrameTags {

    StartServiceACKBase = class StartServiceACKBase {
        MTU = "mtu";
    }

    NAKBase = class NAKBase {
        REJECTED_PARAMS = "rejectedParams";
    }

    RPC = class RPC {
        StartService = class StartService {
            /** The max version of the protocol supported by client requesting service to start.<br>
			* Must be in the format "Major.Minor.Patch"
			*/
            PROTOCOL_VERSION = "protocolVersion";
        }

        StartServiceACK = class StartServiceACK extends StartServiceACKBase {
            /** The negotiated version of the protocol. Must be in the format "Major.Minor.Patch"*/
            PROTOCOL_VERSION = StartService.PROTOCOL_VERSION;
            /** Hash ID to identify this service and used when sending an EndService control frame*/
            HASH_ID = "hashId";
            /** HU allowed transport for secondary connection */
            SECONDARY_TRANSPORTS = "secondaryTransports";
            /** HU allowed transports for audio and video services (1 == Primary, 2 == Secondary) */
            AUDIO_SERVICE_TRANSPORTS = "audioServiceTransports";
            VIDEO_SERVICE_TRANSPORTS = "videoServiceTransports";
            /** Auth token to be used for log in into services **/
            AUTH_TOKEN = "authToken";
        }

        StartServiceNAK = class StartServiceNAK extends NAKBase {}

        EndService = class EndService {
            HASH_ID = RPC.StartServiceACK.HASH_ID;
        }

        EndServiceACK = class EndServiceACK {}

        EndServiceNAK = class EndServiceNAK extends NAKBase {}

        TransportEventUpdate = class TransportEventUpdate {
            TCP_IP_ADDRESS = "tcpIpAddress";
            TCP_PORT = "tcpPort";
        }

        RegisterSecondaryTransport = class RegisterSecondaryTransport {}

        RegisterSecondaryTransportACK = class RegisterSecondaryTransportACK {}

        RegisterSecondaryTransportNAK = class RegisterSecondaryTransportNAK extends NAKBase {
            REASON = "reason";
        }
    }


    Audio = class Audio {
        StartService = class StartService {}
        StartServiceACK = class StartServiceACK extends StartServiceACKBase {}
        StartServiceNAK = class StartServiceNAK extends NAKBase {}
        EndService = class EndService {}
        EndServiceACK = class EndServiceACK {}
        EndServiceNAK = class EndServiceNAK extends NAKBase {}
    }

    Video = class Video {
        StartService = class StartService {
            HEIGHT = "height";
            WIDTH = "width";
            VIDEO_PROTOCOL = "videoProtocol";
            VIDEO_CODEC = "videoCodec";
        }
        StartServiceACK = class StartServiceACK extends StartServiceACKBase {
            HEIGHT = StartService.HEIGHT;
            WIDTH = StartService.WIDTH;

        }
    }
}

export { ControlFrameTags };