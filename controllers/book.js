import { saveRequest } from '../controllers/request.js'
import { genericError, notFound } from '../helpers/index.js'
import Book from '../models/book.js'

export const getBooks = async (req, res) => {
  try {
    await saveRequest(req)
    const books = await getList()
    return res.json(books)
  } catch (err) {
    /* istanbul ignore next */
    return genericError(res, err)
  }
}

export const getBook = async (req, res) => {
  try {
    const { abbrev } = req.params
    await saveRequest(req)
    const book = await getItem(abbrev)
    if (!book) {
      return notFound(res, 'Book')
    }
    res.json(book)
  } catch (err) {
    /* istanbul ignore next */
    return genericError(res, err)
  }
}

export const getList = async () => {
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
