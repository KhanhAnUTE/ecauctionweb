const Users = require('../models/UserModel')

class AuthController {

    //GET /login
    index(req, res) {
        if (req.cookies.email && req.cookies.password) {
            var user = {
                email: req.cookies.email,
                password: req.cookies.password
            }
        }
        res.render('auth/login', {
            title: 'Đăng nhập',
            loginPage: true,
            user,
        })
    }

    //POST /login
    login(req, res) {
        var user = new Users(req.body)
        var isRememberChecked = req.body.isRememberChecked
        var message = ""

        //check user
        if (user.checkLoginValid()) {
            Users.getUserByEmail(user.email)
                .then(([[userValid]]) => {
                    if (!userValid || userValid.length == 0) {
                        res.send("Email chưa đăng ký tài khoản")
                    } else {
                        if (user.password == userValid.password) {
                            var loginedUser = new Users({
                                user_id: userValid.user_id,
                                email: userValid.email,
                                is_admin: userValid.is_admin,
                                name: user.name,
                            })
                            req.session.user = loginedUser

                            if (isRememberChecked) {
                                res.cookie('email', user.email, { expires: new Date(Date.now() + 900000) })
                                res.cookie('password', userValid.password, { expires: new Date(Date.now() + 900000) })
                            }
                            else {
                                res.clearCookie('email')
                                res.clearCookie('password')
                            }
                            res.send(message)
                        }
                        else
                            res.send('Mật khẩu chưa chính xác')
                    }
                })
                .catch(err => {
                    console.log(err)
                    message = "Có lỗi đã xảy ra! Vui lòng thử lại sau"
                    res.send(message)
                })
        }
        else {
            if (!user.email)
                message = 'Vui lòng nhập email'
            else if (!user.password)
                message = 'Vui lòng nhập password'
            else if (user.password.length < 8)
                message = 'Mật khẩu phải dài hơn 8 ký tự'
            res.send(message)
        }

    }

    //GET /logout
    logout(req, res) {
        delete req.session.user
        res.redirect('back')
    }

    //GET /signup
    signup(req, res) {

        res.render('auth/signup', {
            title: 'Đăng ký tài khoản',
            loginPage: true,
        })
    }

    //POST /signup
    register(req, res) {
        
        var user = new Users(req.body)
        var isAgreeChecked = req.body.isAgreeChecked
        var reTypePassword = req.body.reTypePassword
        var message = ""

        //check user
        if (user.checkLoginValid()) {
            if (!reTypePassword)
                res.send("Vui lòng xác nhận lại mật khẩu")
            else if (reTypePassword != user.password)
                res.send("Mật khẩu nhập lại không khớp, vui lòng thử lại")
            else if (!isAgreeChecked)
                res.send("Vui lòng chấp nhận điều khoản để để đăng ký")
            else {
                Users.getUserByEmail(user.email)
                    .then(([[userValid]]) => {
                        if (userValid) {
                            res.send("Email đã đăng ký tài khoản")
                        } else {
                            Users.saveBrief(user)
                                .then(([result])=>{
                                    var loginedUser = new Users({
                                        user_id: result.insertId,
                                        email: user.email,
                                        is_admin: false,
                                        name: user.name,
                                    })
                                    req.session.user = loginedUser
                                    res.send('')
                                })
                                .catch((err)=> res.send("Có lỗi đã xảy ra! Vui lòng thử lại sau"))
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        message = "Có lỗi đã xảy ra! Vui lòng thử lại sau"
                        res.send(message)
                    })
            }
        }
        else {
            if (!user.email)
                message = 'Vui lòng nhập email'
            else if (!user.password)
                message = 'Vui lòng nhập password'
            else if (user.password.length < 8)
                message = 'Mật khẩu phải dài hơn 8 ký tự'
            res.send(message)
        }
    }
}
module.exports = new AuthController()