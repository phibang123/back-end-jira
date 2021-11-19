// const { db } = require("../Model/root.modal");
const bcrypt = require("bcryptjs");
const { Users } = require("../Model/root.modal");
const jwt = require("jsonwebtoken");
const createUser = async (users) => {
	try {
		let {
			email,
			password,
			name,
			phoneNumber,
			avatar = `https://ui-avatars.com/api/?name=${name}`,
		} = users;
		//let avatar = `https://ui-avatars.com/api/?name=${name}`
	 await bcrypt.genSalt(10, async (err, salt) => {
		 await	bcrypt.hash(
				password,
				salt,
				 async (
					err,
					hash //hash là chuổi paword được băm
				) => {
					 if (err) throw err;
					console.log(hash);
				  let usersNew =	await Users.create({
						email,
						password: hash,
						name,
						phoneNumber,
						avatar,
					});
					 return usersNew;
				}
			);
		});		
	} catch (error) {
		throw new error();
	}
};

//
const loginUser = async (req, res) => {
	console.log(req);
	const { email, password } = req;
	const findUsers = await Users.findOne({
		where: { email },
	});
	console.log(JSON.stringify(findUsers,null,2));
  return findUsers
};

//	 
const updateUser = async (req, res ) =>
{
	let { id, email, password, name, phoneNumber } = req;
	await bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(
			password,
			salt,
			(
				err,
				hash //hash là chuổi paword được băm
			) => {
				if (err) throw err;
				passwordHash = hash;
			}
		);
	});
	console.log(id, email, password, name, phoneNumber)
  let userId  = id
	const userUpdate = await Users.findOne({
		where: { userId },
	});
	if(userUpdate)
	{
		userUpdate.email =  email;
		userUpdate.password =  passwordHash;
		userUpdate.name =  name;
		userUpdate.phoneNumber =  phoneNumber;
		
	 const userUpdated =  await userUpdate.save()
 
		return userUpdated;
	}
	else
	{
		return false;
  }


	
}





module.exports = {
	

	createUser: createUser,
	loginUser: loginUser,
	updateUser: updateUser
};
