const { Project, Status } = require("../Model/root.modal");
const { Users } = require("../Model/root.modal");
const { Category } = require("../Model/root.modal");
const { Task } = require("../Model/root.modal");
//const { UserAssign } = require("../Model/root.modal");
const _ = require("lodash");

const getProjectDetail = async (req) => {
	console.log(req);
	let taskAllStatusProject = await Status.findAll({
		include: [
			{ model: Task, where: {"projectTableProjectId" : 1} }
			
		]
	})

	// let projectDetail = await Project.findOne(
	// 	{
	// 		include: [
	// 			{ model: Category },
	// 			{ model: Users },
	// 			{
	// 				model: Users,
	// 				as: "UserAssignProject",
	// 				through: {
	// 					attributes: [],
	// 				},
	// 			},
	// 		],	 where: { projectId : req } 
	// 	},
	

	// );

	//console.log(projectDetail);
	// .then(function(accounts) {
	// 	return _.map(accounts, function(account) { return account.Name; })
	// })
	//console.log(projectDetail)
	return taskAllStatusProject;
};

module.exports = {
	getProjectDetail,
};
