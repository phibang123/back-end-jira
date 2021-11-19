
const {DB,HOST,PASSWORD,USER,dialect} = require("../Configs/db.config")
const { Sequelize, DataTypes } = require("sequelize")
const { createUsersModel } = require("./users.modal")



const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect
})

const User = createUsersModel(sequelize)

module.exports = {
  sequelize
}