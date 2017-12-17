import DeferMap from "../src";

test("test", async () => {
  let start = +new Date();

  const res = await new DeferMap([1, 2, 3], (i, key) => {
    const exec = +new Date();
    return i;
  }).then();

  expect(res).toEqual([1, 2, 3]);
})
