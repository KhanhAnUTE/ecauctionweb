const Users = require('../models/UserModel')

class MeController{

    //GET /me/info
    info(req, res){
        if (!req.session.user) 
            res.redirect('../auth/login')
        else{
            Users.getUserById(req.session.user.user_id)
                .then(([[userResult]]) => {
                    res.render('me/me', {
                        title: "Thông tin cá nhân",
                        me: userResult,
                        info: true,
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
            res.render('me/me', {
                title: "Cửa hàng của tôi",
                myshop: true,
            })
        }
    }

   
}

module.exports = new MeController()