class SimpleNext {
  constructor() {
    this._queue = [];
    this._nextIndex = 0;
  }

  add(fn) {
    this._queue.push(fn);
  }

  next() {
    return this._queue[this._nextIndex++];
  }

  hasNext() {
    return this._queue.length >= this._nextIndex  + 1;
  }
}

export default SimpleNext;
