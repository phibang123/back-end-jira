const projectServices = require("../Services/project.services");

const getDetailProject = async (req, res) => {
	try {
		let projectId = req.params.id;

		if (!projectId) {
			res.status(404).json({
				success: true,
				statusCode: 404,
				message: "Project is not found",
				content: "Project is not found",
			});
		} else {
			const projectDetail = await projectServices.getProjectDetail(projectId);
		
			if (projectDetail)
			{
				console.log(JSON.stringify(projectDetail,null,2));
				// projectDetailMap = projectDetail?.map((p) =>
				// ( {
				// 		alias: p.alias,
				// 		description: p.description,
				// 		id: p.projectId,
				// 		projectCategory: {
				// 			id: p.category_table?.categoryId,
				// 			name: p.category_table?.categoryName
				// 		},
				// 		creator: {
				// 			id: p.user_table.userId,
				// 			name: p.user_table.name
				// 		},
				// 		projectName: projectName
				// 	}
				// ))
				 let projectArr = [projectDetail];
				[projectDetailMap] = projectArr.map((p) =>
				( {
						alias: p.alias,
						description: p.description,
						creator: {
							id: p.user_table.userId,
							name: p.user_table.name
						},
						id: p.projectId,
						projectCategory: {
							id: p.category_table.categoryId,
							name: p.category_table.categoryName
						},
						projectName: p.projectName,
						createProjectDate: p.createProjectDate,
					}
				))
				console.log(projectDetailMap)
				res.status(200).json({
					success: true,
					statusCode: 200,
					content: projectDetailMap,
				});
			} else {
				res
					.status(400)
					.json({ success: true, statusCode: 404, message: "Not Found" });
			}
		}
	} catch (error) {
		res
			.status(400)
			.json({ success: true, statusCode: 404, message: "Not Found" });
	}
};

module.exports = {
	getDetailProject,
};
