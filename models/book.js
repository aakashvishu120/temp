const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title : {type:String , required : true , unique : true},
    author : {type:String, required : true},
    publicationYear : {type:String , required : true} 
} , {timestamps : true})

//making model
const Book = mongoose.model("book", bookSchema);

module.exports = Book;