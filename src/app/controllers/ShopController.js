const e = require("express")
const Products = require("../models/ProductModel")
const Sites = require("../models/SiteModel")


class ShopController{

    //GET /shop
    index(req, res){
        var filter = {}
        var user = req.session.user
        
        Promise.all([Products.getAllProducts(filter), Sites.getParentCategories(), Sites.getAllCategories()])
            .then(([products, parent_categories, categories])=>{
                var products = products[0]
                var parent_categories = parent_categories[0]
                var categories = categories[0]
                try{
                    for (var i = 0; i < products.length; i++){
                        if (products[i].owner_id == user.user_id)
                            products[i].is_own = true
                        else
                            products[i].is_own = false
                    }
                }
                catch{}

                var categoriesInfo = []
                for (var i = 0; i < parent_categories.length; i++)
                {
                    categoriesInfo.push({})
                    categoriesInfo[i].parent = parent_categories[i].parent_category
                    categoriesInfo[i].children = []
                    for(var j = 0; j < categories.length; j++){
                        if (parent_categories[i].parent_id == categories[j].parent_id){
                            categoriesInfo[i].children.push(categories[j])
                        }
                    }
                }

                res.render('shop', {
                    title: "Cửa hàng",
                    user,
                    products: products,
                    categoriesInfo,
                    shopPage: true,
                })
            })

    }

    //GET /shop/filter
    filter(req, res){
        var user = req.session.user
        var filter = {}
        if (req.query.categoriesId)
            filter.categoriesId = req.query.categoriesId

        Products.getAllProducts(filter)
            .then(([products])=>{
                try{
                    for (var i = 0; i < products.length; i++){
                        if (products[i].owner_id == user.user_id)
                            products[i].is_own = true
                        else
                            products[i].is_own = false
                    }
                }
                catch{}
                res.send(products)
            })
            .catch(err => res.send(err))
    }

    //GET /shop/detail
    detail(req, res){
        var user = req.session.user
        if (!req.query.product_id)
            res.send("Không tìm thấy sản phẩm")
        else{
            var product_id = req.query.product_id
            Promise.all([Products.getProductById(product_id), Sites.getImagesByProductId(product_id)])
                .then(([product, images])=>{
                    var product = product[0][0]
                    var images = images[0]

                    product.images = images
                    if (user.user_id == product.owner_id)
                        product.is_own = true
                    else
                        product.is_own = false
                        
                    res.render('detail', {
                        tittle: "Chi tiết sản phẩm",
                        user: user,
                        detailPage: true,
                        product,
                    })
                })
                .catch(err => res.send(err))
            
        }
    }
}

module.exports = new ShopController()