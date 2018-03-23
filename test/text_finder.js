const assert = require('power-assert');
const {TextFinder, charmap} = require('../');

describe('TextFinder', () => {

  const tfinder = new TextFinder(charmap);

  before(async () => {
    await tfinder.setup([
      'WORKING!!',
      'けいおん!!',
      'RAINBOW -二舎六房の七人-',
      '迷い猫オーバーラン!',
      '裏切りは僕の名前を知っている',
      'さらい屋 五葉',
      'まじっく快斗',
      'ペンギンの問題DX?',
      'とっとこハム太郎 でちゅ',
      '日常',
      'たまこまーけっと',
      'GJ部',
      'gdgd妖精s（ぐだぐだフェアリーーズ）',
      '生徒会の一存 Lv.2',
      'ビビッドレッド・オペレーション',
      'ささみさん@がんばらない',
      '僕は友達が少ないNEXT',
      '琴浦さん',
      'フォトカノ',
      'ゆゆ式',
      'あいうら',
      'ご注文はうさぎですか?',
      'ピンポン THE ANIMATION',
    ]);
  });

  describe('findOne', () => {

    it('ヒットした文字列と位置が返される', () => {
      const result = tfinder.findOne('けいおん！2期 -> けいおん！！');
      assert(result);
      assert.strictEqual(result.string, 'けいおん！！');
      assert.strictEqual(result.start, 11);
      assert.strictEqual(result.end, 17);
    });

    it('複数ヒットした場合は1つ目のみ返される', () => {
      const result = tfinder.findOne('たまこまーけっととけいおん！！は京アニ');
      assert(result);
      assert.strictEqual(result.string, 'たまこまーけっと');
      assert.strictEqual(result.start, 0);
      assert.strictEqual(result.end, 8);
    });

  });

  describe('find', () => {

    it('複数ヒットした場合はすべて返される', () => {
      const results = tfinder.find('たまこまーけっととけいおん！！は京アニ');
      assert.equal(results.length, 2);
      assert.strictEqual(results[0].string, 'たまこまーけっと');
      assert.strictEqual(results[0].start, 0);
      assert.strictEqual(results[0].end, 8);
      assert.strictEqual(results[1].string, 'けいおん！！');
      assert.strictEqual(results[1].start, 9);
      assert.strictEqual(results[1].end, 15);
    });

  });

});
