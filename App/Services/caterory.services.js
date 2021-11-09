const { db } = require('../Model/root.modal')





const getAll = async () =>
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
  getAll: getAll,

}