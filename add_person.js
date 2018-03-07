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

const firstname = process.argv[2];
const lastname = process.argv[3];
const birthday = process.argv[4];


knex('famous_people')
  .insert({
    first_name: firstname,
    last_name: lastname,
    birthday: birthday
  })
  .returning('id')
  .then((id) => {
    console.log(id);
  });




