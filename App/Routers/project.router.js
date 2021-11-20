const express = require("express");

const { passport } = require("../Configs/passport");
const projectRouter = express.Router();
const projectController = require("../Controller/project.controllter");

projectRouter.get(
	"/getProjectDetail/id=:id",
	passport,
	projectController.getDetailProject
);

//projectRouter.post("/getProjectDetail/id=:id", projectController.getDetailProject )

module.exports = projectRouter;
