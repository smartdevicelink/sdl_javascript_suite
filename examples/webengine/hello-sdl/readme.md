## SDL WebEngine App Startup Instructions
1) Request a [Manticore instance](https://smartdevicelink.com/resources/manticore/)
1) Load the local URL of your `index.html` file in your browser with the next querystring template `?sdl-host=[ws_host]&sdl-port=[ws_port]&sdl-transport-role=[ws|wss]-server` where:
    * `[ws_host]` - the host of SDL WebSocket server, should not include the protocol and port;
    * `[ws_port]` - the port of SDL WebSocket server;
    * `[ws|wss]-server` - use `wss-server` value for a secure connection, otherwise `ws-server`;
1) Click on the app in Manticore and observe the series of `Show` RPCs performed.
