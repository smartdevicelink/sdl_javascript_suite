/* eslint-disable camelcase */
/*
* Copyright (c) 2020, SmartDeviceLink Consortium, Inc.
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
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
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

import { Enum } from '../../../util/Enum.js';

/**
 * Enumeration of Static Icon Names.
 * @typedef {Enum} StaticIconName
 * @property {Object} _MAP
 */
class StaticIconName extends Enum {
    /**
     * Constructor for StaticIconName.
     * @class
     */
    constructor () {
        super();
    }

    /**
     * Icon Name accept call / active phone call in progress / initiate a phone call
     * Gets the enum value for ACCEPT_CALL
     * @returns {String} - The enum value.
     */
    static get ACCEPT_CALL () {
        return StaticIconName._MAP.ACCEPT_CALL;
    }

    /**
     * Icon Name add waypoint
     * Gets the enum value for ADD_WAYPOINT
     * @returns {String} - The enum value.
     */
    static get ADD_WAYPOINT () {
        return StaticIconName._MAP.ADD_WAYPOINT;
    }

    /**
     * Icon Name album
     * Gets the enum value for ALBUM
     * @returns {String} - The enum value.
     */
    static get ALBUM () {
        return StaticIconName._MAP.ALBUM;
    }

    /**
     * Icon Name ambient lighting
     * Gets the enum value for AMBIENT_LIGHTING
     * @returns {String} - The enum value.
     */
    static get AMBIENT_LIGHTING () {
        return StaticIconName._MAP.AMBIENT_LIGHTING;
    }

    /**
     * Icon Name arrow - north
     * Gets the enum value for ARROW_NORTH
     * @returns {String} - The enum value.
     */
    static get ARROW_NORTH () {
        return StaticIconName._MAP.ARROW_NORTH;
    }

    /**
     * Icon Name audio mute
     * Gets the enum value for AUDIO_MUTE
     * @returns {String} - The enum value.
     */
    static get AUDIO_MUTE () {
        return StaticIconName._MAP.AUDIO_MUTE;
    }

    /**
     * Icon Name audiobook episode
     * Gets the enum value for AUDIOBOOK_EPISODE
     * @returns {String} - The enum value.
     */
    static get AUDIOBOOK_EPISODE () {
        return StaticIconName._MAP.AUDIOBOOK_EPISODE;
    }

    /**
     * Icon Name audiobook narrator
     * Gets the enum value for AUDIOBOOK_NARRATOR
     * @returns {String} - The enum value.
     */
    static get AUDIOBOOK_NARRATOR () {
        return StaticIconName._MAP.AUDIOBOOK_NARRATOR;
    }

    /**
     * Icon Name auxillary audio
     * Gets the enum value for AUXILLARY_AUDIO
     * @returns {String} - The enum value.
     */
    static get AUXILLARY_AUDIO () {
        return StaticIconName._MAP.AUXILLARY_AUDIO;
    }

    /**
     * Icon Name back / return
     * Gets the enum value for BACK
     * @returns {String} - The enum value.
     */
    static get BACK () {
        return StaticIconName._MAP.BACK;
    }

    /**
     * Icon Name battery capacity 0 of 5
     * Gets the enum value for BATTERY_CAPACITY_0_OF_5
     * @returns {String} - The enum value.
     */
    static get BATTERY_CAPACITY_0_OF_5 () {
        return StaticIconName._MAP.BATTERY_CAPACITY_0_OF_5;
    }

    /**
     * Icon Name battery capacity 1 of 5
     * Gets the enum value for BATTERY_CAPACITY_1_OF_5
     * @returns {String} - The enum value.
     */
    static get BATTERY_CAPACITY_1_OF_5 () {
        return StaticIconName._MAP.BATTERY_CAPACITY_1_OF_5;
    }

    /**
     * Icon Name battery capacity 2 of 5
     * Gets the enum value for BATTERY_CAPACITY_2_OF_5
     * @returns {String} - The enum value.
     */
    static get BATTERY_CAPACITY_2_OF_5 () {
        return StaticIconName._MAP.BATTERY_CAPACITY_2_OF_5;
    }

    /**
     * Icon Name battery capacity 3 of 5
     * Gets the enum value for BATTERY_CAPACITY_3_OF_5
     * @returns {String} - The enum value.
     */
    static get BATTERY_CAPACITY_3_OF_5 () {
        return StaticIconName._MAP.BATTERY_CAPACITY_3_OF_5;
    }

    /**
     * Icon Name battery capacity 4 of 5
     * Gets the enum value for BATTERY_CAPACITY_4_OF_5
     * @returns {String} - The enum value.
     */
    static get BATTERY_CAPACITY_4_OF_5 () {
        return StaticIconName._MAP.BATTERY_CAPACITY_4_OF_5;
    }

    /**
     * Icon Name battery capacity 5 of 5
     * Gets the enum value for BATTERY_CAPACITY_5_OF_5
     * @returns {String} - The enum value.
     */
    static get BATTERY_CAPACITY_5_OF_5 () {
        return StaticIconName._MAP.BATTERY_CAPACITY_5_OF_5;
    }

    /**
     * Icon Name bluetooth audio source
     * Gets the enum value for BLUETOOTH_AUDIO_SOURCE
     * @returns {String} - The enum value.
     */
    static get BLUETOOTH_AUDIO_SOURCE () {
        return StaticIconName._MAP.BLUETOOTH_AUDIO_SOURCE;
    }

    /**
     * Icon Name bluetooth1
     * Gets the enum value for BLUETOOTH1
     * @returns {String} - The enum value.
     */
    static get BLUETOOTH1 () {
        return StaticIconName._MAP.BLUETOOTH1;
    }

    /**
     * Icon Name bluetooth2
     * Gets the enum value for BLUETOOTH2
     * @returns {String} - The enum value.
     */
    static get BLUETOOTH2 () {
        return StaticIconName._MAP.BLUETOOTH2;
    }

    /**
     * Icon Name browse
     * Gets the enum value for BROWSE
     * @returns {String} - The enum value.
     */
    static get BROWSE () {
        return StaticIconName._MAP.BROWSE;
    }

    /**
     * Icon Name cell phone in roaming mode
     * Gets the enum value for CELL_PHONE_IN_ROAMING_MODE
     * @returns {String} - The enum value.
     */
    static get CELL_PHONE_IN_ROAMING_MODE () {
        return StaticIconName._MAP.CELL_PHONE_IN_ROAMING_MODE;
    }

    /**
     * Icon Name cell service signal strength 0 of 5 bars
     * Gets the enum value for CELL_SERVICE_SIGNAL_STRENGTH_0_OF_5_BARS
     * @returns {String} - The enum value.
     */
    static get CELL_SERVICE_SIGNAL_STRENGTH_0_OF_5_BARS () {
        return StaticIconName._MAP.CELL_SERVICE_SIGNAL_STRENGTH_0_OF_5_BARS;
    }

