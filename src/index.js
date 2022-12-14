const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const port = 3000
const path = require('path')

const morgan = require('morgan')

app.use(express.static(path.join(__dirname, 'public')))

//use morgan to log the request
app.use(morgan('combined'))

//template engine
app.engine('hbs', hbs.engine({
    extname: ".hbs",
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

app.get('/home', (req, res)=>{
    // res.send("Hello world")
    res.render('home')
})

app.get('/shop', (req, res)=>{
    // res.send("Hello world")
    res.render('shop')
})

app.listen(port, ()=> console.log(`Web app listening at http://localhost:${port}/home`))
