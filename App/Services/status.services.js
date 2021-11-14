const { db } = require("../Model/root.modal");


const getAllStatus = async (req, res) =>
{
  try {
    let sql = 'SELECT * FROM `Status` '
    const [data] = await db.promise().query(sql)

    return   data
  } catch (error) {
    return error
  }

}


module.exports = {
  getAllStatus: getAllStatus
}