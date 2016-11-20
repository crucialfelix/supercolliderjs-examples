
let { dryadic } = require('supercolliderjs/lib/dryads');

let app = dryadic();

function sclang(children) {
  return ['sclang', {}, children];
}

function saw() {
  return ['scsynthdef', {
    source: `
      SynthDef("saw", { arg freq;
        Out.ar(0, EnvGen.kr(Env.perc, doneAction: 2) * Saw.ar(freq))
      });
    `
  }];
}

function synth() {
  return [
    'synth', {
      def: saw(),
      args: {
        freq: 440
      }
    }
  ];
}

let d = sclang([synth()]);

let p = dryadic(d);

p.play();

// This posts the play graph
console.log(JSON.stringify(p.getPlayGraph(), null, 2));
