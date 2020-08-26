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
const flash = require('connect-flash')
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
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})
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