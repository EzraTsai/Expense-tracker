const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const calculateMoney = require('./calculate')
const app = express()

mongoose.connect('mongodb://localhost/exprense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb conneted!')
})

app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

Handlebars.registerHelper('checkIfSam', function (category, currentCategory, options) {
    if (category === currentCategory) {
        return options.fn(this)
    } 
    return options.inverse(this)
  })

app.get('/', (req, res) => {
    Record.find()
        .lean()
        .sort({ date: 'asc' })
        .then(records => {
            const totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue })
            res.render('index', { records, totalAmount })
        })
        .catch(error => console.log(error))
})

app.listen(3000, () => {
    console.log('App is running on http:localhost:3000')
})