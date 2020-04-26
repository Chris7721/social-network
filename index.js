require('dotenv').config();
require('./src/db/mongoose')
const employeeRouter = require('./src/routers/employee')
const PostRouter = require('./src/routers/post')
const express = require('express')
const {cloudinaryConfig} = require('./src/middleware/cloudinary')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use('*', cloudinaryConfig)
app.use(employeeRouter)
app.use(PostRouter)


app.listen(port, ()=>{
    console.log("Connection made on port: "+port)
})
