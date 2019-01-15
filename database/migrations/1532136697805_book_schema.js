'use strict'

const Schema = use('Schema')

class BookSchema extends Schema {
  up() {
    this.create('books', table => {
      table.increments()
      table.integer('chapters').notNullable()
      table.string('abbrev').notNullable()
      table.text('comment').notNullable()
      table.string('group').notNullable()
      table.string('testament').notNullable()
      table.string('name').notNullable()
      table.string('author').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('books')
  }
}

module.exports = BookSchema
