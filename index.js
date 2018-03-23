const charmap = require('./charmap');
const search = Symbol();
const getResult = Symbol();

class TextFinder {
  /**
   * @constructor TextFinder
   * @param {Charmap} _charmap
   */
  constructor(_charmap) {
    this.root = {
      isRoot: true,
      length: 0,
    };
    this.charmap = _charmap;
  }

  /**
   * wordsをtree構造に展開する
   * @param {Array<string>} words
   */
  async setup(words) {
    /////////////////////////////////
    // wordsをthis.root配下にtree状に展開する
    const wordsArray = Array.isArray(words) ? words : [words];

    wordsArray.forEach(word => {
      let nowNode = this.root;

      word.split('').forEach(char => {
        const c = this.charmap.get(char);
        let nextNode = nowNode[c];
        if (!nextNode) {
          nowNode[c] = nextNode = {
            pre: nowNode,
            token: c,
          };
        }
        nowNode = nextNode;
      });
      nowNode.isEnd = true;
    });

    /////////////////////////////////
    // tmp) すべてのnodeをフラットな配列(queue)にする
    const queue = [this.root];
    const tmpQueue = [];

    const isNodeKey = key => {
      return 'pre' !== key && 'isEnd' !== key && 'token' !== key && 'isRoot' !== key && 'length' !== key;
    };

    const setQueue = async node => {
      for (const key in node) {
        if (isNodeKey(key)) {
          node[key].length = node.length + 1;
          queue.push(node[key]);
          tmpQueue.push(node[key]);
        }
        await new Promise(resolve => setImmediate(resolve));
      }

      if (tmpQueue.length) {
        await setQueue(tmpQueue.shift());
      }
    };

    await setQueue(this.root);

    /////////////////////////////////
    // 見つからなかったときに次に走査するnodeを決める
    queue.forEach(node => {
      if (node.isRoot || node.pre.isRoot) {
        node.fail = this.root;
        return;
      }

      let preNode = node.pre;
      while (preNode) {
        if (preNode.fail[node.token]) {
          node.fail = preNode.fail[node.token];
          return;
        }
        preNode = preNode.pre;
      }
      node.fail = this.root;
    });
  }

  /**
   * str内に最初に見つかったwordの{開始位置、終了位置、文字列}を返す
   * @param {string} str
   */
  findOne(str) {
    let node = this.root, result;

    str.split('').some((char, i) => {
      const c = this.charmap.get(char);
      node = this[search](node, c);
      result = this[getResult](node, i, str);
      return !!result;
    });
    return result;
  }

  /**
   * str内のwordをすべて検索し、{開始位置、終了位置、文字列}のリストを返す
   * @param {string} str
   */
  find(str) {
    let node = this.root;
    const results = [];

    str.split('').forEach((char, i) => {
      const c = this.charmap.get(char);
      node = this[search](node, c);
      const result = this[getResult](node, i, str);
      if (result) {
        results.push(result);
      }
    });
    return results;
  }

  /**
   * nodeからtokenを検索する
   * @private
   * @param {object} node
   * @param {string} token
   */
  [search](node, token) {
    if (node[token]) {
      return node[token];
    }
    if (node.isRoot) {
      return this.root;
    }
    return this[search](node.fail, token);
  }

  /**
   * 末端nodeの場合、{開始位置、終了位置、文字列}を返す
   * @private
   * @param {object} node
   * @param {number} pos
   * @param {string} str
   */
  [getResult](node, pos, str) {
    if (node.isEnd) {
      const s = pos - node.length + 1;
      const e = pos + 1;
      return {
        start: s,
        end: e,
        string: str.substring(s, e),
      };
    }
  }
}

module.exports = new TextFinder(charmap);
module.exports.TextFinder = TextFinder;
module.exports.charmap = charmap;
module.exports.Charmap = charmap.Charmap;
