const assert = require('power-assert');
const {Charmap} = require('../charmap');

describe('Charmap', () => {

  describe('merge', () => {

    it('shoud merge map object.', () => {
      const charmap = new Charmap();
      assert(Object.keys(charmap.map).length === 0);

      charmap.merge({A: 'a'});
      assert(Object.keys(charmap.map).length === 1);

      charmap.merge({B: 'b', C: 'c'});
      assert(Object.keys(charmap.map).length === 3);
    });

  });

  describe('get', () => {

    it('should get mapped value.', () => {
      const charmap = new Charmap();
      assert(charmap.get('A') === 'A');

      charmap.merge({A: 'a'});
      assert(charmap.get('A') === 'a');
    });

  });

});
