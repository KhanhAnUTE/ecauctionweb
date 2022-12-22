const db = require('../../config/db')

const Sites = function(){}

Sites.getParentCategories = () =>{
     var sql = "select * from parent_categories"
     return db.execute(sql)
}

Sites.getCategoriesByParent = (parent_id) =>{
     var sql = "select * from categories where parent_id = ?"
     return db.execute(sql, [parent_id])
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
