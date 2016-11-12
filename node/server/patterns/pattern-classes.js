let _ = require('lodash');


function deThunk(value) {
  return typeof value === 'function' ? value() : value;
}


function isPattern(thing) {
  return typeof thing === 'object' && thing.asStream;
}


class Pattern {

  * asStream() {}

  * embedInStream(item) {
    if (!_.isNull(item)) {
      if (isPattern(item)) {
        yield *item.asStream();
      } else {
        yield item;
      }
    }
  }
}


class Pseq extends Pattern {

  constructor(list, repeats=1, offset=0) {
    super();
    Object.assign(this, { list, repeats, offset });
  }

  * asStream() {
    let list;
    let repeats = deThunk(this.repeats);
    if (this.offset !== 0) {
      let first = this.list.slice(0, this.offset);
      let second = this.list.slice(this.offset);
      this.list = second.concat(first);
    } else {
      list = this.list;
    }

    for (let i = 0; i < repeats; i++) {
      for (let item of list) {
        yield * this.embedInStream(item);
      }
    }
  }
}


class Prand extends Pattern {

  constructor(list, repeats=1) {
    super();
    Object.assign(this, { list, repeats });
  }

  * asStream() {
    let repeats = deThunk(this.repeats);
    for (let i = 0; i < repeats; i++) {
      let item = this.list[_.random(this.list.length - 1)];
      yield* this.embedInStream(item);
    }
  }
}



module.exports = {
  Pattern,
  Pseq,
  Prand
};
