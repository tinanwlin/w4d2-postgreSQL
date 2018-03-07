var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'development',
    password: 'development',
    database: 'vagrant',
    port: 5432,
    ssl: true
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




