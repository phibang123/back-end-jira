const {UserAssignTask,Task} = require('../Model/root.modal')


const findTask = async (taskId) =>
{
  const task = await Task.findOne({ where: { taskId: taskId } })
  return task
}


const updateSatusTask = async (req) =>
{
    let { taskId, statusId } = req
    const taskFind = await findTask(taskId);

    if (taskFind)
    {
      taskFind.statusTableStatusId = statusId
      
      const taskUpdate = await taskFind.save();
			return taskUpdate;
    }
    else
    {
      return false
    }
}

const updatePriorityTask = async (req) =>
{
    let { taskId, priorityId } = req
   
    const taskFind = await findTask(taskId);

    if (taskFind)
    {
      taskFind.priorityTablePriorityId = priorityId
      
      const taskUpdate = await taskFind.save();
			return taskUpdate;
    }
    else
    {
      return false
    }
}

const updateDescriptionTask = async (req) =>
{
    let { taskId, description } = req
  
    const taskFind = await findTask(taskId);

    if (taskFind)
    {
      taskFind.description = description
      
      const taskUpdate = await taskFind.save();
			return taskUpdate;
    }
    else
    {
      return false
    }
}


const updateTimeTracking = async (req) =>
{
    let { taskId, timeTrackingSpent,timeTrackingRemaining } = req
    
    const taskFind = await findTask(taskId);
  
    if (taskFind)
    {
      taskFind.timeTrackingSpent = timeTrackingSpent,
      taskFind.timeStrackingRemaining = timeTrackingRemaining
      
      const taskUpdate = await taskFind.save();
			return taskUpdate;
    }
    else
    {
      return falses
    }
}


const updateEstimate = async (req) =>
{
    let { taskId, originalEstimate } = req
    
    const taskFind = await findTask(taskId);
  
    if (taskFind)
    {
      taskFind.originalEstimate = originalEstimate

      
      const taskUpdate = await taskFind.save();
			return taskUpdate;
    }
    else
    {
      return falses
    }
}


const addUserAssignTask = async (req) =>
{
    
  
    await UserAssignTask.create(req);
  
    
}

const findTaskAssign = async (req) =>
{
  let { taskId, userId } = req
  console.log(taskId, userId);
  let userAssignTask = await UserAssignTask.findOne({ where: { userId: userId, taskId: taskId } })
  return userAssignTask
}


const removeUserAssignTask = async (req) =>
{
    let {taskId,userId} = req
   
    let findUserAssignTask = await findTaskAssign({ taskId, userId })
   
    await UserAssignTask.destroy({where: {userAssignTaskId: findUserAssignTask.userAssignTaskId}});
  
    
}

module.exports = {
  updateSatusTask: updateSatusTask,
  updatePriorityTask: updatePriorityTask,
  updateDescriptionTask: updateDescriptionTask,
  updateTimeTracking: updateTimeTracking,
  updateEstimate: updateEstimate,
  addUserAssignTask: addUserAssignTask,
  removeUserAssignTask
}