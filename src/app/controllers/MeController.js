const Users = require('../models/UserModel')
const Sites = require('../models/SiteModel')
const Products = require('../models/ProductModel')

class MeController{

    //GET /me/info
    info(req, res){
        if (!req.session.user) 
            res.redirect('../auth/login')
        else{
            Users.getUserById(req.session.user.user_id)
                .then(([[userResult]]) => {
                    res.render('me', {
                        title: "Thông tin cá nhân",
                        me: userResult,
                        info: true,
                        user: req.session.user,
                        mePage: true,
                        genderEncoded: encodeURIComponent(JSON.stringify({gender: userResult.gender}))
                    })
                })
                .catch(err => res.send(err))
        }
    }
    //POST /me/info
    saveInfo(req, res){
        if (!req.session.user){
            res.redirect('../auth/login')
        }
        else{
            var user = new Users(req.body)
            user.user_id = req.session.user.user_id
            
            if (!user.phone_number)
                res.send({
                    message: "Vui lòng nhập Số điện thoại",
                    status: false,
                })
            else if (!user.name)
                res.send({
                    message: "Vui lòng nhập tên bạn",
                    status: false,
                })
            else{
                Users.saveUser(user)
                    .then(result => {
                        res.send({
                            message: "Cập nhật thành công!",
                            status: true,
                        })
                        return
                    })
                    .catch(err =>{
                        console.log(err)
                        res.send({
                            message: "Có lỗi đã xảy ra, Vui lòng thử lại sau",
                            status: false,
                        })
                    })
            }
        }
    }

    //GET /me/my-shop
    myshop(req, res){
        if (!req.session.user)
            res.redirect('../auth/login')
        else{
            var user_id = req.session.user.user_id
            Promise.all([Products.getShopProducts(user_id), Users.getUserById(user_id)])
                .then(([products , me])=>{
                    res.render('me', {
                        title: "Cửa hàng của tôi",
                        myshop: true,
                        products: products[0],
                        me: me[0][0],
                        user: req.session.user,
                        mePage: true,
                    })
                })
        }
    }

    //GET /me/add-shop
    addShop(req, res){
        if (!req.session.user) 
            res.redirect('../auth/login')
        else{
            Sites.getParentCategories()
                .then(([parent_categories]) => {

                    res.render('me', {
                        title: "Đăng sản phẩm",
                        addShop: true,
                        parent_categories,
                        user: req.session.user,
                        mePage: true,
                    })
                })
                .catch(err => res.send(err))
        }
    }

    //POST /me/add-shop
    postAddShop(req, res){
        var product = new Products(req.body)
        if (!req.session.user)
            res.redirect('../auth/login')
        else{
            product.owner_id = req.session.user.user_id
            
            Products.insert(product)
            .then(([result]) =>{
                Sites.uploadImages(req.body["link[]"], req.body.imagesCount, result.insertId)
                .then((flag)=>{
                    res.redirect('./my-shop')
                })
            })
            .catch(err => res.send(err))
        }
    }
    
    //POST me/get-categories
    getCategories(req, res){
        var parent_id = req.body.parent_id
        if (!parent_id)
            res.send(null)
        else
            Sites.getCategoriesByParent(parent_id)
                .then(([categories])=>{
                    res.send(categories)
                })
                .catch(err => res.status(400).send(err))
    }

    //GET me/edit-shop
    editShop(req, res){
        if (!req.session.user)
            res.redirect('../auth/login')
        else{
            var user_id = req.session.user.user_id
            var product_id = req.query.product_id
            if (!product_id)
                res.send("Có lỗi xảy ra")
            else{
                // res.send("Thanh cong")
                Promise.all([Users.getUserById(user_id), Products.getProductById(product_id), Sites.getParentCategories(), Sites.getImagesByProductId(product_id), Sites.getParentCategoriesByProduct(product_id)])
                    .then(([me, product, parent_categories, images, parent_id])=>{
                        res.render("me", {
                            title: "Thông tin sản phẩm",
                            editShop: true,
                            mePage: true,
                            user: req.session.user,
                            me: me[0][0],
                            product: product[0][0],
                            parent_categories: parent_categories[0],
                            images: images[0],
                            imgs: [0, 1, 2, 3, 4],
                            imagesCount: images[0].length,
                            parent_id: encodeURIComponent(JSON.stringify(parent_id[0][0])),
                        })
                    })
            }

        }
    }

    //GET me/delete-shop
    deleteShop(req, res){
        if (!req.session.user)
        res.redirect('../auth/login')
        else{
            var product_id = req.query.product_id
            var user_id = req.session.user.user_id

            if (!product_id)
            res.redirect('back')
            else{
                Promise.all([Sites.deleteImagesByProductId(product_id), Products.deteleShopProduct(user_id, product_id)])
                    .then(([result])=>{
                        res.redirect("back")
                    })
                    .catch(err => res.send(err))
            }
        }
    }
}

module.exports = new MeController()