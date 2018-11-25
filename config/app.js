'use strict'

const Env = use('Env')

module.exports = {
  name: Env.get('APP_NAME', 'bibleAPI'),
  appKey: Env.get('APP_KEY'),
  http: {
    allowMethodSpoofing: true,
    etag: false,
    jsonpCallback: 'callback',
    loggerEnv: ['development', 'production'],
    subdomainOffset: 2,
    trustProxy: false
  },

  static: {
    dotfiles: 'ignore',
    etag: true,
    extensions: false
  },

  locales: {
    loader: 'file',
    locale: 'en',
    fallbackLocale: 'en'
  },

  logger: {
    transport: 'console',
    console: {
      driver: 'console'
    },
    file: {
      driver: 'file',
      filename: 'adonis.log'
    }
  }
}
