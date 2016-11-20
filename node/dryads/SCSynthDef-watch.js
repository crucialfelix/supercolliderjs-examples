/**
 * This example shows loading a synth def from a file,
 * and then automatically watching that file for changes.
 * If you edit ./synthdefs/editable.scd it will recompile it
 * and update to the server.
 *
 * This example also shows spawning Synths from an event stream.
 *
 * Event streams have a well known interface and can be derived
 * from DOM (browser UI) events, MIDI, generative etc.
 *
 * In this example it uses a simple Bacon.js random generator.
 *
 * Warning: this example will soon be out of date.
 * There will be a different way to connect streams into Dryads
 * and a different way to pool SynthDefs so that they can be used.
 */
let Bacon = require('baconjs');
let _ = require('lodash');

let {
  dryadic,
  SCLang,
  SCSynthDef,
  SCServer,
  SynthStream
} = require('supercolliderjs/lib/dryads');

// let midiFreq = supercolliderjs.map.midiToFreq;
let { map: { midiToFreq } } = require('supercolliderjs');

let app = dryadic();

/**
 * This creates a simple Bacon.js stream
 * that pushes a random event every 500ms.
 * There are much more interesting examples of what streams
 * can do.
 */
let stream = Bacon.fromPoll(500, () => {
  return {
    defName: 'editable',
    args: {
      freq: midiToFreq(_.random(10, 80))
    }
  };
});

let s = new SCServer({}, [
  new SCLang({debug: true}, [
    new SCSynthDef({
      compileFrom: './synthdefs/editable.scd',
      watch: true
    }, [
      // SynthStream is a child of SCSynthDef
      new SynthStream({stream})
    ]),
  ])
]);

app.play(s);