    /**
     * Icon Name cell service signal strength 1 of 5 bars
     * Gets the enum value for CELL_SERVICE_SIGNAL_STRENGTH_1_OF_5_BARS
     * @returns {String} - The enum value.
     */
    static get CELL_SERVICE_SIGNAL_STRENGTH_1_OF_5_BARS () {
        return StaticIconName._MAP.CELL_SERVICE_SIGNAL_STRENGTH_1_OF_5_BARS;
    }

    /**
     * Icon Name cell service signal strength 2 of 5 bars
     * Gets the enum value for CELL_SERVICE_SIGNAL_STRENGTH_2_OF_5_BARS
     * @returns {String} - The enum value.
     */
    static get CELL_SERVICE_SIGNAL_STRENGTH_2_OF_5_BARS () {
        return StaticIconName._MAP.CELL_SERVICE_SIGNAL_STRENGTH_2_OF_5_BARS;
    }

    /**
     * Icon Name cell service signal strength 3 of 5 bars
     * Gets the enum value for CELL_SERVICE_SIGNAL_STRENGTH_3_OF_5_BARS
     * @returns {String} - The enum value.
     */
    static get CELL_SERVICE_SIGNAL_STRENGTH_3_OF_5_BARS () {
        return StaticIconName._MAP.CELL_SERVICE_SIGNAL_STRENGTH_3_OF_5_BARS;
    }

    /**
     * Icon Name cell service signal strength 4 of 5 bars
     * Gets the enum value for CELL_SERVICE_SIGNAL_STRENGTH_4_OF_5_BARS
     * @returns {String} - The enum value.
     */
    static get CELL_SERVICE_SIGNAL_STRENGTH_4_OF_5_BARS () {
        return StaticIconName._MAP.CELL_SERVICE_SIGNAL_STRENGTH_4_OF_5_BARS;
    }

    /**
     * Icon Name cell service signal strength 5 of 5 bars
     * Gets the enum value for CELL_SERVICE_SIGNAL_STRENGTH_5_OF_5_BARS
     * @returns {String} - The enum value.
     */
    static get CELL_SERVICE_SIGNAL_STRENGTH_5_OF_5_BARS () {
        return StaticIconName._MAP.CELL_SERVICE_SIGNAL_STRENGTH_5_OF_5_BARS;
    }

    /**
     * Icon Name change lane left
     * Gets the enum value for CHANGE_LANE_LEFT
     * @returns {String} - The enum value.
     */
    static get CHANGE_LANE_LEFT () {
        return StaticIconName._MAP.CHANGE_LANE_LEFT;
    }

    /**
     * Icon Name change lane right
     * Gets the enum value for CHANGE_LANE_RIGHT
     * @returns {String} - The enum value.
     */
    static get CHANGE_LANE_RIGHT () {
        return StaticIconName._MAP.CHANGE_LANE_RIGHT;
    }

    /**
     * Icon Name check box checked
     * Gets the enum value for CHECK_BOX_CHECKED
     * @returns {String} - The enum value.
     */
    static get CHECK_BOX_CHECKED () {
        return StaticIconName._MAP.CHECK_BOX_CHECKED;
    }

    /**
     * Icon Name check box unchecked
     * Gets the enum value for CHECK_BOX_UNCHECKED
     * @returns {String} - The enum value.
     */
    static get CHECK_BOX_UNCHECKED () {
        return StaticIconName._MAP.CHECK_BOX_UNCHECKED;
    }

    /**
     * Icon Name climate
     * Gets the enum value for CLIMATE
     * @returns {String} - The enum value.
     */
    static get CLIMATE () {
        return StaticIconName._MAP.CLIMATE;
    }

    /**
     * Icon Name clock
     * Gets the enum value for CLOCK
     * @returns {String} - The enum value.
     */
    static get CLOCK () {
        return StaticIconName._MAP.CLOCK;
    }

    /**
     * Icon Name compose (e.g. message)
     * Gets the enum value for COMPOSE
     * @returns {String} - The enum value.
     */
    static get COMPOSE () {
        return StaticIconName._MAP.COMPOSE;
    }

    /**
     * Icon Name contact / person
     * Gets the enum value for CONTACT
     * @returns {String} - The enum value.
     */
    static get CONTACT () {
        return StaticIconName._MAP.CONTACT;
    }

    /**
     * Icon Name continue
     * Gets the enum value for CONTINUE
     * @returns {String} - The enum value.
     */
    static get CONTINUE () {
        return StaticIconName._MAP.CONTINUE;
    }

    /**
     * Icon Name dash / bullet point
     * Gets the enum value for DASH
     * @returns {String} - The enum value.
     */
    static get DASH () {
        return StaticIconName._MAP.DASH;
    }

    /**
     * Icon Name date / calendar
     * Gets the enum value for DATE
     * @returns {String} - The enum value.
     */
    static get DATE () {
        return StaticIconName._MAP.DATE;
    }

    /**
     * Icon Name delete/remove - trash
     * Gets the enum value for DELETE
     * @returns {String} - The enum value.
     */
    static get DELETE () {
        return StaticIconName._MAP.DELETE;
    }

    /**
     * Icon Name destination
     * Gets the enum value for DESTINATION
     * @returns {String} - The enum value.
     */
    static get DESTINATION () {
        return StaticIconName._MAP.DESTINATION;
    }

    /**
     * Icon Name destination ferry ahead
     * Gets the enum value for DESTINATION_FERRY_AHEAD
     * @returns {String} - The enum value.
     */
    static get DESTINATION_FERRY_AHEAD () {
        return StaticIconName._MAP.DESTINATION_FERRY_AHEAD;
    }

    /**
     * Icon Name ebookmark (e.g. message, feed)
     * Gets the enum value for EBOOKMARK
     * @returns {String} - The enum value.
     */
    static get EBOOKMARK () {
        return StaticIconName._MAP.EBOOKMARK;
    }

    /**
     * Icon Name end call / reject call
     * Gets the enum value for END_CALL
     * @returns {String} - The enum value.
     */
    static get END_CALL () {
        return StaticIconName._MAP.END_CALL;
    }

    /**
     * Icon Name fail / X
     * Gets the enum value for FAIL
     * @returns {String} - The enum value.
     */
    static get FAIL () {
        return StaticIconName._MAP.FAIL;
    }

    /**
     * Icon Name fast forward 30 secs
     * Gets the enum value for FAST_FORWARD_30_SECS
     * @returns {String} - The enum value.
     */
    static get FAST_FORWARD_30_SECS () {
        return StaticIconName._MAP.FAST_FORWARD_30_SECS;
    }

    /**
     * Icon Name favorite / heart
     * Gets the enum value for FAVORITE_HEART
     * @returns {String} - The enum value.
     */
    static get FAVORITE_HEART () {
        return StaticIconName._MAP.FAVORITE_HEART;
    }

    /**
     * Icon Name favorite / star
     * Gets the enum value for FAVORITE_STAR
     * @returns {String} - The enum value.
     */
    static get FAVORITE_STAR () {
        return StaticIconName._MAP.FAVORITE_STAR;
    }

