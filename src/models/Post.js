const mongoose = require('mongoose')
const validator = require('validator')
const postSchema = new mongoose.Schema( {
                article: {
                    type: String,
                    minlength: 20,
                },
                giphy:{
                    type: String,
                    minlength: 10,
                },
                title:{
                    type: String,
                    minlength: 3,
                },
                owner:{
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Employee'
                }
            }, {timestamps: true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post