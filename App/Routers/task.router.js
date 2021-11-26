const express = require("express");
const taskRouter = express.Router();
const taskController = require("../Controller/task.controller");
const { passport } = require("../Configs/passport")
const { passportProject } = require("../Configs/passportProject");

//taskRouter.get("",)

//updateStatus Task
taskRouter.put("/updateStatus", passport, taskController.updateStatus)


//updatePriority Task
taskRouter.put("/updatePriority", passport, taskController.updatePriority)


//updatePriority Task
taskRouter.put("/updateDescription", passport, taskController.updateDescription)


//updateTimeTracking Task
taskRouter.put("/updateTimeTracking", passport, taskController.updateTimeTracking)


//updateTimeTracking Task
taskRouter.put("/updateEstimate", passport, taskController.updateEstimate)


//addAssignTask Task
taskRouter.post("/assignUserTask", passport, taskController.addUserAssignTask)


//removeAssignTask Task
taskRouter.post("/removeUserFromTask",passport, taskController.removeUserAssignTask)


//createTask Task
taskRouter.post("/createTask", passportProject,taskController.createTask)


//updateTask Task
taskRouter.post("/updateTask", passportProject, taskController.updateTask)


//getDetail Task
taskRouter.get("/getTaskDetail/taskId=:id", passport,taskController.getTaskDetail)


module.exports = taskRouter