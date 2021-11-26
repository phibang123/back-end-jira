const commentService = require("../Services/comment.services")


const getAllCommentTask = async (req, res) =>
{
  try
  {
    let taskId = req.params.id;
    console.log(taskId)
    let comment = await commentService.getAllCommentFromTask({ taskId })
    
   
      let {TaskComment } = comment
      let commentMap = TaskComment.map((e) =>
      {
        return {
          // user: {
          //   userId: e?.user_table?.userId,
          //   name: e?.user_table?.name,
          //   avatar: e?.user_table?.avatar
          // },
          // id: e?.commentId,
          // userId: e?.userId,
          // taskId: e?.taskId,
          // contentComment: e?.content,
          // alias: e?.content
          user: {
            userId: e?.userId,
            name: e?.name,
            avatar: e?.avatar
          },
          id: e?.comment_table?.commentId,
          userId:  e?.userId,
          taskId: e?.comment_table?.taskId,
          content: e?.comment_table?.commentId,
          alias: e?.comment_table?.commentId,
          
        }
      })
      res.status(200).json({ success: true, statusCode: 200, content: commentMap})
    
  } catch (error) {
    res.status(400).json({ success: false, statusCode: 400,message: "Bad request" })
  }
}


const insertComment = async (req, res) =>
{
  try
  {
    let {taskId ,contentComment } = req.body
    let id = req.id;
   
    let newComment = await commentService.insertComment({ taskId, content: contentComment, userId: id })
    console.log(JSON.stringify(newComment, null, 2))
    if (newComment?.commentId)
    {
      let [commentMap] = [newComment].map((e) =>
      {
        return {
        
          id: e?.commentId,
          userId: e?.userId,
          taskId: e?.taskId,
          contentComment: e?.content,
          alias: e?.content
        }
      })
      res.status(200).json({ success: true, statusCode: 200, content: commentMap})
    }
    else
    {
      res.status(400).json({ success: false, statusCode: 404,message: "Task not exist" })
    }
  } catch (error) {
    res.status(400).json({ success: false, statusCode: 400,message: "Bad request" })
  }
}




const deleteComment = async (req, res) =>
{
  try {
    let userId = req.id
    let commentId = req.params.id
    console.log(userId,"userId")
    console.log(commentId,"commentId")
    let commentFind = await commentService.findCommentUser({  commentId })
    
    console.log(commentFind)
    if(commentFind?.userId === userId){
      await commentService.deleteComment({ commentId })
      res.status(200).json({ success: true, statusCode: 200,message: "Deleted comment success" })
    }
    else {
      res.status(400).json({ success: false, statusCode: 400,message: "not Author" })
    }
  } catch (error) {
    res.status(400).json({ success: false, statusCode: 400,message: "Bad request" })
  }
}
module.exports = {
  getAllCommentTask,
  insertComment,
  deleteComment
}