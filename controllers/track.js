import googleAnalytics from '@analytics/google-analytics'
import Analytics from 'analytics'

const analytics = Analytics({
  app: 'bibleapi',
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: process.env.GA_TRACKING_ID
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

const generateVersesEventData = (url, body) => {
  let data = {}
  const [, , , version, bookOrSubFeature, chapter, verse] = url.split('/')
  if (!bookOrSubFeature && body) {
    // api/verses/search
    data = {
      category: body.version,
      label: version
    }
  } else if (!chapter) {
    // api/verses/:version/random
    data = {
      category: bookOrSubFeature
    }
  } else {
    data = {
      category: version,
      label: bookOrSubFeature,
      dimension1: chapter,
      metric2: verse
    }
  }
  return data
}

const generateBooksEventData = (url) => {
  const [, , , label] = url.split('/')
  return { label }
}

const generateUsersEventData = (url) => {
  const [, , , category] = url.split('/')
  return { category }
}

const generateRequestsEventData = (url) => {
  const [, , , feature, period] = url.split('/')
  return {
    category: period ? feature : '',
    label: period || feature
  }
}

export const trackEvent = async (req, res, next) => {
  try {
    const user = req.user
    const url = req.originalUrl.replace(/\/$/g, '')
    const [, , action] = url.split('/')

    user && setUser(user)

    const actions = {
      verses: generateVersesEventData(url, req.body),
      books: generateBooksEventData(url),
      users: generateUsersEventData(url),
      requests: generateRequestsEventData(url)
    }

    req.query.index && await analytics.track('how-to-use', { category: action })
    await analytics.track(action, actions[action] || {})
  } catch (e) {
    console.log('error: trackEvent', e)
  } finally {
    next()
  }
}
