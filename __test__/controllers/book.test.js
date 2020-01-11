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

  it('should return object named Gênesis', async () => {
    const { body } = await supertest(app).get('/books/gn')
    expect(body.name).toBe('Gênesis')
  })

  it('should return 66 books', async () => {
    const { body } = await supertest(app).get('/books')
    expect(body.length).toBe(66)
  })
})
