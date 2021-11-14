const express = require("express");
const router = require("../Routers/root.router");
//const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require('passport')

// const corsOptions ={
//   origin:'*', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200,
// }



const app = express();

//app.use(cors(corsOptions)) 
// ========================== middleWare =================================



//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
 







app.use(router);

app.use(express.json()); //để nó chuyển tất cả res req thành json để tiện thao tác

const {db} = require("../Model/root.modal")

//add Catrgory to SQL Server



const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

