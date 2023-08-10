const express = require('express');
const app = express()
require('dotenv').config()
require('express-async-errors');

//dotenv
const PORT =  process.env.PORT

const errorHandle = require('./src/middlewares/handleError')

//routes
app.use('/user',require('./src/routes/userRotes'))

//handle error
app.use(errorHandle)

app.listen(PORT,() => console.log(`Server is running in port ${PORT}`))