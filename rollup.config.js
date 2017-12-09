// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dalay-map.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      "presets": [
        ["env", {
          "modules": false
        }]
      ],
      "plugins": ["external-helpers"],
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
