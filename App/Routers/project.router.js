const express = require("express");

const { passport } = require("../Configs/passport");
const projectRouter = express.Router();
const projectController = require("../Controller/project.controllter");

//getDetail
projectRouter.get(
	"/getProjectDetail/id=:id",
	passport,
	projectController.getDetailProject
);

//getAll
projectRouter.get("/getAllProject", passport, projectController.getAllProject);

//createProject
projectRouter.post("/createProjectAuthorize", passport, projectController.createProject);

//createProject
projectRouter.delete("/deleteProject/projectId=:id", passport, projectController.deleteProject);
module.exports = projectRouter;
