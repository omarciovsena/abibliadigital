
import axios from 'axios'

const trackeEventGA4 = async (params) => {
  const { user, category, action, label, value } = params
  const { GA_MEASUREMENT_ID } = process.env

  const eventData = {
    client_id: user,
    events: [{
      name: 'request', // Nome do evento
      params: {
        category, action, label, value
      }
    }]
  }

  try {
    await axios.post(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}`, eventData)
  } catch (error) {
    console.error('Erro ao enviar evento para o GA4:', error)
  }
}

const generateVersesEventData = (req) => {
  const { version, abbrev, chapter, number } = req.params

  if (!version) {
    return {
      subfeature: 'search',
      version: req.body.version
    }
  }

  if (!abbrev) {
    return {
      subfeature: 'search',
      version: req.body.version
    }
  }

  return {
    version,
    book: abbrev,
    chapter,
    verse: number
  }
}

const generateBooksEventData = (req) => {
  const { abbrev } = req.params
  return { book: abbrev }
}

const generateUsersEventData = (url) => {
  const [, , , subfeature] = url.split('/')
  return { subfeature }
}

const generateRequestsEventData = (req) => {
  const { period } = req.params
  return { period }
}

export const trackEvent = async (req, res, next) => {
  try {
    const user = req.user
    const url = req.originalUrl.replace(/\/$/g, '')
    const [, , action] = url.split('/')

    const actions = {
      verses: generateVersesEventData(req),
      books: generateBooksEventData(req),
      users: generateUsersEventData(url),
      requests: generateRequestsEventData(req)
    }
    const payload = actions[action] || {}

    const data = {
      user: user ? user._id.toString() : 'anonymous',
      category: 'request',
      action,
      label: url,
      value: payload.toString()
    }

    await trackeEventGA4(
      data
    )
  } catch (e) {
    console.log('error: trackEvent', e)
  } finally {
    next()
  }
}
