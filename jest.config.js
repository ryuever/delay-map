module.exports = {
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "globals": {
    "ts-jest": {
      "useBabelrc": true
    }
  },
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
};
