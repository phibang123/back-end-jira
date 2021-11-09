
const {DB,HOST,PASSWORD,USER,dialect} = require("../Configs/db.config")

const mysql = require('mysql2');
// const sequelize = new Sequelize(DB, USER, PASSWORD, {
//   host: HOST,
//   dialect
// })
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '01232525113',
  database: DB
});

db.connect( async(err) =>
{
  if (err) throw err;
  console.log('MySql connected...')
})
// const User = createUserModel(sequelize)


module.exports = {
  db
}