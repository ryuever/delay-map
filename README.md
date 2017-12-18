# delay-map

In order to delay map func running with a timeout.

Basically, `iterable` object passed to map function will be executed one after another immediately. there is a situation you want to simluate a running with timeout. such as the next one should run with `300ms` delay.

## Usage

```js
const delayMap = require('./delay-map');

const dm = new delayMap([5,8,9], function(value, key) {
  return value + key;
}, {
  timeout: 1000,
})

dm.then((res) => {
  console.log('res ', res);
})

// res: [5, 9, 12]
```

## API

### delay-map(iterable, func, [options])

#### input

Type: `Iterable<Promise|any>`

#### func(item, index)

Type: `Function`


#### options

Type: `Object`

##### timeout

## License

  MIT