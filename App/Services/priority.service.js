const { db } = require('../Model/root.modal')




const getAllPriority = async (req, res) =>
{
  try {
    let sql = 'SELECT * FROM `Priority` '
    const [data] = await db.promise().query(sql)
    return data
  } catch (error) {
    return error
  }
}


module.exports = {
  getAllPriority
}