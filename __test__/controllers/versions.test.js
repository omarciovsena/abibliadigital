import supertest from 'supertest'

import app from '../app'
import { connect, getUser } from '../utils'

jest.mock('axios')
describe('controllers:versions', () => {
  let connection, user

  beforeAll(async () => {
    connection = await connect()
    user = await getUser()
  })

  afterAll(async () => {
    return connection.disconnect()
  })

  describe('getVersions', () => {
    it('should return 1 version', async () => {
      const { body } = await supertest(app)
        .get('/api/versions')
        .set('Authorization', `Bearer ${user.token}`)
      expect(body.length).toBe(1)
    })
  })
})
