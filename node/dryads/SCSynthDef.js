let {
  dryadic,
  SCLang,
  SCServer,
  SCSynthDef
} = require('supercolliderjs/lib/dryads');

let app = dryadic();

/**
 * Start the language interpreter and the server,
 * compile 2 synthdefs and and send them to the server
 * and load one other directly from a pre-compiled file.
 */

let s = new SCServer({}, [
  // Surround the synth defs with an SCLang which they will all share.
  new SCLang({debug: true}, [
    // compile a supercollider lang file
    new SCSynthDef({compileFrom: './synthdefs/lfsaw.scd'}),
    // compile from supercollider source code supplied as a string
    new SCSynthDef({source:
      `SynthDef("compiledSaw", { arg freq=400;
        Out.ar(0, LFSaw.ar(freq));
      })`}),
    // load from a pre-compiled .scsyndef file
    new SCSynthDef({loadFrom: './synthdefs/blip.scsyndef'}),
    // compile from source then save as .scsyndef
    new SCSynthDef({
      compileFrom: './synthdefs/sinosc.scd',
      saveTo: './synthdefs/'})
  ])
]);

app.play(s);
