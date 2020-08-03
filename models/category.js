const mongoose = require('mongoose')
const Schema = mongoose.Schema
const caterogySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('Category', categorySchema)