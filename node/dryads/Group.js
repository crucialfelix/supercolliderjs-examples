
let {
  dryadic,
  SCServer,
  SCLang,
  Group,
  Synth,
  SCSynthDef
} = require('supercolliderjs/lib/dryads');

let s = new SCServer({}, [
  new SCLang({}, [
    new Group({}, [
      // the Synth is a child of the Group
      // and thus plays inside of it
      new Synth({
        def: new SCSynthDef({compileFrom: './synthdefs/lfsaw.scd'}),
        args: {
          freq: 600
        }
      })
    ])
  ])
]);

let app = dryadic();

app.play(s);
