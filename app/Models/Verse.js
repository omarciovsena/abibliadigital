'use strict'

const Model = use('Model')

class Verse extends Model {
  book() {
    return this.belongsTo('App/Models/Book')
  }
}

module.exports = Verse
