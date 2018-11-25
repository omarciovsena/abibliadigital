'use strict'

const Env = use('Env')

module.exports = {
  authenticator: 'jwt',
  jwt: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'jwt',
    uid: 'email',
    password: 'password',
    options: {
      secret: Env.get('APP_KEY'),
      expiresIn: 6000 // 1m
    }
  }
}
