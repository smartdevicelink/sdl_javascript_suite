import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default [{ // Vanilla JS source
    input: 'lib/js/app.js',
    output: [
        {
            file: 'lib/js/dist/SDL.js',
            format: 'umd',
            sourcemap: 'inline',
            name: 'SDL',
        },
        {
            file: 'examples/webengine/hello-sdl/SDL.js',
            format: 'umd',
            sourcemap: 'inline',
            name: 'SDL',
        },
    ],
    plugins: [
        globals(),
        builtins(),
        resolve({
            preferBuiltins: false,
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
            plugins: ['babel-plugin-transform-async-to-promises'], // convert async/await syntax
        }),
        uglify(),
    ],
}, { // NodeJS source
    input: 'lib/node/index.js',
    output: {
        dir: 'lib/node/dist',
        format: 'umd',
        sourcemap: 'inline',
        name: 'SDL',
        globals: {
            ws: 'ws',
        },
    },
    plugins: [
        globals(),
        builtins(),
        resolve({
            preferBuiltins: false,
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
            plugins: ['babel-plugin-transform-async-to-promises'], // convert async/await syntax
        }),
    ],
    external: ['ws', 'https'],
}];