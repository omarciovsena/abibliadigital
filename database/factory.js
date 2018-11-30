'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/Book', (faker, i, data) => {
  return {
    ...data
  }
})

Factory.blueprint('App/Models/Verse', (faker, i, data) => {
  return {
    ...data
  }
})
