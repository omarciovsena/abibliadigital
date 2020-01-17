import mongoose from 'mongoose'

export const connect = async () => {
  return mongoose.connect('mongodb://localhost/bibleapi_test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
}
