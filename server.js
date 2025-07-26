import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router/auth-router.js';
const app = express();
import connectDB from './utils/db.js';
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/auth", router);

const PORT =5000;
connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
})
