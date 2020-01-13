import supertest from 'supertest'

import Book from '../../models/book'
import app from '../app'
import { connect } from '../utils'

jest.mock('axios')
describe('controllers:book', () => {
  let connection

  beforeAll(async () => {
    connection = await connect()
  })

  afterAll(async () => {
    return connection.disconnect()
  })

  it('should have 66 books', async () => {
    const count = await Book.countDocuments()
    expect(count).toEqual(66)
  })

  describe('getBook', () => {
    it('should return error 404 and "Book not found" message', async () => {
      const { body, statusCode } = await supertest(app).get('/books/gns')
      expect(statusCode).toBe(404)
      expect(body.msg).toEqual('Book not found')
    })

    it('should return object named "Juízes"', async () => {
      const { body } = await supertest(app).get('/books/jz')
      expect(body.name).toBe('Juízes')
    })

    it('should return object named Juizes', async () => {
      const { body } = await supertest(app).get('/books/jud')
      expect(body.name).toBe('Juízes')
    })
  })

  describe('getBooks', () => {
    it('should return 66 books', async () => {
      const { body } = await supertest(app).get('/books')
      expect(body.length).toBe(66)
    })
  })
})
