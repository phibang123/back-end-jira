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
	console.log(req.body)
	try {
		const { errors, isValid } = validateResignterInput(req.body);

		if (!isValid) return res.status(400).json(errors);

		await userService.signupUser(req.body);

		let signup = req.body;
		res
			.status(200)
			.json({ success: true, message: "sign up sucess", content: signup });
	} catch (e) {
		console.log(e.message);
		res.status(400).json({ success: false, message: "Email đã được sử dụng!" });
	}
};
// 	signin
const signin = async (req, res) => {
  //console.log(req.body);
	let {email, password} = req.body;
	try
	{
		const { errors, isValid } = validateSigninInput(req.body);

		if (!isValid) return res.status(400).json(errors);
		const user = await userService.findOneByEmail(email);
		if(!user)return res.status(400).json({success: false,message:"Email not Exists"})

		const isMathPassword = await bcrypt.compare(password, user.password)
		if (!isMathPassword ) return res.status(400).json({success: false,message:"password incorrect"})
	
		const token = await jwt.sign({
			userId: user.id,
		}, 'secret', { expiresIn: '1h' });
   
		//return res.status(200).json("Bearer " + token)
		res.status(200).json({ success: true, token: "Bearer " + token });
	} catch (error)
	{
		console.log(error);
	}
};
module.exports = {
	signup: signup,
	signin: signin,
};
