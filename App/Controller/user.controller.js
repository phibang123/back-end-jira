const express = require("express");
const bcrypt = require("bcryptjs");
//const passport = require("passport");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const router = express.Router();

const userService = require("../Services/users.services");
//validator
const {
	validateResignterInput,
} = require("../Validation/validateResignterInput");
const usersServices = require("../Services/users.services");
const { validateSigninInput } = require("../Validation/validateSigninInput");

const signup = async (req, res) =>
{
	
	try {
		const { errors, isValid } = validateResignterInput(req.body);
		if (!isValid) return res.status(400).json(errors);
		let users = req.body;

		let { password } = users;

		const hashedPassword = await new Promise((resolve, reject) => {
			bcrypt.hash(password, 10, function (err, hash) {
				if (err) reject(err);
				resolve(hash);
			});
		});

		let {
			email,
			name,
			phoneNumber,
			avatar = `https://ui-avatars.com/api/?name=${name}`,
		} = users;
		let newUser = await userService.createUser({
			email,
			name,
			phoneNumber,
			avatar,
			password: hashedPassword,
		});

		if (newUser !== undefined) {
			res
				.status(200)
				.json({
					success: true,
					statusCode: 200,
					message: "sign up sucess",
					content: newUser,
				});
		} else {
			res
				.status(400)
				.json({ success: false, statusCode: 400, message: "error" });
		}
	} catch (error) {
		res
			.status(400)
			.json({
				success: false,
				statusCode: 400,
				message: "Email đã được sử dụng!",
			});
	}
};

// 	signin
const signin = async (req, res) => {
	//console.log(req.body);
	let { email, password } = req.body;
	try {
		const { errors, isValid } = validateSigninInput(req.body);

		if (!isValid) return res.status(400).json(errors);
		let findUsers = await userService.loginUser({ email, password });
		if (!findUsers) {
			return res
				.status(400)
				.json({ success: false, message: "Email not Exists" });
		}
		const isMathPassword = await bcrypt.compare(password, findUsers.password);
		if (!isMathPassword)
			return res
				.status(400)
				.json({ success: false, message: "password incorrect" });
	 
		
		
		const token = await jwt.sign({
			id: findUsers.userId,
		}, 'secret', { expiresIn: '24h' });
		const content = {
			id: findUsers.userId,
			email: findUsers.email,
			name: findUsers.name,
			avatar: findUsers.avatar,
			phoneNumber: findUsers.phoneNumber,
			accessToken: token,
		};
		res.status(200).json({ success: true, statusCode: 200, content });
	} catch (error) {
		res.status(400).json({ success: false, message: "Not pund" });
	}
};

const editUser = async (req, res) => {
	try {
		const { errors, isValid } = validateResignterInput(req.body);

		if (!isValid)
			return res.status(400).json({ success: false, statusCode: 400, errors });

		let findUsers = await userService.updateUser(req.body);

		if (findUsers) {
			res.status(200).json({
				success: true,
				statusCode: 200,
				message: "Edit user profile successfully",
			});
		} else {
			res
				.status(400)
				.json({ success: false, statusCode: 400, message: "User not exist" });
		}
		// let signup = req.body;
		// res
		// 	.status(200)
		// 	.json({ success: true, message: "sign up sucess", content: signup });
	} catch (e) {
		console.log(e);
		res.status(400).json({ success: false, message: "Email đã được sử dụng!" });
	}
};
module.exports = {
	signup: signup,
	signin: signin,
	editUser: editUser,
};
