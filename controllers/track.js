import ua from 'universal-analytics'

const visitor = ua(process.env.GA_TRACKING_ID)

const setCustomDimensions = () => {
  visitor.set('cd1', 'feature')
  visitor.set('cd2', 'subfeature')
  visitor.set('cd3', 'version')
  visitor.set('cd4', 'chapter')
  visitor.set('cd5', 'verse')
  visitor.set('cd6', 'ip')
  visitor.set('cd7', 'isHowToUse')
  visitor.set('cd8', 'book')
  visitor.set('cd9', 'period')
}

setCustomDimensions()

const generateVersesEventData = (req) => {
  const { version, abbrev, chapter, number } = req.params

  if (!version) {
    // api/verses/search
    return {
      subfeature: 'search',
      version: req.body.version
    }
  }

  if (!abbrev) {
    // api/verses/:version/random
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
    visitor.set('uid', user ? user._id.toString() : '')

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
      ec: action,
      ea: 'request',
      ...payload,
      feature: action,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      isHowToUse: !!req.query.isHowToUse
    }

    return visitor.event(data).send()
  } catch (e) {
    console.log('error: trackEvent', e)
  } finally {
    next()
  }
}
