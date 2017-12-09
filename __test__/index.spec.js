import DeferMap from '../src';

test('basic', function() {
  let start = +new Date();

  const test = new DeferMap([1, 2, 3], (i, key) => {
    const exec = +new Date();
    return i;
  });

  test.then((res) => {
    expect(res).toEqual([1, 2, 3]);
  })
})

