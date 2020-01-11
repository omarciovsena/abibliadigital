import express from 'express'

import { getBooks, getBook } from '../controllers/book'
import { getRequests, getRequestsNumber } from '../controllers/request'
import { getVerse, getChapter, search } from '../controllers/verse'

const router = express.Router()

router.get('/verses/:version/:abbrev/:chapter', getChapter)
router.get('/verses/:version/:abbrev/:chapter/:number', getVerse)

router.post('/verses/search', search)
router.post('/search', search) // deprecated

router.get('/books', getBooks)
router.get('/books/:abbrev', getBook)

router.get('/requests/:period', getRequests)
router.get('/requests/amount/:period', getRequestsNumber)

router.get('/check', (req, res) => {
  res.json({
    result: 'success'
  })
})

export default router
