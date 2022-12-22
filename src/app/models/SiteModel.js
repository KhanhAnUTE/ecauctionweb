const db = require('../../config/db')

const Sites = function(){}

//categories
Sites.getParentCategories = () =>{
     var sql = "select * from parent_categories"
     return db.execute(sql)
}
Sites.getParentCategoriesByProduct = (product_id) =>{
     var sql = "select parent_categories.parent_id, categories.category_id from parent_categories, categories, products where parent_categories.parent_id = categories.parent_id and products.category_id = categories.category_id and product_id = ?"
     return db.execute(sql, [product_id])
}

Sites.getCategoriesByParent = (parent_id) =>{
     var sql = "select * from categories where parent_id = ?"
     return db.execute(sql, [parent_id])
}

//Images
Sites.getImagesByProductId = (product_id) => {
     var sql = "select * from images where product_id = ?"
     return db.execute(sql, [product_id])
}
Sites.deleteImagesByProductId = (product_id) =>{
     var sql = "delete from images where product_id = ?"
     return db.execute(sql, [product_id])
}

Sites.uploadImages = (images, countImages, product_id) =>{
     var sql = ""
     var varibles = []
     if (countImages == 1){
          sql = "insert into images (product_id, link, isdefault) values (?, ?, ?) "
          varibles = [product_id, images, true]
     }
     else{
          sql = "insert into images (product_id, link, isdefault) values "
          for (var i = 0; i < countImages; i++){
               if (images[i])
               {
                    if (i == 0)
                         sql += "(?, ?, ?)"
                    else
                         sql += " ,(?, ?, ?)"
                    varibles.push(product_id)
                    varibles.push(images[i])
                    if (i == 0) varibles.push(true)
                    else varibles.push(false)
               }
          }
     }
     return db.execute(sql, varibles)
}

module.exports = Sites
