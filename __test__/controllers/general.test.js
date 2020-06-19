import httpMocks from 'node-mocks-http'
import supertest from 'supertest'

import { resendNewPassword } from '../../controllers/user'
import app from '../app'

jest.mock('axios')
describe('controllers:book', () => {
  it('should return success', async () => {
    const { body } = await supertest(app).get('/api/check')
    expect(body.result).toBe('success')
  })
})

describe('controllers:genericError', () => {
  const res = httpMocks.createResponse()
  const req = {
    user: null,
    headers: {
      'x-forwarded-for': true
    }
  }

  it('should return response.status valid', async () => {
    const response = await resendNewPassword(req, res)
    expect(!!response.status).toBe(true)
  })
})
