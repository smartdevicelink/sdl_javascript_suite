const expect = require('chai').expect;
const SDL = require('./../lib/js/dist/SDL.js');

const RpcResponse = SDL.rpc.RpcResponse;
const RpcRequest = SDL.rpc.RpcRequest;

class Validator {
    static getParametersJson(obj) {
        let result;
        if (typeof obj === 'object') {
            if (typeof obj.getParameters === 'function') {
                return this.getParametersJson(obj.getParameters());
            } else {
                if (Array.isArray(obj)) {
                    result = [];
                    for (let val of obj) {
                        result.push(this.getParametersJson(val));
                    }
                    return result;
                } else {
                    result = {};
                    for (let key in obj) {
                        let val = obj[key];
                        result[key] = this.getParametersJson(val);
                    }
                }
            }
        } else {
            return obj;
        }
        return result;
    }


    static validateJson (rpcMessage, expectedParameters) {
        const parameters = this.getParametersJson(rpcMessage.getParameters());
        expect(parameters).to.be.deep.equal(expectedParameters);
    }

    /**
     * 
     * Checks major and minor versions match. patch versions can be different.
     * @param {SdlMsgVersion} item1 
     * @param {SdlMsgVersion} item2 
     * @returns {Boolean} 
     */
    static validateSdlMsgVersion (item1, item2) {
        if (item1 === null) {
            return (item2 === null);
        }
        if (item2 === null) {
            return (item1 === null);
        }

        if (item1.getMajorVersion() !== item2.getMajorVersion() ||
            item1.getMinorVersion() !== item2.getMinorVersion()) {
            return false;
        }
        return true;
    }


    static validateTtsChunks (list1, list2) {
        if (list1 === null || list2 === null) {
            expect(list1).to.equal(list2);
            return;
        }

        let text1 = list1.map((val) => {
            return val.getText();
        });
        let text2 = list1.map((val) => {
            return val.getText();
        });

        expect(text1).to.deep.equal(text2);
        // expect(text1).to.deep.equal(text2);



        // for (const idx in list1) {
        //     const chunk1 = list1[idx];
        //     const chunk2 = list2[idx];

        //     if (!this.validateText(chunk1.getText(), chunk2.getText()) || (chunk1.getType() !== chunk2.getType())) {
        //         return false;
        //     }
        // }

        // return true;
    }


    static validateDeviceInfo (item1, item2) {
        if (item1 === null) {
            return item2 === null;
        }
        if (item2 === null) {
            return item1 === null;
        }

        if (item1.getOs()                   !== item2.getOs()          ||
                item1.getCarrier()              !== item2.getCarrier()     ||
                item1.getHardware()             !== item2.getHardware()    ||
                item1.getOsVersion()            !== item2.getOsVersion()   ||
                item1.getFirmwareRev()          !== item2.getFirmwareRev() ||
                item1.getMaxNumberRFCOMMPorts() !== item2.getMaxNumberRFCOMMPorts()) {
            return false;
        }

        return true;
    }

    static validateTemplateColorScheme (item1, item2) {
        if (item1 === null) {
            return item2 === null;
        }
        if (item2 === null) {
            return item1 === null;
        }

        if (item1.getPrimaryColor().getRedValue() !== item2.getPrimaryColor().getRedValue()
                || item1.getPrimaryColor().getGreenValue() !== item2.getPrimaryColor().getGreenValue()
                || item1.getPrimaryColor().getBlueValue() !== item2.getPrimaryColor().getBlueValue()
                || item1.getSecondaryColor().getRedValue() !== item2.getSecondaryColor().getRedValue()
                || item1.getSecondaryColor().getGreenValue() !== item2.getSecondaryColor().getGreenValue()
                || item1.getSecondaryColor().getBlueValue() !== item2.getSecondaryColor().getBlueValue()
                || item1.getBackgroundColor().getRedValue() !== item2.getBackgroundColor().getRedValue()
                || item1.getBackgroundColor().getGreenValue() !== item2.getBackgroundColor().getGreenValue()
                || item1.getBackgroundColor().getBlueValue() !== item2.getBackgroundColor().getBlueValue()) {
            return false;
        }

        return true;
    }




    static assertTrue () {
        const args = arguments;
        let val1, msg;
        if (args.length === 1) {
            val1 = args[0];
        } else if (args.length === 2) {
            msg = args[0];
            val1 = args[1];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.be.true;
    }

    static assertEquals () {
        const args = arguments;
        let val1, val2, msg;
        if (args.length === 2) {
            val1 = args[0];
            val2 = args[1];
        } else if (args.length === 3) {
            msg = args[0];
            val1 = args[1];
            val2 = args[2];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.be.deep.equal(val2);
    }

    static assertNull () {
        const args = arguments;
        let val1, msg;
        if (args.length === 1) {
            val1 = args[0];
        } else if (args.length === 2) {
            msg = args[0];
            val1 = args[1];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.be.null;
    }

    static assertNotNull () {
        const args = arguments;
        let val1, msg;
        if (args.length === 1) {
            val1 = args[0];
        } else if (args.length === 2) {
            msg = args[0];
            val1 = args[1];
        } else {
            throw new Error('Bad arguments');
        }
        expect(val1, msg).to.be.not.null;
    }

    static validateText (text1, text2) {
        return text1 === text2;
    }


    static assertNotNullUndefined () {
        const args = arguments;
        let val,msg;
        if (args.length === 2) {
            val = args[1];
            msg = args[0];
        } else {
            val = args[0];
        }
        expect(val, msg).not.to.be.null.and.not.to.be.undefined;
    }




    // this method must be manually called from the subclass
    static testNullBase (functionName, messageType, msg) {
        this.assertNotNull('RPCMessage was null.', msg);

        let correlationId;
        if (msg instanceof RpcRequest) {
            correlationId = msg.getCorrelationId(); 
            this.assertNotNull('Correlation ID of the RPC message was null.', correlationId);
        } else if (msg instanceof RpcResponse) {
            correlationId = msg.getCorrelationId();
            this.assertNull('Correlation ID of the RPC message was not null.', correlationId);
        }
        this.assertNotNull('Message type of the RPC message was null.', msg.getRPCType());

        this.assertEquals('Message type didn\'t match expected message type.', messageType, msg.getRPCType());

        this.assertNotNull('Command type of the RPC message was null.', msg.getFunctionName());
        this.assertEquals('Command type didn\'t match expected command type.', functionName, msg.getFunctionName());


        try {
            this.assertTrue('Parameters weren\'t initialized, but the JSON contained 2 or more objects.', (msg.serializeJSON().length() === 1));
        } catch (error) {
            //do nothing
        }
    }  
}



module.exports = Validator;