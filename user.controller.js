import Users from "../models/user.model.js"
import {email, z} from "zod";
import bcrypt from "bcrypt.js"

const userValidation=z.object({
    email:z.string().email({message:"Invalid email address"}),
    username:z.string().min(3,{message:"Username must be greater than 3 letters"}),
    password:z.string.min(6,{message:"Password must be equal or greater than 6 letters or characters"})
})

export const register=async(req,res)=>{
    try {
        const {email,password,username}=req.body;

        if(!email || !password|| !usernam){
            res.status(400).json({message:"all fields are required"});
        };

      const validationOfUsers=userValidation.safeParse({email,password,username});

      if(!validationOfUsers.success){
        // return res.status(400).json({errors:validationOfUsers.error.errors});
        const validationErrors=validationOfUsers.error.errors.map((err)=>err.message)
        return res.status(400).json({errors:validationErrors});
      }


        const userExists=await Users.findOne({
            $or: [{email},{username}]
        });

        if(userExists){
            return res.status(400).json({ message: "Email or username already exists" });
        }

        const passwordHash=await bcrypt.hash(password,10);


        const newUser=new Users( {email,password:passwordHash,username});
        await newUser.save();

         return res.status(201).json({ 
            message: "User registered successfully", 
            user: { id: newUser._id, username: newUser.username, email: newUser.email } 
        });
        
    } catch (error) {
       console.log(error)
       res.status(500).json({message: "an error occured"}) 
    }
};




export const login=async (req,res)=>{
    const {email,password}=req.body;
   try {
    if(!email || !password){
        res.status(400).json({message:"all fields are required"})
    }

    const userDetails=Users.findOne({email}).select("+password");
    if(!userDetails|| !(await bcrypt.comapre(password,userDetails.password))){        
        res.status(400).json({message:"invalid credinetials"});
    }

    res.status(200).json({message:"user LoggedIn successfully"});

   } catch (error) {
    console.log(error)
    res.status(500).json({message: "an error occured"}) 
   }

};