    /**
     * Icon Name fax number
     * Gets the enum value for FAX_NUMBER
     * @returns {String} - The enum value.
     */
    static get FAX_NUMBER () {
        return StaticIconName._MAP.FAX_NUMBER;
    }

    /**
     * Icon Name filename
     * Gets the enum value for FILENAME
     * @returns {String} - The enum value.
     */
    static get FILENAME () {
        return StaticIconName._MAP.FILENAME;
    }

    /**
     * Icon Name filter / search
     * Gets the enum value for FILTER
     * @returns {String} - The enum value.
     */
    static get FILTER () {
        return StaticIconName._MAP.FILTER;
    }

    /**
     * Icon Name folder
     * Gets the enum value for FOLDER
     * @returns {String} - The enum value.
     */
    static get FOLDER () {
        return StaticIconName._MAP.FOLDER;
    }

    /**
     * Icon Name fuel prices
     * Gets the enum value for FUEL_PRICES
     * @returns {String} - The enum value.
     */
    static get FUEL_PRICES () {
        return StaticIconName._MAP.FUEL_PRICES;
    }

    /**
     * Icon Name full map
     * Gets the enum value for FULL_MAP
     * @returns {String} - The enum value.
     */
    static get FULL_MAP () {
        return StaticIconName._MAP.FULL_MAP;
    }

    /**
     * Icon Name generic phone number
     * Gets the enum value for GENERIC_PHONE_NUMBER
     * @returns {String} - The enum value.
     */
    static get GENERIC_PHONE_NUMBER () {
        return StaticIconName._MAP.GENERIC_PHONE_NUMBER;
    }

    /**
     * Icon Name genre
     * Gets the enum value for GENRE
     * @returns {String} - The enum value.
     */
    static get GENRE () {
        return StaticIconName._MAP.GENRE;
    }

    /**
     * Icon Name global keyboard
     * Gets the enum value for GLOBAL_KEYBOARD
     * @returns {String} - The enum value.
     */
    static get GLOBAL_KEYBOARD () {
        return StaticIconName._MAP.GLOBAL_KEYBOARD;
    }

    /**
     * Icon Name highway exit information
     * Gets the enum value for HIGHWAY_EXIT_INFORMATION
     * @returns {String} - The enum value.
     */
    static get HIGHWAY_EXIT_INFORMATION () {
        return StaticIconName._MAP.HIGHWAY_EXIT_INFORMATION;
    }

    /**
     * Icon Name home phone number
     * Gets the enum value for HOME_PHONE_NUMBER
     * @returns {String} - The enum value.
     */
    static get HOME_PHONE_NUMBER () {
        return StaticIconName._MAP.HOME_PHONE_NUMBER;
    }

    /**
     * Icon Name hyperlink
     * Gets the enum value for HYPERLINK
     * @returns {String} - The enum value.
     */
    static get HYPERLINK () {
        return StaticIconName._MAP.HYPERLINK;
    }

    /**
     * Icon Name ID3 tag unknown
     * Gets the enum value for ID3_TAG_UNKNOWN
     * @returns {String} - The enum value.
     */
    static get ID3_TAG_UNKNOWN () {
        return StaticIconName._MAP.ID3_TAG_UNKNOWN;
    }

    /**
     * Icon Name incoming calls (in list of phone calls)
     * Gets the enum value for INCOMING_CALLS
     * @returns {String} - The enum value.
     */
    static get INCOMING_CALLS () {
        return StaticIconName._MAP.INCOMING_CALLS;
    }

    /**
     * Icon Name information
     * Gets the enum value for INFORMATION
     * @returns {String} - The enum value.
     */
    static get INFORMATION () {
        return StaticIconName._MAP.INFORMATION;
    }

    /**
     * Icon Name IPOD media source
     * Gets the enum value for IPOD_MEDIA_SOURCE
     * @returns {String} - The enum value.
     */
    static get IPOD_MEDIA_SOURCE () {
        return StaticIconName._MAP.IPOD_MEDIA_SOURCE;
    }

    /**
     * Icon Name join calls
     * Gets the enum value for JOIN_CALLS
     * @returns {String} - The enum value.
     */
    static get JOIN_CALLS () {
        return StaticIconName._MAP.JOIN_CALLS;
    }

    /**
     * Icon Name keep left
     * Gets the enum value for KEEP_LEFT
     * @returns {String} - The enum value.
     */
    static get KEEP_LEFT () {
        return StaticIconName._MAP.KEEP_LEFT;
    }

    /**
     * Icon Name keep right
     * Gets the enum value for KEEP_RIGHT
     * @returns {String} - The enum value.
     */
    static get KEEP_RIGHT () {
        return StaticIconName._MAP.KEEP_RIGHT;
    }

    /**
     * Icon Name key / keycode
     * Gets the enum value for KEY
     * @returns {String} - The enum value.
     */
    static get KEY () {
        return StaticIconName._MAP.KEY;
    }

    /**
     * Icon Name left
     * Gets the enum value for LEFT
     * @returns {String} - The enum value.
     */
    static get LEFT () {
        return StaticIconName._MAP.LEFT;
    }

    /**
     * Icon Name left arrow / back
     * Gets the enum value for LEFT_ARROW
     * @returns {String} - The enum value.
     */
    static get LEFT_ARROW () {
        return StaticIconName._MAP.LEFT_ARROW;
    }

    /**
     * Icon Name left exit
     * Gets the enum value for LEFT_EXIT
     * @returns {String} - The enum value.
     */
    static get LEFT_EXIT () {
        return StaticIconName._MAP.LEFT_EXIT;
    }

    /**
     * Icon Name LINE IN audio source
     * Gets the enum value for LINE_IN_AUDIO_SOURCE
     * @returns {String} - The enum value.
     */
    static get LINE_IN_AUDIO_SOURCE () {
        return StaticIconName._MAP.LINE_IN_AUDIO_SOURCE;
    }

    /**
     * Icon Name locked
     * Gets the enum value for LOCKED
     * @returns {String} - The enum value.
     */
    static get LOCKED () {
        return StaticIconName._MAP.LOCKED;
    }

    /**
     * Icon Name media control - left arrow
     * Gets the enum value for MEDIA_CONTROL_LEFT_ARROW
     * @returns {String} - The enum value.
     */
    static get MEDIA_CONTROL_LEFT_ARROW () {
        return StaticIconName._MAP.MEDIA_CONTROL_LEFT_ARROW;
    }

    /**
     * Icon Name media control - recording
     * Gets the enum value for MEDIA_CONTROL_RECORDING
     * @returns {String} - The enum value.
     */
    static get MEDIA_CONTROL_RECORDING () {
        return StaticIconName._MAP.MEDIA_CONTROL_RECORDING;
    }

    /**
     * Icon Name media control - right arrow
     * Gets the enum value for MEDIA_CONTROL_RIGHT_ARROW
     * @returns {String} - The enum value.
     */
    static get MEDIA_CONTROL_RIGHT_ARROW () {
        return StaticIconName._MAP.MEDIA_CONTROL_RIGHT_ARROW;
    }

