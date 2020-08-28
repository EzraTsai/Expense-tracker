const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//index page
router.get('/', (req, res) => {
    console.log(req.query)
    const { category, month } = req.query
    const userId = req.user._id
    Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
            //filter月份邏輯
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
            //比對月份
            if (month === undefined) {
            } else {
                for (let i = 0; i < records.length; i++) {
                    if (records[i].date.substr(0, 7).includes(month) !== true) {
                        records.splice(i, 1)
                        i--
                    }
                }
            }
            //比對分類

            //計算金額
            const totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)

            //種子資料-分類輸出
            Category.find()
                .lean()
                .sort({ _id: 'asc' })
                .then(categories => {
                    res.render('index', { records, totalAmount, categories, existYM })
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})

module.exports = router