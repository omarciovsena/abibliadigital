import mongoose from 'mongoose'

const VerseSchema = new mongoose.Schema({
  book: {
    id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
      index: true,
      required: 'Book cannot be blank'
    },
    abbrev: {
      pt: String,
      en: String
    }
  },
  chapter: Number,
  number: Number,
  text: String,
  version: String,
  comment: String
})

export default mongoose.model('Verse', VerseSchema)
