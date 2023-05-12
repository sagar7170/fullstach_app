const User = require("./User");
const jwt = require('jsonwebtoken');

const authentication =  async (req,res,next)=>{

    try{
         const token = req.cookies.jwtoken;
         const verifyToken  = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
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