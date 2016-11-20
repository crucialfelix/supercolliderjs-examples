let {
  dryadic,
  SCLang,
  SCServer,
  SCSynthDef,
  Synth
} = require('supercolliderjs/lib/dryads');

let app = dryadic();

let s = new SCServer({}, [
  new SCLang({debug: true}, [
    new Synth(
      new SCSynthDef({compileFrom: './synthdefs/lfsaw.scd'}),
      {
        freq: 600
      }
    )
  ])
]);

app.play(s);

/**
 * should play a LFSaw
 */
