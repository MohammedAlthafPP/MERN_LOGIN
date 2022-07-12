const user =require("../Models/UserModel")
const jwt =require("jsonwebtoken")


modeule.exoress.checkuser= (req,res,next)=> {
    const token =req.cookies.jwt;
    if(token){
        jwt.verify(token,"secret_key",async (err,decodedToken)=>{
            if(err){
                res.json({status:false}) 
                next()
            }else{
                 const user =await User.findByid(decodedToken.id)
                 if(user) res.json({status :true,user:user.email})
                 else res.json({status:false})
                 next()

                 
            }
        })
    }else {
        res.json({status:false})
        next()
    }
}