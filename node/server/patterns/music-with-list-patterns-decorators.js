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

  let notePattern =
    Pseq([
      Prand([
        null,    // a null item reached in a pattern causes it to end
        Pseq([24, 31, 36, 43, 48, 55])
      ]),
      Pseq([
        60,
        Prand([63, 65]),
        67,
        Prand([70, 72, 74])
      ], () => _.random(2, 5)),
      Prand([74, 75, 77, 79, 81], () => _.random(3, 9))
    ], Infinity);

  const interval = 130;

  let noteStream = notePattern.asStream();

  function step() {
    let freq = noteStream.next();
    console.log(freq);
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

}

function pattern() {
  // decorator stuff here
  // if yielded item is pattern then asStream and yield * that
  if (!_.isNull(item)) {
    if (isPattern(item)) {
      yield *item.asStream();
    } else {
      yield item;
    }
  }
}

function deThunk(value) {
  return typeof value === 'function' ? value() : value;
}


function isPattern(thing) {
  return typeof thing === 'object' && thing.asStream;
}



@pattern
export *Pseq(list, repeats, offset=0) {
  let repeats = deThunk(repeats);
  for (let i = 0; i < repeats; i++) {
    for (let item of list) {
      yield item;
    }
  }
}


@pattern
export *Prand(list, repeats=1) {
  let repeats = deThunk(this.repeats);
  for (let i = 0; i < repeats; i++) {
    yield this.list[_.random(this.list.length - 1)];
  }
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
