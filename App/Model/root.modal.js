
const {DB,HOST,PASSWORD,USER,dialect} = require("../Configs/db.config")
const { Sequelize, DataTypes } = require("sequelize")
const { createUsersModel } = require("./users.modal")
const { createCategoryModel } = require("./category.modal")
const { createPriorityModel } = require("./priority.modal")
const { createStatusModel } = require("./status.modal")
const { createTaskTypeModel } = require("./taskType.modal")
const { createProjectModel } = require("./project.modal")



const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect
})

const Users = createUsersModel(sequelize)
const Category = createCategoryModel(sequelize)
const Priority = createPriorityModel(sequelize)
const Status = createStatusModel(sequelize)
const TaskType = createTaskTypeModel(sequelize)
const Project = createProjectModel(sequelize)
//relationship
//Category - Project(1:N)

Category.hasMany(Project)
Project.belongsTo(Category)
//Users - Project(1:N)
Users.hasMany(Project)
Project.belongsTo(Users)

// sequelize
//   .sync({ force: true })
// 	.then((result) => {
// 		return Category.create({ categoryName: "Dự án web" });
// 	})
// 	.then((result) => {
// 		return Category.create({ categoryName: "Dự án phần mềm" });
// 	})
// 	.then((result) => {
// 		return Category.create({ categoryName: "Dự án di động" });
// 	})
	
// 	//Status
// 	.then((result) => {
// 		return Status.create({ statusName: "BACKLOG",alias: "tồn động" });
// 	}).then((result) => {
// 		return Status.create({ statusName: "SELECTED FOR DEVELOPMENT",alias: "được chọn để phát triển" });
// 	}).then((result) => {
// 		return Status.create({ statusName: "IN PROGRESS",alias: "trong tiến trình" });
// 	}).then((result) => {
// 		return Status.create({ statusName: "DONE",alias: "hoàn thành" });
// 	})
  
// 	//Priority
//   .then((result) => {
// 		 	return Priority.create({ priority: "High",description: "High",alias: "high" });
// 		 }).then((result) => {
// 		 	return Priority.create({ priority: "Medium",description: "Medium",alias: "medium" });
// 		 }).then((result) => {
// 		 	return Priority.create({ priority: "Low",description: "Low",alias: "low" });
// 		 }).then((result) => {
// 		 	return Priority.create({ priority: "Lowest",description: "Lowest",alias: "lowest" });
// 		 })
 

// 	//TaskType
// 	.then((result) =>
// 	{
// 	 	return TaskType.create({ taskType: "bug" });
// 	 }).then((result) =>
// 	{
// 	 	return TaskType.create({ taskType: "new task" });
// 	 })
  
//   //Users
//   .then(() =>
//   {
//     return Users.create({ email: "phibang@gmail.com",password: "$2a$10$2uzRqhRWKNPPLrinAYONbegGrOcLKMaaXmEGXIMgUzVTw/4.W2BN6" ,name:"Bằng Đẹp trai",avatar:"https://ui-avatars.com/api/?name=MÀ",phoneNumber:"12456789"});
//   })
  
  
//   //Project
//   .then(() =>
//   {
//     return Project.create({ projectName: "Shop bán hoa",description: "Hôm nay tui test sql" ,alias:"Shop bán hoa",categoryTableCategoryId:1,userTableUserId:1});
//   })

module.exports = {
  sequelize,
  Category,
  Priority,
  Status,
  Users,
  Project,
  TaskType
}