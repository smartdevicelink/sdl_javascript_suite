const express = require('express');
let app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + './../../../lib/js/dist/'));


const PORT = process.env.PORT || 9090;
let server = app.listen(PORT, async function() {
    console.log(`app is listening`,PORT);
    require("openurl").open("http://localhost:" + PORT);
});