import Verse from '../models/verse'
import { getItem as getBook } from './book'
import { saveRequest } from './request'

export const getChapter = async (req, res) => {
  try {
    saveRequest(req)
    const { version, abbrev, chapter } = req.params
    const book = await getBook(abbrev)
    if (!book) {
      throw new Error({
        statusCode: 404,
        message: 'Not found'
      })
    }
    const verses = await getList(req.params)
    if (!verses || verses.length === 0) {
      throw new Error({
        statusCode: 404,
        message: 'Not found'
      })
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
    console.log('err', err)
    res.status(500).json(err)
  }
}

export const getVerse = async (req, res) => {
  try {
    saveRequest(req)
    const { abbrev } = req.params
    const book = await getBook(abbrev)
    if (!book) {
      throw new Error({
        statusCode: 404,
        message: 'Not found'
      })
    }
    const verse = await getItem(req.params)

    if (!verse) {
      throw new Error({
        statusCode: 404,
        message: 'Not found'
      })
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
    console.log('err', err)
    res.status(500).json(err)
  }
}

export const search = async (req, res) => {
  try {
    saveRequest(req)
    const { version, search } = req.body

    if (!version) {
      throw new Error({
        statusCode: 404,
        message: 'Version not found'
      })
    }

    var expression = new RegExp(
      '' +
        search
          .split(' ')
          .map(function (word) {
            return '(?=.*\\b' + word + '\\b)'
          })
          .join('') +
        '.+'
    )

    const verses = await Verse.find({
      version,
      text: expression
    })

    res.json({
      occurrence: verses.length,
      version,
      verses: verses.map(verse => ({
        book: {
          abbrev: verse.book.abbrev
        },
        chapter: verse.chapter,
        number: verse.number,
        text: verse.text
      }))
    })
  } catch (err) {
    res.status(err.status || 500).json({ msg: err.msg })
  }
}

const getList = async params => {
  const { version, abbrev, chapter } = params
  return Verse.aggregate([
    {
      $match: {
        'book.abbrev.pt': abbrev,
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
    'book.abbrev.pt': abbrev,
    chapter: parseInt(chapter),
    number: parseInt(number),
    version
  })
}
