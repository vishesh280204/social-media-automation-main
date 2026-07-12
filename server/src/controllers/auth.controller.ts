import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import bcrypt from "bcrypt"

const generateToken=async function(id:string){
    return  jwt.sign({id},process.env.SECRET_TOKEN_CODE!,{expiresIn:"30d"})
} 
//Register User
//POST/api/auth/register
const registerUser=async(req:Request,res:Response):Promise<void>=>{
    try{
        const {email,name,password}=req.body
        const userExists=await User.findOne({email})
        if(userExists){
            res.status(400).json({message:"user already exists"})
        }
        
        const user=await User.create({
            name,
            email,
            password
        })
        const createdUser=await User.findOne({email}).select("-password")
        if(!createdUser){
            res.status(500).json({message:"Invalid user data"})
        }
        else{res
        .status(200)
        .json({
            id:user._id,
            email:user.email,
            name:user.name,
            token:generateToken(user._id.toString())

        })
   
        }
    }
    catch(err:any){
        res.status(500).json({message:err?.message || "Something went wrong while registering user"})
    }
}

//Login User
//POST/api/auth/login
 const loginUser=async function(req:Request,res:Response):Promise<void>{
    try{
        const {email,password}=req.body
        const userExists=await User.findOne({email})
    
        if(userExists && (await bcrypt.compare(password,userExists.password)) ){

            res.status(200).json({message:"user already exists"})
        }else{
            res.status(400).json({message:"Invalid email or password"})
        }
    }catch(err:any){
       res.status(500)
       .json({message:err?.message ||"Something went wrong while logging you in"})
    }
 }
export {registerUser,loginUser}




