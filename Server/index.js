const express = require('express');
const cors = require('cors');
const formRoutes = require('./Routes/FormRoute');
require('./config/moongose');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', formRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }else{
        
        console.log(`Server is connected successfully at port ${PORT}`)
    }
})

