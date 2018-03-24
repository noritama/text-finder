const Benchmark = require('benchmark');
const textfinder = require('../');
const gen = require('./gen_words');

const words = gen.words(10000, 10); // 10文字の文字列を1万ワード

const word = () => {
  return gen.word(100);
};

(async () => {
  await textfinder.setup(words);

  const suite = new Benchmark.Suite();

  suite
    .add('textfinder#findOne', () => {
      textfinder.findOne(word());
    })
    .add('textfinder#find', () => {
      textfinder.find(word());
    })
    .add('Array#indexOf', () => {
      const w = word();
      words.some(word => !!~w.indexOf(word));
    })
    .on('cycle', event => {
      console.log(String(event.target));
    })
    .on('complete', () => {
      console.log('finish!');
      process.exit(0);
    })
    .run({async: true})
  ;
})().catch(err => {
  console.error(err);
  process.exit(1);
});
