const db = require('../../config/db')

const Users = function(user){
    try{
        this.email = user.email
        this.password = user.password
        this.user_id = user.user_id
        this.is_admin = user.is_admin
        this.name = user.name
        this.gender = user.gender
        this.phone_number = user.phone_number
        this.avatar = user.avatar   
    }catch{}

    if (!this.name)
        this.name = user.email.split('@')[0]

    this.checkLoginValid = () => {
        return (this.email && this.password.length > 8)
    }
}

Users.getAll = () => {
    var sql = "select * from Users"
    return db.execute(sql)
}

Users.getUserByEmail = (email) => {
    var sql = "select * from Users where email = ?"
    return db.execute(sql, [email])
}

Users.saveBrief = (user) => {
    var sql = "insert into Users (email, password, name) values (?, ?, ?)"
    return db.execute(sql, [user.email, user.password, user.name])
}


module.exports = Users