// creates a temporary directory with all the vanilla and nodejs files for bundling
const merge = require('merge-dirs').default;
const baseDir = __dirname;

// first, copy all files in the vanilla library to the temporary folder
merge(`${baseDir}/../js/src`, `${baseDir}/tmp`);
// first, copy all files in the node library to the temporary folder, overwriting existing files
merge(`${baseDir}/src`, `${baseDir}/tmp`, 'overwrite');