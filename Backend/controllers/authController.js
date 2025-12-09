import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT and set cookie
const generateTokan = (res, payload) => {
    const tokan = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("tokan", tokan, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });
    return tokan;
};


//register user
export const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({message:"please fill all the fields",success:false})
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({message:"User already exists",success:false})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashedPassword});
        return res.json({message:"User Regd succesfully",success:true})
        
    }catch(error){
        console.log(error.message);
        return res.json({message:"Internal Server error",success:false})
    }
}

// login user
export const loginUser = async(req,res) =>{
    try{
        const{email,password} = req.body;
        if(!email || !password){
            return res.json({message:"Please fill all the fields",success:false})
        }

        const user=await User.findOne({email});
        if(!user){
            return res.json({message:"User does not exist",success:false})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({message:"Invalid credntials",success:false}) 
        }

        generateTokan(res,{id:user._id,role:user.isAdmin?"admin":"user"})
        res.json({
            message:"User logged in succesfully",
            success:true,
            user:{
                name:user.name,
                email:user.email
            }

        })

    } catch(error){
        console.log(error.message);
        return res.json({message:"Interal server error",success:false})
        
    }  
}


export const logOutUser = async (req, res) => {
    try {
        // Clear the auth cookie (same options to ensure it is removed)
        res.clearCookie("tokan",)
        return res.json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.error(error.message);
        return res.json({ message: "Failed to logout", success: false });
    }
}