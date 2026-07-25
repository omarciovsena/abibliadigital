import express from 'express'

import { getBooks, getBook } from '../controllers/book.js'
import { checkRateLimit } from '../controllers/rateLimit.js'
import { getRequests, getRequestsNumber } from '../controllers/request.js'
import { setRequiredToken, validToken } from '../controllers/session.js'
import { trackEvent } from '../controllers/track.js'
import { getUser, resendNewPassword, getUserStats, createUser, removeUser, updateToken } from '../controllers/user.js'
import { getVerse, getRandomVerse, getChapter, search } from '../controllers/verse.js'
import { getVersions } from '../controllers/version.js'

const router = express.Router()

router.get('/verses/:version/random', validToken, checkRateLimit, trackEvent, getRandomVerse)
router.get('/verses/:version/:abbrev/random', validToken, checkRateLimit, trackEvent, getRandomVerse)
router.get('/verses/:version/:abbrev/:chapter', validToken, checkRateLimit, trackEvent, getChapter)
router.get('/verses/:version/:abbrev/:chapter/:number', validToken, checkRateLimit, trackEvent, getVerse)
router.post('/verses/search', validToken, checkRateLimit, trackEvent, search)

router.get('/books', validToken, checkRateLimit, trackEvent, getBooks)
router.get('/books/:abbrev', validToken, checkRateLimit, trackEvent, getBook)

router.get('/versions', validToken, checkRateLimit, trackEvent, getVersions)

router.get('/users/stats', setRequiredToken, validToken, trackEvent, getUserStats)
router.get('/users/:email', setRequiredToken, validToken, trackEvent, getUser)

router.post('/users/password/:email', trackEvent, resendNewPassword)
router.post('/users', trackEvent, createUser)

router.put('/users/token', trackEvent, updateToken)
router.delete('/users', setRequiredToken, validToken, trackEvent, removeUser)

router.get('/requests/:period', setRequiredToken, validToken, trackEvent, getRequests)
router.get('/requests/amount/:period', setRequiredToken, validToken, trackEvent, getRequestsNumber)

router.get('/check', validToken, trackEvent, (req, res) => {
  res.json({
    result: 'success'
  })
})

export default router
