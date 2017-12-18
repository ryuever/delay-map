// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/delay-map.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    resolve(),
    babel({
      babelrc: false,
      "presets": [
        ["env", {
          "modules": false
        }]
      ],
      "plugins": ["external-helpers"],
      exclude: 'node_modules/**'
    })
  ]
};
