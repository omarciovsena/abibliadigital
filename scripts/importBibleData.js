import axios from 'axios'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Book from '../models/book'
import Verse from '../models/verse'

dotenv.config()

const SOURCE_URL = 'https://raw.githubusercontent.com/damarals/biblias/main/inst/json'

const BOOK_NAMES = {
  gn: 'Gênesis',
  ex: 'Êxodo',
  lv: 'Levítico',
  nm: 'Números',
  dt: 'Deuteronômio',
  js: 'Josué',
  jz: 'Juízes',
  rt: 'Rute',
  '1sm': '1 Samuel',
  '2sm': '2 Samuel',
  '1rs': '1 Reis',
  '2rs': '2 Reis',
  '1cr': '1 Crônicas',
  '2cr': '2 Crônicas',
  ed: 'Esdras',
  ne: 'Neemias',
  et: 'Ester',
  job: 'Jó',
  sl: 'Salmos',
  pv: 'Provérbios',
  ec: 'Eclesiastes',
  ct: 'Cânticos',
  is: 'Isaías',
  jr: 'Jeremias',
  lm: 'Lamentações',
  ez: 'Ezequiel',
  dn: 'Daniel',
  os: 'Oséias',
  jl: 'Joel',
  am: 'Amós',
  ob: 'Obadias',
  jn: 'Jonas',
  mq: 'Miquéias',
  na: 'Naum',
  hc: 'Habacuque',
  sf: 'Sofonias',
  ag: 'Ageu',
  zc: 'Zacarias',
  ml: 'Malaquias',
  mt: 'Mateus',
  mr: 'Marcos',
  lc: 'Lucas',
  jo: 'João',
  mc: 'Marcos',
  at: 'Atos',
  rm: 'Romanos',
  '1co': '1 Coríntios',
  '2co': '2 Coríntios',
  gl: 'Gálatas',
  ef: 'Efésios',
  fp: 'Filipenses',
  cl: 'Colossenses',
  '1ts': '1 Tessalonicenses',
  '2ts': '2 Tessalonicenses',
  '1tm': '1 Timóteo',
  '1tn': '1 Timóteo',
  '2tm': '2 Timóteo',
  tt: 'Tito',
  fm: 'Filemom',
  hb: 'Hebreus',
  tg: 'Tiago',
  '1pe': '1 Pedro',
  '2pe': '2 Pedro',
  '1jo': '1 João',
  '2jo': '2 João',
  '3jo': '3 João',
  jd: 'Judas',
  ap: 'Apocalipse'
}

const normalize = value => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')

const normalizeBookAbbrev = value => value === 'Jó' ? 'job' : normalize(value)

const versions = (process.env.BIBLE_VERSIONS || '')
  .split(',')
  .map(version => version.trim().toUpperCase())
  .filter(Boolean)

const connect = () => mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const importVersion = async version => {
  const { data } = await axios.get(`${SOURCE_URL}/${version}.json`)
  const books = []
  const verses = []

  for (const sourceBook of data) {
    const abbrev = normalizeBookAbbrev(sourceBook.abbrev)
    const book = await Book.findOneAndUpdate(
      { 'abbrev.pt': abbrev },
      {
        abbrev: { pt: abbrev, en: abbrev },
        name: BOOK_NAMES[abbrev] || sourceBook.abbrev,
        chapters: sourceBook.chapters.length,
        comment: '',
        group: '',
        testament: books.length < 39 ? 'VT' : 'NT',
        order: books.length + 1
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    books.push(book)

    sourceBook.chapters.forEach((chapter, chapterIndex) => {
      chapter.forEach((text, verseIndex) => {
        verses.push({
          book: { id: book._id, abbrev: book.abbrev },
          chapter: chapterIndex + 1,
          number: verseIndex + 1,
          text,
          version: version.toLowerCase()
        })
      })
    })
  }

  await Verse.deleteMany({ version: version.toLowerCase() })
  for (let index = 0; index < verses.length; index += 1000) {
    await Verse.insertMany(verses.slice(index, index + 1000), { ordered: false })
  }

  console.log(`${version}: ${books.length} livros, ${verses.length} versículos importados`)
}

const main = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI não foi configurada')
  if (versions.length === 0) throw new Error('Informe BIBLE_VERSIONS, por exemplo: ACF,NVI,NVT')

  await connect()
  for (const version of versions) await importVersion(version)
  await mongoose.disconnect()
}

main().catch(async error => {
  console.error('Falha ao importar Bíblias:', (error.response && error.response.status) || error.message)
  await mongoose.disconnect()
  process.exitCode = 1
})
