const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//filter
router.get('/:id', (req, res) => {
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

module.exports = router