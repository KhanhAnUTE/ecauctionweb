

class ShopController{

    //GET /shop
    index(req, res){
        res.render('shop', {
            title: "Cửa hàng",
        })
    }
}

module.exports = new ShopController()