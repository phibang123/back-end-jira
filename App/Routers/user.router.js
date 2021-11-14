const express = require("express");
const userRouter = express.Router();
const userController = require("../Controller/user.controller")


userRouter.post("/signup", userController.signup)

userRouter.post("/signin", userController.signin)

userRouter.put("/editUser",userController.editUser)

module.exports = userRouter