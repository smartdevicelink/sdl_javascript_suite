// generates the app.js file in the same directory

const fs = require('fs');
const baseDir = __dirname;
const paths = [];

function parseDir (dir, tree) {
    const currentLocation = `${baseDir + dir}/`;
    const files = fs.readdirSync(currentLocation);
    for (const index in files) {
        const path = `${dir}/${files[index]}`;
        if (isDir(path)) {
            tree[files[index]] = {};
            parseDir(path, tree[files[index]]);
        } else if (files[index].endsWith('.js')) {
            // remove the .js part
            const jsLessFile = files[index].slice(0, -3);
            const jsAlias = path.replace('/src/', '').replace(/\/|\.|-/gi, '_');
            tree[jsLessFile] = jsAlias;
            paths.push({
                name: jsLessFile,
                alias: jsAlias,
                path: `.${path}`,
            });
        }
    }
    return tree;
}

function isDir (location) {
    const stat = fs.statSync(baseDir + location);
    return stat && stat.isDirectory();
}


const tree = parseDir('/src', {});

// generate the file

let output = `/*
* Copyright (c) ${new Date().getFullYear()}, Livio, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

`;
output += paths.map(path => {
    return `import { ${path.name} as ${path.alias}} from '${path.path}';`;
}).join('\n');

let stringifiedTree = JSON.stringify(tree, null, 4);
stringifiedTree = stringifiedTree.replace(/: true/g, '');
stringifiedTree = stringifiedTree.replace(/"/g, '');
stringifiedTree = stringifiedTree.replace(/"/g, '');
stringifiedTree = stringifiedTree.replace(/},/g, '}');
stringifiedTree = stringifiedTree.replace(/}/g, '},');
stringifiedTree = stringifiedTree.replace(/\w\n/g, match => `${match[0]},\n`);

output += `

const SDL = ${stringifiedTree};

export default SDL;`;

output = output.replace(/,;/g, ';');

fs.writeFileSync(`${baseDir}/app.js`, output);
