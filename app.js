const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
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

//index page
app.get('/', (req, res) => {
    Record.find()
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
            const totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue })
            res.render('index', { records, totalAmount })
        })
        .catch(error => console.log(error))
})

//create page
app.get('/records/new', (req, res) => {
    return res.render('new')
})

//create expense
app.post('/', (req, res) => {
    const record = req.body
    return Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//edit page
app.get('/records/:id/edit', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', {record}))
    .catch(error => console.log(error))
})

//edit expense
app.post('/records/:id/edit', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
    .then(record => {
        record = Object.assign(record, req.body)
        return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//delete expense
app.post('/records/:id/delete', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
    console.log('App is running on http:localhost:3000')
})