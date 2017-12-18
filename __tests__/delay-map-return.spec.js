import DeferMap from "../src";

describe('result testing', () => {
  test("DeferMap will return a Promise-like object", async () => {
    const res = await new DeferMap([1, 2, 3], (i, key) => {
      return i;
    })

    expect(res).toEqual([1, 2, 3]);
  })

  test("DeferMap.then will return a Promise", async () => {
    const res = await new DeferMap([1, 2, 3], (i, key) => {
      return i;
    }).then((res) => {
      return res.reduce((pre, cur) => pre + cur, 0);
    })

    expect(res).toEqual(6);
  })
})
