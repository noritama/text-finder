const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

const genWord = len => {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
};

module.exports = {
  words: (n, len) => {
    const words = [];
    for (let i = 0; i < n; i++) {
      words.push(genWord(len));
    }
    return words;
  },
  word: genWord,
};
