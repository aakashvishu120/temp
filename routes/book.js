const express = require('express')
const router = express.Router()
const {handleCreateNewBook, handleGetAllBookDetails, handleDeleteBookById, handleGetBookById, handleUpdateBookById} = require("../controllers/book")

router.route("/")
.post(handleCreateNewBook)
.get(handleGetAllBookDetails);

router.route("/:id")
.delete(handleDeleteBookById)
.get(handleGetBookById)
.patch(handleUpdateBookById)

module.exports = router;