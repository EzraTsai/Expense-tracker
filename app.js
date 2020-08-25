const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000
const Handlebars = require('handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const userPassport = require('./config/passport')
require('./config/mongoose')

const app = express()

app.use(session({
    secret:'MySecret',
    resave: false,
    saveUninitialized: true
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
userPassport(app)
app.use(routes)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

Handlebars.registerHelper('checkIfSam', function (category, currentCategory, options) {
    if (category === currentCategory) {
        return options.fn(this)
    }
    return options.inverse(this)
})

app.listen(PORT, () => {
    console.log('App is running on http:localhost:3000')
})