import mongoose from 'mongoose'

import User from '../models/user'

export const connect = async () => {
  return mongoose.connect('mongodb://localhost/abibliadigital_test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
}

export const getUser = async () => User.findOne()