    /**
     * Icon Name media control - stop (e.g. streaming)
     * Gets the enum value for MEDIA_CONTROL_STOP
     * @returns {String} - The enum value.
     */
    static get MEDIA_CONTROL_STOP () {
        return StaticIconName._MAP.MEDIA_CONTROL_STOP;
    }

    /**
     * Icon Name microphone
     * Gets the enum value for MICROPHONE
     * @returns {String} - The enum value.
     */
    static get MICROPHONE () {
        return StaticIconName._MAP.MICROPHONE;
    }

    /**
     * Icon Name missed calls (in list of phone calls)
     * Gets the enum value for MISSED_CALLS
     * @returns {String} - The enum value.
     */
    static get MISSED_CALLS () {
        return StaticIconName._MAP.MISSED_CALLS;
    }

    /**
     * Icon Name mobile phone number
     * Gets the enum value for MOBILE_PHONE_NUMBER
     * @returns {String} - The enum value.
     */
    static get MOBILE_PHONE_NUMBER () {
        return StaticIconName._MAP.MOBILE_PHONE_NUMBER;
    }

    /**
     * Icon Name move down / download
     * Gets the enum value for MOVE_DOWN
     * @returns {String} - The enum value.
     */
    static get MOVE_DOWN () {
        return StaticIconName._MAP.MOVE_DOWN;
    }

    /**
     * Icon Name move up
     * Gets the enum value for MOVE_UP
     * @returns {String} - The enum value.
     */
    static get MOVE_UP () {
        return StaticIconName._MAP.MOVE_UP;
    }

    /**
     * Icon Name MP3 tag artist
     * Gets the enum value for MP3_TAG_ARTIST
     * @returns {String} - The enum value.
     */
    static get MP3_TAG_ARTIST () {
        return StaticIconName._MAP.MP3_TAG_ARTIST;
    }

    /**
     * Icon Name navigation / navigation settings
     * Gets the enum value for NAVIGATION
     * @returns {String} - The enum value.
     */
    static get NAVIGATION () {
        return StaticIconName._MAP.NAVIGATION;
    }

    /**
     * Icon Name navigation current direction
     * Gets the enum value for NAVIGATION_CURRENT_DIRECTION
     * @returns {String} - The enum value.
     */
    static get NAVIGATION_CURRENT_DIRECTION () {
        return StaticIconName._MAP.NAVIGATION_CURRENT_DIRECTION;
    }

    /**
     * Icon Name negative rating - thumbs down
     * Gets the enum value for NEGATIVE_RATING_THUMBS_DOWN
     * @returns {String} - The enum value.
     */
    static get NEGATIVE_RATING_THUMBS_DOWN () {
        return StaticIconName._MAP.NEGATIVE_RATING_THUMBS_DOWN;
    }

    /**
     * Icon Name new/unread text message/email
     * Gets the enum value for NEW
     * @returns {String} - The enum value.
     */
    static get NEW () {
        return StaticIconName._MAP.NEW;
    }

    /**
     * Icon Name office phone number / work phone number
     * Gets the enum value for OFFICE_PHONE_NUMBER
     * @returns {String} - The enum value.
     */
    static get OFFICE_PHONE_NUMBER () {
        return StaticIconName._MAP.OFFICE_PHONE_NUMBER;
    }

    /**
     * Icon Name opened/read text message/email
     * Gets the enum value for OPENED
     * @returns {String} - The enum value.
     */
    static get OPENED () {
        return StaticIconName._MAP.OPENED;
    }

    /**
     * Icon Name origin / nearby locale / current position
     * Gets the enum value for ORIGIN
     * @returns {String} - The enum value.
     */
    static get ORIGIN () {
        return StaticIconName._MAP.ORIGIN;
    }

    /**
     * Icon Name outgoing calls (in list of phone calls)
     * Gets the enum value for OUTGOING_CALLS
     * @returns {String} - The enum value.
     */
    static get OUTGOING_CALLS () {
        return StaticIconName._MAP.OUTGOING_CALLS;
    }

    /**
     * Icon Name phone call 1
     * Gets the enum value for PHONE_CALL_1
     * @returns {String} - The enum value.
     */
    static get PHONE_CALL_1 () {
        return StaticIconName._MAP.PHONE_CALL_1;
    }

    /**
     * Icon Name phone call 2
     * Gets the enum value for PHONE_CALL_2
     * @returns {String} - The enum value.
     */
    static get PHONE_CALL_2 () {
        return StaticIconName._MAP.PHONE_CALL_2;
    }

    /**
     * Icon Name phone device
     * Gets the enum value for PHONE_DEVICE
     * @returns {String} - The enum value.
     */
    static get PHONE_DEVICE () {
        return StaticIconName._MAP.PHONE_DEVICE;
    }

    /**
     * Icon Name phonebook
     * Gets the enum value for PHONEBOOK
     * @returns {String} - The enum value.
     */
    static get PHONEBOOK () {
        return StaticIconName._MAP.PHONEBOOK;
    }

    /**
     * Icon Name photo / picture
     * Gets the enum value for PHOTO
     * @returns {String} - The enum value.
     */
    static get PHOTO () {
        return StaticIconName._MAP.PHOTO;
    }

    /**
     * Icon Name play / pause - pause active
     * Gets the enum value for PLAY
     * @returns {String} - The enum value.
     */
    static get PLAY () {
        return StaticIconName._MAP.PLAY;
    }

    /**
     * Icon Name playlist
     * Gets the enum value for PLAYLIST
     * @returns {String} - The enum value.
     */
    static get PLAYLIST () {
        return StaticIconName._MAP.PLAYLIST;
    }

    /**
     * Icon Name pop-up
     * Gets the enum value for POPUP
     * @returns {String} - The enum value.
     */
    static get POPUP () {
        return StaticIconName._MAP.POPUP;
    }

    /**
     * Icon Name positive rating - thumbs up
     * Gets the enum value for POSITIVE_RATING_THUMBS_UP
     * @returns {String} - The enum value.
     */
    static get POSITIVE_RATING_THUMBS_UP () {
        return StaticIconName._MAP.POSITIVE_RATING_THUMBS_UP;
    }

    /**
     * Icon Name power
     * Gets the enum value for POWER
     * @returns {String} - The enum value.
     */
    static get POWER () {
        return StaticIconName._MAP.POWER;
    }

    /**
     * Icon Name primary phone (favorite)
     * Gets the enum value for PRIMARY_PHONE
     * @returns {String} - The enum value.
     */
    static get PRIMARY_PHONE () {
        return StaticIconName._MAP.PRIMARY_PHONE;
    }

    /**
     * Icon Name radio button checked
     * Gets the enum value for RADIO_BUTTON_CHECKED
     * @returns {String} - The enum value.
     */
    static get RADIO_BUTTON_CHECKED () {
        return StaticIconName._MAP.RADIO_BUTTON_CHECKED;
    }

