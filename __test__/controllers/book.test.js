import supertest from 'supertest'

import Book from '../../models/book'
import app from '../app'
import { connect, getUser } from '../utils'

jest.mock('axios')
describe('controllers:book', () => {
  let connection, user

  beforeAll(async () => {
    connection = await connect()
    user = await getUser()
  })

  afterAll(async () => {
    return connection.disconnect()
  })

  it('should have 8 books', async () => {
    const count = await Book.countDocuments()
    expect(count).toEqual(8)
  })

  describe('getBook', () => {
    it('should return error 404 and "Book not found" message', async () => {
      const { body, statusCode } = await supertest(app)
        .get('/api/books/app')
        .set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(404)
      expect(body.msg).toEqual('Book not found')
    })

    it('should return object named Tiago (James)', async () => {
      const { body } = await supertest(app)
        .get('/api/books/tg')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.name).toBe('Tiago')
    })

    it('should return object named Tiago (James)', async () => {
      const { body } = await supertest(app)
        .get('/api/books/jm')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.name).toBe('Tiago')
    })
  })

  describe('getBooks', () => {
    it('should return 8 books', async () => {
      const { body } = await supertest(app)
        .get('/api/books')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.length).toBe(8)
    })
  })
})
