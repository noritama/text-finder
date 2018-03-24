# text-finder

text-finder Search "registered words" in string.
Word registering is easy, and search is fast.

## Install

```
npm install text-finder
```

## Usage

### simple

```
const textfinder = require('text-finder');

(async () => {
  // setup is async. (return Promise<void>)
  await textfinder.setup(['apple', 'orange', 'remon']);
  
  const result = textfinder.findOne('I like orange');
  // result: {string: 'orange', start: 7, end: 13}
})();
```

### customize character mapping

"character mapping" means Translate as a other character. 

ex) lower/upper case(A => a)

```
const {TextFinder} = require('./');
const textfinder = new TextFinder({A: 'a', O: 'o', R: 'r'});

(async () => {
  await textfinder.setup(['apple', 'orange', 'remon']);
  
  const result = textfinder.findOne('I like Remon');
  // result: {string: 'Remon', start: 7, end: 12}
})();
```

## APIs

### TextFinder#findOne

Returns the first word found.

```
const result = textfinder.findOne('I like orange and remon.');
// result: {string: 'orange', start: 7, end: 13}
```

### TextFinder#find

Return the all word found as an array.

```
const result = textfinder.find('I like orange and remon.');
// result: [{string: 'orange', start: 7, end: 13}, {string: 'remon', start, 18, end: 23}]
```

## Benchmark

| function | 100words | 1000words | 10000words |
|----------|----------|-----------|------------|
| Array#indexOf | 54,045 ops/s | 9,600 ops/s | 1,015 ops/s |
| TextFinder#findOne | 28,787 ops/s | 24,683 ops/s | 12,858 ops/s |
| TextFinder#find | 28,891 ops/s | 24,301 ops/s | 12,506 ops/s |

## LICENSE

MIT LICENSE [LICENSE](LICENSE)