    /**
     * Icon Name radio button unchecked
     * Gets the enum value for RADIO_BUTTON_UNCHECKED
     * @returns {String} - The enum value.
     */
    static get RADIO_BUTTON_UNCHECKED () {
        return StaticIconName._MAP.RADIO_BUTTON_UNCHECKED;
    }

    /**
     * Icon Name recent calls / history
     * Gets the enum value for RECENT_CALLS
     * @returns {String} - The enum value.
     */
    static get RECENT_CALLS () {
        return StaticIconName._MAP.RECENT_CALLS;
    }

    /**
     * Icon Name recent destinations
     * Gets the enum value for RECENT_DESTINATIONS
     * @returns {String} - The enum value.
     */
    static get RECENT_DESTINATIONS () {
        return StaticIconName._MAP.RECENT_DESTINATIONS;
    }

    /**
     * Icon Name redo
     * Gets the enum value for REDO
     * @returns {String} - The enum value.
     */
    static get REDO () {
        return StaticIconName._MAP.REDO;
    }

    /**
     * Icon Name refresh
     * Gets the enum value for REFRESH
     * @returns {String} - The enum value.
     */
    static get REFRESH () {
        return StaticIconName._MAP.REFRESH;
    }

    /**
     * Icon Name remote diagnostics - check engine
     * Gets the enum value for REMOTE_DIAGNOSTICS_CHECK_ENGINE
     * @returns {String} - The enum value.
     */
    static get REMOTE_DIAGNOSTICS_CHECK_ENGINE () {
        return StaticIconName._MAP.REMOTE_DIAGNOSTICS_CHECK_ENGINE;
    }

    /**
     * Icon Name rendered 911 assist / emergency assistance
     * Gets the enum value for RENDERED_911_ASSIST
     * @returns {String} - The enum value.
     */
    static get RENDERED_911_ASSIST () {
        return StaticIconName._MAP.RENDERED_911_ASSIST;
    }

    /**
     * Icon Name repeat
     * Gets the enum value for REPEAT
     * @returns {String} - The enum value.
     */
    static get REPEAT () {
        return StaticIconName._MAP.REPEAT;
    }

    /**
     * Icon Name repeat play
     * Gets the enum value for REPEAT_PLAY
     * @returns {String} - The enum value.
     */
    static get REPEAT_PLAY () {
        return StaticIconName._MAP.REPEAT_PLAY;
    }

    /**
     * Icon Name reply
     * Gets the enum value for REPLY
     * @returns {String} - The enum value.
     */
    static get REPLY () {
        return StaticIconName._MAP.REPLY;
    }

    /**
     * Icon Name rewind 30 secs
     * Gets the enum value for REWIND_30_SECS
     * @returns {String} - The enum value.
     */
    static get REWIND_30_SECS () {
        return StaticIconName._MAP.REWIND_30_SECS;
    }

    /**
     * Icon Name right
     * Gets the enum value for RIGHT
     * @returns {String} - The enum value.
     */
    static get RIGHT () {
        return StaticIconName._MAP.RIGHT;
    }

    /**
     * Icon Name right exit
     * Gets the enum value for RIGHT_EXIT
     * @returns {String} - The enum value.
     */
    static get RIGHT_EXIT () {
        return StaticIconName._MAP.RIGHT_EXIT;
    }

    /**
     * Icon Name ringtones
     * Gets the enum value for RINGTONES
     * @returns {String} - The enum value.
     */
    static get RINGTONES () {
        return StaticIconName._MAP.RINGTONES;
    }

    /**
     * Icon Name roundabout left hand 1
     * Gets the enum value for ROUNDABOUT_LEFT_HAND_1
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_LEFT_HAND_1 () {
        return StaticIconName._MAP.ROUNDABOUT_LEFT_HAND_1;
    }

    /**
     * Icon Name roundabout left hand 2
     * Gets the enum value for ROUNDABOUT_LEFT_HAND_2
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_LEFT_HAND_2 () {
        return StaticIconName._MAP.ROUNDABOUT_LEFT_HAND_2;
    }

    /**
     * Icon Name roundabout left hand 3
     * Gets the enum value for ROUNDABOUT_LEFT_HAND_3
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_LEFT_HAND_3 () {
        return StaticIconName._MAP.ROUNDABOUT_LEFT_HAND_3;
    }

    /**
     * Icon Name roundabout left hand 4
     * Gets the enum value for ROUNDABOUT_LEFT_HAND_4
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_LEFT_HAND_4 () {
        return StaticIconName._MAP.ROUNDABOUT_LEFT_HAND_4;
    }

    /**
     * Icon Name roundabout left hand 5
     * Gets the enum value for ROUNDABOUT_LEFT_HAND_5
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_LEFT_HAND_5 () {
        return StaticIconName._MAP.ROUNDABOUT_LEFT_HAND_5;
    }

    /**
     * Icon Name roundabout left hand 6
     * Gets the enum value for ROUNDABOUT_LEFT_HAND_6
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_LEFT_HAND_6 () {
        return StaticIconName._MAP.ROUNDABOUT_LEFT_HAND_6;
    }

    /**
     * Icon Name roundabout left hand 7
     * Gets the enum value for ROUNDABOUT_LEFT_HAND_7
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_LEFT_HAND_7 () {
        return StaticIconName._MAP.ROUNDABOUT_LEFT_HAND_7;
    }

    /**
     * Icon Name roundabout right hand 1
     * Gets the enum value for ROUNDABOUT_RIGHT_HAND_1
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_RIGHT_HAND_1 () {
        return StaticIconName._MAP.ROUNDABOUT_RIGHT_HAND_1;
    }

    /**
     * Icon Name roundabout right hand 2
     * Gets the enum value for ROUNDABOUT_RIGHT_HAND_2
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_RIGHT_HAND_2 () {
        return StaticIconName._MAP.ROUNDABOUT_RIGHT_HAND_2;
    }

    /**
     * Icon Name roundabout right hand 3
     * Gets the enum value for ROUNDABOUT_RIGHT_HAND_3
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_RIGHT_HAND_3 () {
        return StaticIconName._MAP.ROUNDABOUT_RIGHT_HAND_3;
    }

    /**
     * Icon Name roundabout right hand 4
     * Gets the enum value for ROUNDABOUT_RIGHT_HAND_4
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_RIGHT_HAND_4 () {
        return StaticIconName._MAP.ROUNDABOUT_RIGHT_HAND_4;
    }

    /**
     * Icon Name roundabout right hand 5
     * Gets the enum value for ROUNDABOUT_RIGHT_HAND_5
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_RIGHT_HAND_5 () {
        return StaticIconName._MAP.ROUNDABOUT_RIGHT_HAND_5;
    }

    /**
     * Icon Name roundabout right hand 6
     * Gets the enum value for ROUNDABOUT_RIGHT_HAND_6
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_RIGHT_HAND_6 () {
        return StaticIconName._MAP.ROUNDABOUT_RIGHT_HAND_6;
    }

    /**
     * Icon Name roundabout right hand 7
     * Gets the enum value for ROUNDABOUT_RIGHT_HAND_7
     * @returns {String} - The enum value.
     */
    static get ROUNDABOUT_RIGHT_HAND_7 () {
        return StaticIconName._MAP.ROUNDABOUT_RIGHT_HAND_7;
    }

