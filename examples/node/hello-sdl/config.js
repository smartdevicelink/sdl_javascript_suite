const SDL = require('../../../lib/node/src/index.js');

module.exports = {
    appId: (`${Math.floor(Date.now() / 1000)}`).substr(7),
    port: 3005,
    timeout: 5000,
    ssl: new SDL.transport.SslConfig(),
};