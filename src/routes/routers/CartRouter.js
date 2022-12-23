const express = require("express");
const router = express.Router()

const cartController = require('../../app/controllers/CartController')

router.get('/cart-info', cartController.cartInfo)
router.get('/add-cart', cartController.addCart)
router.get('/delete-cart', cartController.deleteCart)

module.exports = router