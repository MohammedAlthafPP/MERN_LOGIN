const UserModel = require("../Models/UserModel");
const jwt =require('jsonwebtoken')


const maxAge = 3*24*60*60;

const createToken =(id)=>{
    return jwt.sign({id},"secret_key",{
        expiresIn:maxAge,
    })
};

const handleErrors = (err)=>{
    let errors = {name:"",email:"",password:""};

    if(err.message === "Incorrect Email") errors.email ="That email not register"
    if(err.message === "Incorrect Password") errors.email ="That password is incorrect"

    if(err.code===11000) {
        errors.email = "Email is Already registered";
        return errors;
    }
    if(err.message === "User Blocked") errors.email = "You are Blocked"

    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports.register = async (req,res,next)=>{
    try {
        console.log(req.body,"====================register credunc...");
        const {email,password,name} =req.body;
        const user =await UserModel.create({name,email,password})
        const token = createToken(user.id)

        if(email === process.env.ADMIN_EMAIL){
            res.cookie("admin", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });
            res.status(201).json({value:true});
        } else {
            res.cookie("user", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });

            res.status(201).json({ user: user._id, created: true,value:false });
        }

    } catch (err) {
        console.log(err,"===================== register details Error catch");
        const errors =handleErrors(err);
        res.json({errors,created:false})
    }
};


module.exports.login = async (req,res,next)=>{

    try {
       
        const {email,password} =req.body;
        const user =await UserModel.login(email,password)
        

       
        const token = createToken(user.id)

        if(email === process.env.ADMIN_EMAIL){
            res.cookie("admin", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });
            res.status(201).json({value:true});
        } else {
            res.cookie("user", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });

            res.status(201).json({ user: user._id, created: true,value:false });
        }
  

  

    } catch (err) {
        console.log(err,"===================== Login details Error");
        const errors =handleErrors(err);
        res.json({errors,created:false})
    }

};

module.exports.getAllUsers = async (req,res,next)=>{
    try {
        const AllUsers =await UserModel.find({"role": {$ne: "admin"}})
        res.send(AllUsers)
      
        console.log(AllUsers);
    } catch (error) {
        console.log(error,"=======================Get All Users Error");
        
    }
}

module.exports.getUser = async (req,res,next)=>{
    try {
        const id = req.params.id
        const SingleUser = await UserModel.find({_id:id}).lean();
        res.send(SingleUser)
        
    } catch (error) {
        console.log(error,"====================View SingleUser  Error");
        
    }
}

module.exports.deleteUser = async (req,res,next)=>{
    try {

        const id = req.params.id;
        await UserModel.deleteOne({_id:id})
        res.send("User Deleted Successfully")

    } catch (error) {
        console.log(error,"====================User Edit Error");
        
    }
}

module.exports.updateUser = async (req,res,next)=>{
    try {

        const id = req.params.id;
        let updated = await UserModel.updateOne({_id:id},{$set : {
            name:req.body.name,
            email:req.body.email
        }})
        res.send("User Details Updated SuccessFully")

        
    } catch (error) {
        console.log(error,"====================User Edit Error");
        
    }
}


module.exports.blockUser = async (req,res,next)=>{
    try {

        const id = req.params.id;
        let updated = await UserModel.updateOne({_id:id},{$set : {
            isStatus:false,
           
        }})
        res.send("User Blocked")

        
    } catch (error) {
        console.log(error,"====================User Block Error");
        
    }
}


module.exports.unblockUser = async (req,res,next)=>{
    try {

        const id = req.params.id;
        let updated = await UserModel.updateOne({_id:id},{$set : {
            isStatus:true,
           
        }})
        res.send("User UnBlocked")

        
    } catch (error) {
        console.log(error,"====================User UnBlock Error");
        
    }
}


