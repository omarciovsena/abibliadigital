import bodyParser from 'body-parser'
import chalk from 'chalk'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import i18n from 'i18n'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

import { startRedis } from './controllers/rateLimit.js'
import appRoutes from './routes/index.js'

import './models/book.js'
import './models/verse.js'
import './models/request.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
startRedis()

const app = express()

// Connect to MongoDB.
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', err => {
  console.error(`%s ${err}`, chalk.red('x'))
})

i18n.configure({
  locales: ['en', 'pt'],
  directory: `${__dirname}/views/locales`
})

app.use(cors())
app.use(i18n.init)
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')

app.get('/:lang?', (req, res) => {
  res.setLocale(req.params.lang || 'pt')
  res.render('index', { GA_TRACKING_ID: process.env.GA_TRACKING_ID })
})
app.use(bodyParser.json())
app.use('/api/', appRoutes)

app.listen(process.env.PORT || 3000, () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    process.env.PORT || 3000,
    process.env.NODE_ENV
  )
  console.log('  Press CTRL-C to stop\n')
})
