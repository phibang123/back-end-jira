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
	
		console.log(user.userId,'alo')
		const token = await jwt.sign({
			name: user.name,
		}, 'secret', { expiresIn: '100h' });
		console.log(user.email)
		
		console.log(email)
    //const {userId,email,password,name,avatar,phoneNumber} = user
		const content = {id: user.userId,email: user.email,name: user.name,avatar: user.avatar, phoneNumber: user.phoneNumber,accessToken: token}
		//return res.status(200).json("Bearer " + token)
	  
		console.log(content)
		res.status(200).json({ success: true,statusCode: 200, content});
	} catch (error)
	{
		console.log(error);
	}
};
const editUser = async (req, res) =>
{
	try
	{
	
		const { errors, isValid } = validateResignterInput(req.body);

		
		if (!isValid) return res.status(400).json({ success: false,statusCode: 400, errors});
		
		const checkUser = await userService.findUserById(req.body);
		console.log(checkUser)
		if (checkUser !== undefined)
		{
			console.log(123)
			await userService.editUserProfile(req.body);
			res.status(200).json({ success: true,statusCode: 200, message: 'Edit user profile successfully' });
		}
		else
		{
		
			res.status(400).json({ success: false,statusCode: 400, message: 'User not exist' });
		}
		// let signup = req.body;
		// res
		// 	.status(200)
		// 	.json({ success: true, message: "sign up sucess", content: signup });
	} catch (e) {
		console.log(e.message);
		res.status(400).json({ success: false, message: "Email đã được sử dụng!" });
	}
}
module.exports = {
	signup: signup,
	signin: signin,
	editUser: editUser
};
