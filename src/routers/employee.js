const express = require('express')
const Employee = require('../models/Employee')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const router = new express.Router()

// create new admin
router.post('/employees/admin', (req, res)=>{
    req.body.status = "admin"
    const employee = new Employee(req.body)
    employee.save().then(async ()=>{
        const token = await employee.generateAuthToken()
        res.status(201).send({employee, token})
    }).catch(err=>{
        res.status(400).send(err)
    })
})

//get current user
router.get("/employee/me", auth, (req, res)=>{
    res.status(200).send(req.employee)
})

//create a user
router.post("/employees", admin, (req, res)=>{
    req.body.status = "user"
    const employee = new Employee(req.body)
    console.log(employee)
    employee.save().then(async ()=>{
        const token = await employee.generateAuthToken();
        res.status(201).send({employee, token})
    }).catch(err=>{
        res.status(400).send(err)
    })
})

//(employee, user) login
router.post('/auth/signin', async (req, res)=>{
    try{
    // console.log(req.body)
       const employee = await Employee.findByCredentials(req.body.email, req.body.password)
    //    console.log("emp", employee)
    const token = await employee.generateAuthToken()
    console.log("the token ", token)
    res.status(200).send({status: "success", data: {
        employee, token
    }}) 
    }
    catch(err){
        res.status(400).send(err)
    }
    
})

router.post("/logout", auth, async (req, res)=>{
    try{
        req.employee.tokens = req.employee.tokens.filter(token=>token.token !== req.token);
        await req.employee.save()
        res.send({status: "success"})
    }
    catch(error){
        res.status(500).send()
    }
})

// cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });
module.exports = router