import mongoose from 'mongoose'
import supertest from 'supertest'

import Request from '../models/request'
import User from '../models/user'
import app from './app'

export const connect = async () => {
  return mongoose.connect('mongodb://localhost/bibleapi_test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
}

export const resetDatabase = async (model) => {
  await User.deleteMany()
  await Request.deleteMany()
  return supertest(app).post('/users').send({
    name: 'Fake User',
    email: 'fake@email.com',
    password: '123456',
    notifications: false
  })
}
