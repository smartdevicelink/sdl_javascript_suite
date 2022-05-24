## SDL JavaScript App Startup Instructions
1) Place the vanilla JS SDL.min.js file into this directory
2) Request a [Manticore instance](https://smartdevicelink.com/resources/manticore/).  
3) Open the file `./examples/js/hello-sdl/index.html` in any text editor and change the transport config's URL and port value to what Manticore's "WS URL" says.
4) Open a terminal session and `cd` both of them into `./examples/js/hello-sdl`
5) In the terminal session, run `npm install` then `npm start`.
6) Your browser should automatically open and the test app should appear on your Manticore UI.
7) Click on the app in Manticore and observe the series of `Show` RPCs performed. Logs can be seen in your browser's JavaScript console.
