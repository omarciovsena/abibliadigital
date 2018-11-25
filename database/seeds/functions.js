const Factory = use('Factory')
const Database = use('Database')
const booksData = require('../data/books.js')
const versesData = require('../data/verses.js')

const booksPopulate = async () => {
  const books = await Database.table('books')

  let promisesBooks = []

  if (books.length < 66) {
    promisesBooks = booksData.map(
      async book =>
        await Factory.model('App/Models/Book').create({
          ...book
        })
    )

    return Promise.all(promisesBooks).catch(err => {
      console.log(err)
    })
  }
}

const versesPopulate = async () => {
  const verses = await Database.table('verses')

  let promises = []

  if (verses.length < 1) {
    promises = versesData.map(async data => {
      return await Factory.model('App/Models/Verse').create({
        ...data
      })
    })
    return Promise.all(promises).catch(err => {
      console.log(err)
    })
  }
  return
}

module.exports = {
  booksPopulate,
  versesPopulate
}
