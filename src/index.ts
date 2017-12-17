import SimpleNext from "./SimpleNext";

import {
  ISimpleNext,
} from "./SimpleNext";

import {
  Iterable,
} from "./utils/iterable";

export interface IDeferMapOptions {
  timeout: number | { timeout: number };
}

export interface IDeferMap {
  wrapper(value: any, key: number, rs: (res: any) => {}, rj: () => {});
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
  }

  public then(cb) {
    return new Promise((resolve, reject) => {

      for (const value of this.iterable) {
        this.queue.add(this.wrapper(value, this.totalCount, resolve, reject));
        this.totalCount++;
      }

      if (this.queue.hasNext() && (this.runningCount < this.concurrency)) {
        this.queue.next().call(null);
      }
    });
  }

  // only to exec function, and trigger next function
  // return a function, then this function should return promise
  public wrapper(value: any, key: number, rs: (res: any) => void, rj: () => void) {
    const m: any = value;
    const n: any = key;

    return () => {
      return new Promise((resolve) => {
        this.result[n] = this.fn.apply(null, [m, n]);
        resolve();
        if (this.result.length === this.totalCount) {
          rs(this.result);
          return;
        }

        if (this.queue.hasNext()) {
          this.queue.next().call(null);
        }
      });
    };
  }
}
