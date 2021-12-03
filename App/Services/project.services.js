const {
	Project,
	Status,
	Priority,
	TaskType,
	Comment,
	UserAssignTask,
	UserAssignProject,
	Users
} = require("../Model/root.modal");

const { Category } = require("../Model/root.modal");
const { Task } = require("../Model/root.modal");
//const { UserAssign } = require("../Model/root.modal");
const _ = require("lodash");

const getTaskByStatus = async (req) => {

	let taskAllStatusProject = await Status.findAll({
		model: Status,
		include: [
			{
				model: Task,
				as: "task_tables",
				include: [
					{
						model: Priority,
					},
					{ model: TaskType },
					{
						model: Users,
						as: "UserAssignTask",
						attributes: ["userId", "name", "avatar"],
						through: {
							attributes: [],
						},
					},
					{
						model: Users,
						as: "TaskComment",
						//attributes: ['commentId'],
						through: {
							attributes: ["content", "commentId"],
						},
					},
					// {
					// 	model: Comment,
					// 	as: "TaskComment",
					// 	//attributes: ['userId','name','avatar'],
					// 	// through: {
					// 	// 	attributes: [],
					// 	// },
					// },
				],

				required: true,
				where: {
					projectTableProjectId: req,
				},
				required: false,
			},
		],
		required: false,
	});

	return taskAllStatusProject;
};

const getProjectDetail = async (req) =>
{
	
	let projectDetail = await Project.findOne({
		include: [{ model: Category },{ model: Users }, { model: Users, as: 'UserAssignProject' }],
		where: {projectId : req}
	});

	//console.log(projectDetail);
	// .then(function(accounts) {
	// 	return _.map(accounts, function(account) { return account.Name; })
	// })
	//console.log(projectDetail)
	return projectDetail;
};

const getAllProject = async (req) => {
	
	let projectAll = await Project.findAll({
		include: [
			{ model: Category },
			{ model: Users },
	
			{
				model: Users,
				as: "UserAssignProject",
				through: {
					attributes: [],
				},
			},
		],
	});
	
	return projectAll;
};

const createProject = async (req) => {
	let project = await Project.create(req);
	return project;
};

const checkCreatorProject = async (req) => {
	try {
		let checkproject = await Project.findOne({
			where: { projectId: req.projectId },
		});
		return checkproject;
	} catch (error) {
		throw new Error("Project not exist");
	}
};

const deleteProjectById = async (req) => {
	try {
		let deleteProject = await Project.destroy({
			where: { projectId: req.projectId },
			attributes: ["projectId"],
		});
		return deleteProject;
	} catch (error) {
		throw new Error(error);
	}
};

const updateProject = async (projected, req) => {
	try {
		let { categoryTableCategoryId, description, projectName, projectId } = req;

		//let projected = await Project.findOne({projectId: projectId})
	
		if (projected) {
			projected.categoryTableCategoryId = categoryTableCategoryId;
			projected.description = description;
			projected.projectName = projectName;
			projected.alias = projectName;

			const projectUpdate = await projected.save();
			return projectUpdate;
		} else {
			throw new Error(error);
		}
	} catch (error) {
		throw new Error(error);
	}
};

const assignUserProject = async (project) => {
	let { userId, projectId } = project;
	try {
		//console.log( userId, projectId )
		let userAss = await UserAssignProject.create({ userId, projectId });
		return userAss;
	} catch (error) {
		throw new Error();
	}
};

const removeUserProject = async (project) => {
	let { userId, projectId } = project;
	try {
		//console.log( userId, projectId )
		let userAss = await UserAssignProject.destroy({
			where: { userId, projectId },
		});
		return userAss;
	} catch (error) {
		throw new Error();
	}
};

module.exports = {
	getProjectDetail,
	getTaskByStatus,
	getAllProject,
	createProject,
	checkCreatorProject,
	deleteProjectById,
	updateProject,
	assignUserProject,
	removeUserProject,

};
