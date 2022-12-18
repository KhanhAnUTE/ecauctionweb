

class HomeController {

    //GET /home
    index(req, res){
        var user = req.session.user
        res.render('home', {
            title: "Trang chủ",
            user
        })
    }
}

module.exports = new HomeController()