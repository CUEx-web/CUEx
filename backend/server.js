require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")

// Connect to Mongodb
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

// Import Controller
const errorController = require("./controllers/error")

//Let our server accept json
app.use(express.json())

//Parse body
app.use(bodyParser.urlencoded({extended: false}))

const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

const productsRouter = require("./routes/products")
app.use("/products", productsRouter)

const transactionsRouter = require("./routes/transactions")
app.use("/transactions", transactionsRouter)

const chatsRouter = require("./routes/chats")
app.use("/chats", chatsRouter)

// Return 404 Not Found if no middleware handles that req
// app.use(errorController.get404)

app.listen(3001, () => console.log('Server Started'))

