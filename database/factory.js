'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/Book', () => {
  return {
    abbrev: 'gn',
    author: 'Moisés',
    chapters: 50,
    comment: '',
    group: 'Pentateuco',
    name: 'Gênesis',
    testament: 'VT'
  }
})

Factory.blueprint('App/Models/Verse', () => {
  return {
    book_id: 1,
    chapter: 1,
    number: 1,
    text: 'No princípio Deus criou os céus e a terra.',
    version: 'nvi'
  }
})
