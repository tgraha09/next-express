const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    Age: Number
})

module.exports = mongoose.model("User", userSchema)