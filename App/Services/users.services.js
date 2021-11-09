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
	let { password } = res;
	await bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(
			password,salt,(err,hash //hash là chuổi paword được băm
			) => {
				if (err) throw err;
				passwordHash = hash;
			}
		);
	});
  console.log(passwordHash)

	let port = `select true as checkPassword from users where users.password = "${passwordHash}"`;
	console.log(port);
	const [data] = await db.promise().query(port);
	return data[0]
};

const findOneByEmail = async (email) => {
	let port = `select * from users where users.email = "${ email }"`;
	const [data] = await db.promise().query(port);
	const [user] = data
	return user
}


module.exports = {
	signupUser: signupUser,
	checkEmail: checkEmail,
	checkPassword: checkPassword,
	findOneByEmail
};
