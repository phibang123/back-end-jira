const { db } = require("../Model/root.modal");




const getAllTaskType = async (req, res) =>
{
  
  try
  {

    let sql = 'select * from taskType;'
    const [data] = await db.promise().query(sql)
    
    return data
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllTaskType:  getAllTaskType
}