// require('dotenv').config();
require("dotenv-flow").config();
const cors = require("cors");
require("./src/db/mongoose");
var bodyParser = require("body-parser");
const employeeRouter = require("./src/routers/employee");
const PostRouter = require("./src/routers/post");
const CommentRouter = require("./src/routers/comment");
const LikeRouter = require("./src/routers/like");
const express = require("express");
const { cloudinaryConfig } = require("./src/middleware/cloudinary");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*", cloudinaryConfig);
app.use(employeeRouter);
app.use(PostRouter);
app.use(CommentRouter);
app.use(LikeRouter);

module.exports = app;
