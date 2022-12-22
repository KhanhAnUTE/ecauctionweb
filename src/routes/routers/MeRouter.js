const express = require('express')
const router = express.Router()

const meController = require('../../app/controllers/MeController')

router.get('/info', meController.info)
router.get('/my-shop', meController.myshop)
router.get('/add-shop', meController.addShop)

router.post('/info', meController.saveInfo)
router.post('/get-categories', meController.getCategories)
router.post('/add-shop', meController.postAddShop)

module.exports = router