import SimpleNext from "./SimpleNext";
import { ISimpleNext } from "./SimpleNext";
import { Iterable } from "./utils/iterable";

export interface IDeferMapOptions {
  timeout: number | { timeout: number };
}

export interface IDeferMap {
  wrapper(value: any, key: number);

  then(cb: () => any);
}

export default class DeferMap implements IDeferMap {
  private queue: ISimpleNext;
  private runningCount: number;
  private concurrency: number;
  private totalCount: number;

  private timeout: number;

  private iterable: Iterable;

  private result: any[];

  private fn: () => {};
  private wp: any;

  constructor(
    iterable: Iterable,
    fn: () => {},
    opts: number | { timeout: number } | undefined,
  ) {
    this.queue = new SimpleNext();
    this.runningCount = 0;
    this.concurrency = 1;
    this.totalCount = 0;

    this.iterable = iterable;

    if (typeof opts === "number") {
      this.timeout = opts;
    }

    if (typeof opts === "undefined") {
      this.timeout = 300;
    }

    if (typeof opts === "object") {
      this.timeout = opts.timeout;
    }

    this.fn = fn;
    this.result = [];

    this.initWrappers();
  }

  public then(cb) {
    return new Promise((resolve, reject) => {
      if (this.queue.hasNext() && (this.runningCount < this.concurrency)) {
        this.queue.next().call(null, resolve, reject);
      }
    });
  }

  // only to exec function, and trigger next function
  // return a function, then this function should return promise
  public wrapper(value: any, key: number): (rs: (res: any) => void, rj: () => void) => {} {
    const m: any = value;
    const n: any = key;

    return (rs: (res: any) => void, rj: () => void) => {
      return new Promise((resolve) => {
        this.result[n] = this.fn.apply(null, [m, n]);
        resolve();

        if (this.result.length === this.totalCount) {
          rs(this.result);
          return;
        }

        if (this.queue.hasNext()) {
          setTimeout(() => {
            this.queue.next().call(null, rs, rj);
          }, this.timeout);
        }
      });
    };
  }

  // 其实现在lazy的一个方式就是通过返回一个function
  // 另一个lazy的方式，不是到是不是可以通过new Function的方式来实现，比如下面的形式在我们进行initWrappers
  // 的时候不是返回一个函数，而是直接直接了那个逻辑，现在的问题就是resolve, reject需要外部来传入的；
  // 他们应该是运行的时候才会有的这个怎么搞。
  private initWrappers() {
    for (const value of this.iterable) {
      this.queue.add(this.wrapper(value, this.totalCount));
      this.totalCount++;
    }
  }
}
