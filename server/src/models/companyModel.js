const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    logoLink: {
        type:String,
        required: true,
        trim: true
    },
    website: {
        type:String,
        required: true,
        trim: true
    }
},{timestamps:true})

module.exports = mongoose.model("company", companySchema)