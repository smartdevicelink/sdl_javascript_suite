const express = require('express');
const enableWs = require('express-ws');
const multer = require('multer');

const RemoteControlApp = require('./RemoteControlApp');

let server;

let sessions = [];

//each connection initialize something new?
class RemoteControlAppServer {

    static async create(opts) {
        let obj = new RemoteControlAppServer(opts);

        await obj.init();

        return obj;
    }

    constructor(opts) {
        let self = this;

        opts = opts || {};

        this.port = opts.port || 2004;

        this.client = null;
    }

    async init() {

        let self = this;
        let app = express();
        let upload = multer(
        );

        console.log(`listening on port ${this.port}`);
        // console.log(`BocksProxy on port ${this.baseUrl}`);

        server = app.listen(this.port, async function() {
            enableWs(app, server);
            app.ws('/', async(ws, req) => {
                console.log(`request from core`, req.query);
                let app = await RemoteControlApp.create({
                                                     application: req.query,
                                                     coreWs: ws,
                                                 });
                sessions.push(app);
            });

        });

        let bodyParser = require('body-parser');
        // app.use(bodyParser.urlencoded());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.post('/DoRpc',
                 upload.single('file'),
                 async function(req, res) {
                     console.log(req.file, req.files);

                     let buffer;
                     let request = req.body;
                     if (req.body.jsonStr) {
                         request = JSON.parse(req.body.jsonStr);
                     }

                     console.log(`request`, request);
                     let { method } = request;
                     console.log(`method`, method);

                     let session = sessions[0];
                     if (!session) {
                         return res.json({});
                     }

                     if (req.file) {
                         buffer = req.file.buffer;

                     }
                     let result = await session.doRpc(request, buffer);
                     res.json(result);
                 });

        app.get('/GetSessionInfo', async function(req, res) {
            let result = {
                sessions: [],
            };
            if (!sessions.length) {
                return res.json(result);
            }

            for (let session of sessions) {
                result.sessions.push(await session.getSessionInfo());
            }
            res.json(result);
        });

        app.get('/GetRequestHistory', async function(req, res) {
            let session = sessions[0];
            if (!session) {
                return res.json({});
            }
            let result = await session.getRequestHistory();
            res.json(result);
        });
    }
}

module.exports = RemoteControlAppServer;

/**
 * PORT=2004 node RemoteControlAppServer
 * @type {number}
 */
// if (require.main === "module") {
//
//     (async function() {
//
//         let remoteControlAppServer = await RemoteControlAppServer.create({
//                                                                              port: process.env.PORT,
//                                                                          });
//
//     })();
//
// }
