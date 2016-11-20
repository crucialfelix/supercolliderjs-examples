/**
 * You should see the server boot and two groups being created
 */
let {
  dryadic,
  SCServer,
  Group
} = require('supercolliderjs/lib/dryads');

let s = new SCServer({}, [
  new Group(),
  new Group()
]);

let app = dryadic();

app.play(s);
