'use strict';

var SimpleNext = function () {
    function SimpleNext() {
        this.queue = [];
        this.nextIndex = 0;
    }
    SimpleNext.prototype.add = function (fn) {
        this.queue.push(fn);
    };
    SimpleNext.prototype.next = function () {
        return this.queue[this.nextIndex++];
    };
    SimpleNext.prototype.hasNext = function () {
        return this.queue.length >= this.nextIndex + 1;
    };
    return SimpleNext;
}();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var DeferMap = function () {
    function DeferMap(iterable, fn, opts) {
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
        if ((typeof opts === "undefined" ? "undefined" : _typeof(opts)) === "object") {
            this.timeout = opts.timeout;
        }
        this.fn = fn;
        this.result = [];
        this.initWrappers();
    }
    DeferMap.prototype.then = function (cb) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.queue.hasNext() && _this.runningCount < _this.concurrency) {
                _this.queue.next().call(null, resolve, reject);
            }
        });
    };
    // only to exec function, and trigger next function
    // return a function, then this function should return promise
    DeferMap.prototype.wrapper = function (value, key) {
        var _this = this;
        var m = value;
        var n = key;
        return function (rs, rj) {
            return new Promise(function (resolve) {
                _this.result[n] = _this.fn.apply(null, [m, n]);
                resolve();
                if (_this.result.length === _this.totalCount) {
                    rs(_this.result);
                    return;
                }
                if (_this.queue.hasNext()) {
                    setTimeout(function () {
                        _this.queue.next().call(null, rs, rj);
                    }, _this.timeout);
                }
            });
        };
    };
    // 其实现在lazy的一个方式就是通过返回一个function
    // 另一个lazy的方式，不是到是不是可以通过new Function的方式来实现，比如下面的形式在我们进行initWrappers
    // 的时候不是返回一个函数，而是直接直接了那个逻辑，现在的问题就是resolve, reject需要外部来传入的；
    // 他们应该是运行的时候才会有的这个怎么搞。
    DeferMap.prototype.initWrappers = function () {
        for (var _i = 0, _a = this.iterable; _i < _a.length; _i++) {
            var value = _a[_i];
            this.queue.add(this.wrapper(value, this.totalCount));
            this.totalCount++;
        }
    };
    return DeferMap;
}();

module.exports = DeferMap;
