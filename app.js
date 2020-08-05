const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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
    return Record.find()
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
            const totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue })
            Category.find()
                .lean()
                .sort({ _id: 'asc' })
                .then(categories => {
                    res.render('index', { records, totalAmount, categories })
                })
                .catch(error => console.log(error))
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
        .then((record) => res.render('edit', { record }))
        .catch(error => console.log(error))
})

//edit expense
app.put('/records/:id', (req, res) => {
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
app.delete('/records/:id', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//filter
app.get('/filter/:id', (req, res) => {
    // const id = req.params.id
    // Category.find()
    //     .lean()
    //     .sort({ _id: 'asc' })
    //     .then(categories => {
    //         categories.forEach(category => {
    //             categoryList.push({
    //                 name: category.name
    //             })
    //         })
    //     })
    //     .catch(error => console.log(error))

    // return Promise.all(promises).then(() => {
    //     Record.find(condition)
    //         .lean()
    //         .then((records) => {
    //             if (keyword !== '-1') categoryList[keyword].check = true
    //             const totalAmount = records.map(record => record.amount).reduce((prev, curr) => prev + curr)
    //             res.render('index', { records, totalAmount, categoryList })
    //         })
    // })
    // const id = req.params.id
    // return Category.findById(id)
    //     .lean()
    //     .then(categories => {
    //         console.log(categories.categoryName)
    //         Record.find()
    //             .lean()
    //             .sort({ date: 'desc' })
    //             .then(records => {
    //                 if (categories.categoryName === records.category) {
    //                    const totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue })
    //                 res.render('index', { categories, totalAmount, records }) 
    //                 }
    //             })
    //             .catch(error => console.log(error))
    //     })
    //     .catch(error => console.log(error))
    res.render('index')
})

app.listen(3000, () => {
    console.log('App is running on http:localhost:3000')
})