const jwt =require('jsonwebtoken')

const JWT_KEY="secret_key"
module.exports={
    verifyToken:(req,res,next)=>{
        token  = req.headers.authorization
         console.log(token)
        if(!token){
            res.status(401).send({message:"Unauthorized Access"})
        }
        jwt.verify(token,JWT_KEY,(err,decoded)=>{
            if(err){
                res.status(401).send({message:"Unauthorized Access"})
            }
            req.user = decoded;
            next();
        })
    }
}