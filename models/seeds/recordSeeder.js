if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
    console.log('mongodb conneted!')
    Record.create(
        {
            name: "早餐",
            category: "餐飲食品",
            date: "2020-08-03",
            amount: "80"
        },
        {
            name: "健身",
            category: "休閒娛樂",
            date: "2020-08-03",
            amount: "50"
        },
        {
            name: "房租",
            category: "家居物業",
            date: "2020-08-03",
            amount: "25000"
        },
        {
            name: "搭公車",
            category: "交通出行",
            date: "2020-08-03",
            amount: "36"
        }
    )
    .then(() => {
        console.log('recordSeeder done!')
        db.close()
    })
})