const express = require("express");
const router = require("../Routers/root.router");
//const cors = require("cors");
const bodyParser = require("body-parser");


const app = express(); //để nó chuyển tất cả res req thành json để tiện thao tác
app.use(express.json());



//app.use(cors(corsOptions))
// ========================== middleWare =================================

//
//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(router);

app.use(express.json()); //để nó chuyển tất cả res req thành json để tiện thao tác

app.use(express.urlencoded({ extended: true }));

// =========================================================================

const { sequelize } = require("../Model/root.modal");
const { Category } = require("../Model/root.modal");
const { Status } = require("../Model/root.modal")
const { TaskType } = require("../Model/root.modal")
const { Priority } = require("../Model/root.modal")



// sequelize
// 	.sync({ force: true })
	// .then((result) =>
	// {
	 
  // })
// 	.then((result) => {
// 		return Category.create({ categoryName: "Dự án web" });
// 	})
// 	.then((result) => {
// 		return Category.create({ categoryName: "Dự án phần mềm" });
// 	})
// 	.then((result) => {
// 		return Category.create({ categoryName: "Dự án di động" });
// 	})
	
	////Status
	// .then((result) => {
	// 	return Status.create({ statusName: "BACKLOG",alias: "tồn động" });
	// }).then((result) => {
	// 	return Status.create({ statusName: "SELECTED FOR DEVELOPMENT",alias: "được chọn để phát triển" });
	// }).then((result) => {
	// 	return Status.create({ statusName: "IN PROGRESS",alias: "trong tiến trình" });
	// }).then((result) => {
	// 	return Status.create({ statusName: "DONE",alias: "hoàn thành" });
	// })
  
	////Priority
  // .then((result) => {
	// 	 	return Priority.create({ priority: "High",description: "High",alias: "high" });
	// 	 }).then((result) => {
	// 	 	return Priority.create({ priority: "Medium",description: "Medium",alias: "medium" });
	// 	 }).then((result) => {
	// 	 	return Priority.create({ priority: "Low",description: "Low",alias: "low" });
	// 	 }).then((result) => {
	// 	 	return Priority.create({ priority: "Lowest",description: "Lowest",alias: "lowest" });
	// 	 })
 

	////TaskType
	// .then((result) =>
	// {
	//  	return TaskType.create({ taskType: "bug" });
	//  }).then((result) =>
	// {
	//  	return TaskType.create({ taskType: "new task" });
	//  })

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
