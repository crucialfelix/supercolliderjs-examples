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
var stream = Bacon.fromPoll(100, () => _.random(300, 800));

var s = new d.SCSynth({}, [
  new d.SCLang({debug: true}, [
    new d.Synth(
      new d.SCSynthDef({compileFrom: './resources/lfsaw.scd'}),
      {
        freq: 300
      },
      [
        // SynthControl is a child of the Synth
        // and sends nodeSet messages to the synth on the server
        // whenever the stream pushes a new value
        new d.SynthControl(stream.map((freq) => {
          return {freq: freq};
        }))
      ]
    )
  ])
]);

app.play(s);

/**
 * stream needs to support .map and return a subscription that you can .dispose()
 */
