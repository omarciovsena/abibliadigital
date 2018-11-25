'use strict'

const Env = use('Env')

module.exports = {
  connection: Env.get('DB_CONNECTION'),
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST'),
      port: Env.get('DB_PORT'),
      user: Env.get('DB_USER'),
      password: Env.get('DB_PASSWORD'),
      database: Env.get('DB_DATABASE')
    },
    debug: Env.get('DB_DEBUG')
  }
}
