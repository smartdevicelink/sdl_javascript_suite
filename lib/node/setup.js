// creates a temporary directory with all the vanilla and nodejs files for bundling
const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const readDir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const baseDir = __dirname;

async function merge (source, destination) {
    const files = await readDir(source, { withFileTypes: true });
    // if it's a directory, recurse the merge process. otherwise, copy the file to the destination
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file.isDirectory()) {
            await merge(path.join(source, file.name), path.join(destination, file.name));
        } else {
            // ensure the directory exists first
            await mkdir(destination, { recursive: true });
            await copyFile(path.join(source, file.name), path.join(destination, file.name));
        }
    }
}

async function performMerges () {
    // first, copy all files in the vanilla library to the temporary folder
    await merge(`${baseDir}/../js/src`, `${baseDir}/tmp`);
    // then, copy all files in the node library to the temporary folder, overwriting existing files
    await merge(`${baseDir}/src`, `${baseDir}/tmp`);
}
performMerges();