import express from 'express'

import { getBooks, getBook } from '../controllers/book'
import { getRequests, getRequestsNumber } from '../controllers/request'
import { setRequiredToken, validToken } from '../controllers/session'
import { getUser, resendNewPassword, getUserStats, createUser, removeUser, updateToken } from '../controllers/user'
import { getVerse, getChapter, search } from '../controllers/verse'

const router = express.Router()

router.get('/verses/:version/:abbrev/:chapter', validToken, getChapter)
router.get('/verses/:version/:abbrev/:chapter/:number', validToken, getVerse)

router.post('/verses/search', validToken, search)
router.post('/search', validToken, search) // deprecated

router.get('/books', validToken, getBooks)
router.get('/books/:abbrev', validToken, getBook)

router.get('/users/stats', setRequiredToken, validToken, getUserStats)
router.get('/users/:email', setRequiredToken, validToken, getUser)

router.post('/users/password/:email', resendNewPassword)
router.post('/users', createUser)

router.put('/users/token', updateToken)
router.delete('/users', setRequiredToken, validToken, removeUser)

router.get('/requests/:period', setRequiredToken, validToken, getRequests)
router.get('/requests/amount/:period', setRequiredToken, validToken, getRequestsNumber)

router.get('/check', validToken, (req, res) => {
  res.json({
    result: 'success'
  })
})

export default router
