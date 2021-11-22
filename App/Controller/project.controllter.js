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
      
			if (projectDetail) {
				//console.log(JSON.stringify(projectDetail, null, 2));
			  const taskByStatus = await projectServices.getTaskByStatus(projectId)
				let projectArr = [projectDetail];
				const [projectDetailMap] = projectArr.map((p) => ({
					alias: p.alias,
					
					description: p.description,
					creator: {
						id: p.user_table?.userId,
						name: p.user_table?.name,
					},
					id: p.projectId,
					members: p?.UserAssignProject?.map((users) => {
						return {
							userId: users?.userId,
							name: users?.name,
							email: users?.email,
							avatar: users?.avatar,
							phoneNumber: users?.phoneNumber,
						};
					}),
					//lstTask: taskByStatus,
					lstTask: taskByStatus?.map((status) =>
					{
						return {
							alias: status?.alias,
							lstTaskDeTail: status?.task_tables.map((task) =>
							{
								return {
									alias: task?.taskName,
									assigness: task?.UserAssignTask.map((assign) =>
									{
										return {
											id: assign?.userId,
											name: assign?.name,
											avatar: assign?.avatar
										}
											
									}),
									lstComment: task?.TaskComment.map((comment) =>
									{
										return {
											avatar: comment?.avatar,
											commentContent: comment?.comment_table?.content,
											id: comment?.comment_table?.commentId,
											idUser: comment?.userId,
											name: comment?.name
										}
									}),
									description: task?.description,
									originalEstimate: task?.originalEstimate,
								
									priorityId: task?.priorityTablePriorityId,
									priorityTask: {
										priority: task?.priority_table?.priority,
                    priorityId: task?.priority_table?.priorityId
									},
									projectId: task?.projectTableProjectId,
									statusId: task?.statusTableStatusId,
									taskId: task?.taskId,
									taskName: task?.taskName,
									taskTypeDetail: {
										id: task?.tasktype_table?.typeId,
										taskType: task?.tasktype_table?.taskType
									},
									timeTrackingRemaining: task?.timeStrackingRemaining,
									timeTrackingSpent: task?.timeTrackingSpent,
									createTaskDate: task?.createTaskDate,
									typeId: task?.tasktypeTableTypeId
							
								}
							}),
							statusId: status?.statusId,
							statusName: status?.statusName
						}
					}),
					projectCategory: {
						id: p?.category_table?.categoryId,
						name: p?.category_table?.categoryName,
					},
					projectName: p.projectName,
					createProjectDate: p.createProjectDate,
				}));
				
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
