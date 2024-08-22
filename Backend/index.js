const myConnectionToDB = require('./db')
myConnectionToDB()
 
const express = require('express')
 
const cors = require('cors')
 
const app = express()
 
app.use(cors())
 

app.use(express.json())
// app.use('/user', require("./register-user"))

// app.use('/user', require('./all-user'))//displaying all user
app.use('/user/register-user', require("./register-user"))
 
app.listen(5000);