    /**
     * Icon Name RSS
     * Gets the enum value for RSS
     * @returns {String} - The enum value.
     */
    static get RSS () {
        return StaticIconName._MAP.RSS;
    }

    /**
     * Icon Name settings / menu
     * Gets the enum value for SETTINGS
     * @returns {String} - The enum value.
     */
    static get SETTINGS () {
        return StaticIconName._MAP.SETTINGS;
    }

    /**
     * Icon Name sharp left
     * Gets the enum value for SHARP_LEFT
     * @returns {String} - The enum value.
     */
    static get SHARP_LEFT () {
        return StaticIconName._MAP.SHARP_LEFT;
    }

    /**
     * Icon Name sharp right
     * Gets the enum value for SHARP_RIGHT
     * @returns {String} - The enum value.
     */
    static get SHARP_RIGHT () {
        return StaticIconName._MAP.SHARP_RIGHT;
    }

    /**
     * Icon Name show
     * Gets the enum value for SHOW
     * @returns {String} - The enum value.
     */
    static get SHOW () {
        return StaticIconName._MAP.SHOW;
    }

    /**
     * Icon Name shuffle play
     * Gets the enum value for SHUFFLE_PLAY
     * @returns {String} - The enum value.
     */
    static get SHUFFLE_PLAY () {
        return StaticIconName._MAP.SHUFFLE_PLAY;
    }

    /**
     * Icon Name ski places / elevation / altitude
     * Gets the enum value for SKI_PLACES
     * @returns {String} - The enum value.
     */
    static get SKI_PLACES () {
        return StaticIconName._MAP.SKI_PLACES;
    }

    /**
     * Icon Name slight left
     * Gets the enum value for SLIGHT_LEFT
     * @returns {String} - The enum value.
     */
    static get SLIGHT_LEFT () {
        return StaticIconName._MAP.SLIGHT_LEFT;
    }

    /**
     * Icon Name slight right
     * Gets the enum value for SLIGHT_RIGHT
     * @returns {String} - The enum value.
     */
    static get SLIGHT_RIGHT () {
        return StaticIconName._MAP.SLIGHT_RIGHT;
    }

    /**
     * Icon Name smartphone
     * Gets the enum value for SMARTPHONE
     * @returns {String} - The enum value.
     */
    static get SMARTPHONE () {
        return StaticIconName._MAP.SMARTPHONE;
    }

    /**
     * Icon Name sort list
     * Gets the enum value for SORT_LIST
     * @returns {String} - The enum value.
     */
    static get SORT_LIST () {
        return StaticIconName._MAP.SORT_LIST;
    }

    /**
     * Icon Name speed dial numbers - number 0
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_0
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_0 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_0;
    }

    /**
     * Icon Name speed dial numbers - number 1
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_1
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_1 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_1;
    }

    /**
     * Icon Name speed dial numbers - number 2
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_2
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_2 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_2;
    }

    /**
     * Icon Name speed dial numbers - number 3
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_3
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_3 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_3;
    }

    /**
     * Icon Name speed dial numbers - number 4
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_4
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_4 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_4;
    }

    /**
     * Icon Name speed dial numbers - number 5
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_5
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_5 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_5;
    }

    /**
     * Icon Name speed dial numbers - number 6
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_6
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_6 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_6;
    }

    /**
     * Icon Name speed dial numbers - number 7
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_7
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_7 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_7;
    }

    /**
     * Icon Name speed dial numbers - number 8
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_8
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_8 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_8;
    }

    /**
     * Icon Name speed dial numbers - number 9
     * Gets the enum value for SPEED_DIAL_NUMBERS_NUMBER_9
     * @returns {String} - The enum value.
     */
    static get SPEED_DIAL_NUMBERS_NUMBER_9 () {
        return StaticIconName._MAP.SPEED_DIAL_NUMBERS_NUMBER_9;
    }

    /**
     * Icon Name success / check
     * Gets the enum value for SUCCESS
     * @returns {String} - The enum value.
     */
    static get SUCCESS () {
        return StaticIconName._MAP.SUCCESS;
    }

    /**
     * Icon Name track title / song title
     * Gets the enum value for TRACK_TITLE
     * @returns {String} - The enum value.
     */
    static get TRACK_TITLE () {
        return StaticIconName._MAP.TRACK_TITLE;
    }

    /**
     * Icon Name traffic report
     * Gets the enum value for TRAFFIC_REPORT
     * @returns {String} - The enum value.
     */
    static get TRAFFIC_REPORT () {
        return StaticIconName._MAP.TRAFFIC_REPORT;
    }

    /**
     * Icon Name turn list
     * Gets the enum value for TURN_LIST
     * @returns {String} - The enum value.
     */
    static get TURN_LIST () {
        return StaticIconName._MAP.TURN_LIST;
    }

    /**
     * Icon Name u-turn left traffic
     * Gets the enum value for UTURN_LEFT_TRAFFIC
     * @returns {String} - The enum value.
     */
    static get UTURN_LEFT_TRAFFIC () {
        return StaticIconName._MAP.UTURN_LEFT_TRAFFIC;
    }

    /**
     * Icon Name u-turn right traffic
     * Gets the enum value for UTURN_RIGHT_TRAFFIC
     * @returns {String} - The enum value.
     */
    static get UTURN_RIGHT_TRAFFIC () {
        return StaticIconName._MAP.UTURN_RIGHT_TRAFFIC;
    }

    /**
     * Icon Name undo
     * Gets the enum value for UNDO
     * @returns {String} - The enum value.
     */
    static get UNDO () {
        return StaticIconName._MAP.UNDO;
    }

    /**
     * Icon Name unlocked
     * Gets the enum value for UNLOCKED
     * @returns {String} - The enum value.
     */
    static get UNLOCKED () {
        return StaticIconName._MAP.UNLOCKED;
    }

    /**
     * Icon Name USB media audio source
     * Gets the enum value for USB_MEDIA_AUDIO_SOURCE
     * @returns {String} - The enum value.
     */
    static get USB_MEDIA_AUDIO_SOURCE () {
        return StaticIconName._MAP.USB_MEDIA_AUDIO_SOURCE;
    }

    /**
     * Icon Name voice control scrollbar - list item no. 1
     * Gets the enum value for VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_1
     * @returns {String} - The enum value.
     */
    static get VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_1 () {
        return StaticIconName._MAP.VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_1;
    }

    /**
     * Icon Name voice control scrollbar - list item no. 2
     * Gets the enum value for VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_2
     * @returns {String} - The enum value.
     */
    static get VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_2 () {
        return StaticIconName._MAP.VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_2;
    }

