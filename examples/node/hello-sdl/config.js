const SDL = require('../../../lib/node/src/index.js');

module.exports = {
    appId: (`${Math.floor(Date.now() / 1000)}`).substr(7),
    port: process.env.APP_PORT || 3005,
    timeout: 5000,
    ssl: new SDL.transport.SslConfig(),
    appLifespan: process.env.APP_LIFESPAN || 10 * 60, // automatically closes the app after 10 minutes
};