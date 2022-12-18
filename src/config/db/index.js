const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ec_auction'
});

connection.connect(function(err){
    if (err){
        console.log("Kết nối DB thất bại")
    }else{
        console.log("Kết nối DB thành công")
    }
})

module.exports = connection.promise()
