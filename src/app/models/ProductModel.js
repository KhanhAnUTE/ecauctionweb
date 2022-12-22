const db = require('../../config/db')

const Products = function(product){
     this.product_id = product.product_id || 0
     this.category_id = product.category_id || 0
     this.owner_id = product.owner_id || 0
     this.product = product.product || ''
     this.price = product.price || 0
     this.qty_in_stock = product.qty_in_stock || 1
     this.description = product.description || product.product
     this.slug = ' '
     this.createAt = product.createAt || new Date().toJSON().slice(0, 10).toString()
     this.finishAt = product.finishAt || new Date().toJSON().slice(0, 10).toString()
     this.is_expired = product.is_expired || 0

     this.generateSlug = function(){
          this.slug = this.product.toLowerCase().replace(' ', '-') + this.product_id
     }
}

Products.insert = (product) =>{
     var sql = "insert into products(category_id, owner_id, product, price, qty_in_stock, description, slug, finishAt, is_expired) values (?, ?, ?, ?, ?, ?, ?, ?, ?)"
     return db.execute(sql, [product.category_id, product.owner_id, product.product, product.price, product.qty_in_stock, product.description, product.slug, product.finishAt, product.is_expired])
}

Products.getShopProducts = (user_id)=>{
     var sql = "select * from products, images where products.product_id = images.product_id and owner_id = ? and images.isdefault = 1"
     return db.execute(sql, [user_id])
}

module.exports = Products