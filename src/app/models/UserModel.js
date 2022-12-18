const db = require('../../config/db')

const Users = function(user){
    this.email = user.email || ''
    this.password = user.password || ''
    this.user_id = user.user_id || null
    this.is_admin = user.is_admin || 0
    this.name = user.name || user.email.split('@')[0] || ''
    this.gender = user.gender || 0
    this.phone_number = user.phone_number || ''
    this.avatar = user.avatar || ''
    this.city = user.city || ''
    this.district = user.district || ''
    this.ward = user.ward || ''
    this.street = user.street || ''

    this.checkLoginValid = () => {
        return (this.email && this.password.length > 8)
    }
}

Users.getAll = () => {
    var sql = "select * from Users"
    return db.execute(sql)
}

Users.getUserById = (user_id) => {
    var sql = "select * from Users where user_id = ?"
    return db.execute(sql, [user_id])
}

Users.getUserByEmail = (email) => {
    var sql = "select * from Users where email = ?"
    return db.execute(sql, [email])
}

Users.saveBrief = (user) => {
    var sql = "insert into Users (email, password, name) values (?, ?, ?)"
    return db.execute(sql, [user.email, user.password, user.name])
}

Users.saveUser = (user)=>{
    var sql = "update Users set name = ?, gender = ?, phone_number = ?, avatar = ?, city = ?, district = ?, ward = ?, street = ? where user_id = ?"
    return db.execute(sql, [user.name, user.gender, user.phone_number, user.avatar, user.city, user.district, user.ward, user.street, user.user_id])
}


module.exports = Users