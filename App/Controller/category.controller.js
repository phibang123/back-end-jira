const categoryService = require('../Services/caterory.services')



const getCategory = async (req, res) =>
{
  const categoryList = await categoryService.getAll()

  if (categoryList)
  {
    res.status(200).send(categoryList)
  }
  else
  {
    res.status(404).send('not Found')
  }
}


module.exports = {
  getCategory
}