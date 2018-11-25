'use strict'

const Model = use('Model')

class Book extends Model {
  authors() {
    return this.hasMany('App/Models/Author')
  }

  verses() {
    return this.hasMany('App/Models/Verse')
  }
}

module.exports = Book
