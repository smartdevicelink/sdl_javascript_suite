import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import builtins from '@gqio/rollup-plugin-node-builtins';
import globals from '@crokita/rollup-plugin-node-globals';

export default [{ // Vanilla JS source
    input: 'lib/js/app.js',
    output: [
        {
            file: 'dist/js/SDL.min.js',
            format: 'umd',
            sourcemap: 'inline',
            name: 'SDL',
        }
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
        terser(),
    ],
}, { // NodeJS source
    input: 'lib/node/index.js',
    output: [
        {
            file: 'dist/node/SDL.min.js',
            format: 'umd',
            sourcemap: 'inline',
            name: 'SDL',
            globals: {
                ws: 'ws',
            },
        }
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
    ],
    external: ['ws', 'https'],
}];