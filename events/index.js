const fs = require('fs');
const prompts = new Array();

fs.readdirSync(__dirname).forEach(p => {
  if (p == 'index.js') return
  
  module.exports[p.replace('.js', '')] = require('./' + p)
  prompts.push(require('./' + p))
});

module.exports = prompts