


let pjson = require('./package.json');
console.log(pjson.version);


//TODO https://github.com/russjohnson09/sdl_javascript_suite/blob/develop/GUIDELINES.md#module-exports--imports
//TODO: should this use module.exports or export {} syntax?
//Which of these are node specific and which are common?
//What are the capabilities of browsers to do the rpc creation?


//TODO why is esm not included in the main package.json. Why is the package.json not in the root directory.
//examples hello-sdl works but only because it is handling dependencies on its own in a way that wouldn't be
//expected for someone using this package.

require = require("esm")(module/*, options*/);

const SdlPsm = require('./lib/js/dev-only/SdlPsm');
const SdlManager = require('./lib/js/manager/SdlManager');
const RpcStruct = require('./lib/js/rpc/RpcStruct.js');
const SdlManagerNode = require('./lib/node/manager/SdlManagerNode');

module.exports = {
  version: pjson.version,
  SdlPsm,
  SdlManager,
  RpcStruct,
  SdlManagerNode,

};
