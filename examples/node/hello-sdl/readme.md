## SDL Node.js App Startup Instructions
1) Host the project on AWS EC2 or a comparable hosting platform (local ngrok tunnels are not currently supported)
1) On the server hosting the project, run `npm install` then `npm start` from within the `./examples/node/hello-sdl` directory
1) Request a [Manticore instance](https://smartdevicelink.com/resources/manticore/)
1) On Manticore, click `Add Cloud or Embedded App` under the `Connect Apps` menu
1) Enter `hello-node` as your AppId, provide your App WebSocket Endpoint, and add `hello-node` as an App Nickname
1) Click `Send Cloud App to Core`
1) Your app's icon should appear in the Manticore UI.
1) Click on the app in Manticore and observe the series of `Show` RPCs performed.
1) The app will automatically close/disconnect after about 5 seconds