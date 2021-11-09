const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../Controller/category.controller")


categoryRouter.get("",categoryController.getCategory)


module.exports = categoryRouter