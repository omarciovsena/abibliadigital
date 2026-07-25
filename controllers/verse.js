import { genericError, notFound, randomNumber } from '../helpers/index.js'
import Verse from '../models/verse.js'
import { getItem as getBook, getList as getBooks } from './book.js'
import { saveRequest } from './request.js'

export const getChapter = async (req, res) => {
  try {
    await saveRequest(req)
    const { version, abbrev, chapter } = req.params
    const book = await getBook(abbrev)
    if (!book) {
      return notFound(res, 'Book')
    }
    const verses = await getList(req.params)
    if (!verses || verses.length === 0) {
      return notFound(res, 'Chapter')
    }
    res.json({
      book: {
        abbrev: book.abbrev,
        name: book.name,
        author: book.author,
        group: book.group,
        version
      },
      chapter: {
        number: parseInt(chapter),
        verses: verses.length
      },
      verses: verses.map(c => ({
        number: c.number,
        text: c.text
      }))
    })
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}

export const getVerse = async (req, res) => {
  try {
    await saveRequest(req)
    const { abbrev } = req.params
    const book = await getBook(abbrev)
    if (!book) {
      return notFound(res, 'Book')
    }
    const verse = await getItem(req.params)

    if (!verse) {
      return notFound(res, 'Verse')
    }
    res.json({
      book: {
        abbrev: book.abbrev,
        name: book.name,
        author: book.author,
        group: book.group,
        version: verse.version
      },
      chapter: verse.chapter,
      number: verse.number,
      text: verse.text
    })
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}

export const getRandomVerse = async (req, res) => {
  try {
    await saveRequest(req)
    const { version, abbrev } = req.params
    let book = abbrev && await getBook(abbrev)
    if (!book) {
      const books = await getBooks()
      book = books[randomNumber(books.length)]
    }
    const allVerses = await getList({ version, abbrev: book.abbrev.pt, chapter: randomNumber(book.chapters) })
    const verse = allVerses[randomNumber(allVerses.length) - 1]

    return res.json({
      book: {
        abbrev: book.abbrev,
        name: book.name,
        author: book.author,
        group: book.group,
        version: verse.version
      },
      chapter: verse.chapter,
      number: verse.number,
      text: verse.text
    })
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}

export const search = async (req, res) => {
  try {
    await saveRequest(req)
    const { version, search } = req.body
    const bookList = {}
    const books = await getBooks()
    books.map(book => { bookList[book.abbrev.en] = book })

    if (!version) {
      return notFound(res, 'Version')
    }

    var expression = new RegExp(
      '' +
      search
        .toLowerCase()
        .split(' ')
        .map(function (word) {
          return '(?=.*' + diacriticSensitiveRegex(word) + ')'
        })
        .join('') +
      '.+'
    )

    const verses = await Verse.find({
      version,
      text: { $regex: expression, $options: 'i' }
    })

    res.json({
      occurrence: verses.length,
      version,
      verses: verses.map(verse => ({
        book: bookList[verse.book.abbrev.en],
        chapter: verse.chapter,
        number: verse.number,
        text: verse.text
      }))
    })
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}

const getList = async params => {
  const { version, abbrev, chapter } = params
  return Verse.aggregate([
    {
      $match: {
        $or: [{ 'book.abbrev.pt': abbrev }, { 'book.abbrev.en': abbrev }],
        chapter: parseInt(chapter),
        version
      }
    },
    {
      $sort: { number: 1 }
    }
  ])
}

const getItem = async params => {
  const { version, abbrev, chapter, number } = params
  return Verse.findOne({
    $or: [{ 'book.abbrev.pt': abbrev }, { 'book.abbrev.en': abbrev }],
    chapter: parseInt(chapter),
    number: parseInt(number),
    version
  })
}

const diacriticSensitiveRegex = (string = '') => {
  return string
    .replace(/a/g, '[a,á,à,ä,â]')
    .replace(/e/g, '[e,é,ë,è]')
    .replace(/i/g, '[i,í,ï,ì]')
    .replace(/o/g, '[o,ó,ö,ò]')
    .replace(/u/g, '[u,ü,ú,ù]')
}
