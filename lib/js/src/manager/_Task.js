/* eslint-disable no-unused-vars */

/*
* Copyright (c) 2020, Livio, Inc.
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

import { _uuid } from '../util/_uuid.js';

/**
 * A class representing a controllable asynchronous operation to be performed in a queue
 * @private
 */
class _Task {
    /**
     * Initializes an instance of _Task.
     * @class
     */
    constructor (name = null) {
        this._state = READY;
        this._callback = null;
        this._id = _uuid(); // generate an id for every task
        this._isConcurrent = false; // whether this task can be run without waiting for completion
        this._priority = 0; // the priority value for this task. higher value means it should be started sooner
        this._name = name; // a name to give to the task. does not need to be unique
    }

    /**
     * Changes the state of the task.
     * @param {Number} newState - One of the _Task static values which represent the task's state
     */
    switchStates (newState) {
        const oldState = this._state;
        this._state = newState;
        if (typeof this._callback === 'function') {
            this._callback(oldState, newState);
        }
    }

    /**
     * Attempts to run the task
     */
    async run () {
        if (this._state !== READY) {
            throw new Error(`run() called while not in state READY. Actual state: ${this._state}`);
        }
        this.switchStates(IN_PROGRESS);
        await this.onExecute(this);
        if (this._state !== CANCELED && this._state !== ERROR) {
            this.switchStates(FINISHED);
        }
    }

    /**
     * The method that causes the task to run. Must be overridden by anything that extends _Task
     * @param {_Task} task - The task instance, so that the running function can reference it
     * @abstract
     */
    onExecute (task) {
        throw new Error('onExecute method must be overridden');
    }

    /**
     * Set the callback value.
     * @param {Function} callback - A callback function that gets passed the change of this task's state
     * @returns {_Task} - A reference of this class to support method chaining.
     */
    setCallback (callback) {
        this._callback = callback;
        return this;
    }

    /**
     * Get the callback value.
     * @returns {Function} - A callback function that gets passed the change of this task's state.
     */
    getCallback () {
        return this._callback;
    }

    /**
     * Get the state value.
     * @returns {Number} - One of the _Task static values which represent the task's state
     */
    getState () {
        return this._state;
    }

    /**
     * Get the unique id value.
     * @returns {String} - The assigned unique id for this task
     */
    getId () {
        return this._id;
    }

    /**
     * Set the concurrency flag.
     * @param {Boolean} isConcurrent - Whether this task can be run without waiting for completion.
     * @returns {_Task} - A reference of this class to support method chaining.
     */
    setIsConcurrent (isConcurrent) {
        this._isConcurrent = isConcurrent;
        return this;
    }

    /**
     * Get the concurrency flag.
     * @returns {Boolean} - Whether this task can be run without waiting for completion.
     */
    getIsConcurrent () {
        return this._isConcurrent;
    }

    /**
     * Set the priority value.
     * @param {Number} priority - The priority value.
     * @returns {_Task} - A reference of this class to support method chaining.
     */
    setPriority (priority) {
        this._priority = priority;
        return this;
    }

    /**
     * Get the priority value.
     * @returns {Number} - The priority value.
     */
    getPriority () {
        return this._priority;
    }

    /**
     * Set the name value.
     * @param {String} name - The name value.
     * @returns {_Task} - A reference of this class to support method chaining.
     */
    setName (name) {
        this._name = name;
        return this;
    }

    /**
     * Get the name value.
     * @returns {String} - The name value.
     */
    getName () {
        return this._name;
    }
}

const BLOCKED = _Task.BLOCKED = 0x00; // The state to use when the task cannot be ran or removed from the queue
const READY = _Task.READY = 0x10; // The state to use when the task is able to be run
const IN_PROGRESS = _Task.IN_PROGRESS = 0x30; // The state to use when the task is currently running
const FINISHED = _Task.FINISHED = 0x50; // The state to use when the task has completed running successfully
const CANCELED = _Task.CANCELED = 0xCA; // The state to use when the task has to be removed before its completion
const ERROR = _Task.ERROR = 0xFF; // The state to use when the task must stop early due to an unexpected issue

export { _Task };
