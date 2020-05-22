import chalk from 'chalk'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Book from '../../models/book'
import Verse from '../../models/verse'
import data from './data/nvi'

const LANG = 'pt'

dotenv.config()

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(`${process.env.MONGODB_URI}_test`)
mongoose.connection.on('error', err => {
  console.error(`%s ${err}`, chalk.red('x'))
})

const loadVerses = async () => {
  const bookList = await Book.find()
  const booksMap = {}
  await bookList.map(book => (booksMap[book.abbrev[LANG]] = book._id))

  try {
    for (const verse of data.RECORDS) {
      const newVerse = {
        book: {
          id: booksMap[verse.book],
          abbrev: {
            [LANG]: verse.book
          }
        },
        chapter: verse.chapter.$numberInt,
        number: verse.number.$numberInt,
        text: verse.text,
        version: verse.version
      }
      await Verse.create(newVerse)
    }
  } catch (err) {
    console.log('Error', err)
  }
}

Verse.deleteMany({}, async () => {
  loadVerses()
})
