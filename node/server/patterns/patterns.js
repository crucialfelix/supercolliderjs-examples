/**
 * SuperCollider style patterns using JavaScript generators
 *
 * https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch4.md
 */

// boot lang and server
// compile synth def and send it
// create a Synth and send freq and env changes to it
// with a simple timeout loop to pull from it
// 
// pseq
// prand
// 

function *Pseq(list, repeats=1, offset=0) {
  for (let i = 0; i < repeats; i++) {
    for (let value of list) {
      yield value;
    }    
  }
}

let p = Pseq([60, 72, 71, 67, 69, 71, 72, 60, 69, 67], 2);

for (let v of p) {
  console.log(v);
}
