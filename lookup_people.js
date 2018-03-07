const pg = require("pg");
const settings = require("./settings"); // settings.json

const nameARGV = process.argv[2];

const client = new pg.Client(settings);

const findFamous = "SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1";

function outputDate(dateString) {
  const newDate = new Date(dateString);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() < 9 ? '0': '') + (newDate.getMonth() + 1);
  const date = newDate.getDate();
  return  year + "-" + month + "-" + date;
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(findFamous, [nameARGV], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rowCount} person(s) by the name '${nameARGV}':`);

    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows[i];
      console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${outputDate(row.birthday)}'`)
    }
    
    client.end();
  });
});