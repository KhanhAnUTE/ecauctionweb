

class ShopController{

    //GET /shop
    index(req, res){
        var user = req.session.user
        res.render('shop', {
            title: "Cửa hàng",
            user,
        })
    }
}

module.exports = new ShopController()