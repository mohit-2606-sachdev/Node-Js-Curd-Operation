const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    number: {
        type: Number,
        require: true
    },
    CREATED_BY: {
        type: String,
        require: true
    },
    CREATED_AT: {
        type: Date,
        default: Date.now
    }
    , UPDATED_AT: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model("Person", PersonSchema)