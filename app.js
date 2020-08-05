const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()

app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/exprense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb conneted!')
})

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

Handlebars.registerHelper('checkIfSam', function (category, currentCategory, options) {
    if (category === currentCategory) {
        return options.fn(this)
    }
    return options.inverse(this)
})

app.listen(3000, () => {
    console.log('App is running on http:localhost:3000')
})