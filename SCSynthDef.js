#!/usr/bin/env node

var supercolliderjs = require('supercolliderjs');
var d = supercolliderjs.dryads;

var app = supercolliderjs.dryadic();

/**
 * Start the language interpreter and the server, compile 2 synthdefs and and send them to the server
 * and load one other directly from a pre-compiled file.
 */

var s = new d.SCSynth({}, [
  // Surround the synth defs with an SCLang which they will all share.
  new d.SCLang({debug: true}, [
    // compile a supercollider lang file
    new d.SCSynthDef({compileFrom: './resources/lfsaw.scd'}),
    // compile from supercollider source code supplied as a string
    new d.SCSynthDef({source:
      `SynthDef("compiledSaw", { arg freq=400;
        Out.ar(0, LFSaw.ar(freq));
      })`}),
    // load from a pre-compiled .scsyndef file
    new d.SCSynthDef({loadFrom: './resources/blip.scsyndef'})
  ])
]);

app.play(s);
