'use strict'

const Schema = use('Schema')

class VerseSchema extends Schema {
  up() {
    this.create('verses', table => {
      table.increments()
      table
        .integer('book_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('books')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('chapter').notNullable()
      table.integer('number').notNullable()
      table.text('text').notNullable()
      table.string('version').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('verses')
  }
}

module.exports = VerseSchema
