const SDL = require('../../js/dist/SDL.js');
const WebSocketServerConfig = require('./transport/WebSocketServerConfig.js');
const WebSocketServerTransport = require('./transport/WebSocketServerTransport.js');

// Transport extensions
SDL.transport.WebSocketServerConfig = WebSocketServerConfig;
SDL.transport.WebSocketServerTransport = WebSocketServerTransport;

module.exports = SDL;