const express = require('express')
const router = express.Router()

const meController = require('../../app/controllers/MeController')

router.get('/info', meController.info)
router.get('/my-shop', meController.myshop)
router.get('/add-shop', meController.addShop)
router.get('/edit-shop', meController.editShop)
router.get('/delete-shop', meController.deleteShop)

router.post('/info', meController.saveInfo)
router.post('/get-categories', meController.getCategories)
router.post('/add-shop', meController.postAddShop)
router.post('/edit-shop', meController.postEditShop)

module.exports = router