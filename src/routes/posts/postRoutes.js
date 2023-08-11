const express = require('express')
const router = express.Router()
const postController = require('../../controllers/posts/postController')
const verifyJWT = require('../../middlewares/verifyJWT')

router.get('/',postController.getAll)

//verify jwt
router.use(verifyJWT)
router.post('/',postController.create)

module.exports = router