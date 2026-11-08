import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:string,
            required:true,
            unique:true
        },
        password:{
            type:sting,
            required:true,
        },
        email:{
            type:string,
            required:true,
            unique:true,
            select:false
        }
    },
    {timestamps:true}
)

const Users=mongoose.model("Users",userSchema)

export default Users