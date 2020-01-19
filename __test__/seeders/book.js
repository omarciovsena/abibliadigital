import chalk from 'chalk'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Book from '../../models/book'
import books from './data/books'

dotenv.config()

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(`${process.env.MONGODB_URI}`)
mongoose.connection.on('error', err => {
  console.error(`%s ${err}`, chalk.red('x'))
})

Book.deleteMany({}, async () => {
  const promises = await books.map(async (book, index) => {
    await Book.create(
      {
        abbrev: book.abbrev,
        author: book.author,
        chapters: book.chapters,
        comment: book.comment,
        group: book.group,
        name: book.name,
        order: index + 1,
        testament: book.testament
      }
    )
  })
  Promise.all(promises).then(() => {
    process.exit()
  })
})
