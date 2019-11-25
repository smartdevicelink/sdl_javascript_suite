const net = require('net');

class TcpProxy {

    constructor(opts)
    {
        this.opts = opts;

        this.coreHost = opts.coreHost || `m.sdl.tools`;
        this.corePort = opts.corePort || `12346`;

    }


    static async create(opts) {

        let obj = new this(opts);

        await obj.init();
        return obj;
    }



    async initIncomingDataHandler()
    {
        let self = this;

        this.sdlCoreConnection.on('data', async chunk => {
            self.ws.send(chunk);
        });

        this.ws.on('message', async (msg) => {
            self.sdlCoreConnection.write(msg);
        })
    }

    async initEventsHandler()
    {

    }


    async init() {
        let self = this;
        this.ws = this.opts.ws;
        //send this message immediately.
        this.registerAppInterfaceMessage = this.opts.registerAppInterfaceMessage;



        let { coreHost, corePort } = self;
        let sdlCoreConnection = new net.Socket();
        sdlCoreConnection.connect(corePort, coreHost);

        this.sdlCoreConnection = sdlCoreConnection;

        await this.initIncomingDataHandler();
    }


}



const express = require('express');
let app = express();
const enableWs = require('express-ws');
//https://stackoverflow.com/questions/22429744/how-to-setup-route-for-websocket-server-in-express
enableWs(app);


app.ws('/', (ws, req) => {
    TcpProxy.create({ ws, corePort: process.env.CORE_PORT,
    coreHost: process.env.CORE_HOST });
});

app.use(express.static(__dirname));

app.use(express.static(__dirname + './../../../lib/js/dist/'));


const PORT = process.env.PORT || 9090;
let server = app.listen(PORT, async function() {
    console.log(`app is listening`,PORT);
    require("openurl").open("http://localhost:" + PORT);
});


