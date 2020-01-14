import md5 from 'md5'
import moment from 'moment'
import supertest from 'supertest'

import { generateToken } from '../../controllers/session'
import Request from '../../models/request'
import User from '../../models/user'
import app from '../app'
import { connect } from '../utils'

jest.mock('axios')
describe('controllers:user', () => {
  let connection
  let user

  beforeAll(async () => {
    connection = await connect()
    await User.deleteMany()
    await Request.deleteMany()
    await supertest(app).post('/users').send({
      name: 'Fake User',
      email: 'fake@email.com',
      password: '123456',
      notifications: false
    })
    user = await User.findOne()
  })

  afterAll(async () => {
    await User.deleteMany()
    await Request.deleteMany()
    return connection.disconnect()
  })

  describe('getUser', () => {
    it('should return error 404', async () => {
      const { statusCode } = await supertest(app).get('/users')
      expect(statusCode).toBe(404)
    })

    it('should return error 403', async () => {
      const { statusCode } = await supertest(app).get('/users/notfound@email.com')
      expect(statusCode).toBe(403)
    })

    it('should return error 404 and "User not found" message', async () => {
      const { statusCode, body } = await supertest(app).get('/users/notfound@email.com').set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(404)
      expect(body.msg).toEqual('User not found')
    })

    it('should return user', async () => {
      const { statusCode, body } = await supertest(app).get(`/users/${user.email}`).set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(200)
      expect(body.name).toEqual(user.name)
    })
  })

  describe('createUser', () => {
    beforeAll(async () => {
      await User.deleteOne({ email: 'fake01@email.com' })
    })

    it('should return user', async () => {
      const { statusCode, body } = await supertest(app).post('/users').send({
        name: 'Fake User',
        email: 'fake01@email.com',
        password: '123456',
        notifications: false
      })
      expect(statusCode).toBe(200)
      expect(body.name).toEqual('Fake User')
      expect(body.email).toEqual('fake01@email.com')
    })

    it('should return error 400 and "User already exists" message ', async () => {
      const { statusCode, body } = await supertest(app).post('/users').send({
        name: 'Fake User',
        email: user.email,
        password: '123456',
        notifications: false
      })
      expect(statusCode).toBe(400)
      expect(body.msg).toEqual('User already exists')
    })

    it('should return error 400 and "{name}(String), {email}(String), {notifications}(Boolean) and {password}(String) are required" message ', async () => {
      const { statusCode, body } = await supertest(app).post('/users').send({
        name: 'Fake User',
        password: '123456',
        notifications: false
      })
      expect(statusCode).toBe(400)
      expect(body.msg).toEqual('{name}(String), {email}(String), {notifications}(Boolean) and {password}(String) are required')
    })
  })

  describe('removeUser', () => {
    let removedUser = {
      email: 'fake02@email.com'
    }
    beforeAll(async () => {
      removedUser = await await User.create({
        name: 'Fake User',
        email: removedUser.email,
        notifications: false,
        token: generateToken(removedUser.email),
        password: md5('102030'),
        lastLogin: new Date()
      })
    })

    it('should return error 403', async () => {
      const { statusCode, body } = await supertest(app).delete('/users').send({
        email: removedUser.email,
        password: '102030'
      })
      expect(statusCode).toBe(403)
      expect(body.msg).toEqual('Not authorized token')
    })

    it('should return error 404 and "User not found" message', async () => {
      const { statusCode, body } = await supertest(app).delete('/users').send({
        email: removedUser.email,
        password: '102030'
      }).set('Authorization', `Bearer ${user.token}`)
      expect(statusCode).toBe(404)
      expect(body.msg).toEqual('User not found')
    })

    it('should return success message', async () => {
      const { statusCode, body } = await supertest(app).delete('/users').send({
        email: removedUser.email,
        password: '102030'
      }).set('Authorization', `Bearer ${removedUser.token}`)
      expect(statusCode).toBe(200)
      expect(body.msg).toEqual('User successfully removed')
    })
  })

  describe('updateToken', () => {
    let updateTokenUser = {
      email: 'fake02@email.com'
    }
    beforeAll(async () => {
      updateTokenUser = await await User.create({
        name: 'Fake User',
        email: updateTokenUser.email,
        notifications: false,
        token: generateToken(updateTokenUser.email),
        password: md5('102030'),
        lastLogin: new Date()
      })
    })

    afterAll(async () => {
      await User.deleteMany()
    })

    it('should return error 404 and "User not found" message', async () => {
      const { statusCode, body } = await supertest(app).put('/users/token').send({
        email: updateTokenUser.email,
        password: '10203040'
      })
      expect(statusCode).toBe(404)
      expect(body.msg).toEqual('User not found')
    })

    it('should return different token', async () => {
      const { statusCode, body } = await supertest(app).put('/users/token').send({
        email: updateTokenUser.email,
        password: '102030'
      })
      expect(statusCode).toBe(200)
      expect(body.token).not.toEqual(updateTokenUser.token)
    })
  })

  describe('getUserStats', () => {
    let userStats = {
      email: 'fake02@email.com'
    }
    beforeAll(async () => {
      userStats = await await User.create({
        name: 'Fake User',
        email: userStats.email,
        notifications: false,
        token: generateToken(userStats.email),
        password: md5('102030'),
        lastLogin: new Date()
      })

      await supertest(app).get('/users/stats').set('Authorization', `Bearer ${userStats.token}`)
      await supertest(app).get('/books/gn').set('Authorization', `Bearer ${userStats.token}`)
      await supertest(app).get('/books/jo/3/16').set('Authorization', `Bearer ${userStats.token}`)
    })

    afterAll(async () => {
      await User.deleteMany()
    })

    it('should return error 404 and "not authorized token" message', async () => {
      const { statusCode, body } = await supertest(app).get('/users/stats')
      expect(statusCode).toBe(403)
      expect(body.msg).toEqual('Not authorized token')
    })

    it('should return stats', async () => {
      const { statusCode, body } = await supertest(app).get('/users/stats').set('Authorization', `Bearer ${userStats.token}`)
      expect(statusCode).toBe(200)
      expect(body.lastLogin).not.toEqual(null)
      expect(body.requestsPerMonth[0].range).toEqual(`${moment().format('M')}/${moment().format('YYYY')}`)
      expect(body.requestsPerMonth[0].total).toEqual(3)
    })
  })
})
