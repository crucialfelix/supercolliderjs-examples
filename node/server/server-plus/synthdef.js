
let sc = require('supercolliderjs');

sc.server.boot().then((server) => {

  /**
   * Define a variable called `height` here
   * and then insert it in the SynthDef source code below as `${height}`
   */
  let height = Math.random() * 24;

  /**
   * This will return a Promise that will resolve with an instance of the
   * javascript SynthDef class.
   *
   * It will start an sclang interpreter, compile the supercollider SynthDef,
   * send it to the scsynth server, and then resolve the Promise with an instance
   * of the javascript SynthDef class.
   *
   * If there is an error in your SynthDef then it will fail and post the error:
   * Failed to compile SynthDef  Interpret error: ERROR: Message 'quacks' not understood.
   */
  let def = server.synthDef('bubbles',
    `
      SynthDef("bubbles", { arg out=0, wobble=0.4, innerWobble=8, releaseTime=4;
        var f, zout;
        f = LFSaw.kr(wobble, 0, ${height}, LFSaw.kr([innerWobble, innerWobble / 1.106], 0, 3, 80)).midicps;
        zout = CombN.ar(SinOsc.ar(f, 0, 0.04), 0.2, 0.2, 4);  // echoing sine wave
        zout = zout * EnvGen.kr(Env.linen(releaseTime: releaseTime), doneAction: 2);
        // If you uncomment this next line then you will get an error:
        // Out.ar(out, zout).quacks;
        Out.ar(out, zout);
      });
    `);

  // Call this function every 4 seconds
  setInterval(() => {
    // This will create a Synth.
    // It will first resolve def (which is a Promise) - so the SynthDef is
    // compiled and loaded on the server ready to for the Synth to play it.
    // For each subsequent iteration of the loop the def is already resolved and ready.
    server.synth(def, {
      wobble: Math.random() * 10,
      innerWobble: Math.random() * 16,
      releaseTime: Math.random() * 4 + 2
    });
  }, 4000);
});
