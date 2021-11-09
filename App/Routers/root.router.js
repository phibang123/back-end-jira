const express = require('express');
const categoryRouter = require('./category.router')
const userRouter = require('./user.router')
const router = express.Router();

//url <=> http://localhost:3000/students
//cái /students nó tự add vào url
//ProjectCategory
router.use("/api/ProjectCategory", categoryRouter);

//User
router.use("/api/Users",userRouter);


module.exports = router