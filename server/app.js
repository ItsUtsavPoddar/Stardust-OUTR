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
// app.use('/api/auth', require('./routes/public/auth'));
app.use('/api/public/hospitals', require('./routes/public/hospitals'));
app.use('/api/public/doctors', require('./routes/public/doctors'));
//app.use('/api/events', require('./routes/events'));

app.listen(port, ()=>{
    console.log("Server started at port: "+port);
})