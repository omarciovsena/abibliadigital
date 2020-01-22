import supertest from 'supertest'

import Request from '../../models/request'
import User from '../../models/user'
import app from '../app'
import { connect, resetDatabase } from '../utils'

jest.mock('axios')
describe('controllers:request', () => {
  let connection
  let user

  beforeAll(async () => {
    connection = await connect()
    await resetDatabase()
    user = await User.findOne()
  })

  afterAll(async () => {
    return connection.disconnect()
  })

  describe('getRequests', () => {
    it('should return one request', async () => {
      await Request.deleteMany()
      const { body } = await supertest(app).get('/requests/month').set('Authorization', `Bearer ${user.token}`)
      expect(body.length).toBeGreaterThanOrEqual(1)
    })

    it('should return two requests', async () => {
      const { body } = await supertest(app).get('/requests/week').set('Authorization', `Bearer ${user.token}`)
      expect(body.length).toBeGreaterThanOrEqual(2)
    })

    it('should return three requests', async () => {
      const { body } = await supertest(app).get('/requests/day').set('Authorization', `Bearer ${user.token}`)
      expect(body.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('getRequestsNumber', () => {
    it('should return at least one request', async () => {
      const { body } = await supertest(app).get('/requests/amount/month').set('Authorization', `Bearer ${user.token}`)
      expect(body.total).toBeGreaterThan(0)
    })

    it('should return at least one request', async () => {
      const { body, statusCode } = await supertest(app).get('/requests/amount/month')
      expect(statusCode).toEqual(403)
      expect(body.msg).toEqual('Not authorized token')
    })
  })
})
