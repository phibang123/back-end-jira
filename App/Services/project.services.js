const { db } = require("../Model/root.modal");

const getProjectDetail = async (req, res) => {
  try
  {
 
		let sql = `select * from project left join   (select name,userId from users)   users  on project.creator = users.userId   left join category on category.categoryId = project.categoryId  where project.projectId = ${req};`;
		//let sql = `select * from project left join  user_project on user_project.projectId = project.projectId   where project.projectId =  ${req};`;
		const [data] = await db.promise().query(sql);
		return data;
	} catch (error) {
		return error;
	}
};
const getProjectDetailMembers = async (req, res) =>
{
	try
  {
 
		let sql = `select email,name,avatar,phoneNumber,user_project.userId from  users left join   user_project on user_project.userId = users.userId where projectId = ${req};`;
		const [data] = await db.promise().query(sql);
		return data;
	} catch (error) {
		return error;
	}
}

module.exports = {
	getProjectDetail,
	getProjectDetailMembers
};
