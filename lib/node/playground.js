const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3003 });
console.log('listening.');

wss.on('connection', function onConnection(connection) {
    console.log('connection established');

    connection.on('message', function onMessage(message) {
        console.log('received message of type: %s', message.constructor);
        console.log('received:');
        console.log(message);
        console.log('is it a buffer? %s', message.constructor === Buffer);
    });
});






var exampleSocket = new WebSocket("ws://localhost:3003");

exampleSocket.onopen = function (event) {
    console.log("connected to server.");
    console.log("sending text");
    exampleSocket.send("This is text");
    console.log("sending binary");
    exampleSocket.send(new Uint8Array(8));
};