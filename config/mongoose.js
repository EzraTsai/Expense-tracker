const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/exprense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb conneted!')
})
module.exports = db