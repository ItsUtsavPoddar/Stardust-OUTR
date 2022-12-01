const connectToMongo = require('./database');
const express = require('express');
var cors = require('cors');

connectToMongo();

// setting up express server
const app = express();
const port = 9000;

app.use(cors());

// We use this middle ware to read request body params
app.use(express.json());

// Avialable Routes

/// These are the public routes
app.use('/api/public/auth', require('./routes/public/auth'));
app.use('/api/public/hospitals', require('./routes/public/hospitals'));
app.use('/api/public/doctors', require('./routes/public/doctors'));
app.use('/api/public/book', require('./routes/public/booking'));
app.use('/api/public/self', require('./routes/public/self'));

/// These are the hospital routes
app.use('/api/hospital/auth', require('./routes/hospital/auth'));
app.use('/api/hospital/doctors', require('./routes/hospital/doctors'));
app.use('/api/hospital/patient', require('./routes/hospital/patient'));

//app.use('/api/events', require('./routes/events'));

app.listen(port, ()=>{
    console.log("Server started at port: "+port);
})