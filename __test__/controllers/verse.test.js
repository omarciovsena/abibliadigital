import supertest from 'supertest'

import Verse from '../../models/verse'
import app from '../app'
import { connect, getUser } from '../utils'

jest.mock('axios')
describe('controllers:verse', () => {
  let connection, user

  beforeAll(async () => {
    connection = await connect()
    user = await getUser()
  })

  afterAll(async () => {
    return connection.disconnect()
  })

  it('should have 837 verses', async done => {
    const count = await Verse.countDocuments()
    expect(count).toEqual(837)
    done()
  })

  describe('getChapter', () => {
    it('should return object with 27 verses and with the book of Tiago (James)', async () => {
      const { body } = await supertest(app)
        .get('/api/verses/nvi/tg/1')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.verses.length).toBe(27)
      expect(body.book.name).toBe('Tiago')
    })

    it('should return object with 27 verses and with the book of James (Tiago)', async () => {
      const { body } = await supertest(app)
        .get('/api/verses/nvi/jm/1')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.verses.length).toBe(27)
      expect(body.book.name).toBe('Tiago')
    })

    it('should return error 404 and "Book not found" message', async () => {
      const { body, statusCode } = await supertest(app)
        .get('/api/verses/nvi/fake/1')
        .set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Book not found')
    })

    it('should return error 404 and "Chapter not found" message', async () => {
      const { body, statusCode } = await supertest(app)
        .get('/api/verses/nvi/tg/10')
        .set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Chapter not found')
    })
  })

  describe('getVerse', () => {
    it('should return error 404 and "Verse not found" message', async () => {
      const { body, statusCode } = await supertest(app)
        .get('/api/verses/nvi/tg/1/100')
        .set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Verse not found')
    })

    it('should return error 404 and "Book not found" message', async () => {
      const { body, statusCode } = await supertest(app)
        .get('/api/verses/nvi/fake/23/1')
        .set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Book not found')
    })

    it('should return object with text and with the book of Tiago', async () => {
      const { body } = await supertest(app)
        .get('/api/verses/nvi/tg/1/1')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.text).toBe(
        'Tiago, servo de Deus e do Senhor Jesus Cristo, às doze tribos dispersas entre as nações: Saudações.'
      )
      expect(body.book.name).toBe('Tiago')
    })

    it('should return object with text and with the book of James', async () => {
      const { body } = await supertest(app)
        .get('/api/verses/nvi/jm/1/1')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.text).toBe(
        'Tiago, servo de Deus e do Senhor Jesus Cristo, às doze tribos dispersas entre as nações: Saudações.'
      )
      expect(body.book.name).toBe('Tiago')
    })
  })

  describe('getRandomVerse', () => {
    it('should return object with 1 verse', async () => {
      const { body } = await supertest(app)
        .get('/api/verses/nvi/random')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.text.length > 0).toBeTruthy()
    })

    it('should return object with 1 verse of specific book', async () => {
      const { body } = await supertest(app)
        .get('/api/verses/nvi/tg/random')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.text.length > 0 && body.book.name === 'Tiago').toBeTruthy()
    })
  })

  describe('search', () => {
    it('should return error 404 and "Version not found" message', async () => {
      const { body, statusCode } = await supertest(app).post('/api/verses/search')
        .send({ search: 'No princípio' })
        .set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(404)
      expect(body.msg).toBe('Version not found')
    })

    it('should return 18 occurences', async () => {
      const { body } = await supertest(app)
        .post('/api/verses/search')
        .send({ version: 'nvi', search: 'luz' })
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.occurrence).toBe(18)
      expect(body.verses[0].text).toBe(
        'Então a cobiça, tendo engravidado, dá à luz o pecado; e o pecado, após ter-se consumado, gera a morte.'
      )
    })

    describe('verse:not authorized', () => {
      it('should return error 403', async () => {
        const { statusCode } = await supertest(app)
          .post('/api/verses/search')
          .send({ version: 'nvi', search: 'No princípio' })
          .set('Authorization', 'Bearer Invalid')
        expect(statusCode).toBe(403)
      })
    })
  })
})
