const RemoteControlAppServer = require('./RemoteControlAppServer');

(async function() {

    let remoteControlAppServer = await RemoteControlAppServer.create({
                                                                         port: process.env.REMOTE_CONTROL_PORT
                                                                     });
})();


(function() {

})();
