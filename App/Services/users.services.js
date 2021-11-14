const { db } = require("../Model/root.modal");
const bcrypt = require("bcryptjs");

//
const signupUser = async (res) => {
	let { email, password, name, phoneNumber } = res;
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(
			password,salt,(err,hash //hash là chuổi paword được băm
			) => {
				if (err) throw err;
				passwordHash = hash;
			}
		);
	});
	let port = `insert into users(email,password,name,phoneNumber,avatar)
    value("${email}","${passwordHash}","${name}","${phoneNumber}","https://ui-avatars.com/api/?name=${name}");`;
	return	await db.promise().query(port);
};
//check email
const checkEmail = async (res) =>
{
	let port = `select true as checkEmail,password as userPassword from users where users.email = "${res}"`;
	const [data] = await db.promise().query(port);
	
	return data[0]
};
const checkPassword = async (res) =>
{
	let port = `select true as checkPassword from users where users.password = "${passwordHash}"`;
	console.log(port);
	const [data] = await db.promise().query(port);
	return data[0]
};

const findOneByEmail = async (email) =>
{

	let port = `select * from users where users.email = "${ email }"`;
	const [data] = await db.promise().query(port);
	const [user] = data
	return user
}
const listIdUser = async () => {
	let port = `select * as id from users  "`;
	const [data] = await db.promise().query(port)

	return   data

}
const findUserById = async (req) =>
{
	
	let { id } = req;
	console.log(id)
	let port = `select * from users where userId = ${ id };`;
	const [[data]] = await db.promise().query(port)
	console.log(data);
	return data
}
const editUserProfile = async (req) =>
{

	let { id, email, password, name, phoneNumber } = req;
	console.log(id, email, password, name, phoneNumber)
	let port = `update users set email = "${ email }",password = "${ password }",name = "${ name }", phoneNumber = "${ phoneNumber }" where userId = ${ id };`;
  await db.promise().query(port)
}
module.exports = {
	signupUser: signupUser,
	checkEmail: checkEmail,
	checkPassword: checkPassword,
	listIdUser: listIdUser,
	findOneByEmail: findOneByEmail,
	editUserProfile: editUserProfile,
	findUserById: findUserById
};
