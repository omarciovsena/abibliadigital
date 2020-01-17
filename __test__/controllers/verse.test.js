import supertest from 'supertest'

import Verse from '../../models/verse'
import app from '../app'
import { connect } from '../utils'

jest.mock('axios')
describe('controllers:verse', () => {
  let connection

  beforeAll(async () => {
    connection = await connect()
  })

  afterAll(async () => {
    return connection.disconnect()
  })

  it('should have 31.105 verses', async done => {
    const count = await Verse.countDocuments()
    expect(count).toEqual(31105)
    done()
  })

  describe('getChapter', () => {
    it('should return object with 6 verses and with the book of Salmos', async () => {
      const { body } = await supertest(app).get('/verses/nvi/sl/23')
      expect(body.verses.length).toBe(6)
      expect(body.book.name).toBe('Salmos')
    })

    it('should return error 404 and "Book not found" message', async () => {
      const { body, statusCode } = await supertest(app).get('/verses/nvi/fake/23')
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Book not found')
    })

    it('should return error 404 and "Chapter not found" message', async () => {
      const { body, statusCode } = await supertest(app).get('/verses/nvi/sl/160')
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Chapter not found')
    })
  })

  describe('getVerse', () => {
    it('should return error 404 and "Verse not found" message', async () => {
      const { body, statusCode } = await supertest(app).get('/verses/nvi/sl/23/50')
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Verse not found')
    })

    it('should return error 404 and "Book not found" message', async () => {
      const { body, statusCode } = await supertest(app).get('/verses/nvi/fake/23/1')
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Book not found')
    })

    it('should return object with text and with the book of Mateus', async () => {
      const { body } = await supertest(app).get('/verses/nvi/mt/28/19')
      expect(body.text).toBe(
        'Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai e do Filho e do Espírito Santo,'
      )
      expect(body.book.name).toBe('Mateus')
    })
  })

  describe('search', () => {
    it('should return error 404 and "Version not found" message', async () => {
      const { body, statusCode } = await supertest(app).post('/verses/search').send({ search: 'No princípio' })
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Version not found')
    })

    it('should return 5 occurences', async () => {
      const { body } = await supertest(app)
        .post('/verses/search')
        .send({ version: 'nvi', search: 'No princípio' })
      expect(body.occurrence).toBe(5)
      expect(body.verses[0].text).toBe(
        'No princípio Deus criou os céus e a terra.'
      )
    })

    it('should return 5 occurences - deprecated', async () => {
      const { body } = await supertest(app)
        .post('/search')
        .send({ version: 'nvi', search: 'No princípio' })
      expect(body.occurrence).toBe(5)
      expect(body.verses[0].text).toBe(
        'No princípio Deus criou os céus e a terra.'
      )
    })

    describe('verse:not authorized', () => {
      it('should return error 403', async () => {
        const { statusCode } = await supertest(app)
          .post('/verses/search')
          .send({ version: 'nvi', search: 'No princípio' })
          .set('Authorization', 'Bearer Invalid')
        expect(statusCode).toBe(403)
      })
    })
  })
})
