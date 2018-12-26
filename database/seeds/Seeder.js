'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const {
  booksPopulate,
  versesPopulate,
  requestsPopulate
} = require('./functions')
const chalkAnimation = require('chalk-animation')
const glitch = chalkAnimation.glitch('Loading database can take a few minutes')

class Seeder {
  async run() {
    glitch.start()
    await booksPopulate()
    await requestsPopulate()
    await versesPopulate()
    glitch.stop()
  }
}

module.exports = Seeder
