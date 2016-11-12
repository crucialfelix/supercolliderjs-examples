/**
 * Port of Patterns example
 * http://doc.sccode.org/Tutorials/Streams-Patterns-Events3.html
 *
 * This makes Pseq and Prand as generators.
 *
 * When a Pseq has another pattern as a child, it uses yield delegation
 * to allow that child to play itself to completion, and then steps
 * to the next child.
 *
 * In supercollider this is item.embedInStream, in JavaScript it is `yield *`
 *
 * But when a generator is called it returns an interable, and once that runs out then
 * it cannot be reset. So it plays through the first time, but you need to make a new
 * iterable for the next time the Pseq wants to play that child.
 *
 * This example allows the items to be functions (thunks) and calls those,
 * thus getting a fresh iterator and then does yield delegation to let that
 * sequence play itself to completion.
 *
 * The functions are kind of a noisy syntax.
 */

let _ = require('lodash');
let sc = require('supercolliderjs');
let { msg, map } = sc;

let sound = 'help_SPE3_Allpass6';

sc.server.boot().then((server) => {
  let scd = new sc.lang.SynthDefCompiler();
  return scd.boot().then(() => {
      return scd.compileAndSend({
        [sound]: {
          path: `./${sound}.scd`
        }
      }, server)
      .then(() => playPattern(server))
    });

}).catch(console.error);


function playPattern(server) {

  let freqStream =
    Pseq([
      () => (
        Prand([
          null,    // a null item reached in a pattern causes it to end
          () => Pseq([24, 31, 36, 43, 48, 55])
        ])
      ),
      () => (
        Pseq([
          60,
          () => Prand([63, 65]),
          67,
          () => Prand([70, 72, 74])
        ], _.random(2, 5)),
        () => Prand([74, 75, 77, 79, 81], _.random(3, 9))
      )
  ], Infinity);

  const interval = 130;

  function step() {
    let freq = freqStream.next().value;
    if (!freq.done) {
      server.send.msg(
        msg.synthNew(sound, -1, msg.AddActions.TAIL, 0, {
          freq: map.midiToFreq(freq)
        })
      );
      setTimeout(step, interval);
    }
  }

  step();

}


function *Pseq(list, repeats=1, offset=0) {
  if (offset !== 0) {
    let first = list.slice(0, offset);
    let second = list.slice(offset);
    list = second.concat(first);
  }

  for (let i = 0; i < repeats; i++) {
    let li = 0;
    for (let item of list) {
      item = deThunk(item, li);
      if (!_.isNull(item)) {
        if (isIterator(item)) {
          yield *item;
        } else {
          yield item;
        }
        li += 1;
      }
    }
  }
}

function *Prand(list, repeats=1) {
  for (let i = 0; i < repeats; i++) {
    let itemi = _.random(list.length - 1);
    let item = deThunk(list[itemi], itemi);

    if (!_.isNull(item)) {
      if (isIterator(item)) {
        yield *item;
      } else {
        yield item;
      }
    }
  }
}


// function embedInStream(value) {
//   if (!_.isNull(value)) {
//     if (isIterator(value)) {
//       // Call reset for the first step in case it is being played
//       // again as a child sequence. Otherwise it would be over.
//       let first = value.next(true);
//       yield first;
//       // yield * value;
//     } else {
//       yield value;
//     }
//   }
// }


function deThunk(value) {
  return typeof value === 'function' ? value() : value;
}


function isIterator(thing) {
  // If thing has a Symbol.iterator
  return typeof thing === 'object' && thing[Symbol.iterator];
}


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


var freqStream;

freqStream = Pseq([
    Prand([
        nil,    // a nil item reached in a pattern causes it to end
        Pseq(#[24, 31, 36, 43, 48, 55]);
    ]),
    Pseq([ 60, Prand(#[63, 65]), 67, Prand(#[70, 72, 74]) ], { rrand(2, 5) }),
    Prand(#[74, 75, 77, 79, 81], { rrand(3, 9) })
], inf).asStream.midicps;

Task({
    loop({
        Synth( \help_SPE3_Allpass6, [\freq, freqStream.next ]);
        0.13.wait;
    });
}).play;
**/
