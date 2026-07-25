import moment from 'moment'

import { genericError } from '../helpers/index.js'
import Request from '../models/request.js'
import { updateLastLogin } from './user.js'

const getPeriod = period => {
  switch (period) {
    case 'month':
      return moment().subtract(30, 'days')
    case 'week':
      return moment().subtract(7, 'days')
    default:
      return moment().subtract(1, 'days')
  }
}

export const getRequests = async (req, res) => {
  try {
    await saveRequest(req)
    const { period } = req.params
    const date = getPeriod(period)

    const requests = await Request.find({
      createdAt: { $gte: date }
    }).sort({ createdAt: -1 })

    res.json(
      requests.map(request => ({
        url: request.url,
        date: request.createdAt
      }))
    )
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}

export const getRequestsNumber = async (req, res) => {
  try {
    await saveRequest(req)
    const { period } = req.params
    const date = getPeriod(period)

    const requests = await Request.aggregate([
      {
        $match: {
          createdAt: { $gte: date.toDate() }
        }
      },
      {
        $group: {
          _id: '$url',
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ])

    res.json({
      total: requests.reduce((a, b) => ({ count: a.count + b.count })).count,
      requests
    })
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}

export const saveRequest = async req => {
  try {
    if (req.user) {
      updateLastLogin(req.user._id)
      const request = new Request({
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        text: req.body ? req.body.search : null,
        url: req.originalUrl.replace(/\/$/g, ''),
        user: req.user._id,
        version: req.body ? req.body.version : null
      })
      await request.save()
    }
  } catch (e) {
    console.log('error: saveRequest', e)
  }
}
