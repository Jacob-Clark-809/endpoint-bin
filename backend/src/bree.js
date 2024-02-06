const Bree = require('bree');
const Graceful = require('@ladjs/graceful');

const bree = new Bree({
  jobs: [
    {
      name: 'resetDb',
      cron: '0 3 * * *',
    }
  ]
});

const graceful = new Graceful({ brees: [bree] });
graceful.list();

bree.start();
