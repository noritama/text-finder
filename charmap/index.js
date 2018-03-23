class Charmap {
  constructor() {
    this.map = {};
  }

  merge(map) {
    Object.assign(this.map, map);
    return this;
  }

  get(char) {
    return this.map[char] || char;
  }
}

const def = new Charmap();
def.merge(require('./en'));
def.merge(require('./ja'));
def.merge(require('./num'));
def.merge(require('./mark'));

module.exports = def;
module.exports.Charmap = Charmap;
