const mongoose = require('mongoose')

const placesSchema = mongoose.Schema({
    nickname: String,
    name: String,
    latitude: Number,
    longitude: Number,
})

const Places = mongoose.model('Places', placesSchema)

module.exports = Places