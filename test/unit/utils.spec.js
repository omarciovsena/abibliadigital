'use strict'

const { test } = use('Test/Suite')('Utils')
const { notFound, badRequest } = use('App/utils')

test('number is equal to 404 and message not found', async ({ assert }) => {
  const response = {
    status: function() {}
  }
  const result = notFound(response)
  assert.equal(result.error.number, 404)
  assert.equal(result.error.message, 'Not found')
})

test('number is equal to 400 and message Bad Request', async ({ assert }) => {
  const response = {
    status: function() {}
  }
  const result = badRequest(response)
  assert.equal(result.error.number, 400)
  assert.equal(result.error.message, 'Bad Request')
})

test('number is equal to 400 and message Bad Request - {{version}} and {{search}} are required parameters', async ({
  assert
}) => {
  const response = {
    status: function() {}
  }
  const result = badRequest(
    response,
    '{{version}} and {{search}} are required parameters'
  )
  assert.equal(result.error.number, 400)
  assert.equal(
    result.error.message,
    'Bad Request - {{version}} and {{search}} are required parameters'
  )
})
