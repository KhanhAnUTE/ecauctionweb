const express = require('express')
const router = express.Router()

const loginController = require('../../app/controllers/AuthController')

router.get('/login', loginController.index)
router.get('/logout', loginController.logout)
router.get('/signup', loginController.signup)

router.post('/login', loginController.login)
router.post('/signup', loginController.register)



module.exports = router

