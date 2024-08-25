const mongoose = require('mongoose');

const URI = process.env.MONGO_URI || 'mongodb+srv://jaideep:Jaideep123@cluster0.wyjvfgg.mongodb.net/demoDatabase?retryWrites=true&w=majority';

mongoose.connect( URI ).then(()=>{
    console.log("Connected to mongodb")
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err.message);
})

module.exports = mongoose;