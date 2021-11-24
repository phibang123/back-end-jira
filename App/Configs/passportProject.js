const jwt = require("jsonwebtoken");
const projectServices = require("../Services/project.services");


const passportProject = (req, res, next) => {
	try {
		const authorizationHeader = req.headers["accesstoken"];
       
		//"Bearer [token]"
		const token = authorizationHeader.split(" ")[1];
		if (!token) {
			res.status(401).json({ success: false, statusCode: 401 });
			//res.sendStatus(401);
		}
	
		jwt.verify(token, "secret", (err, data) => {
			const { id } = data;

			if (err) {
				res.status(401).json({ success: false, statusCode: 401 });
			} else if (id) {
        req.id = id;
        //await projectServices.checkCreatorProject({ projectId })
				//next();
			} else {
				res.status(401).json({ success: false, statusCode: 401 });
			}
		});
	} catch (error) {
		res
			.status(401)
			.json({ success: false, statusCode: 405, message: "Please Sigin again" });
	}
};




module.exports = {
	passportProject: passportProject,
};
