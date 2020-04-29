## SDL WebEngine App Startup Instructions
1) Request a [Manticore instance](https://smartdevicelink.com/resources/manticore/)
1) From terminal with focus in the example app directory, run `npm install` then `npm start`.
1) Your browser will open the app's index.html file with an example querystring attached to the URL. Replace the querystring values with the appropriate information from Manticore/Core.
1) Click on the app in Manticore and observe the series of `Show` RPCs performed.

Note that in the case where sdl_core doesn't support having a websocket server yet, you would need to perform extra steps. You would need to use a proxy which converts your app's websocket connection to a TCP one, which then connects to core over TCP. There is a proxy.jar file with usage instructions in the example vanilla JS hello-sdl application in this project.
