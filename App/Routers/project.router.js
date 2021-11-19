const express = require("express");

const projectRouter = express.Router();
const projectController = require("../Controller/project.controllter")



projectRouter.get("/getProjectDetail/id=:id", projectController.getDetailProject )



module.exports = projectRouter