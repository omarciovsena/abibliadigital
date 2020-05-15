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

let total = 0
const verses = []
const lang = 'pt'

function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const saveAll = () => {
  const verse = verses.shift()
  const doc = new Verse(verse)
  doc.save((err, saved) => {
    if (err) throw err
    const nextVerse = verses[0]
    if (nextVerse && verse.book.abbrev[lang] !== nextVerse.book.abbrev[lang]) {
      console.log('   %s All verses off %s were saved. \n   -  %s verses to go.', chalk.green('✓'), chalk.blue(`${verse.book.abbrev[lang]}`), chalk.yellow(numberWithCommas(verses.length)))
    }
    --total ? saveAll() : process.exit()
  })
}

const loadVerses = async (params) => {
  const { data, name } = params
  const bookList = await Book.find()
  const booksMap = {}

  await bookList.map(book => (booksMap[book.abbrev[lang]] = book._id))

  try {
    for (const book of data) {
      await book.chapters.map(async (chapter, chapterIndex) => {
        return chapter.map(async (verse, verseIndex) => {
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
          verses.push(newVerse)
        })
      })
    }
  } catch (err) {
    console.log(` - %s error - ${err}`, chalk.red('x'))
  } finally {
    console.log(' - %s verses will be persisted.', chalk.yellow(numberWithCommas(verses.length)))
    total = verses.length
    saveAll()
  }
}

console.log('%s All verses will be deleted and registered again. \n %s There are more than %s verses, this can take a few minutes.', chalk.green('✓'), chalk.blue('-'), chalk.yellow('30,000'))

Verse.deleteMany({}, async () => {
  console.log(' %s All verses have been erased.', chalk.green('✓'))
  loadVerses({ data: nvi, name: 'nvi' })
})
