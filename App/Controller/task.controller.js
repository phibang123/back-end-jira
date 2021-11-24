const taskService = require("../Services/task.services");

const updateStatus = async (req, res) => {
	let { taskId, statusId } = req.body;

	try {
		await taskService.updateSatusTask({ taskId, statusId });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const updatePriority = async (req, res) => {
	let { taskId, priorityId } = req.body;

	try {
		await taskService.updatePriorityTask({ taskId, priorityId });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const updateDescription = async (req, res) => {
	let { taskId, description } = req.body;

	try {
		await taskService.updateDescriptionTask({ taskId, description });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};
const updateTimeTracking = async (req, res) => {
	let { taskId, timeTrackingRemaining, timeTrackingSpent } = req.body;

	try {
		await taskService.updateTimeTracking({
			taskId,
			timeTrackingRemaining,
			timeTrackingSpent,
		});
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const updateEstimate = async (req, res) =>
{
 
	let { taskId, originalEstimate } = req.body;

	try {
		await taskService.updateEstimate({
			taskId,
			originalEstimate,
		});
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Update task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const addUserAssignTask = async (req, res) =>
{
 
	let { taskId, userId } = req.body;

  try
  {
		await taskService.addUserAssignTask({ taskId, userId });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Add user task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};

const removeUserAssignTask = async (req, res) =>
{
 
	let { taskId, userId } = req.body;

  try
  {
		await taskService.removeUserAssignTask({ taskId, userId });
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: "Remove user task successfully!",
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};
module.exports = {
	updateStatus,
	updatePriority,
	updateDescription,
	updateTimeTracking,
  updateEstimate,
  addUserAssignTask,
  removeUserAssignTask
};
