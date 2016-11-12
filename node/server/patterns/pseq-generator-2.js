/**
 * SuperCollider style patterns using JavaScript generators
 *
 * To the previous example (pseq-generator) this adds yield delegation—it supports patterns inside of patterns.
 * 
 * It also adds offset so it works just like SuperCollider's Pseq
 */

// boot lang and server
// compile synth def and send it
// create a Synth and send freq and env changes to it
// with a simple timeout loop to pull from it
// 
// pseq
// prand
// 

function isIterator(thing) {
  // If thing has a Symbol.iterator
  return typeof thing === 'object' && thing[Symbol.iterator];
}


function *Pseq(list, repeats=1, offset=0) {
  if (offset !== 0) {
    let first = list.slice(0, offset);
    let second = list.slice(offset);
    list = second.concat(first);
  }

  for (let i = 0; i < repeats; i++) {
    for (let value of list) {
      if (isIterator(value)) {
        // yield delegation to this iterator
        yield *value;
      } else {
        yield value;        
      }
    }    
  }
}

let q = Pseq([1, 2, 3, Pseq([10, 20 , 30], 2), 4], 2);

for (let v of q) {
  console.log(v);
}
