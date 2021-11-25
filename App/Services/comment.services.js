const { Comment, Users } = require("../Model/root.modal");

const getAllCommentFromTask = async (req, res) => {
	try {
		let { taskId } = req;
		let comment = await Comment.findAll({
			where: { taskId: taskId },
			include: Users
		});
		console.log(JSON.stringify(comment, null, 2))
		return comment;
	} catch (error) {
		throw new Error();
	}
};


const insertComment = async (req) => {
	try {
		let { taskId, content,userId } = req;
		
		let comment = await Comment.create({
			taskId, content,userId
		});
	
		return comment;
	} catch (error) {
		throw new Error();
	}
};
const findCommentUser = async (req, res) =>
{
	try
	{
		let { commentId } = req
		console.log(commentId)
		let commentFind = await Comment.findOne({
			where: {
				commentId:commentId
		}})
		return commentFind
	} catch (error) {
		throw new Error();
	}
}

const deleteComment = async (req) =>
{
	try
	{
		let {commentId} = req
		await Comment.destroy({
			where: {commentId: commentId}
		})
	} catch (error) {
		throw new Error();
	}
}
module.exports = {
	getAllCommentFromTask,
	insertComment,
	deleteComment,
	findCommentUser
};
