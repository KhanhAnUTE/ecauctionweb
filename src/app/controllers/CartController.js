const Carts = require('../models/CartModel')
const Products = require('../models/ProductModel')

class ShopController{
     //GET cart/cart-info
     cartInfo(req, res){
          if (!req.session.user)
               res.redirect('../auth/login')
          else{
               var user = req.session.user
               Carts.getCartInfo(user.user_id)
                    .then(([carts]) => {
                         // res.send(cart)
                         res.render('cart', {
                              tittle: "Giỏ hàng",
                              user,
                              carts,
                         })
                    })
                    .catch(err => res.send(err))


          }
     }

     //GET cart/add-cart
     addCart(req, res){
          if (!req.session.user)
               res.redirect('../auth/login')
          else if (!req.query.product_id)
               res.send("Error")
          else{
               var product_id = req.query.product_id
               var user_id = req.session.user.user_id
               var cart = new Carts({user_id, product_id})

               Carts.insertCart(cart)
                    .then((result)=>{
                         res.redirect('./cart-info')
                    })
                    .catch(err => res.send(err))
          }
     }

     //GET cart/delete-cart
     deleteCart(req, res){
          if (!req.query.cart_id)
               res.send('error')
          else{
               var cart_id = req.query.cart_id
               Carts.deleteCartById(cart_id)
                    .then(([result])=>{
                         res.redirect('back')
                    })
                    .catch(err => res.send(err))
               
          }
     }
}

module.exports = new ShopController()