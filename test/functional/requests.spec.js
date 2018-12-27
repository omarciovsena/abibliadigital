'use strict'

const { test, trait, before } = use('Test/Suite')('Request')
const Factory = use('Factory')
const Request = use('App/Models/Request')

trait('Test/ApiClient')

test('list all requests', async ({ client }) => {
  const response = await client.get('api/requests/month').end()
  response.assertStatus(200)
  response.assertJSONSubset([
    {
      url: '/api/books/gn'
    },
    {
      url: '/api/books'
    },
    {
      url: '/api/requests/count/week'
    },
    {
      url: '/api/requests/count/week'
    },
    {
      url: '/api/requests/count/month'
    },
    {
      url: '/api/requests/'
    },
    {
      url: '/api/requests/week'
    },
    {
      url: '/api/requests/count/month'
    }
  ])
})

test('count all requests', async ({ client, assert }) => {
  const response = await client.get('api/requests/count/month').end()
  response.assertStatus(200)
  assert.equal(response.body[0].count, 3)
})
