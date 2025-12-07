import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Generate JWT

const generateTokan = (res,payload) =>{
    const tokan = jwt.sign(payload,pricess.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("tokan", tokan,{
        httpOnly:true,
        secire:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:24*60*60*1000
    })
    return tokan;
}