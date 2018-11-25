const notFound = response => {
  response.status(404)
  return {
    error: {
      number: 404,
      message: 'Not found'
    }
  }
}

const badRequest = (response, message) => {
  response.status(400)
  return {
    error: {
      number: 400,
      message: `Bad Request${message ? ` - ${message}` : ''}`
    }
  }
}

module.exports = {
  badRequest,
  notFound
}
