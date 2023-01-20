const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const route = require('./route/routes');
const mongoose = require('mongoose');

require("dotenv").config()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb+srv://sankalesh8668:790602030305@cluster0.pymsd.mongodb.net/APGroup-Project", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use("/", route)

app.listen(process.env.PORT || 3000, (err)=> {
    console.log("Connected to PORT 3000")
})