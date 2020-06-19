import ua from 'universal-analytics'

const visitor = ua(process.env.GA_TRACKING_ID)

const setCustomDimensions = (cd) => {
  visitor.set('cd1', cd.action)
  visitor.set('cd2', cd.subfeature)
  visitor.set('cd3', cd.version)
  visitor.set('cd4', cd.chapter)
  visitor.set('cd5', cd.verse)
  visitor.set('cd6', cd.ip)
  visitor.set('cd7', cd.isHowToUse)
  visitor.set('cd8', cd.book)
  visitor.set('cd9', cd.period)
  visitor.set('cd10', cd.userId)
  visitor.set('uid', cd.userId)
}

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
    const url = req.originalUrl.replace(/\/$/g, '')
    const [, , action] = url.split('/')

    const actions = {
      verses: generateVersesEventData(req),
      books: generateBooksEventData(req),
      users: generateUsersEventData(url),
      requests: generateRequestsEventData(req)
    }
    const payload = actions[action] || {}

    setCustomDimensions({
      ...payload,
      action,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      isHowToUse: !!req.query.isHowToUse,
      userId: user ? user._id.toString() : ''
    })

    return visitor.event({ ec: action, ea: 'request', el: url }, (err) => {
      if (err) throw Error(err)
    }).send()
  } catch (e) {
    console.log('error: trackEvent', e)
  } finally {
    next()
  }
}
