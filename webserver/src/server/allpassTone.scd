SynthDef('allpassTone', { arg freq, ffreq, pan=0, gate;
    var out, env;
    env = EnvGen.kr( Env.adsr(releaseTime:2), gate: gate, levelScale: 0.3, doneAction: 2 );
    out = RLPF.ar(
        LFSaw.ar( Lag.kr(freq, 0.5), mul: env ),
        LFNoise1.kr(1, 36, 110).midicps,
        0.1
    );
    out = Pan2.ar(out, pan);
    6.do({ out = AllpassN.ar(out, 0.05, [0.05.rand, 0.05.rand], 4) });
    Out.ar(0, out);
});
