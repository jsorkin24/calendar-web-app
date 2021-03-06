const mongoose = require('mongoose')
const Schema = mongoose.Schema

const calSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startsAt: {
        type: Date
    },
    endsAt: {
        type: Date
    }
})

module.exports = mongoose.model('Event', calSchema)