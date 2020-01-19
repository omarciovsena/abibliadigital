import chalk from 'chalk'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Book from '../../models/book'
import Verse from '../../models/verse'
import nvi from './data/nvi'

dotenv.config()

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(`${process.env.MONGODB_URI}`)
mongoose.connection.on('error', err => {
  console.error(`%s ${err}`, chalk.red('x'))
})

const loadVerses = async (version) => {
  const { data, lang, name } = version
  const bookList = await Book.find()
  const booksMap = {}
  await bookList.map(book => (booksMap[book.abbrev[lang]] = book._id))

  try {
    for (const book of data) {
      await book.chapters.map(async (chapter, chapterIndex) => {
        await chapter.map(async (verse, verseIndex) => {
          const newVerse = {
            book: {
              id: booksMap[book.abbrev] && booksMap[book.abbrev]._id,
              abbrev: {
                [lang]: book.abbrev
              }
            },
            chapter: chapterIndex + 1,
            number: verseIndex + 1,
            text: verse,
            version: name
          }
          await Verse.create(newVerse)
        })
      })
    }
  } catch (err) {
    console.log('Error', err)
  }
}

Verse.deleteMany({}, async () => {
  const versions = [
    { data: nvi, name: 'nvi', lang: 'pt' }
  ]
  loadVerses(versions[1])
})
