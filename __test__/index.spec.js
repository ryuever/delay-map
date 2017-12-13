import DeferMap from '../src';
// const DeferMap = require('../src');

test('basic', function() {
  let start = +new Date();

  const df = new DeferMap([1, 2, 3], (i, key) => {
    const exec = +new Date();
    return i;
  });

  return df.then((res) => {
    expect(res).toEqual([1, 2, 3]);
  })
})

