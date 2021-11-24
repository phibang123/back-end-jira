const express = require("express");
const taskRouter = express.Router();
const taskController = require("../Controller/task.controller");
const { passport } = require("../Configs/passport") 

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


module.exports = taskRouter