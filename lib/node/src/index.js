const SDL = require('../../js/dist/SDL.js');
const WebSocketServerConfig = require('./transport/WebSocketServerConfig.js');
const WebSocketServer = require('./transport/WebSocketServer.js');

// Transport extensions
SDL.transport.WebSocketServerConfig = WebSocketServerConfig;
SDL.transport.WebSocketServer = WebSocketServer;

module.exports = SDL;