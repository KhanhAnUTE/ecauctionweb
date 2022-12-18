const express = require('express')
const router = express.Router()

const meController = require('../../app/controllers/MeController')

router.get('/info', meController.info)
router.get('/my-shop', meController.myshop)

router.post('/info', meController.saveInfo)


module.exports = router