
SynthDef("sinosc", { arg out=0, freq=400, amp=0.1;
  Out.ar(out, SinOsc.ar(freq, 0, amp));
});
