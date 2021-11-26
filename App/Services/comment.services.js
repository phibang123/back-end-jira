const { Comment, Users, Task } = require("../Model/root.modal");

const getAllCommentFromTask = async (req, res) => {
	try {
		let { taskId } = req;
   
		let comment = await Task.findOne({
			//where: { taskId: taskId },
			include: [
				{
					model: Users,
					as: "TaskComment",
			
				
				},
			],
			where: { taskId: taskId },
		});

		
		return comment;
	} catch (error) {
		console.log(error);
	}
};

const insertComment = async (req) => {
	try {
		let { taskId, content, userId } = req;

		let comment = await Comment.create({
			taskId,
			content,
			userId,
		});

		return comment;
	} catch (error) {
		throw new Error();
	}
};
const findCommentUser = async (req, res) => {
	try {
		let { commentId } = req;

		let commentFind = await Comment.findOne({
			where: {
				commentId: commentId,
			},
		});
		return commentFind;
	} catch (error) {
		throw new Error();
	}
};

const deleteComment = async (req) => {
	try {
		let { commentId } = req;
		await Comment.destroy({
			where: { commentId: commentId },
		});
	} catch (error) {
		throw new Error();
	}
};
module.exports = {
	getAllCommentFromTask,
	insertComment,
	deleteComment,
	findCommentUser,
};
