const express = require('express');
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
require('express-async-errors');

//json
app.use(bodyParser.json())

//dotenv
const PORT =  process.env.PORT

const errorHandle = require('./src/middlewares/handleError')

//routes
app.use('/user',require('./src/routes/users/userRotes.js'))
app.use('/register',require('./src/routes/users/register.js'))

//handle error
app.use(errorHandle)

app.listen(PORT,() => console.log(`Server is running in port ${PORT}`))