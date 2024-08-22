
 
const myMongoose = require('mongoose');
 
// Saving my MongoDB URI
const mongoURL = 'mongodb://localhost:27017/demo';
 
const connectToMongo = async () => {
    try {
        await myMongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Error connecting to MongoDB:', e.message);
    }
};
 
module.exports = connectToMongo;