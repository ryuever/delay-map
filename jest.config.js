module.exports = {
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "globals": {
    "ts-jest": {
      // "babelConfig": {
      //   // "presets": ["env"],
      //   // "plugins": ["transform-es2015-modules-commonjs"]

      //   "presets": [["es2015", {"modules": false}]],
      //   "env": {
      //     "test": {
      //       "presets": [["es2015"]]
      //     }
      //   }
      // },
      "useBabelrc": true
    }
  },
  "transform": {
    // "^.+\\.jsx?$": "ts-jest",
    // "^.+\\.(ts|tsx)$": "<rootDir>/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
    // "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  // "testMatch": ["**/__tests__/*.(ts|tsx|js)"],
  // verbose: true,
  // collectCoverage: false,
  // collectCoverageFrom: [
  //   "src/*.{js,jsx}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**"
  // ],
};

// "jest": {
//   "moduleDirectories": ["node_modules", "src"],
//   "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js"
//   ],
//   "transform": {
//     "^.+\\.(ts|tsx)$": "<rootDir>/preprocessor.js"
//   },
//   "testMatch": [
//     "**/__tests__/*.(ts|tsx|js)"
//   ]
// },
