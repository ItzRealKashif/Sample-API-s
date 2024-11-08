require("dotenv").config();
const express = require("express");
const { findOne, create } = require("./user.model.js");
const app = express();
const UserModel = require('./user.model.js')
const PORT = process.env.PORT;
require('./db.connection.js')

app.use(express.json())

app.post('/create-account', async (req, res) => {
    try {
        const body = req.body;
        if (!body.email) {
            res.status(404).json({message: "Please enter your email"})
        }
        const exisitingEmail = await UserModel.findOne({email: body.email})
        if(exisitingEmail) {
            res.status(404).json({message: "Email Already exists"})
        }
        console.log("email is coming in==========>", exisitingEmail)
       const User = await UserModel.create(body);
       res.status(200).json({success: true, message: `User created successfully ${User}`})
    } catch (error) {
        res.status(500).json({success: false, message: `Ran out of an error ${error}`})
    }
})

app.get('/get-user/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({success: false, message: "Please provide the id"})
        }
        const findUser = await UserModel.findById(userId);
        if(!findUser) {
            res.status(404).json({success: false, message: "user not found"})
        }
        res.status(200).json({success: true, message: "User detected successfully", findUser})
    } catch (error) {
        console.log(`GOT AN ERROR WHILE FINDING THE USER ${error}`)
    }
})



app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})