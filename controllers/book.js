const Book = require("../models/book")

async function handleGetAllBookDetails(req, res){
    // const allBooks = await Book.find({});
    const queryData = req.query;
    console.log(queryData);
    const allBooks = await Book.find(
    {
        $and:[
            {publicationYear : { $regex: queryData.publication_year ?? "" }},
            {author : { $regex: queryData.author ?? "" }}
        ]   
    }
    );
    return res.status(200).json(allBooks);
}

async function handleCreateNewBook(req, res){
    const body = req.body;
    if(!body.title || !body.author || !body.publication_year){
        return res.status(400).json({msg : "All field are required"});
    }

    try {
        const result = await Book.create({
            title : body.title,
            author : body.author,
            publicationYear : body.publication_year
        })
        return res.status(201).json({msg : "success" , id : result._id})
    } catch (error) {
        return res.json({msg : "Error inserting data:" , "error" : error});
    }
}

async function handleDeleteBookById(req, res){
    const deletedData = await Book.findByIdAndDelete(req.params.id)
    if (!deletedData) {
        return res.json({msg : `Data Not Found Assciated with this ID ${req.params.id}`});
    }
    return res.json({msg : "Success"});
}

async function handleGetBookById(req,res){
    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).json({error : "Book Not Found"})
    return res.json(book);
}

async function handleUpdateBookById(req,res){
    const body = req.body;
    console.log(body);
    const bookUpdate = await Book.findByIdAndUpdate(req.params.id , {title : body.title  , author :body.author , publicationYear :body.publication_year })
    console.log(bookUpdate);
    return res.json({msg : "Success"});
}

module.exports = {handleCreateNewBook, handleGetAllBookDetails, handleDeleteBookById, handleGetBookById, handleUpdateBookById};