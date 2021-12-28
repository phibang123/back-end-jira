require('dotenv').config()


module.exports = {
  HOST: process.env.host,
  USER: process.env.username,
  PASSWORD: process.env.password,
  DB: process.env.database,
  dialect: process.env.dialect,


  // HOST: "localhost",
  // USER: "root",
  // PASSWORD: "01232525113",
  // DB: "jira_modal",
  // dialect: "mysql",
  
}

