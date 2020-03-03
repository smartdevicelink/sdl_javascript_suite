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

import { RpcStruct } from '../RpcStruct.js';

class Rectangle extends RpcStruct {
    /**
     * Initalizes an instance of Rectangle.
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {Number} x - The upper left X-coordinate of the rectangle
     * @return {Rectangle}
     */
    setX (x) {
        this.setParameter(Rectangle.KEY_X, x);
        return this;
    }

    /**
     * @return {Number}
     */
    getX () {
        return this.getParameter(Rectangle.KEY_X);
    }

    /**
     * @param {Number} y - The upper left Y-coordinate of the rectangle
     * @return {Rectangle}
     */
    setY (y) {
        this.setParameter(Rectangle.KEY_Y, y);
        return this;
    }

    /**
     * @return {Number}
     */
    getY () {
        return this.getParameter(Rectangle.KEY_Y);
    }

    /**
     * @param {Number} width - The width of the rectangle
     * @return {Rectangle}
     */
    setWidth (width) {
        this.setParameter(Rectangle.KEY_WIDTH, width);
        return this;
    }

    /**
     * @return {Number}
     */
    getWidth () {
        return this.getParameter(Rectangle.KEY_WIDTH);
    }

    /**
     * @param {Number} height - The height of the rectangle
     * @return {Rectangle}
     */
    setHeight (height) {
        this.setParameter(Rectangle.KEY_HEIGHT, height);
        return this;
    }

    /**
     * @return {Number}
     */
    getHeight () {
        return this.getParameter(Rectangle.KEY_HEIGHT);
    }
}

Rectangle.KEY_X = 'x';
Rectangle.KEY_Y = 'y';
Rectangle.KEY_WIDTH = 'width';
Rectangle.KEY_HEIGHT = 'height';

export { Rectangle };