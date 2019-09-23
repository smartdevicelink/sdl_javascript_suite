const express = require('express');
const enableWs = require('express-ws');
const multer = require('multer');

const RemoteControlApp = require('./RemoteControlApp');

let server;

let apps = [];

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
                apps.push(app);
            });

        });

        let bodyParser = require('body-parser');
        // app.use(bodyParser.urlencoded());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.post('/DoRpc/:appID',
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


                     let result = {};
                     if (req.file) {
                         buffer = req.file.buffer;

                     }
                     for (let app of apps)
                     {
                         if (req.params.appID === app.getAppID())
                         {
                             console.log(`found app`,app);
                             result = await app.doRpc(request, buffer);
                             break;
                         }
                     }


                     res.json(result);
                 });


        app.get('/GetAppsInfo', async function(req, res) {
            let result = {
                apps: [],
            };
            if (!apps.length) {
                return res.json(result);
            }

            for (let app of apps) {
                result.apps.push({
                                     session: await app.getSessionInfo()
                                 });
            }
            res.json(result);
        });

        app.get('/GetRequestHistory', async function(req, res) {
            let app = apps[0];
            if (!app) {
                return res.json({});
            }
            let result = await app.getRequestHistory();
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
