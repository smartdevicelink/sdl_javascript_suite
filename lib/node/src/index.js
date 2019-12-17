const SDL = require('../../js/dist/SDL.js');
const WebSocketServerConfig = require('./transport/WebSocketServerConfig.js');
const WebSocketServer = require('./transport/WebSocketServer.js');
const TransportManager = require('./transport/TransportManager.js');

// Transport extensions
SDL.transport.WebSocketServerConfig = WebSocketServerConfig;
SDL.transport.WebSocketServer = WebSocketServer;
SDL.transport.TransportManager = TransportManager;

module.exports = SDL;