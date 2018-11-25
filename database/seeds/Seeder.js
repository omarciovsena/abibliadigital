'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const booksData = require('../data/books.js')
const versesData = require('../data/verses.js')
const { booksPopulate, versesPopulate } = require('./functions')
const chalkAnimation = require('chalk-animation')
const glitch = chalkAnimation.glitch('Loading database can take a few minutes')

class Seeder {
  async run() {
    glitch.start()
    await booksPopulate()
    await versesPopulate()
    glitch.stop()
  }
}

module.exports = Seeder
