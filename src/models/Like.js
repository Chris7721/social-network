const mongoose = require('mongoose')
const validator = require('validator')
const likeSchema = new mongoose.Schema( {
                    user:{
                        type: String,
                        minlength: 3,
                    },
                    user_id:{
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,  
                        unique: true
                    },
                    post:{
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Post'
                    },
            }, {timestamps: true})

const Like = mongoose.model('Like', likeSchema)
module.exports = Like