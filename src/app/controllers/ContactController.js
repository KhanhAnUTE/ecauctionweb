

class ContactController {

     //GET /contact
     index(req, res){
         var user = req.session.user
         res.render('contact', {
             title: "Trang chủ",
             user,
             contactPage: true,
         })
     }
 }
 
 module.exports = new ContactController()