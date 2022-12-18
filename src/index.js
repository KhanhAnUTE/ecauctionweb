const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const route = require('./routes')

const port = 3000
const app = express()

//use morgan to log the request
app.use(morgan('combined'))

//pulic
app.use(express.static(path.join(__dirname, 'public')))

//session
app.use(session({
    secret: 'vanish',
    resave: false,
    saveUninitialized: true,
}))

//cookie
app.use(cookieParser())

//template engine
app.engine('hbs', hbs.engine({
    extname: ".hbs",
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

//apply body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//router
route(app)

app.listen(port, ()=> console.log(`Web app listening at http://localhost:${port}/home`))
