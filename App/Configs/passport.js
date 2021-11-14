const jwt = require("jsonwebtoken");


const passport = (req,res,next) =>
{
  
    const authorizationHeader = req.headers['accesstoken']
 
    console.log(authorizationHeader)
    //"Bearer [token]"
    const token = authorizationHeader.split(' ')[1]
     if (!token)
     {
         res.status(401).json({ success: false,statusCode: 401});
         //res.sendStatus(401);
     }
     jwt.verify(token, 'secret', (err, data) =>
     {
         //console.log(err, data)
         const {name} = data
         
         if (err)
         {
            res.status(401).json({ success: false,statusCode: 401});
         }
         else if (name)
         {
             next()
         }
         else
         {
            res.status(401).json({ success: false,statusCode: 401});
         }
     })
}

module.exports = {
    passport: passport
}