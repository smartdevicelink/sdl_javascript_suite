const SDL = require('../../js/dist/SDL.js');
const WebSocketServerTransportConfig = require('./transport/WebSocketServerTransportConfig.js');
const WebSocketServerTransport = require('./transport/WebSocketServerTransport.js');

// Transport extensions
SDL.transport.WebSocketServerTransportConfig = WebSocketServerTransportConfig;
SDL.transport.WebSocketServerTransport = WebSocketServerTransport;

module.exports = SDL;