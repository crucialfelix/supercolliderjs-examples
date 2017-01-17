/**
 * This demonstrates creating a Bus and spawning Synths onto that Bus.
 *
 * It also shows how annoying it is to manage Busses and Groups for correct
 * patching of processing.
 *
 * These are things that dryadic-supercollider solve very well.
 */
let sc = require('supercolliderjs');

sc.server.boot().then((server) => {

  // Compile synthDef from a file
  let { formant, verb, mixToMaster } = server.synthDefs({
    formant: {
      path: './formant.scd'
    },
    verb: {
      path: './verb.scd'
    },
    mixToMaster: {
      source:
        `
          SynthDef('mixToMaster', { arg in=0;
            Out.ar(0, In.ar(in, 2));
          });
        `
    }
  });

  // Create an AudioBus with 2 channels
  let bus = server.audioBus(2);
  let spawnGroup = server.group();
  let efxGroup = server.group();
  let masterGroup = server.group();

  let freqSpec = {
    minval: 100,
    maxval: 8000,
    warp: 'exp'
  };

  // Map 0..1 to an exponential frequency range from 100..8000
  let randFreq = () => sc.map.mapWithSpec(Math.random(), freqSpec);

  // The reverb synth takes audio from bus, reverberates it
  // and writes it back to the same bus.
  // See ./verb.scd
  let efxSynth = server.synth(verb, {out: bus.id}, efxGroup);
  // This mixes the effects bus back to the master audio out: 0
  let mixToMasterSynth = server.synth(mixToMaster, {in: bus.id}, masterGroup);

  // This is a function that spawns the Synths
  let spawn = (dur) => {
    server.synth(formant, {
      out: bus.id,  // play onto the bus
      fundfreq: randFreq(),
      formantfreq: randFreq(),
      bwfreq: randFreq(),
      pan: sc.map.linToLin(0, 1, -1, 1, Math.random()),
      timeScale: dur * 2
    }, spawnGroup);

    let nextTime = sc.map.linToExp(0, 1, 0.01, 4.0, Math.random());
    // Schedule again:
    setTimeout(() => spawn(nextTime), nextTime * 1000);
  };

  // Both of those synths should be playing before we start spawning synths in there.
  // We can use Promise.all to wait for both to resolve, then it starts the spawner.
  Promise.all([efxSynth, mixToMasterSynth])
    .then(() => {
      // Off you go...
      spawn(Math.random());
    }).catch(console.error);

});
