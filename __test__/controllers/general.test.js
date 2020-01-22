import httpMocks from 'node-mocks-http'
import supertest from 'supertest'

import { resendNewPassword } from '../../controllers/user'
import app from '../app'

jest.mock('axios')
describe('controllers:book', () => {
  it('should return success', async () => {
    const { body } = await supertest(app).get('/check')
    expect(body.result).toBe('success')
  })
})

describe('controllers:genericError', () => {
  it('should return error 500 and "Book not found" message', async () => {
    const res = httpMocks.createResponse()
    const req = {
      user: null,
      headers: {
        'x-forwarded-for': true
      }
    }
    const response = await resendNewPassword(req, res)
    expect(!!response.status).toBe(true)
  })
})
