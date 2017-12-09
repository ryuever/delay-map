import SimpleNext from './SimpleNext';

class DeferMap {
  constructor(iterable, fn, opts) {
    this._queue = new SimpleNext();

    this._runningCount = 0;
    this._concurrency = 1;
    this._totalCount = 0;

    this._iterable = iterable;

    this._timeout = 2000;

    this._fn = fn;

    this.result = [];


    return this.init();
  }

  // this._queue是一个iterable对象，执行完的话，就去执行this._queue.next();
  wrapper(value, key, rs, rj) {
    let m = value;
    let n = key;

    return () =>{
      return new Promise((resolve) => {
        const normal = () => {
          this.result[n] = this._fn.apply(null, [m, n]);

          if (this._queue.hasNext()) {
            this._queue.next().call(null);
          }

          resolve();

          if (this.result.length === this._totalCount) {
            rs(this.result);
          }
        }

        if (key === 0) {
          return normal();
        }

        setTimeout(() => {
          normal();
        }, this._timeout)
      })
    }
  }

  init() {

    return new Promise((resolve, reject) => {
      for (let value of this._iterable) {
        this._queue.add(this.wrapper(value, this._totalCount, resolve, reject));
        this._totalCount++;
      }

      // change to loop check for multiple concurrency
      if (this._queue.hasNext() && (this._runningCount < this._concurrency)) {
        this._queue.next().call(null);
      }
    })
  }
}

export default DeferMap;
