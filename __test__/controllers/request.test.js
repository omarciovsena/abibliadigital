import supertest from 'supertest'

import { saveRequest } from '../../controllers/request'
import Request from '../../models/request'
import app from '../app'
import { connect, getUser } from '../utils'

jest.mock('axios')
describe('controllers:request', () => {
  let connection
  let user

  beforeAll(async () => {
    connection = await connect()
    user = await getUser()
  })

  afterAll(async () => {
    return connection.disconnect()
  })

  describe('getRequests', () => {
    it('should return one request', async () => {
      await Request.deleteMany()
      const { body } = await supertest(app).get('/api/requests/month').set('Authorization', `Bearer ${user.token}`)
      expect(body.length).toBeGreaterThanOrEqual(1)
    })

    it('should return two requests', async () => {
      const { body } = await supertest(app).get('/api/requests/week').set('Authorization', `Bearer ${user.token}`)
      expect(body.length).toBeGreaterThanOrEqual(2)
    })

    it('should return three requests', async () => {
      const { body } = await supertest(app).get('/api/requests/day').set('Authorization', `Bearer ${user.token}`)
      expect(body.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('getRequestsNumber', () => {
    it('should return at least one request', async () => {
      const { body } = await supertest(app).get('/api/requests/amount/month').set('Authorization', `Bearer ${user.token}`)
      expect(body.total).toBeGreaterThan(0)
    })

    it('should return at least one request', async () => {
      const { body, statusCode } = await supertest(app).get('/api/requests/amount/month')
      expect(statusCode).toEqual(403)
      expect(body.msg).toEqual('Not authorized token')
    })
  })

  describe('saveRequest', () => {
    it('should have the same amount of requests saved', async () => {
      const numberOfRequestsBefore = await Request.countDocuments()
      await saveRequest(null)
      const numberOfRequestsAfter = await Request.countDocuments()
      expect(numberOfRequestsBefore).toEqual(numberOfRequestsAfter)
    })
  })
})
