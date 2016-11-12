/* eslint no-console: 0 */
/**
 * Make sure scsynth and sclang paths exist.
 */

let sc = require('supercolliderjs');
let fs = require('fs');  // file system

console.log('Checking install...');

sc.resolveOptions().then((options) => {

  console.log('Default options:');
  console.log(JSON.stringify(options, null, 2));

  return new Promise((resolve, reject) => {
    fs.stat(options.sclang, (err) => {
      if (err) {
        reject(err);
      } else {
        fs.stat(options.scsynth, (err2) => {
          if (err2) {
            reject(err2);
          }
        });
      }
    });
  })
  .catch((error) => {
    console.error(`\nExecutable not found: ${error.path}`);
    console.error(error);
    console.log(
      '\nInstall SuperCollider if needed: http://supercollider.github.io/download\n' +
      'If you already have it installed but it is in a non-standard location then edit\n' +
      `${options.configPath}\n` +
      'and specify the paths to sclang and scsynth there.\n' +
      'Then run this test again:\n' +
      'npm run check-install\n'
    );
  });

}).catch(console.error);
