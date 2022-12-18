const homeRouter = require('./routers/HomeRouter')
const shopRouter = require('./routers/ShopRouter')
const authRouter = require('./routers/AuthRouter')
const meRouter = require('./routers/MeRouter')

function route(app){

    app.use('/home', homeRouter)
    app.use('/shop', shopRouter)
    app.use('/auth', authRouter)
    app.use('/me', meRouter)
}

module.exports = route