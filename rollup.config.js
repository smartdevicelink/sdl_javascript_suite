import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default {
  input: 'lib/js/app.js',
  output: [
    {
      file: 'lib/node/Common.js',
      format: 'umd',
      sourcemap: 'inline',
      name: 'SDL'
    },
    {
      file: 'lib/js/dist/SDL.js',
      format: 'esm',
      sourcemap: 'inline',
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    minify({})
  ]
};