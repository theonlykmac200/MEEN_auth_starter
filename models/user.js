//dependencies
const mongoose = require("mongoose")
const Schema = mongoose.Schema


//user Schema
const userSchema = Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
})

// user Model
const User = mongoose.model("User", userSchema)

//Export User Model
module.exports = User