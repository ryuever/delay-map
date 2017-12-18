import DeferMap from "../src";

describe("timeout testing", function() {
  jest.useFakeTimers();

  test("By default, map function will be triggered after every 300ms", () => {
    const res = new DeferMap([1, 2, 3], (i, key) => {
      return i;
    }).then();

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(300);

    jest.runOnlyPendingTimers();

    expect(setTimeout.mock.calls.length).toBe(2);
    expect(setTimeout.mock.calls[1][1]).toBe(300);

    expect(setTimeout.mock.calls.length).toBe(2);
  })
})
