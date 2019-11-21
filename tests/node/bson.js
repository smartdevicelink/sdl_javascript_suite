const SDL = require('./../../lib/js/dist/SDL.js');

function test (Bson) {
    console.log('Bson', Bson);
    const serial = Bson.serialize({ 'x': 1, });
    console.log(serial);
    const deserial = Bson.deserialize(serial);
    console.log(deserial);
}

test(SDL.util.Bson);