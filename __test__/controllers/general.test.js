import supertest from 'supertest'

import app from '../app'

jest.mock('axios')
describe('controllers:book', () => {
  it('should return success', async () => {
    const { body } = await supertest(app).get('/check')
    expect(body.result).toBe('success')
  })
})
