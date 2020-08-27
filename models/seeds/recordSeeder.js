const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
    name: 'User',
    email: 'user@example.com',
    password: '123456'
}

const SEED_EXPENSE = [
    {
        name: "早餐",
        category: "餐飲食品",
        merchant: "美之城",
        date: "2020-08-03",
        amount: "80",
    },
    {
        name: "午餐",
        category: "餐飲食品",
        merchant: "錢都",
        date: "2020-08-03",
        amount: "250",
    },
    {
        name: "飲料餐",
        category: "餐飲食品",
        merchant: "星巴克",
        date: "2020-07-25",
        amount: "120",
    },
    {
        name: "晚餐",
        category: "餐飲食品",
        merchant: "藏壽司",
        date: "2020-07-29",
        amount: "320",
    },
    {
        name: "健身",
        merchant: "健身工廠",
        category: "休閒娛樂",
        date: "2020-08-03",
        amount: "50",
    },
    {
        name: "房租",
        merchant: "",
        category: "家居物業",
        date: "2020-08-05",
        amount: "25000",
    },
    {
        name: "搭公車",
        merchant: "",
        category: "交通出行",
        date: "2020-08-17",
        amount: "36",
    }
]

db.once('open', () => {
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
        }))
        .then(user => {
            const userId = user._id
            return Promise.all(Array.from(
                { length: 7 },
                (_, i) =>
                    Record.create({
                        name: SEED_EXPENSE[i].name,
                        merchant: SEED_EXPENSE[i].merchant,
                        category: SEED_EXPENSE[i].category,
                        date: SEED_EXPENSE[i].date,
                        amount: SEED_EXPENSE[i].amount,
                        userId
                    })
            ))

        })
        .then(() => {
            console.log('recordSeeder done!')
            // db.close()
            process.exit()
        })
})