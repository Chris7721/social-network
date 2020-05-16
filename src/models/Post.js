const mongoose = require('mongoose')
const validator = require('validator')
const likesSchema = require('./Like')
const Comment = require('./Comment')
const postSchema = new mongoose.Schema( {
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
            }, {timestamps: true, toJSON: { virtuals: true }})

            postSchema.virtual('commentsCount', {
                ref: 'Comment',
                localField: '_id',
                foreignField: 'post',
                count: true
            })
            postSchema.virtual('comments', {
                ref: 'Comment',
                localField: '_id',
                foreignField: 'post',
            })
            postSchema.virtual('likesCount', {
                ref: 'Like',
                localField: '_id',
                foreignField: 'post',
                count: true
            })
            postSchema.virtual('likes', {
                ref: 'Like',
                localField: '_id',
                foreignField: 'post'
            })
            // employeeSchema.virtual('posts', {
            //     ref: 'Post',
            //     localField: '_id',
            //     foreignField: 'owner'
            // })

const Post = mongoose.model('Post', postSchema)
module.exports = Post