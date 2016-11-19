/*
 * Originally from:
 * http://sccode.org/1-4QB
 *
 * Well it did sounds like crickets before I turned them into metal.
 */

Spec.specs.put(\y1, ControlSpec.new(1, 7, 'lin', 0, 0));
Spec.specs.put(\y2, ControlSpec.new(1642, 2680, 'lin', 0, 0));

SynthDef(\cricket, { arg out=0, y1=1.43, y2=1642, timeScale=1, pan=0;
  var modulator, mod1, mod2, mod3;

  // repeat time is 0.7s: equates to 1.43 Hz.
  modulator = LFSaw.ar(y1, 1, 0.5, 0.5);
  // sound
  mod2 = (modulator * y2 * 2pi).cos.squared;
  mod3 = modulator * 3147;
  mod3 = (mod3 * 2pi).cos + ((mod3 * 2 * 2pi).cos * 0.3);
  mod1 = ((Wrap.ar(modulator.min(0.1714) * 5.84) - 0.5).squared * (-1) + 1) * (mod2 * mod3);
  mod1 = mod1 * EnvGen.kr(Env.perc(0.01, 0.2), timeScale: timeScale, doneAction: 2);

  mod1 = Pan2.ar(mod1 * 0.1, pan);

  OffsetOut.ar(out, mod1);
});
