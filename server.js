//dependencies
const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


// listener
const PORT= process.env.PORT
app.listen(PORT, () => console.log("at tea time, everybody agrees"))

//Db config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// database connection error/ success
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongodb not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

app.use(express.urlencoded({extended: true}))

// Dependencies
const session = require("express-session")

// Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.get("/", (req, res) => {
    res.render("index.ejs")
})
const userController = require("./controllers/users")
app.use("/users", userController)

const sessionsController = require("./controllers/sessions")
app.use("/sessions", sessionsController)

