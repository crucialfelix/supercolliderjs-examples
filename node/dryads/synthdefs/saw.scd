
SynthDef("test-saw", { arg out=0, freq=440;
  Out.ar(out, Saw.ar(freq));
});
