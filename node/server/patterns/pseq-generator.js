/**
 * SuperCollider style patterns using JavaScript generators
 *
 * A generator in js is very similar to a Routine in sc
 *
 * This is the simplest example of a generator.
 *
 * It is designated with `*FuncName() {}`
 *
 */

// GeneratorFunction
function *Pseq(list, repeats=1) {
  for (let i = 0; i < repeats; i++) {
    for (let value of list) {
      yield value;
    }
  }
}

// Calling the function produces a Generator
let p = Pseq([60, 72, 71, 67, 69, 71, 72, 60, 69, 67], 2);

// iterate
for (let v of p) {
  console.log(v);
}
