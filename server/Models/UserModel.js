const mongoose = require ("mongoose");
const bcrypt =require('bcrypt')

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
     
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true
    },

    password:{
        type:String,
        required:[true,"Enter A valid Password"]
    },
    role:{
        type:String,
        enum:["user", "admin"], 
        default:"user"
    },
    isStatus:{
        type:Boolean,
        default:true
    },
    joindOn :{
        type:Date,
        default:Date.now
    }

})

userSchema.pre("save",async function (next) {
    const salt =await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    if (this.email === process.env.ADMIN_EMAIL)
    {
        this.role = "admin"
    }
    next()
});

userSchema.statics.login = async function(email,password){
 const user = await this.findOne({email});
    if(user) {

        if(user.isStatus){

       

        const auth =await bcrypt.compare(password,user.password)
        if(auth) {
            return user;
        }
        throw Error("Incorrect Password")
    }else {
        throw Error("User Blocked")
    }
    
    }
    throw Error("Incorrect Email")
}

        



module.exports = mongoose.model("User",userSchema);