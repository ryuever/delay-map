import DeferMap from "../src";
// const DeferMap = require('../src').default;

test("test", (callback) => {
  let start = +new Date();

  // expect(1).toEqual(1);
  const df = new DeferMap([1, 2, 3], (i, key) => {
    const exec = +new Date();
    return i;
  });

  return df.then((res) => {
    expect(res).toEqual([1, 2, 3]);
    callback();
  })
})
