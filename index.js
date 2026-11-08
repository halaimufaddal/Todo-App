import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import todoRoute from "../Backend/Routes/todo.route.js"



dotenv.config();

const app=express();
const port=process.env.PORT;
const DB_URI=process.env.MONGODB_URI;



// Connecting to MongoDB using an async wrapper
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB Connected successfully");
    } catch (err) {
        console.log("MongoDB Connection Error:", err);
    }
};
connectDB();

// Routes 
app.use(express.json());
app.use("/todo",todoRoute);


// app.get("/" ,(req,res)=> {
//     res.send("hello world")
// })

app.listen(port,()=>{
    console.log(`App is running on ${port}`)
});