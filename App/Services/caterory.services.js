const { db } = require('../Model/root.modal')





const getAllCategory = async () =>
{
  try {
    let sql = 'SELECT * FROM `Category` '
    const [data] = await db.promise().query(sql)

    return   data
  } catch (error) {
    return error
  }

}




module.exports = {
  getAllCategory: getAllCategory,

}