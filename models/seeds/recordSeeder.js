const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect('mongodb://localhost/exprense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb conneted!')
    Record.create(
        {
            name: "早餐",
            categoty: "餐飲食品",
            date: "2020-08-03",
            amount: "80"
        },
        {
            name: "健身",
            categoty: "休閒娛樂",
            date: "2020-08-03",
            amount: "50"
        },
        {
            name: "房租",
            categoty: "家居物業",
            date: "2020-08-03",
            amount: "25000"
        },
        {
            name: "搭公車",
            categoty: "交通出行",
            date: "2020-08-03",
            amount: "36"
        }
    )
    .then(() => {
        console.log('recordSeeder done!')
        db.close()
    })
})