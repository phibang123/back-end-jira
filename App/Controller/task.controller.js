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

const updateEstimate = async (req, res) => {
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

const addUserAssignTask = async (req, res) => {
	let { taskId, userId } = req.body;

	try {
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

const removeUserAssignTask = async (req, res) => {
	let { taskId, userId } = req.body;

	try {
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
const createTask = async (req, res) => {
	try {
		let {
			listUserAsign,
			taskName,
			description,
			statusId,
			originalEstimate,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectId,
			typeId,
			priorityId,
		} = req.body;

		let newTask = await taskService.createTask({
			taskName,
			description,
			statusTableStatusId: statusId,
			originalEstimate,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectTableProjectId: projectId,
			tasktypeTableTypeId: typeId,
			priorityTablePriorityId: priorityId,
		});

		let listuserMap = listUserAsign?.map((user) => {
			return {
				userId: user,
				taskId: newTask?.taskId,
			};
		});
		await taskService.addUserAssignTaskList(listuserMap,newTask?.taskId);
		let [userMap] = [newTask]?.map((e) =>
		{
			return {
				taskId: e.taskId,
				taskName: e.taskName,
				alias: e.taskName,
				description: e.description,
				statusId: e.statusTableStatusId,
				originalEstimate: e.originalEstimate,
				timeTrackingSpent: e.timeTrackingSpent,
				timeTrackingRemaining: e.timeTrackingRemaining,
				projectId: e.projectTableProjectId,
				typeId: e.tasktypeTableTypeId,
				priorityId: e.priorityTablePriorityId
			}
		})
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: userMap,
		});
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 400, message: "Task not found" });
	}
};




const updateTask = async (req, res) => {
	try
	{
		
		let {
			listUserAsign,
			taskName,
			description,
			statusId,
			originalEstimate,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectId,
			typeId,
			priorityId,
			taskId
		} = req.body;

		let newTask = await taskService.updateTask({
			taskName,
			description,
			taskId,
			statusTableStatusId: statusId,
			originalEstimate,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectTableProjectId: projectId,
			tasktypeTableTypeId: typeId,
			priorityTablePriorityId: priorityId,
			taskId
		});

		let listuserMap = listUserAsign?.map((user) => {
			return {
				userId: user,
				taskId: newTask?.taskId,
			};
		});
		await taskService.addUserAssignTaskList(listuserMap,newTask?.taskId);
		let [userMap] = [newTask]?.map((e) =>
		{
			return {
				taskId: e.taskId,
				taskName: e.taskName,
				alias: e.taskName,
				description: e.description,
				statusId: e.statusTableStatusId,
				originalEstimate: e.originalEstimate,
				timeTrackingSpent: e.timeTrackingSpent,
				timeTrackingRemaining: e.timeTrackingRemaining,
				projectId: e.projectTableProjectId,
				typeId: e.tasktypeTableTypeId,
				priorityId: e.priorityTablePriorityId
			}
		})
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Xử lý thành công!",
			content: userMap,
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
	removeUserAssignTask,
	createTask,
	updateTask
};
