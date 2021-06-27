import postMessage from "../models/postMessage.js"
import mongoose from 'mongoose'
import express from "express"

const router=express.Router()


export const getPosts= async (req,res)=>{
    try {
        const postMessages=await postMessage.find()// find get all the data which is under database
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}

export const createPost= async (req,res)=>{
    const post =req.body

    const newPost=new postMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
    
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}


export const deletePost=async(req,res)=>{
    const {id}=req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await postMessage.findByIdAndRemove(id)

    res.json({message:'Post deleted successfully'})
}

export const likePost=async(req,res)=>{
    const {id}=req.params

    if(!req.userId){
        return res.json({message:'unauthorized'})  
    } 


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post=await postMessage.findById(id)

    const index= post.likes.findIndex((id)=> id === String(req.userId))

    // index= -1  when there is no user found in indexing
    if(index===-1){
        //like the post
        post.likes.push(req.userId)
    }else{
        //dislike the post
        post.likes=post.likes.filter((id)=> id !== String(req.userId)) //return arrays of all the like or all liked 
    }

    const updatedPost=await postMessage.findByIdAndUpdate(id,post,{new:true})

    res.json(updatedPost)
}

export default router