const express = require("express");

const projectRouter = express.Router();
const projectController = require("../Controller/project.controllter")
const {passport} = require("../Configs/passport")


projectRouter.get("/getProjectDetail/id=:id",passport, projectController.getDetailProject )



module.exports = projectRouter