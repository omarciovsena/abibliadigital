import express from 'express'

import { getBook, getBooks } from '../controllers/book'
import { checkRateLimit } from '../controllers/rateLimit'
import { getRequests, getRequestsNumber } from '../controllers/request'
import { setRequiredToken, validToken } from '../controllers/session'
import { trackEvent } from '../controllers/track'
import { createUser, getUser, getUserStats, removeUser, resendNewPassword, updateToken } from '../controllers/user'
import { getChapter, getRandomVerse, getVerse, getVersesInRange, search } from '../controllers/verse'
import { getVersions } from '../controllers/version'

const router = express.Router()

router.get('/verses/:version/random', validToken, checkRateLimit, trackEvent, getRandomVerse)
router.get('/verses/:version/:abbrev/random', validToken, checkRateLimit, trackEvent, getRandomVerse)
router.get('/verses/:version/:abbrev/:chapter', validToken, checkRateLimit, trackEvent, getChapter)
router.get('/verses/:version/:abbrev/:chapter/:number', validToken, checkRateLimit, trackEvent, getVerse)
router.get('/verses/:version/:abbrev/:chapter/:range', validToken, checkRateLimit, trackEvent, getVersesInRange)
router.post('/verses/search', validToken, checkRateLimit, trackEvent, search)

router.get('/books', validToken, checkRateLimit, trackEvent, getBooks)
router.get('/books/:abbrev', validToken, checkRateLimit, trackEvent, getBook)

router.get('/versions', validToken, checkRateLimit, trackEvent, getVersions)

router.get('/users/stats', setRequiredToken, validToken, trackEvent, getUserStats)
router.get('/users/:email', setRequiredToken, validToken, trackEvent, getUser)

router.post('/users/password/:email', trackEvent, resendNewPassword)
router.post('/users', checkRateLimit, trackEvent, createUser)

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
