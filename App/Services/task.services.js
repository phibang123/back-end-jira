const { UserAssignTask, Task, Project } = require("../Model/root.modal");
const { QueryTypes } = require("sequelize");

const findTask = async (taskId) => {
	const task = await Task.findOne({ where: { taskId: taskId } });
	return task;
};

const updateSatusTask = async (req) => {
	let { taskId, statusId } = req;
	const taskFind = await findTask(taskId);

	if (taskFind) {
		taskFind.statusTableStatusId = statusId;

		const taskUpdate = await taskFind.save();
		return taskUpdate;
	} else {
		return false;
	}
};

const updatePriorityTask = async (req) => {
	let { taskId, priorityId } = req;

	const taskFind = await findTask(taskId);

	if (taskFind) {
		taskFind.priorityTablePriorityId = priorityId;

		const taskUpdate = await taskFind.save();
		return taskUpdate;
	} else {
		return false;
	}
};

const updateDescriptionTask = async (req) => {
	let { taskId, description } = req;

	const taskFind = await findTask(taskId);

	if (taskFind) {
		taskFind.description = description;

		const taskUpdate = await taskFind.save();
		return taskUpdate;
	} else {
		return false;
	}
};

const updateTimeTracking = async (req) => {
	let { taskId, timeTrackingSpent, timeTrackingRemaining } = req;

	const taskFind = await findTask(taskId);

	if (taskFind) {
		(taskFind.timeTrackingSpent = timeTrackingSpent),
			(taskFind.timeStrackingRemaining = timeTrackingRemaining);

		const taskUpdate = await taskFind.save();
		return taskUpdate;
	} else {
		return falses;
	}
};

const updateEstimate = async (req) => {
	let { taskId, originalEstimate } = req;

	const taskFind = await findTask(taskId);

	if (taskFind) {
		taskFind.originalEstimate = originalEstimate;

		const taskUpdate = await taskFind.save();
		return taskUpdate;
	} else {
		return falses;
	}
};

const addUserAssignTask = async (req) => {
	await UserAssignTask.create(req);
};

const findTaskAssign = async (req) => {
	let { taskId, userId } = req;
	console.log(taskId, userId);
	let userAssignTask = await UserAssignTask.findOne({
		where: { userId: userId, taskId: taskId },
	});
	return userAssignTask;
};

const removeUserAssignTask = async (req) => {
	let { taskId, userId } = req;

	let findUserAssignTask = await findTaskAssign({ taskId, userId });

	await UserAssignTask.destroy({
		where: { userAssignTaskId: findUserAssignTask.userAssignTaskId },
	});
};

const checkTaskAuthor = async (req) => {
	let { projectId, id } = req;

	try {
		const author = await Project.findOne({ where: { projectId } });
		if (author?.userTableUserId === id) {
			return true;
		} else if (author?.userTableUserId !== id) {
			return false;
		}
	} catch (error) {}
};

const createTask = async (req) => {
	try {
		console.log(req);
		let newTask = await Task.create(req);
		return newTask;
	} catch (error) {
		throw new Error();
	}
};

const updateTask = async (req) => {
	try {
	  console.log(113)
	  let {
			taskName,
			description,
			statusTableStatusId,
			originalEstimate,
			timeTrackingSpent,
			timeTrackingRemaining,
			projectTableProjectId,
			tasktypeTableTypeId,
			priorityTablePriorityId,
			taskId
		} = req
	
		let newTask = await Task.findOne({ where: { taskId: taskId } });

		if (newTask)
		{
			newTask.taskName = taskName,
		  newTask.description = description,
			newTask.statusTableStatusId = statusTableStatusId,
			newTask.originalEstimate = originalEstimate,
			newTask.timeTrackingSpent = timeTrackingSpent,
			newTask.timeTrackingRemaining = timeTrackingRemaining,
			newTask.projectTableProjectId = projectTableProjectId,
			newTask.tasktypeTableTypeId = tasktypeTableTypeId,
			newTask.priorityTablePriorityId = priorityTablePriorityId
			const taskUpdate = newTask.save()
			return taskUpdate
		}
		else
		{
			throw new Error();
		}
	} catch (error) {
		throw new Error();
	}
};

const addUserAssignTaskList = async (req,taskId) => {
	console.log(req);
	await UserAssignTask.destroy({where: {taskId},returning: true})
	await UserAssignTask.bulkCreate(req, {returning: true});
};
module.exports = {
	updateSatusTask: updateSatusTask,
	updatePriorityTask: updatePriorityTask,
	updateDescriptionTask: updateDescriptionTask,
	updateTimeTracking: updateTimeTracking,
	updateEstimate: updateEstimate,
	addUserAssignTask: addUserAssignTask,
	checkTaskAuthor: checkTaskAuthor,
	removeUserAssignTask: removeUserAssignTask,
	createTask: createTask,
	updateTask: updateTask,
	addUserAssignTaskList: addUserAssignTaskList,
};
