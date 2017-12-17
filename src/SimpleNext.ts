export interface ISimpleNext {
  add(fn: (rs: (res: any) => void, rj: () => void) => {});
  next();
  hasNext();
}

class SimpleNext implements ISimpleNext {
  private queue: number[];
  private nextIndex: number;

  constructor() {
    this.queue = [];
    this.nextIndex = 0;
  }

  public add(fn) {
    this.queue.push(fn);
  }

  public next() {
    return this.queue[this.nextIndex++];
  }

  public hasNext() {
    return this.queue.length >= this.nextIndex  + 1;
  }
}

export default SimpleNext;
