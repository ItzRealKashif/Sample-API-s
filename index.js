const express = require("express");
const { findOne, create } = require("./user.model.js");
const app = express();
const UserModel = require('./user.model.js')
const PORT = 9000 || 1000;
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

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})