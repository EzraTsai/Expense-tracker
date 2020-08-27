const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//index page
router.get('/', (req, res) => {
    const userId = req.user._id
    const categories = ['餐飲食品', '休閒娛樂', '家居物業', '交通出行', '其他']
    Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
            const totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
            const createD = records.map(record => record.date)
            const createYM = []
            const existYM = []
            createD.forEach(element => {
                if (element) {
                    createYM.push(element.substr(0, 7))
                }
            })
            for (let i = 0; i < createYM.length; i++) {
                if (createYM[i].includes(createYM[i - 1]) !== true) {
                    existYM.push(createYM[i])
                }
            }
            res.render('index', { records, totalAmount, categories, existYM })
        })
        .catch(error => console.log(error))
})

module.exports = router