    /**
     * Icon Name voice control scrollbar - list item no. 3
     * Gets the enum value for VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_3
     * @returns {String} - The enum value.
     */
    static get VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_3 () {
        return StaticIconName._MAP.VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_3;
    }

    /**
     * Icon Name voice control scrollbar - list item no. 4
     * Gets the enum value for VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_4
     * @returns {String} - The enum value.
     */
    static get VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_4 () {
        return StaticIconName._MAP.VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_4;
    }

    /**
     * Icon Name voice recognition - failed
     * Gets the enum value for VOICE_RECOGNITION_FAILED
     * @returns {String} - The enum value.
     */
    static get VOICE_RECOGNITION_FAILED () {
        return StaticIconName._MAP.VOICE_RECOGNITION_FAILED;
    }

    /**
     * Icon Name voice recognition - pause
     * Gets the enum value for VOICE_RECOGNITION_PAUSE
     * @returns {String} - The enum value.
     */
    static get VOICE_RECOGNITION_PAUSE () {
        return StaticIconName._MAP.VOICE_RECOGNITION_PAUSE;
    }

    /**
     * Icon Name voice recognition - successful
     * Gets the enum value for VOICE_RECOGNITION_SUCCESSFUL
     * @returns {String} - The enum value.
     */
    static get VOICE_RECOGNITION_SUCCESSFUL () {
        return StaticIconName._MAP.VOICE_RECOGNITION_SUCCESSFUL;
    }

    /**
     * Icon Name voice recognition - system active
     * Gets the enum value for VOICE_RECOGNITION_SYSTEM_ACTIVE
     * @returns {String} - The enum value.
     */
    static get VOICE_RECOGNITION_SYSTEM_ACTIVE () {
        return StaticIconName._MAP.VOICE_RECOGNITION_SYSTEM_ACTIVE;
    }

    /**
     * Icon Name voice recognition - system listening
     * Gets the enum value for VOICE_RECOGNITION_SYSTEM_LISTENING
     * @returns {String} - The enum value.
     */
    static get VOICE_RECOGNITION_SYSTEM_LISTENING () {
        return StaticIconName._MAP.VOICE_RECOGNITION_SYSTEM_LISTENING;
    }

    /**
     * Icon Name voice recognition - try again
     * Gets the enum value for VOICE_RECOGNITION_TRY_AGAIN
     * @returns {String} - The enum value.
     */
    static get VOICE_RECOGNITION_TRY_AGAIN () {
        return StaticIconName._MAP.VOICE_RECOGNITION_TRY_AGAIN;
    }

    /**
     * Icon Name warning / safety alert
     * Gets the enum value for WARNING
     * @returns {String} - The enum value.
     */
    static get WARNING () {
        return StaticIconName._MAP.WARNING;
    }

    /**
     * Icon Name weather
     * Gets the enum value for WEATHER
     * @returns {String} - The enum value.
     */
    static get WEATHER () {
        return StaticIconName._MAP.WEATHER;
    }

    /**
     * Icon Name wifi full
     * Gets the enum value for WIFI_FULL
     * @returns {String} - The enum value.
     */
    static get WIFI_FULL () {
        return StaticIconName._MAP.WIFI_FULL;
    }

    /**
     * Icon Name zoom in
     * Gets the enum value for ZOOM_IN
     * @returns {String} - The enum value.
     */
    static get ZOOM_IN () {
        return StaticIconName._MAP.ZOOM_IN;
    }

    /**
     * Icon Name zoom out
     * Gets the enum value for ZOOM_OUT
     * @returns {String} - The enum value.
     */
    static get ZOOM_OUT () {
        return StaticIconName._MAP.ZOOM_OUT;
    }

    /**
     * Get the value for the given enum key
     * @param {*} key - A key to find in the map of the subclass
     * @returns {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return StaticIconName._valueForKey(key, StaticIconName._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param {*} value - A primitive value to find the matching key for in the map of the subclass
     * @returns {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return StaticIconName._keyForValue(value, StaticIconName._MAP);
    }

    /**
     * Retrieve all enumerated values for this class
     * @returns {*} - Returns an array of values
     */
    static values () {
        return Object.values(StaticIconName._MAP);
    }
}

