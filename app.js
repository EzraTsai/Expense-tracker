const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/exprense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb conneted!')
})

app.get('/', (req, res) => {
    res.send('Hellow world')
})

app.listen(3000, () => {
    console.log('App is running on http:localhost:3000')
})