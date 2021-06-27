import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/users.js'

export const signin=async(req,res)=>{
    const {email,password}=req.body

    try {
        const existingUser=await User.findOne({email})

        if(!existingUser) return res.status(401).json({message:"User Doesn't Exist."})

        const isPassword=await bcrypt.compare(password, existingUser.password) // comparing password of entered and another which is available in database

        if(!isPassword) return res.status(400).json({message:'Password is not correct'})

        const token=jwt.sign({email:existingUser.email, id:existingUser._id},'test',{expiresIn:'1h'}) // parameter({email and id},jwt_secrect,Additional_info)

        res.status(200).json({result: existingUser,token}) // sending token and login data
    } catch (error) {
        res.status(500).json({message:'Something Went Wrong'})
    }
}

export const signup=async(req,res)=>{
    const {email,password,lastName,firstName,confirmPassword}=req.body
    
    try {
        const existingUser=await User.findOne({email})

        if(existingUser) return res.status(400).json({message:'User Already Exists'})

        if(password!==confirmPassword) return res.status(400).json({message:"Password doesn't match"})

        const hashedPassword=await bcrypt.hash(password, 12)

        const result=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})

        const token=jwt.sign({email:result.email, id:result._id},'test',{expiresIn:'1h'}) // parameter({email and id},jwt_secrect,Additional_info)

        res.status(200).json({result,token})

    } catch (error) {
        res.status(500).json({message:'Something Went Wrong'})
    }
}

