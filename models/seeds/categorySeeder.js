if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
    console.log('mongodb conneted!')
    Category.create(
        {
            categoryName: "家居物業",
            categoryIcon: "fas fa-home"
        },
        {
            categoryName: "交通出行",
            categoryIcon: "fas fa-shuttle-van"
        },
        {
            categoryName: "休閒娛樂",
            categoryIcon: "fas fa-grin-beam"
        },
        {
            categoryName: "餐飲食品",
            categoryIcon: "fas fa-utensils"
        },
        {
            categoryName: "其他",
            categoryIcon: "fas fa-pen"
        }
    )
    .then(() => {
        console.log('categorySeeder done!')
        db.close()
    })
})
