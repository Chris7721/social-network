const express = require('express')
const Comment = require('../models/Comment')
const auth = require('../middleware/auth')
const router = new express.Router()


//post comment
router.post("/gifs/:id/comment", auth, async (req, res)=>{
    // const comment = {comment: req.body.comment, name: req.employee.name, owner: req.employee._id}
    // const comment = new Comment({comment: req.body.comment, name: req.employee.name, owner: req.employee._id})
    try{
        const comment = new Comment({post: req.params.id, comment: req.body.comment, user: req.employee.name, user_id: req.employee._id})
        await comment.save()
        // console.log(post)
        res.status(201).send({status: "success", data: comment})
    }
    catch(err){
        return res.status(401).send(err)
    }
})

//fetch all comments
router.get("/gifs/:id/comment", async (req, res)=>{
    try{
        const comments = await Comment.find({post: req.params.id},
             null, 
             {
                 limit: 3, 
                 skip: parseInt(req.query.skip),
                 sort: {
                    createdAt: -1
                }})
        res.status(200).send({status: "success", data: comments})
    }
    catch(err){
        return res.status(401).send(err)
    }
})

router.patch("/gifs/:id/comment", auth, async (req, res)=>{
    // const comment = {comment: req.body.comment, name: req.employee.name, owner: req.employee._id}
    // const comment = new Comment({comment: req.body.comment, name: req.employee.name, owner: req.employee._id})
    try{
        const comments = await Comment.find({post: req.params.id})
        // console.log(post)
        res.status(201).send({status: "success", data: comments})
    }
    catch(err){
        return res.status(401).send(err)
    }
})

//delete comment
router.delete('/gifs/:id/comment', auth, async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({_id: req.params.id, user_id: req.employee._id})
        // console.log(task)
        if (!comment) {
            res.status(404).send()
        }
        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router