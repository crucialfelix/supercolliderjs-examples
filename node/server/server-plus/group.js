/**
 * This demonstrates creating a Group and spawning Synths into that Group.
 */
let sc = require('supercolliderjs');

sc.server.boot().then((server) => {

  // Compile synthDef from a file
  let def = server.loadSynthDef('formant', './formant.scd');

  // Create group at the root
  let group = server.group();
  // Create a subgroup of that if you want to:
  // let subgroup = server.group(group);

  let freqSpec = {
    minval: 100,
    maxval: 8000,
    warp: 'exp'
  };

  // Map 0..1 to an exponential frequency range from 100..8000
  let randFreq = () => sc.map.mapWithSpec(Math.random(), freqSpec);

  let spawn = (dur) => {
    server.synth(def, {
      fundfreq: randFreq(),
      formantfreq: randFreq(),
      bwfreq: randFreq(),
      pan: sc.map.linToLin(0, 1, -1, 1, Math.random()),
      timeScale: dur
    }, group);

    let next = Math.random() * 0.25;
    // Schedule this function again:
    setTimeout(() => spawn(next), next * 1000);
  };

  spawn(Math.random());

});
