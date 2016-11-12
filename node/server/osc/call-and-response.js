
let sc = require('supercolliderjs');
let { server, msg } = sc;

server.boot({debug: true}).then(function(s) {

  // sc.msg.status() returns this object:
  // {
  //   call: ['/status'],
  //   response: ['/status.reply']
  // }

  s.callAndResponse(msg.status())
    .then(function(reply) {
      console.log(reply);
    });

});
