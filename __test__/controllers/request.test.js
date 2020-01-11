import supertest from 'supertest'

import Request from '../../models/request'
import app from '../app'
import { connect } from '../utils'

jest.mock('axios')
describe('controllers:request', () => {
  let connection

  beforeAll(async () => {
    connection = await connect()
  })

  afterAll(async () => {
    return connection.disconnect()
  })

  it('should return at least one request', async () => {
    const { body } = await supertest(app).get('/requests/amount/month')
    expect(body.total).toBeGreaterThan(0)
  })

  describe('requests', () => {
    it('should return one request', async () => {
      await Request.deleteMany()
      const { body } = await supertest(app).get('/requests/month')
      expect(body.length).toBeGreaterThanOrEqual(1)
    })

    it('should return two requests', async () => {
      const { body } = await supertest(app).get('/requests/week')
      expect(body.length).toBeGreaterThanOrEqual(2)
    })

    it('should return three requests', async () => {
      const { body } = await supertest(app).get('/requests/day')
      expect(body.length).toBeGreaterThanOrEqual(3)
    })
  })
})
