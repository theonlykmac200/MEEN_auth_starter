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
const methodOverride = require("method-override")

// Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(methodOverride("_method"))

app.get("/", (req, res) => {
    if (req.session.currentUser) {
      res.render("dashboard.ejs", {
        currentUser: req.session.currentUser,
      })
    } else {
      res.render("index.ejs", {
        currentUser: req.session.currentUser,
      })
    }
  })
const userController = require("./controllers/users")
app.use("/users", userController)

const sessionsController = require("./controllers/sessions")
app.use("/sessions", sessionsController)

