const mongoose = require("mongoose");
const validator = require("validator");
const Like = require("./Like");
const Comment = require("./Comment");
const postSchema = new mongoose.Schema(
  {
    giphy: {
      type: String,
      minlength: 10,
    },
    title: {
      type: String,
      minlength: 3,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual("commentsCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  count: true,
});
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});
postSchema.virtual("likesCount", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
  count: true,
});
postSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
});

postSchema.statics.asyncForEach = async (array, user_id) => {
  for (let index of array) {
    let isLiked = await Like.find({ post: index._id, user_id });
    index.isLiked = index.likes.some((el) => el.user_id == user_id.toString())
      ? true
      : false;
  }
  return array;
};

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
