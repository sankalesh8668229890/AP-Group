const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

const employeeSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
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
    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    // companyKeyId: {
    //     type: ObjectId,
    //     ref: "company"
    // },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("employee", employeeSchema)