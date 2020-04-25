require('dotenv').config();
require('./src/db/mongoose')
const employeeRouter = require('./src/routers/employee')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(employeeRouter)

app.listen(port, ()=>{
    console.log("Connection made on port: "+port)
})
