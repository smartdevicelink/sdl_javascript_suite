import { PutFile } from '../../rpc/messages/PutFile';
import { FileType } from '../../rpc/enums/FileType';
import { SystemRequest } from '../../rpc/messages/SystemRequest';
import { RequestType } from '../../rpc/enums/RequestType';
const https = require('https');

class PoliciesFetcher {
    constructor () {
        this._sContentType = 'application/json';
        this._bDoOutput = true;
        this._bDoInput = true;
        this._bUsesCaches = false;
        this._sRequestMethod = 'POST';

        this._bInstFolRed = false;
        this._sCharSet = 'utf-8';

        this._url;
        this._urlConnection;

        this._sPT = '';
    }

    async _getURLConnection (myHeader = null, sURLString, Timeout, iContentLen, bulkData) {
        return new Promise((resolve) => {
            const options = {};
            options.headers = {};
            options.timeout = Timeout;
            options.headers['Content-Length'] = iContentLen;
            options.headers['Content-Type'] = 'application/json';
            // check if there's a port number in the url
            if (sURLString.split(':').length > 1) {
                // the host comes before the port
                options.host = sURLString.split(':')[0];
                // the port is after the host but before the path
                options.port = sURLString.split(':')[1].split('/')[0];
                // the pth is everything at the end
                options.path = sURLString.split(`${options.host}:${options.port}`)[1];
            } else {
                // there's no port so it's just the host and a path
                options.host = sURLString.split('/')[0];
                options.path = sURLString.split(`${options.host}`)[1];
            }

            options.method = 'POST';

            if (myHeader !== null) {
                // if the header isn't null, use it and replace the hardcoded params
                options.headers['Content-Type'] = myHeader.getContentType();
                options.timeout = myHeader.getConnectTimeout();
                options.method = myHeader.getRequestMethod();
                options.headers['Accept-Charset'] = myHeader.getCharset();
                options.headers['Content-Length'] = myHeader.getContentLength();
            }

            const req = https.request(options, (res) => {
                res.resume();
                res.on('data', (data) => {
                    this._sPT += data;
                });
                res.on('end', () => {
                    if (!res.complete) {
                        console.error('The connection was terminated while the message was still being sent');
                    } else {
                        req.end();
                        resolve(this._sPT);
                    }
                });
            });


            req.on('error', (err) => {
                console.error(`Problem with sending the request: ${err.message}`);
            });

            req.write(bulkData);
        });
    }

    async fetchPolicies (onSystemRequest, headers) {
        const sURLString = onSystemRequest.getUrl().replace(/http:\/\/|https:\/\//g, '');

        let iTimeout = onSystemRequest.getTimeout();

        if (iTimeout === null || iTimeout === undefined) {
            iTimeout = 2000;
        }

        let myHeader = null;
        if (typeof onSystemRequest.getHeader === 'function') {
            myHeader = onSystemRequest.getHeader();
        } else {
            myHeader = headers;
        }

        let sBodyString = null;
        if (typeof onSystemRequest.getBody === 'function') {
            sBodyString = onSystemRequest.getBody();
        }

        let validjson = '';
        let length;
        if (sBodyString === null || sBodyString === undefined) {
            length = onSystemRequest.getBulkData().length;
        } else {
            validjson = JSON.parse(sBodyString);
            length = validjson.length;
        }

        const body = (onSystemRequest.getRequestType() === 'HTTP') ? onSystemRequest.getBulkData() : validjson;

        const response = await this._getURLConnection(myHeader, sURLString, iTimeout, length, body);

        // At this point we've gotten a response
        if (onSystemRequest.getRequestType() === 'HTTP') {
            // Create the SystemRequest RPC to send to module.
            const encoder = new TextEncoder();
            const putFile = new PutFile();
            putFile.setFileType(FileType.JSON);
            putFile.setCorrelationId(PoliciesFetcher.POLICIES_CORRELATION_ID);
            putFile.setFileName('response_data');
            putFile.setFileData(encoder.encode(response.toString()));
            return putFile;
        } else {
            // Send new SystemRequest to SDL
            let mySystemRequest = null;
            if (response !== null) {
                const encoder = new TextEncoder();
                mySystemRequest = new SystemRequest();
                mySystemRequest.setRequestType(RequestType.PROPRIETARY);
                mySystemRequest.setCorrelationId(PoliciesFetcher.POLICIES_CORRELATION_ID);
                mySystemRequest.setBulkData(encoder.encode(response.toString()));
            }
            return mySystemRequest;
        }
    }
}

PoliciesFetcher.POLICIES_CORRELATION_ID = 65535;

export { PoliciesFetcher };