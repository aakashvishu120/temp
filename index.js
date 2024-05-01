const express = require('express')
const app = express()
const port = 8000
const { connectMongoDb } = require("./connection")
const bookRouter = require("./routes/book")


//Database Connection
connectMongoDb("mongodb://127.0.0.1:27017/BooksManagementApp").then(()=>console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo Error" , err));

//MIDDLEWARES
app.use(express.urlencoded({extended : false}));


//Routes
app.use("/books" , bookRouter);

app.listen(port, () => console.log(`My Book Management App is Running ${port}!`))