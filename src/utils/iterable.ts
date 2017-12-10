export interface Iterable {
  [Symbol.iterator](): Iterator;
}

export interface Iterator {
  next(): IteratorResult;
}

export interface IteratorResult {
  value: any;
  done: boolean;
}
