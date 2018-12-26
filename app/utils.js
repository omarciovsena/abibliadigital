const Request = use('App/Models/Request')

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

const newRequest = async url => {
  const req = { url }
  try {
    await Request.create(req)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  badRequest,
  notFound,
  newRequest
}
