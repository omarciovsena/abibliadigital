'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequestSchema extends Schema {
  up() {
    this.create('requests', table => {
      table.increments()
      table.text('url').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('requests')
  }
}

module.exports = RequestSchema
