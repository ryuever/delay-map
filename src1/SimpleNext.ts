export interface ISimpleNext {
  queue: Array<number>;
  nextIndex: number;

  add(fn: () => {});
  next();
  hasNext();
}

class SimpleNext implements ISimpleNext {
  queue: Array<number>;
  nextIndex: number;

  constructor() {
    this.queue = [];
    this.nextIndex = 0;
  }

  add(fn) {
    this.queue.push(fn);
  }

  next() {
    return this.queue[this.nextIndex++];
  }

  hasNext() {
    return this.queue.length >= this.nextIndex  + 1;
  }
}

export default SimpleNext;
