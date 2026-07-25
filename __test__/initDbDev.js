import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import Book from '../models/book.js'
import Request from '../models/request.js'
import User from '../models/user.js'
import Verse from '../models/verse.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const books = JSON.parse(fs.readFileSync(path.join(__dirname, './mock/complete_books.json'), 'utf8'))
const verses = JSON.parse(fs.readFileSync(path.join(__dirname, './mock/parsed_complete_books.json'), 'utf8'))

export const connect = async () => {
  return mongoose.connect('mongodb://localhost/abibliadigital', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
}

const createBooks = async () => {
  const promises = books.map(async book => new Book(book).save())
  return Promise.all(promises)
}

const createVerses = async (books) => {
  const bookByKey = {}
  await books.map(book => {
    bookByKey[book.abbrev.pt] = book
  })

  // Mapeamento para corrigir inconsistências entre versículos e livros
  const abbrevMapping = {
    'atos': 'at'
  }

  const promises = verses.map(async verse => {
    let bookKey = verse.book.abbrev.pt
    
    // Aplicar mapeamento se necessário
    if (abbrevMapping[bookKey]) {
      bookKey = abbrevMapping[bookKey]
    }
    
    if (!bookByKey[bookKey]) {
      console.log(`Livro não encontrado para abreviação: ${verse.book.abbrev.pt} (mapeado para: ${bookKey})`)
      return null
    }
    
    verse.book = {
      id: bookByKey[bookKey]._id,
      abbrev: bookByKey[bookKey].abbrev
    }
    return new Verse(verse).save()
  })
  
  const results = await Promise.all(promises)
  const validResults = results.filter(result => result !== null)
  console.log(`Versículos processados: ${validResults.length} de ${verses.length}`)
  return validResults
}

const createUser = async () => {
  return new User({
    token: '1234567890',
    name: 'Fake User',
    email: 'root@abibliadigital.com.br',
    password: '123456',
    notifications: false
  }).save()
}

export const initDatabase = async () => {
  const connection = await connect()
  await User.deleteMany()
  await Book.deleteMany()
  await Verse.deleteMany()
  await Request.deleteMany()
  const books = await createBooks()
  await createVerses(books)
  await createUser()
  connection.disconnect()
}

initDatabase()
