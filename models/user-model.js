import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    phone : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    isAdmin: {type:Boolean,default:false}
});

userSchema.pre("save", async function(next){
    const user = this;
    console.log("Before saving user:", user);

    if(!user.isModified("password")){
        next();
    }
    try{
     // Hash the password before saving
       const saltRound = await bcrypt.genSalt(10) ;
       const hash_password = await bcrypt.hash(user.password, saltRound);
       user.password = hash_password;
    }catch(error){
      console.error("Error hashing password:", error);
      next(error);
    }
})



const User = mongoose.model("User",userSchema);
export default User;