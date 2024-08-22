const myExpress = require('express')
const myRouter = myExpress.Router()
const myUser = require('./UserSchema') //one folder back from "this" file
 
const { body, validationResult } = require("express-validator")
const myBcrypt = require("bcrypt")
 

myRouter.post('/check-email', async (req, res) => {
    try {
        let existUser = await myUser.findOne({ email: req.body.email });
        if (existUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(200).json({ message: "Email is available" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Some error occurred" });
    }
});

//sub-route is /register-user/
myRouter.post('/', [
    body("email", "email is not valide").isEmail(),
    body("password", "Password cannot be null").exists(),
    body("fname", "Please write your name").exists(),
    body("lname", "Please write your name").exists()
],
    async (req, res) => {
        let mySuccess = false
        const myError = validationResult(req) //getting error by validationResult over "req"
        if (!myError.isEmpty()) {//if error exists
            //error status along with errors in array format
            //sending bad request (code: 400) with some JSON
            return res.status(400).json({ errorExistAsBelow: myError.array(), success: mySuccess })
        }
        try {
            let myemail = req.body.email
            //console.log("myemail: ", myemail)
 
            //lets check already registered email
            //if email is already registered, then
            //skip to save other data
            let existUser = await myUser.findOne({ email: req.body.email })
            if (existUser) {
                //sending bad request (code: 400) with some JSON
                return res.status(400).json({ success: mySuccess, errorExistAsBelow: "Sorry, this email already exists" })
            }
 
            let mylname = req.body.lname
            let myfname = req.body.fname
 
            let mypassword = req.body.password
            //encryption using salt of bcrypt
            const mySalt = await myBcrypt.genSalt(10) //Salt value for 10 characters
            let securePassword = await myBcrypt.hash(mypassword, mySalt)
            mypassword = securePassword
 
            let savingData = {
                email: myemail,
                lname: mylname,
                fname: myfname,
                password: mypassword,
            }
 
            //using promises
            let myNewUser = await myUser.create(savingData)
 
            //let myData = myUser(savingData)
            //myData.save()
 
            mySuccess = true
 
            //create data for response
            let resData = {
                message: "Data has been inserted successfully",
                insertedData: savingData,
                success: mySuccess,
                newUserFromData: myNewUser
            }
            res.json(resData)
        } catch (myError) {
            console.log(myError.message)
            res.status(500).send({ success: mySuccess, message: "some error occured" })
        }
 
    })
 
//exporting so that it can access from other files
module.exports = myRouter