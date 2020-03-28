const program = require('commander');

const api = require('../src/api');

(async () => {
  program.parse(process.argv);

  await api.installDeps();
})();
