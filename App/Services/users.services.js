// const { db } = require("../Model/root.modal");
const bcrypt = require("bcryptjs");
const { Users } = require("../Model/root.modal");
const jwt = require("jsonwebtoken");
const createUser = async (users) => {


		let newUser = await Users.create(users)
    return newUser
		

};

//
const loginUser = async (req, res) => {
	console.log(req);
	const { email, password } = req;
	const findUsers = await Users.findOne({
		where: { email },
		raw: true
	});
	//console.log(JSON.stringify(findUsers, null, 2));
	return findUsers;
};

//
const updateUser = async (req, res) => {
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
	//console.log(id, email, password, name, phoneNumber);
	let userId = id;
	const userUpdate = await Users.findOne({
		where: { userId },
	});
	if (userUpdate) {
		userUpdate.email = email;
		userUpdate.password = passwordHash;
		userUpdate.name = name;
		userUpdate.phoneNumber = phoneNumber;

		const userUpdated = await userUpdate.save();

		return userUpdated;
	} else {
		return false;
	}
};

module.exports = {
	createUser: createUser,
	loginUser: loginUser,
	updateUser: updateUser,
};
