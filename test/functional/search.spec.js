'use strict'

const { test, trait, before } = use('Test/Suite')('Search')
const Factory = use('Factory')
const Book = use('App/Models/Book')
const Verse = use('App/Models/Verse')

trait('Test/ApiClient')

const {
  booksPopulate,
  versesPopulate
} = require('../../database/seeds/functions')

test('size list of books is 66', async ({ client, assert }) => {
  const response = await client.get('/api/books').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 66)
})

test('book is Gênesis', async ({ client }) => {
  const response = await client.get('/api/books/gn').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    abbrev: 'gn',
    author: 'Moisés',
    chapters: 50,
    group: 'Pentateuco',
    name: 'Gênesis',
    testament: 'VT'
  })
})

test('not found book', async ({ client }) => {
  const response = await client.get('/api/books/gg').end()
  response.assertStatus(404)
  response.assertJSONSubset({
    error: { number: 404, message: 'Not found' }
  })
})

test('chapter is sl 117', async ({ client }) => {
  const response = await client.get('/api/verses/nvi/sl/117').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    book: {
      abbrev: 'sl',
      name: 'Salmos',
      author: 'David, Moisés, Salomão',
      group: 'Poéticos',
      version: 'nvi'
    },
    chapter: {
      number: 117,
      verses: 2
    },
    verses: [
      {
        number: 1,
        text: 'Louvem o Senhor, todas as nações; exaltem-no, todos os povos!'
      },
      {
        number: 2,
        text:
          'Porque imenso é o seu amor leal por nós, e a fidelidade do Senhor dura para sempre. Aleluia!'
      }
    ]
  })
})

test('not found chapter', async ({ client }) => {
  const response = await client.get('/api/verses/nvi/sl/151').end()
  response.assertStatus(404)
  response.assertJSONSubset({
    error: { number: 404, message: 'Not found' }
  })
})

test('is "No princípio Deus criou os céus e a terra."', async ({ client }) => {
  const response = await client.get('/api/verses/nvi/gn/1/1').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    book: {
      abbrev: 'gn',
      name: 'Gênesis',
      author: 'Moisés',
      group: 'Pentateuco',
      version: 'nvi'
    },
    chapter: 1,
    number: 1,
    text: 'No princípio Deus criou os céus e a terra.'
  })
})

test('not found verse', async ({ client }) => {
  const response = await client.get('/api/verses/nvi/sl/23/10').end()
  response.assertStatus(404)
  response.assertJSONSubset({
    error: { number: 404, message: 'Not found' }
  })
})

test('is gn. 1:1', async ({ client }) => {
  const response = await client
    .post('/api/search/')
    .send({
      version: 'nvi',
      search: 'No princípio Deus'
    })
    .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    occoccurrences: 1,
    version: 'nvi',
    verses: [
      {
        book: 'gn',
        chapter: 1,
        number: 1,
        text: 'No princípio Deus criou os céus e a terra.'
      }
    ]
  })
})

test('not found work', async ({ client }) => {
  const response = await client
    .post('/api/search/')
    .send({
      version: 'nvi',
      search: 'zzz'
    })
    .end()
  response.assertStatus(404)
  response.assertJSONSubset({
    error: { number: 404, message: 'Not found' }
  })
})

test('bad request', async ({ client }) => {
  const response = await client
    .post('/api/search/')
    .send({
      version: 'nvi'
    })
    .end()
  response.assertStatus(400)
  response.assertJSONSubset({
    error: {
      number: 400,
      message:
        'Bad Request - {{version}} and {{search}} are required parameters'
    }
  })
})
