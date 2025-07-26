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

       
       const userCreated = await User.create({username, email, phone, password});
       res.status(200).json({msg:userCreated});
       console.log("User registered successfully:", req.body);
    }
    catch(error){
        res.status(500).send("Internal Server Error");
        console.error("Error in register controller",error.message);
    }
}
export default { home, register };
