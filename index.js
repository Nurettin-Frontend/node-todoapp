const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.port || 5000
const app = express()
const routesTasks = require('./routes/tasks')


require('dotenv').config()
app.use(express.json())
app.use(cors())

app.use(routesTasks)


mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Mongoose connected...'))
    .catch((err) => console.log(err))

app.listen(PORT, () => console.log(`listening on: ${PORT}`))