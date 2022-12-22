const homeRouter = require('./routers/HomeRouter')
const shopRouter = require('./routers/ShopRouter')
const authRouter = require('./routers/AuthRouter')
const meRouter = require('./routers/MeRouter')
const contactRouter = require('./routers/ContactRouter')

function route(app){

    app.use('/home', homeRouter)
    app.use('/shop', shopRouter)
    app.use('/auth', authRouter)
    app.use('/me', meRouter)
    app.use('/contact', contactRouter)
}

module.exports = route