StaticIconName._MAP = Object.freeze({
    'ACCEPT_CALL': '0x29',
    'ADD_WAYPOINT': '0x1B',
    'ALBUM': '0x21',
    'AMBIENT_LIGHTING': '0x3d',
    'ARROW_NORTH': '0x40',
    'AUDIO_MUTE': '0x12',
    'AUDIOBOOK_EPISODE': '0x83',
    'AUDIOBOOK_NARRATOR': '0x82',
    'AUXILLARY_AUDIO': '0x45',
    'BACK': '0x86',
    'BATTERY_CAPACITY_0_OF_5': '0xF7',
    'BATTERY_CAPACITY_1_OF_5': '0xF8',
    'BATTERY_CAPACITY_2_OF_5': '0xF9',
    'BATTERY_CAPACITY_3_OF_5': '0xFA',
    'BATTERY_CAPACITY_4_OF_5': '0xf6',
    'BATTERY_CAPACITY_5_OF_5': '0xFB',
    'BLUETOOTH_AUDIO_SOURCE': '0x09',
    'BLUETOOTH1': '0xcc',
    'BLUETOOTH2': '0xCD',
    'BROWSE': '0x77',
    'CELL_PHONE_IN_ROAMING_MODE': '0x66',
    'CELL_SERVICE_SIGNAL_STRENGTH_0_OF_5_BARS': '0x67',
    'CELL_SERVICE_SIGNAL_STRENGTH_1_OF_5_BARS': '0x68',
    'CELL_SERVICE_SIGNAL_STRENGTH_2_OF_5_BARS': '0x69',
    'CELL_SERVICE_SIGNAL_STRENGTH_3_OF_5_BARS': '0x6A',
    'CELL_SERVICE_SIGNAL_STRENGTH_4_OF_5_BARS': '0x6B',
    'CELL_SERVICE_SIGNAL_STRENGTH_5_OF_5_BARS': '0xd3',
    'CHANGE_LANE_LEFT': '0xc3',
    'CHANGE_LANE_RIGHT': '0xc1',
    'CHECK_BOX_CHECKED': '0x27',
    'CHECK_BOX_UNCHECKED': '0x28',
    'CLIMATE': '0xd1',
    'CLOCK': '0xfc',
    'COMPOSE': '0x1A',
    'CONTACT': '0x5C',
    'CONTINUE': '0x42',
    'DASH': '0x7F',
    'DATE': '0x87',
    'DELETE': '0x0F',
    'DESTINATION': '0x94',
    'DESTINATION_FERRY_AHEAD': '0x4D',
    'EBOOKMARK': '0x2B',
    'END_CALL': '0x2C',
    'FAIL': '0xD6',
    'FAST_FORWARD_30_SECS': '0x08',
    'FAVORITE_HEART': '0x0E',
    'FAVORITE_STAR': '0x95',
    'FAX_NUMBER': '0x80',
    'FILENAME': '0x50',
    'FILTER': '0x79',
    'FOLDER': '0x1C',
    'FUEL_PRICES': '0xe9',
    'FULL_MAP': '0x0c',
    'GENERIC_PHONE_NUMBER': '0x53',
    'GENRE': '0x4E',
    'GLOBAL_KEYBOARD': '0xea',
    'HIGHWAY_EXIT_INFORMATION': '0xf4',
    'HOME_PHONE_NUMBER': '0x55',
    'HYPERLINK': '0x78',
    'ID3_TAG_UNKNOWN': '0x51',
    'INCOMING_CALLS': '0x57',
    'INFORMATION': '0x5d',
    'IPOD_MEDIA_SOURCE': '0x0D',
    'JOIN_CALLS': '0x02',
    'KEEP_LEFT': '0x46',
    'KEEP_RIGHT': '0x48',
    'KEY': '0x7D',
    'LEFT': '0x9f',
    'LEFT_ARROW': '0x4B',
    'LEFT_EXIT': '0xaf',
    'LINE_IN_AUDIO_SOURCE': '0x06',
    'LOCKED': '0x22',
    'MEDIA_CONTROL_LEFT_ARROW': '0x17',
    'MEDIA_CONTROL_RECORDING': '0x20',
    'MEDIA_CONTROL_RIGHT_ARROW': '0x15',
    'MEDIA_CONTROL_STOP': '0x16',
    'MICROPHONE': '0xe8',
    'MISSED_CALLS': '0x58',
    'MOBILE_PHONE_NUMBER': '0x54',
    'MOVE_DOWN': '0xE5',
    'MOVE_UP': '0xe4',
    'MP3_TAG_ARTIST': '0x24',
    'NAVIGATION': '0x8e',
    'NAVIGATION_CURRENT_DIRECTION': '0x0a',
    'NEGATIVE_RATING_THUMBS_DOWN': '0x14',
    'NEW': '0x5E',
    'OFFICE_PHONE_NUMBER': '0x56',
    'OPENED': '0x5F',
    'ORIGIN': '0x96',
    'OUTGOING_CALLS': '0x59',
    'PHONE_CALL_1': '0x1D',
    'PHONE_CALL_2': '0x1E',
    'PHONE_DEVICE': '0x03',
    'PHONEBOOK': '0x81',
    'PHOTO': '0x88',
    'PLAY': '0xD0',
    'PLAYLIST': '0x4F',
    'POPUP': '0x76',
    'POSITIVE_RATING_THUMBS_UP': '0x13',
    'POWER': '0x5b',
    'PRIMARY_PHONE': '0x1F',
    'RADIO_BUTTON_CHECKED': '0x25',
    'RADIO_BUTTON_UNCHECKED': '0x26',
    'RECENT_CALLS': '0xe7',
    'RECENT_DESTINATIONS': '0xf2',
    'REDO': '0x19',
    'REFRESH': '0x97',
    'REMOTE_DIAGNOSTICS_CHECK_ENGINE': '0x7E',
    'RENDERED_911_ASSIST': '0xac',
    'REPEAT': '0xe6',
    'REPEAT_PLAY': '0x73',
    'REPLY': '0x04',
    'REWIND_30_SECS': '0x07',
    'RIGHT': '0xa3',
    'RIGHT_EXIT': '0xb1',
    'RINGTONES': '0x5A',
    'ROUNDABOUT_LEFT_HAND_1': '0xee',
    'ROUNDABOUT_LEFT_HAND_2': '0x8c',
    'ROUNDABOUT_LEFT_HAND_3': '0x84',
    'ROUNDABOUT_LEFT_HAND_4': '0x72',
    'ROUNDABOUT_LEFT_HAND_5': '0x6e',
    'ROUNDABOUT_LEFT_HAND_6': '0x64',
    'ROUNDABOUT_LEFT_HAND_7': '0x60',
    'ROUNDABOUT_RIGHT_HAND_1': '0x62',
    'ROUNDABOUT_RIGHT_HAND_2': '0x6c',
    'ROUNDABOUT_RIGHT_HAND_3': '0x70',
    'ROUNDABOUT_RIGHT_HAND_4': '0x7a',
    'ROUNDABOUT_RIGHT_HAND_5': '0x8a',
    'ROUNDABOUT_RIGHT_HAND_6': '0xec',
    'ROUNDABOUT_RIGHT_HAND_7': '0xf0',
    'RSS': '0x89',
    'SETTINGS': '0x49',
    'SHARP_LEFT': '0xa5',
    'SHARP_RIGHT': '0xa7',
    'SHOW': '0xe1',
    'SHUFFLE_PLAY': '0x74',
    'SKI_PLACES': '0xab',
    'SLIGHT_LEFT': '0x9d',
    'SLIGHT_RIGHT': '0xa1',
    'SMARTPHONE': '0x05',
    'SORT_LIST': '0x7B',
    'SPEED_DIAL_NUMBERS_NUMBER_0': '0xE0',
    'SPEED_DIAL_NUMBERS_NUMBER_1': '0xD7',
    'SPEED_DIAL_NUMBERS_NUMBER_2': '0xD8',
    'SPEED_DIAL_NUMBERS_NUMBER_3': '0xD9',
    'SPEED_DIAL_NUMBERS_NUMBER_4': '0xDA',
    'SPEED_DIAL_NUMBERS_NUMBER_5': '0xDB',
    'SPEED_DIAL_NUMBERS_NUMBER_6': '0xDC',
    'SPEED_DIAL_NUMBERS_NUMBER_7': '0xDD',
    'SPEED_DIAL_NUMBERS_NUMBER_8': '0xDE',
    'SPEED_DIAL_NUMBERS_NUMBER_9': '0xDF',
    'SUCCESS': '0xD5',
    'TRACK_TITLE': '0x4C',
    'TRAFFIC_REPORT': '0x2A',
    'TURN_LIST': '0x10',
    'UTURN_LEFT_TRAFFIC': '0xad',
    'UTURN_RIGHT_TRAFFIC': '0xa9',
    'UNDO': '0x18',
    'UNLOCKED': '0x23',
    'USB_MEDIA_AUDIO_SOURCE': '0x0B',
    'VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_1': '0xC7',
    'VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_2': '0xC8',
    'VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_3': '0xC9',
    'VOICE_CONTROL_SCROLLBAR_LIST_ITEM_NO_4': '0xCA',
    'VOICE_RECOGNITION_FAILED': '0x90',
    'VOICE_RECOGNITION_PAUSE': '0x92',
    'VOICE_RECOGNITION_SUCCESSFUL': '0x8F',
    'VOICE_RECOGNITION_SYSTEM_ACTIVE': '0x11',
    'VOICE_RECOGNITION_SYSTEM_LISTENING': '0x91',
    'VOICE_RECOGNITION_TRY_AGAIN': '0x93',
    'WARNING': '0xfe',
    'WEATHER': '0xeb',
    'WIFI_FULL': '0x43',
    'ZOOM_IN': '0x98',
    'ZOOM_OUT': '0x9a',
});

export { StaticIconName };