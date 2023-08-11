const express = require('express')
const router = express.Router()
const userControllers = require('../../controllers/userControllers')

router.get('/',userControllers.get)
router.get('/:id',userControllers.findOne)
router.delete('/:id',userControllers.deleteUser)

module.exports = router