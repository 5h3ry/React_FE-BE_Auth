const UserMongoose = require('mongoose')

const { Schema } = UserMongoose; 
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },

})
//exporting so that it can be used in another file
//1st parameter is for name-of-collection in database. DONT USE CAPITAL LETTER IN THE NAME
//3rd parameter is same as 1st parameter so that name of collection is same as in 1st parameter.
 
module.exports = UserMongoose.model('demoCollection', UserSchema, 'demoCollection')
