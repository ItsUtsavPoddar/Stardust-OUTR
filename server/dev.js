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
app.use('/api/dev/doctor', require('./routes/dev/doctor'));
app.use('/api/dev/hospital', require('./routes/dev/hospital'));
app.use('/api/dev/medicine', require('./routes/dev/medicine'));
app.use('/api/dev/medicinecenter', require('./routes/dev/medicinecenter'));
app.use('/api/dev/shift', require('./routes/dev/shift'));

app.listen(port, ()=>{
    console.log("Server started at port: "+port);
})