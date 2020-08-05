const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//index page
router.get('/', (req, res) => {
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

module.exports = router