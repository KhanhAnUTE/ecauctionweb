const homeRouter = require('./routers/HomeRouter')
const shopRouter = require('./routers/ShopRouter')
const authRouter = require('./routers/AuthRouter')

function route(app){

    app.use('/home', homeRouter)
    app.use('/shop', shopRouter)
    app.use('/auth', authRouter)
}

module.exports = route