import { saveRequest } from '../controllers/request'
import Book from '../models/book'

export const getBooks = async (req, res) => {
  try {
    saveRequest(req)
    const books = await getList()
    if (!books || books.length === 0) {
      throw new Error({
        statusCode: 404,
        message: 'Not found'
      })
    }
    res.json(books)
  } catch (err) {
    res.json(err)
  }
}

export const getBook = async (req, res) => {
  const { abbrev } = req.params
  try {
    saveRequest(req)
    const book = await getItem(abbrev)
    if (!book) {
      throw new Error({
        statusCode: 404,
        message: 'Not found'
      })
    }
    res.json(book)
  } catch (err) {
    res.json(err)
  }
}

const getList = async () => {
  const books = await Book.aggregate([{ $sort: { order: 1 } }])
  return books.map(book => ({
    abbrev: book.abbrev,
    author: book.author,
    chapters: book.chapters,
    group: book.group,
    name: book.name,
    testament: book.testament
  }))
}

export const getItem = async abbrev => {
  const book = await Book.findOne({
    $or: [{ 'abbrev.pt': abbrev }, { 'abbrev.en': abbrev }]
  })
  if (book) {
    return {
      abbrev: book.abbrev,
      author: book.author,
      chapters: book.chapters,
      comment: book.comment,
      group: book.group,
      name: book.name,
      testament: book.testament
    }
  }
}
