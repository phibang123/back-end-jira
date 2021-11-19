const projectServices = require("../Services/project.services");

const getDetailProject = async (req, res) => {
	try {
		let projectId = req.params.id;

		if (!projectId) {
			res
				.status(404)
				.json({
					success: true,
					statusCode: 404,
					message: "Project is not found",
					content: "Project is not found",
				});
		} else {
      const projectDetail = await projectServices.getProjectDetail(projectId);
      const members = await projectServices.getProjectDetailMembers(projectId)
     
      // membersMap = members.map((members) =>
      // {
        
      // })
      projectMap = projectDetail.map((e) =>
      (
         {
          id: e.projectId,
          projectName: e.projectName,
          creator: {
            id: e.creator,
            categoryId: e.name
          },
          description: e.description,
          projectCategory: {
            id: e.categoryId,
            name: e.categoryName
          },
          members: members,
          createProjectDate: e.createProjectDate
        }
      ))
      
			console.log(projectMap,"123");
		}
	} catch (error) {}
};

module.exports = {
	getDetailProject,
};
