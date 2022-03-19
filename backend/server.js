require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

//Let our server accept json
app.use(express.json())

//Parse body
app.use(bodyParser.urlencoded({extended: false}))

const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

const productsRouter = require("./routes/products")
app.use("/products", productsRouter)

//Return 404 Not Found if no middleware handles that req
app.use((req, res, next) => {
  //To do: Add the 404 not found page
  res.status(404).send("<h1>Page not found</h1>");
})

app.listen(3000, () => console.log('Server Started'))

