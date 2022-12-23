const db = require('../../config/db')

const Carts = function(cart){
    this.cart_id = cart.cart_id || 0
    this.user_id = cart.user_id || 0
    this.product_id = cart.product_id || 0
    this.quantity = cart.quantity || 1
    this.to_price = cart.to_price || 0
}

Carts.insertCart = (cart)=>{
     var sql = "insert into carts (product_id, user_id, quantity, to_price) values (?, ?, ?, ?)"
     return db.execute(sql, [cart.product_id, cart.user_id, cart.quantity, cart.to_price])
}

Carts.getCartInfo = (user_id)=>{
     var sql = "select * from carts, products, images where carts.product_id = products.product_id and images.product_id = products.product_id and isdefault = 1 and carts.user_id = ?"
     return db.execute(sql, [user_id])
}

Carts.deleteCartById = (cart_id) =>{
     var sql = "delete from carts where cart_id = ?"
     return db.execute(sql, [cart_id])
}

module.exports = Carts