const express = require("express");
const router = require("../Routers/root.router");
//const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require('passport')





const app = express(); //để nó chuyển tất cả res req thành json để tiện thao tác
app.use(express.json());
//app.use(cors(corsOptions)) 
// ========================== middleWare =================================



//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
 







app.use(router);

app.use(express.json()); //để nó chuyển tất cả res req thành json để tiện thao tác
	


const { sequelize } = require('../Model/root.modal')
//synch table
const syncModel = async () =>
{
	await sequelize.sync({ alter: true })
	console.log("đã đồng bộ model task")
}
syncModel();

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

