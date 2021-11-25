const express = require("express");
const commentRouter = express.Router();
const commentController = require("../Controller/comment.controller")
const {passport} = require("../Configs/passport") 

commentRouter.get("/getAll", commentController.getAllCommentTask)

commentRouter.post("/insertComment",passport ,commentController.insertComment)

commentRouter.delete("/deleteComment/idComment=:id",passport ,commentController.deleteComment)

module.exports = commentRouter