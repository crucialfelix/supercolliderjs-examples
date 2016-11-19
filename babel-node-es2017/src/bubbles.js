
import { server } from 'supercolliderjs';

// To use await you have to be running inside an async function
(async function() {

  let s = await server.boot();

  let bubbles = `
    SynthDef("bubbles", { arg out=0, wobble=0.4;
    	var f, zout;
    	f = LFSaw.kr(wobble, 0, 24, LFSaw.kr([8, 7.23], 0, 3, 80)).midicps;
    	zout = CombN.ar(SinOsc.ar(f, 0, 0.04), 0.2, 0.2, 4);  // echoing sine wave
      zout = zout * EnvGen.kr(Env.linen(releaseTime: 4), doneAction: 2);
    	Out.ar(out, zout);
    });
  `;

  // build these in parallel
  let [def, group] = await Promise.all([
    s.compileSynthDef(bubbles),
    s.group()
  ]);

  function tick() {
    s.synth(def.name, {wobble: 10}, group);
  }

  setInterval(tick, 2000);

})();
