const mongoose = require('mongoose');

const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/demoDatabase';

mongoose.connect( URI ).then(()=>{
    console.log("Connected to mongodb")
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err.message);
})

module.exports = mongoose;