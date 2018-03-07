const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const nameARGV = process.argv[2];

function outputDate(dateString) {
  const newDate = new Date(dateString);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() < 9 ? '0' : '') + (newDate.getMonth() + 1);
  const date = newDate.getDate();
  return year + "-" + month + "-" + date;
}

knex.select('*').from('famous_people')
  .where('first_name', nameARGV)
  .orWhere('last_name', nameARGV)
  .asCallback(function (err, rows) {
    if (err) {
      console.log(err)
    } else {
      console.log(`Found ${rows.length} person(s) by the name '${nameARGV}':`);
      for (var i = 0; i < rows.length; i++) {
        console.log(`- ${rows[i].id}: ${rows[i].first_name} ${rows[i].last_name}, born '${outputDate(rows[i].birthday)}'`)
      }
    }
    knex.destroy();
  });
  

