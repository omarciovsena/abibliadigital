import express from 'express'

import appRoutes from '../routes/index'

import '../models/book'
import '../models/verse'
import '../models/request'
import '../models/user'
const app = express()

app.use(express.json())
app.use('/', appRoutes)

export default app
