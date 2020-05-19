const express = require('express')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const {uploader} = require('../middleware/cloudinary')
const {upload, imagePath} = require('../middleware/multer')
const auth = require('../middleware/auth')
const router = new express.Router()
const mongoose = require('mongoose')


//upload gif
router.post("/gifs", auth, upload, async (req, res)=>{
    // console.log(req.file)
    if(req.file){
     const file = imagePath(req).content;  
     try{
        const gif = await uploader.upload(file)
        const giphy = gif.url;
        const post = new Post({giphy, title: req.body.title, owner: req.employee._id})
        try {
            await post.save()
            await post.populate('owner').populate('commentsCount').populate('comments').populate('likesCount').populate('likes').execPopulate()
            res.status(201).send({success: "true", data: post})
        } catch (err) {
            res.status(400).send(err)
        }
     }
     catch(err){
        res.status(400).send(err)
     }
    }
    else{
        res.status(400).send({err: "Please select a file"})
    }
})

//update gif
router.patch("/gifs/:id", auth, upload, async (req, res)=>{
    const updates = Object.keys(req.body)
    // console.log(req.employee)
    try{
       const post = await Post.findOne({_id: req.params.id, owner: req.employee._id})
       console.log(post)
    if(!post){
        return res.ststus(401).send({status: "error",error: "post not found"})
    }
    if(req.file){
        const file = imagePath(req).content;  
        try{
           const gif = await uploader.upload(file)
           const giphy = gif.url;
           post.giphy = giphy;
           
        }
        catch(err){
          return res.status(400).send(err)
        }
       }
    updates.forEach(update =>{
        post[update] = req.body[update]
    })
    await post.save()
    res.status(200).send({status: "success", data: post})
    }
    catch(err){
        return res.status(401).send(err)
    }
    
})


// get a gif
router.get("/gifs/:id", async (req, res)=>{
    try{
       const post = await Post.findOne({_id: req.params.id}).populate('owner').populate({
        path:'comments',
        options: {
            limit: 3,
            sort: {
                createdAt: -1
            }
        }
     }).populate('commentsCount')
     .populate({
        path:'likes',
        options: {
            limit: 3,
        }
     }).populate('likesCount')
     .exec()
       if(!post){
        return res.status(401).send({success: "false", message: "post doesn't exist anymore"})
       }
        res.send(post) 
    }
    catch(err){
        res.status(401).send({success: "false", message: err})
    }
    
})
// let fetch = false
//get all gifs
router.get("/feed", auth, async (req, res)=>{
    try{
       const post = await Post.find().sort({ createdAt: req.query.limit == 15 ? 1 : -1 }).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip)).populate('owner').populate({
           path:'comments',
           options: {
               limit: 3,
               sort: {
                   createdAt: -1
               }
           }
        }).populate('commentsCount')
        .populate({
            path:'likes',
            options: {
                limit: 6,
                sort: {
                    createdAt: -1
                }
            }
        }).populate('likesCount')
        .exec()
       if(!post){
        return res.status(401).send({success: "false", message: "post doesn't exist anymore"})
       }
        res.send({...post}) 
    }
    catch(err){
        res.status(401).send({success: "false", message: err})
    }
    
})

        module.exports = router