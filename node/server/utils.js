let sc = require('supercolliderjs');

function withDefs(defs, callback) {

  sc.server.boot().then((server) => {
    let scd = new sc.lang.SynthDefCompiler();
    return scd.boot().then(() => {
      return scd.compileAndSend(defs, server).then(() => callback(server, scd))
    });
  }).catch(console.error);

}

module.exports = {
  withDefs
};
