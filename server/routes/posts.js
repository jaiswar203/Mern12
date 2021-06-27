import express from 'express'
import { getPosts,createPost,updatePost,deletePost,likePost } from '../controller/posts.js'
import auth from '../middleware/auth.js'

const router=express.Router()

router.get('/',getPosts)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)// to update use patch
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)


export default router