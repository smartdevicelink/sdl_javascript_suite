import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'index.js',
  output: [
    {
      file: 'pure-bundle.js',
      format: 'iife',
      sourcemap: 'inline',
      name: 'SDL'
    },
  ],
  plugins: [
    commonjs()
  ]
};
