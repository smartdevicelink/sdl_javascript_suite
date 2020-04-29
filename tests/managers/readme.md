## Managers Tests Startup Instructions
1) Host the project on AWS EC2 or a comparable hosting platform
2) On the server hosting the project, run `npm install` and `npm install mocha` then `npm run test-managers` from within the main project directory. From this moment, there will be 30 seconds to run the tests before the WebSocket is closed.
3) Request a [Manticore instance](https://smartdevicelink.com/resources/manticore/)
4) On Manticore, click `Add Cloud or Embedded App` under the `Connect Apps` menu
5) Enter `hello-node` as your AppId, and add `hello-node` as an App Nickname. 
6) Also provide your App WebSocket Endpoint. Note that a port needs to be defined. The port is typically 80 for the ws protocol.
7) Click `Send Cloud App to Core`
8) Your app's icon should appear in the Manticore UI.
9) Click on the app in Manticore and observe the series of `Show` RPCs performed.
10) The tests will run in the background and a log of their results will be printed to the console.
11) The app will automatically close/disconnect after about 5 seconds