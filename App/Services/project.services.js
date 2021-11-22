const {
	Project,
	Status,
	Priority,
	TaskType,
	Comment,
	UserAssignTask,
} = require("../Model/root.modal");
const { Users } = require("../Model/root.modal");
const { Category } = require("../Model/root.modal");
const { Task } = require("../Model/root.modal");
//const { UserAssign } = require("../Model/root.modal");
const _ = require("lodash");

const getTaskByStatus = async (req) => {
	console.log(req);
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
						attributes: ['userId','name','avatar'],
						through: {
							attributes: [],
						},
					},
					{
						model: Users,
						as: "TaskComment",
						//attributes: ['commentId'],
						through: {
						
							attributes: ['content','commentId'],
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

const getProjectDetail = async (req) => {
	// let taskAllStatusProject = await Status.findAll({
	// 	include: [
	// 		{
	// 			model: Task,where: {projectTableProjectId : req},
	// 			as: "task_tables",

	// 		},
	// 	],

	// });

	let projectDetail = await Project.findOne({
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
		where: { projectId: req },
	});

	//console.log(projectDetail);
	// .then(function(accounts) {
	// 	return _.map(accounts, function(account) { return account.Name; })
	// })
	//console.log(projectDetail)
	return projectDetail;
};

module.exports = {
	getProjectDetail,
	getTaskByStatus,
};
