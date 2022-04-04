require("dotenv").config()

const express = require("express")
const path = require('path');
const cors = require("cors")
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const app = express()
const mongoose = require("mongoose")
mongoose.Promise = global.Promise

// Connect to Mongodb
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

//Server stores file, e.g. image
const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
      //Store in images dir
      if (req.body.event == "users") {
        //Store inside users under images dir
        cb(null, "images/users"); 
      } else {
        //Store inside products under images dir
        cb(null, "images/products");
      }
  },
  filename: function(req, file, cb) {
    // Store the image using uuid + original file name to avoid the same file name got overwritten
      cb(null, uuidv4() + "-" + file.originalname);
  }
});

//Only png, jpg, jpeg are allowed to store
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Let our server accept json
app.use(express.json())

//Parse json inside request body
app.use(bodyParser.json())
//Use multer to store image for products and users
app.use( multer({ storage: fileStorage, fileFilter: fileFilter }).fields([ { name: "productPicture" }, { name: "profilePicture" } ]) );
//Serving image of user profile
app.use('/images/users', express.static(path.join(__dirname, 'images/users')));
//Serving image of product
app.use('/images/products', express.static(path.join(__dirname, 'images/products')));

//Avoid CORS Errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

// Import Controller
const errorController = require("./controllers/error")

const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

const productsRouter = require("./routes/products")
app.use("/products", productsRouter)

// const transactionsRouter = require("./routes/transactions")
// app.use("/transactions", transactionsRouter)

// const chatsRouter = require("./routes/chats")
// app.use("/chats", chatsRouter)

// Return 404 Not Found if no middleware handles that req
// app.use(errorController.get404)

// Allow cross-origin resource sharing
app.use(cors())
// set user session data within cookie
app.use(
    cookieSession({
        name: "CUEx-session",
        // key:['key1, 'key2'],
        secret: "COOKIE-SECRET",
        httpOnly: true
    })
)

require('./routes/auth')(app)
require('./routes/userAuth')(app)

app.listen(3001, () => console.log('Server Started'))

