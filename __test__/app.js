import express from 'express'

import '../models/book'
import '../models/verse'
import '../models/request'
import '../models/user'

import { startRedis } from '../controllers/rateLimit'
import appRoutes from '../routes/index'

startRedis()

const app = express()

app.use(express.json())
app.use('/api/', appRoutes)

export default app
