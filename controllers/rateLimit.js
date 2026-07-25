import dotenv from 'dotenv'
import moment from 'moment'
import redis from 'redis'
import { promisify } from 'util'

import { genericError } from '../helpers/index.js'

dotenv.config()

const { REDIS_URL } = process.env

const cache = redis.createClient(REDIS_URL)

const getAsync = promisify(cache.get).bind(cache)

export const startRedis = () => {
  /* istanbul ignore next */
  cache.on('error', function (err) {
    console.log('Redis:error: ' + err)
  })
}

export const checkRateLimit = async (req, res, next) => {
  if (req.user) return next()
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim()
  try {
    const response = await getAsync(ip)
    const data = {
      lastTime: moment().toISOString(),
      count: 1
    }

    if (response) {
      const current = JSON.parse(response)
      data.count = current.count + 1

      if (current.count > 20 && moment().diff(moment(current.lastTime), 'minutes') < 1) {
        return res.status(409).json({
          msg: 'Too many accounts created from this IP, please try again after an hour or login'
        })
      }
    }

    cache.set(ip, JSON.stringify(data), 'EX', 60)
    next()
  } catch (err) {
    /* istanbul ignore next */
    return genericError(res, err)
  }
}
