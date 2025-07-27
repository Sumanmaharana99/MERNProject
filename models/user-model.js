import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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


//compare password
  userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  }

//Json web token generation
userSchema.methods.generateToken = async function () {
  try {
    return  jwt.sign(
      {
        // Payload for the token
        userId: this._id.toString(),
        isAdmin: this.isAdmin,
        email: this.email,
      },
      process.env.JWT_SECRET_KEY, // Secret key
      {
        expiresIn: "7d", // Token expiry
      }
    );
  } catch (err) {
    console.error("Error generating token:", err);
    return null; // Or throw err if you want to catch it elsewhere
  }
};

const User = mongoose.model("User",userSchema);
export default User;