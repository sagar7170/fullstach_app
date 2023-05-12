const User = require("./User");
const jwt = require('jsonwebtoken');

const authentication =  async (req,res,next)=>{

    try{
         const token = req.cookies.jwtoken;
         const verifyToken  = jwt.verify(token,'2d02da89583ba0b5b331e48833bc019fc85c0c2458f490c5bd61bf2c6b8b60b56dbc7eed9cf488e53d58227837afe2797c287eb30c16006ebc85ecc6b44dff47'
         );
         const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token})
         if(!rootUser){ throw new Error('user not found')}
         req.token = token;
         req.rootUser = rootUser;
         req.userID = rootUser._id;
         next();
    }  
    catch(err){
        res.status(401).send("no token provided");
       console.log(err);
    }
}

module.exports = authentication;