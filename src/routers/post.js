const express = require('express')
const Post = require('../models/Post')
const {uploader} = require('../middleware/cloudinary')
const {upload, imagePath} = require('../middleware/multer')
const auth = require('../middleware/auth')
const router = new express.Router()


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
     
router.post("/articles", auth, async (req, res)=>{
    const post = new Post({...req.body, owner: req.employee._id})
    try{
        await post.save()
        res.status(201).send({success: "true", data: post})
    }
    catch(err){

    }
})

        module.exports = router