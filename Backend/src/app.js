const express = require('express');
const morgan = require('morgan'); 
const router = require('./routes/routes'); 
const cors = require('cors'); 

const app = express();


app.use(morgan('dev')); 
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173']
}));

app.use('/', router);

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('error');
});


module.exports = app;
