const mongoose = require('mongoose')
const validator = require('validator')
const postSchema = new mongoose.Schema( {
                article: {
                    type: String,
                },
                giphy:{
                    type: Buffer
                },
                owner:{
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Employee'
                }
            }, {timestamps: true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post