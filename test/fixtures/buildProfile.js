
// Dynamically construct a test build profile

var fs = require('fs');

module.exports = function (options) {
  var profile = {};
  var baseUrl = 'test/fixtures';
  var fileStat = fs.statSync(baseUrl);

  if (fileStat.isDirectory()) {
    profile = {
      baseUrl: baseUrl,
      out: 'tmp/requirejs-profile.js'
    };
  }

  return profile;
};
