const { Project } = require('../Model/root.modal')
const { Users } = require('../Model/root.modal')
const { Category } = require('../Model/root.modal')
const _ = require('lodash')

const getProjectDetail = async (req) => {
 
	let projectDetail = await Project.findOne({ include: [{model: Category},{model: Users }] },{where: {projectId: req}},{raw: true});


	// .then(function(accounts) {
	// 	return _.map(accounts, function(account) { return account.Name; })
	// })
  return   projectDetail
	
};


module.exports = {
	getProjectDetail,
	
};
