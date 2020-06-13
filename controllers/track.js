import googleAnalytics from '@analytics/google-analytics'
import Analytics from 'analytics'

const analytics = Analytics({
  app: 'bibleapi',
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: process.env.GA_TRACKING_ID,
      customDimensions: {
        feature: 'dimension1',
        subfeature: 'dimension2',
        version: 'dimension3',
        chapter: 'dimension4',
        verse: 'dimension5',
        ip: 'dimension6',
        isHowToUse: 'dimension7',
        book: 'dimension8',
        period: 'dimension9'
      }
    })
  ]
})

const setUser = (user) => {
  analytics.user(user._id.toString())
  analytics.identify(user._id.toString(), {
    name: user.name,
    email: user.email
  })
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

    user && setUser(user)

    const actions = {
      verses: generateVersesEventData(req),
      books: generateBooksEventData(req),
      users: generateUsersEventData(url),
      requests: generateRequestsEventData(req)
    }

    const payload = actions[action] || {}
    await analytics.track('request', {
      ...payload,
      feature: action,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      isHowToUse: !!req.query.isHowToUse
    })
  } catch (e) {
    console.log('error: trackEvent', e)
  } finally {
    next()
  }
}
