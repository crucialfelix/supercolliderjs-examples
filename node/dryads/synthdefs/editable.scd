/**
 * Play this:
 *
 *    node SCSynthDef-watch.js
 *
 * You can edit this file while it is playing and it will recompile
 * and send to the server.
 *
 * Watch the console for any syntax errors.
 */
SynthDef("editable", { arg out=0, freq=400, amp=0.1;
  var tone = LFSaw.ar([freq, freq + 1], 0, amp * 0.6);
  var sound = EnvGen.kr(Env.perc, doneAction:2) * tone;
  Out.ar(out, sound);
});
