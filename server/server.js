import express  from "express"
import BodyParser from "body-parser"
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import  postRoutes  from "./routes/posts.js"
import  userRoutes  from "./routes/users.js"

const app=express()
dotenv.config()

app.use(BodyParser.json({limit:"30mb",extended: true}))
app.use(BodyParser.urlencoded({limit:'30mb',extended:'true'}))
app.use(cors())

app.use('/posts',postRoutes)
app.use('/user',userRoutes)

app.use('/',(req,res)=>{
    res.send('Welcome to Project-X')
})


const PORT=process.env.PORT || 4000


mongoose.connect(process.env.Connection_url,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`server running on:${PORT}`)))
    .catch((err)=>console.log(err))


mongoose.set('useFindAndModify',false)