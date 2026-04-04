const express = require('express');
const connectDB = require('./config/dbConnection');
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const app = express();
connectDB();

app.use(express.json());

app.use('/api/auth', require('./modules/auth/auth_router'));
app.use('/api/admin', require('./modules/admin/admin_routes'));
app.use('/api/events', require('./modules/events/event_routes'));
app.use('/api/announcements', require('./modules/announcements/announcements_routes'));
app.get('/', (req,res)=>{
    res.json('Hello from club-hub api');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
});
