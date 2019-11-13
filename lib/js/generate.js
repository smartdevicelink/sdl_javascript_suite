// generates the app.js file in the same directory

const fs = require('fs');
const baseDir = __dirname;
const paths = [];

function parseDir (dir, tree) {
    const currentLocation = `${baseDir + dir}/`;
    const files = fs.readdirSync(currentLocation);
    for (const i in files) {
        const path = `${dir}/${files[i]}`;
        if (isDir(path)) {
            tree[files[i]] = {};
            parseDir(path, tree[files[i]]);
        } else {
            // remove the .js part
            const jsLessFile = files[i].slice(0, -3);
            tree[jsLessFile] = true;
            paths.push({
                name: jsLessFile,
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
* Copyright (c) 2019, Livio, Inc.
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
    return `import { ${path.name} } from '${path.path}';`;
}).join('\n');

let stringifiedTree = JSON.stringify(tree, null, 4);
stringifiedTree = stringifiedTree.replace(/: true/g, '');
stringifiedTree = stringifiedTree.replace(/\"/g, '');

output += `

const SDL = ${stringifiedTree}

export default SDL;`;

fs.writeFileSync(`${baseDir}/app.js`, output);
