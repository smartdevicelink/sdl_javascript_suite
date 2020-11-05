// removes the temporary directory created from setup.js
const rimraf = require('rimraf');
const baseDir = __dirname;

// remove the tmp directory and the generated index.js entrypoint files
rimraf(`${baseDir}/tmp`, () => {});
rimraf(`${baseDir}/index.js`, () => {});
rimraf(`${baseDir}/../js/app.js`, () => {});
