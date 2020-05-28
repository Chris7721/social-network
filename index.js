// require('dotenv').config();
require('dotenv-flow').config();
const app = require('./app')


const port = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log("Connection made on port: "+port)
})
