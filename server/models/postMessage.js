import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:String,
    message:String,
    name: String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[],
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

var postMessage=mongoose.model('Postmessage',postSchema)

export default postMessage