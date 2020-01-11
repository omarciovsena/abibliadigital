import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
  abbrev: {
    pt: String,
    en: String
  },
  author: String,
  chapters: Number,
  comment: String,
  group: String,
  name: String,
  order: Number,
  testament: String
})

export default mongoose.model('Book', BookSchema)
