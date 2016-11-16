SynthDef("bubbles", { arg out=0, wobble=0.4;
	var f, zout;
	f = LFSaw.kr(wobble, 0, 24, LFSaw.kr([8, 7.23], 0, 3, 80)).midicps;
	zout = CombN.ar(SinOsc.ar(f, 0, 0.04), 0.2, 0.2, 4);  // echoing sine wave
  zout = zout * EnvGen.kr(Env.linen(releaseTime: 4), doneAction: 2);
	Out.ar(out, zout);
});
