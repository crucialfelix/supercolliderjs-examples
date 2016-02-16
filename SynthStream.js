#!/usr/bin/env node

var supercolliderjs = require('supercolliderjs');
var d = supercolliderjs.dryads;

var Bacon = require('baconjs');
var _ = require('lodash');

var app = supercolliderjs.dryadic();

// Every 1 second this stream emits a random number.
// Streams can also read over data sets
// or be generated from midi or UI callbacks.
// https://baconjs.github.io/api.html
var stream = Bacon.fromPoll(50, () => {
  return {
    defName: 'blip',
    args: {
      freq: _.random(100, 3000)
    }
  };
});

var s = new d.SCSynth({}, [
  new d.SCLang({debug: true}, [
    new d.SCSynthDef({compileFrom: './resources/lfsaw.scd'}),
    new d.SCSynthDef({loadFrom: './resources/blip.scsyndef'}),

    new d.SynthStream(stream)
  ])
]);

app.play(s);
