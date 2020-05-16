const express = require('express')
const Like = require('../models/Like')
const auth = require('../middleware/auth')
const router = new express.Router()

//like post
router.post("/gifs/:id/like", auth, async (req, res)=>{
    // const comment = {comment: req.body.comment, name: req.employee.name, owner: req.employee._id}
    // const comment = new Comment({comment: req.body.comment, name: req.employee.name, owner: req.employee._id})
    try{
        const like = new Like({post: req.params.id, user: req.employee.name, user_id: req.employee._id})
        await like.save()
        // console.log(post)
        res.status(201).send({status: "success", data: like})
    }
    catch(err){
        return res.status(401).send(err)
    }
})

router.delete('/gifs/:id/like', auth, async (req, res) => {
    try {
        const like = await Like.findOneAndDelete({post: req.params.id, user_id: req.employee._id})
        // console.log(task)
        if (!like) {
            res.status(404).send()
        }
        res.send(like)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router