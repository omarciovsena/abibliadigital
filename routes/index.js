import express from 'express'

import { getBooks, getBook } from '../controllers/book'
import { checkRateLimit } from '../controllers/rateLimit'
import { getRequests, getRequestsNumber } from '../controllers/request'
import { setRequiredToken, validToken } from '../controllers/session'
import { getUser, resendNewPassword, getUserStats, createUser, removeUser, updateToken } from '../controllers/user'
import { getVerse, getRandomVerse, getChapter, search } from '../controllers/verse'

const router = express.Router()

router.get('/verses/:version/:abbrev/:chapter', validToken, checkRateLimit, getChapter)
router.get('/verses/:version/:abbrev/:chapter/:number', validToken, checkRateLimit, getVerse)
router.get('/verses/:version/random', validToken, checkRateLimit, getRandomVerse)

router.post('/verses/search', validToken, checkRateLimit, search)
router.post('/search', validToken, checkRateLimit, search) // deprecated

router.get('/books', validToken, checkRateLimit, getBooks)
router.get('/books/:abbrev', validToken, checkRateLimit, getBook)

router.get('/users/stats', setRequiredToken, validToken, getUserStats)
router.get('/users/:email', setRequiredToken, validToken, getUser)

router.post('/users/password/:email', checkRateLimit, resendNewPassword)
router.post('/users', checkRateLimit, createUser)

router.put('/users/token', checkRateLimit, updateToken)
router.delete('/users', setRequiredToken, validToken, removeUser)

router.get('/requests/:period', setRequiredToken, validToken, getRequests)
router.get('/requests/amount/:period', setRequiredToken, validToken, getRequestsNumber)

router.get('/check', validToken, (req, res) => {
  res.json({
    result: 'success'
  })
})

export default router
