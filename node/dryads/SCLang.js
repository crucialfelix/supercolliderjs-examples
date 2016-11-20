/**
 * This just boots up sclang using the SCLang dryad.
 */
let {
  dryadic,
  SCLang
} = require('supercolliderjs/lib/dryads');

let doc = new SCLang({options: {debug: true}});

let app = dryadic();
app.play(doc);
