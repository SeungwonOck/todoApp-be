const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index')
require('dotenv').config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(cors());
app.use(bodyParser.json());// req.body를 객체로 인식해줌
app.use('/api', indexRouter)

const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI, { useNewUrlParser: true})
    .then(() => {
    console.log('Connected to mongoDB');
    })
    .catch((err) => {
        console.log("DB Connection failed: " + err)
    })

app.listen(process.env.PORT || 5000, () => {
    console.log('Server on 5000')
})
