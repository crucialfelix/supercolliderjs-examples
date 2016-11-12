/**
 * Port of Patterns example
 * http://doc.sccode.org/Tutorials/Streams-Patterns-Events3.html
 *
 * This is using Pseq and Prand in ./pattern-classes
 *
 * You still have to use `new Pseq`
 * This could be made even clearer and tighter using and ES7 decorator
 * and avoid having to construct a class that only really has one function.
 */
let _ = require('lodash');
let { msg, map } = require('supercolliderjs');
let { withDefs } = require('../utils');
let { Pseq, Prand } = require('./pattern-classes');

let sound = 'help_SPE3_Allpass6';
let defs = {
  help_SPE3_Allpass6: {
    path: './help_SPE3_Allpass6.scd'
  }
};

withDefs(defs, (server) => {

  let notePattern =
    new Pseq([
      new Prand([
        null,    // a null item reached in a pattern causes it to end
        new Pseq([24, 31, 36, 43, 48, 55])
      ]),
      new Pseq([
        60,
        new Prand([63, 65]),
        67,
        new Prand([70, 72, 74])
      ], () => _.random(2, 5)),
      new Prand([74, 75, 77, 79, 81], () => _.random(3, 9))
    ], Infinity);

  const interval = 130;

  let noteStream = notePattern.asStream();

  function step() {
    let freq = noteStream.next();
    if (!freq.done) {
      server.send.msg(
        msg.synthNew(sound, -1, msg.AddActions.TAIL, 0, {
          freq: map.midiToFreq(freq.value)
        })
      );
      setTimeout(step, interval);
    }
  }

  step();

});



/**
SynthDef( \help_SPE3_Allpass6, { arg freq;
    var out, env;
    out = RLPF.ar(
        LFSaw.ar( freq, mul: EnvGen.kr( Env.perc, levelScale: 0.3, doneAction: 2 ) ),
        LFNoise1.kr(1, 36, 110).midicps,
        0.1
    );
    6.do({ out = AllpassN.ar(out, 0.05, [0.05.rand, 0.05.rand], 4) });
    Out.ar( 0, out );
}).add


var noteStream;

noteStream = Pseq([
    Prand([
        nil,    // a nil item reached in a pattern causes it to end
        Pseq(#[24, 31, 36, 43, 48, 55]);
    ]),
    Pseq([ 60, Prand(#[63, 65]), 67, Prand(#[70, 72, 74]) ], { rrand(2, 5) }),
    Prand(#[74, 75, 77, 79, 81], { rrand(3, 9) })
], inf).asStream.midicps;

Task({
    loop({
        Synth( \help_SPE3_Allpass6, [\freq, noteStream.next ]);
        0.13.wait;
    });
}).play;
**/
