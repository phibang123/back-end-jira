
const {DB,HOST,PASSWORD,USER,dialect} = require("../Configs/db.config")
const { Sequelize, DataTypes } = require("sequelize")
const { createUsersModel } = require("./users.modal")
const { createCategoryModel } = require("./category.modal")
const { createPriorityModel } = require("./priority.modal")
const { createStatusModel } = require("./status.modal")
const { createTaskTypeModel } = require("./taskType.modal")



const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect
})

const Users = createUsersModel(sequelize)
const Category = createCategoryModel(sequelize)
const Priority = createPriorityModel(sequelize)
const Status = createStatusModel(sequelize)
const TaskType = createTaskTypeModel(sequelize)

module.exports = {
  sequelize,
  Category,
  Priority,
  Status,
  Users,
  TaskType
}