import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URI;

const connectDB =async()=>{
    try{
        await mongoose.connect(URI);
        console.log("Database connected successfully");
    }
    catch{
        console.error("Database connection failed");
        process.exit(0);
    }
}
export default connectDB;