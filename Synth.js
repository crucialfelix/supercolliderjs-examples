#!/usr/bin/env node

var supercolliderjs = require('supercolliderjs');
var d = supercolliderjs.dryads;

var app = supercolliderjs.dryadic();

var s = new d.SCSynth({}, [
  new d.SCLang({debug: true}, [
    new d.Synth(
      new d.SCSynthDef({compileFrom: './resources/lfsaw.scd'}),
      {
        freq: 600
      }
    )
  ])
]);

app.play(s);

/**
 * should play a LFSaw
 */
