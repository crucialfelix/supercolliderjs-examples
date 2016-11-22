

let sc = require('supercolliderjs');

sc.lang.boot({debug: false}).then(function(sclang) {

  sclang.interpret('1 + 1').then(function(answer) {
    console.log('1 + 1 = ' + answer);
  }, console.error);

});
