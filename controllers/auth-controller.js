import express from "express";
import User from "../models/user-model.js"; 
import bcrypt from "bcrypt"; 
//controls the actions

export const home = async (req, res) => {
    try{
        res.status(200).send("Authentication Home Page");
    }
    catch{
        res.status(500).send("Internal Server Error");
        console.log("Error in home controller");
    }
}

export const register = async (req, res) => {
    try {
       
       const {username, email, phone, password} = req.body;
       const userExists = await User.findOne({email:email});
       if(userExists){
        return res.status(400).json({msg:"User already exists with this email"});
       }

       //hash paaword
       const userCreated = await User.create({username, email, phone, password});
       res.status(201).json({msg:"registration successful",  token: await userCreated.generateToken(),userId : userCreated._id.toString()});
       console.log("User registered successfully:", req.body);
    }
    catch(error){
        res.status(500).send("Internal Server Error");
        console.error("Error in register controller",error.message);
    }
}

const login = async(req,res)=>{
try {
    const {email,password} = req.body;
    const userExists = await User.findOne({email:email});
    if(!userExists){
        return res.status(400).json({msg:"Invalid credentials"});
    }

    //const user = await bcrypt.compare(password, userExists.password);
    //creating insatnce function like generate token()
    const user = await userExists.comparePassword(password);
    
    if(user){
        res.status(200).json({msg:"Login successful", token: await userExists.generateToken(), userId: userExists._id.toString()});
    }
    else{
        return res.status(401).json({msg:"Invalid credentials"});
    }

} catch (error) {
    res.status(500).send("Internal Server Error");
    console.error("Error in login controller", error.message);
    
}
}
export default { home, register, login };
