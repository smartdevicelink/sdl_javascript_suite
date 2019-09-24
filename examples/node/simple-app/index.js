const express = require('express');
const enableWs = require('express-ws');
const multer = require('multer');
const SimpleApp = require('./SimpleApp');

(async function() {


    let appManagers = [];

    let app = express();
    let upload = multer(
    );

    let port = process.env.PORT || 2004;

    console.log(`listening on port ${port}`);
    // console.log(`BocksProxy on port ${this.baseUrl}`);

    let server = app.listen(port, async function() {
        enableWs(app, server);
        app.ws('/', async(ws, req) => {

            let app = await SimpleApp.createApp(ws);
            appManagers.push(app);
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
                 for (let app of appManagers)
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
        if (!appManagers.length) {
            return res.json(result);
        }

        for (let app of appManagers) {
            result.apps.push({
                                 session: await app.getSessionInfo()
                             });
        }
        res.json(result);
    });

    app.get('/GetRequestHistory', async function(req, res) {
        let app = appManagers[0];
        if (!app) {
            return res.json({});
        }
        let result = await app.getRequestHistory();
        res.json(result);
    });



})();

