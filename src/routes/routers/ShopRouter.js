const express = require("express");
const router = express.Router()

const shopController = require('../../app/controllers/ShopController')

router.get('/', shopController.index)
router.get('/filter', shopController.filter)
router.get('/detail', shopController.detail)

module.exports = router