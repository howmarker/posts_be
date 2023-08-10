const express = require('express')
const router = express.Router()
const AppError  = require('../errors/AppError')
const userControllers = require('../controllers/userControllers')

router.get('/',userControllers.get)

module.exports = router