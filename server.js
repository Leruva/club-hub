const express = require('express');
const connectDB = require('./config/dbConnection');
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const app = express();
connectDB();
app.get('/', (req,res)=>{
    res.json('Hello from club-hub api');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
});