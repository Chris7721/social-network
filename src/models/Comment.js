const mongoose = require('mongoose')
const validator = require('validator')
const commentSchema = new mongoose.Schema( {
                    comment: {
                        type: String,
                        required: true,
                        minlength: 1
                    },
                    user:{
                        type: String,
                        minlength: 3,
                    },
                    user_id:{
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,  
                    },
                    post:{
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Post'
                    },
            }, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment