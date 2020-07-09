const SDL = require('./../../../../lib/js/dist/SDL.min.js');
const OnSystemRequest = SDL.rpc.messages.OnSystemRequest;
const FunctionID = SDL.rpc.enums.FunctionID;
const MessageType = SDL.rpc.enums.MessageType;

const BaseRpcTests = require('./BaseRpcTests');
const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');

describe('OnSystemRequestTests', function () {
    before(function () {
        this.createMessage = function () {
            return new OnSystemRequest()
                .setFileType(Test.GENERAL_FILETYPE)
                .setLength(Test.GENERAL_INTEGER)
                .setOffset(Test.GENERAL_INTEGER)
                .setRequestSubType(Test.GENERAL_STRING)
                .setRequestType(Test.GENERAL_REQUESTTYPE)
                .setTimeout(Test.GENERAL_INTEGER)
                .setUrl(Test.GENERAL_STRING);
        };

        this.getExpectedParameters = function (sdlVersion) {
            return {
                [OnSystemRequest.KEY_FILE_TYPE]: Test.GENERAL_FILETYPE,
                [OnSystemRequest.KEY_LENGTH]: Test.GENERAL_INTEGER,
                [OnSystemRequest.KEY_OFFSET]: Test.GENERAL_INTEGER,
                [OnSystemRequest.KEY_REQUEST_SUB_TYPE]: Test.GENERAL_STRING,
                [OnSystemRequest.KEY_REQUEST_TYPE]: Test.GENERAL_REQUESTTYPE,
                [OnSystemRequest.KEY_TIMEOUT]: Test.GENERAL_INTEGER,
                [OnSystemRequest.KEY_URL]: Test.GENERAL_STRING,
            };
        };

        this.getMessageType = function () {
            return MessageType.notification;
        };

        this.getFunctionId = function () {
            return FunctionID.keyForValue(FunctionID.OnSystemRequest);
        };
    });

    BaseRpcTests.tests();

    it ('testRpcValues', function (done) {
        // Test Values
        let rpcMessage = this.msg;
        const fileType = rpcMessage.getFileType();
        const length = rpcMessage.getLength();
        const offset = rpcMessage.getOffset();
        const requestSubType = rpcMessage.getRequestSubType();
        const requestType = rpcMessage.getRequestType();
        const timeout = rpcMessage.getTimeout();
        const url = rpcMessage.getUrl();

        // Valid Tests
        Validator.assertEquals(Test.GENERAL_FILETYPE, fileType);
        Validator.assertEquals(Test.GENERAL_INTEGER, length);
        Validator.assertEquals(Test.GENERAL_INTEGER, offset);
        Validator.assertEquals(Test.GENERAL_STRING, requestSubType);
        Validator.assertEquals(Test.GENERAL_REQUESTTYPE, requestType);
        Validator.assertEquals(Test.GENERAL_INTEGER, timeout);
        Validator.assertEquals(Test.GENERAL_STRING, url);

        // Invalid/Null Tests
        rpcMessage = new OnSystemRequest();
        Validator.assertNotNull(rpcMessage);
        Validator.testNullBase(
            FunctionID.keyForValue(FunctionID.OnSystemRequest),
            MessageType.notification,
            rpcMessage);

        Validator.assertNullOrUndefined(rpcMessage.getFileType());
        Validator.assertNullOrUndefined(rpcMessage.getLength());
        Validator.assertNullOrUndefined(rpcMessage.getOffset());
        Validator.assertNullOrUndefined(rpcMessage.getRequestSubType());
        Validator.assertNullOrUndefined(rpcMessage.getRequestType());
        Validator.assertNullOrUndefined(rpcMessage.getTimeout());
        Validator.assertNullOrUndefined(rpcMessage.getUrl());

        done();
    });

    it('testUrlParam', function (done) {
        // test the url length has not changed
        let longUrl = 'https://test.url';
        do {
            longUrl += '/test';
        } while (longUrl.length < 10000);

        const rpcMessage = new OnSystemRequest();
        rpcMessage.setUrl(longUrl);
        Validator.assertTrue(rpcMessage.getUrl().length >= 10000, 'url param length was changed');

        done();
    });
});